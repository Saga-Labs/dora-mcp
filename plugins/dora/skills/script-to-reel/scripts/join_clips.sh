#!/usr/bin/env bash
# Join Dora clips into one mp4, in order.
# Usage: join_clips.sh OUTPUT.mp4 CLIP1 CLIP2 [CLIP3 ...]
# Each CLIP is a local file or a link (a doravideo.com/v/<id> link is fetched with ?raw=1).
# Every clip is scaled to the first clip's size, set to 30 fps and given a sound track
# (silence if it had none), so clips from different models still join cleanly.
set -euo pipefail
[ $# -ge 3 ] || { echo "usage: $0 OUTPUT.mp4 CLIP1 CLIP2 [...]" >&2; exit 2; }
command -v ffmpeg >/dev/null || { echo "ffmpeg is not installed" >&2; exit 3; }
out=$1; shift
work=$(mktemp -d); trap 'rm -rf "$work"' EXIT
i=0; list="$work/list.txt"; : > "$list"; size=""
for src in "$@"; do
  i=$((i+1)); in="$work/in$i.mp4"
  case "$src" in
    http*://doravideo.com/v/*) case "$src" in *raw=1*|*.mp4) url=$src ;; *\?*) url="$src&raw=1" ;; *) url="$src?raw=1" ;; esac
                               curl -fsSL "$url" -o "$in" ;;
    http*://*) curl -fsSL "$src" -o "$in" ;;
    *) cp "$src" "$in" ;;
  esac
  if [ -z "$size" ]; then
    size=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$in")
  fi
  w=${size%x*}; h=${size#*x}
  has_audio=$(ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$in" | head -1)
  vf="scale=$w:$h:force_original_aspect_ratio=decrease,pad=$w:$h:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30,format=yuv420p"
  if [ -n "$has_audio" ]; then
    ffmpeg -nostdin -v error -y -i "$in" -vf "$vf" -c:v libx264 -preset veryfast -crf 20 \
      -c:a aac -ar 44100 -ac 2 "$work/n$i.mp4"
  else
    ffmpeg -nostdin -v error -y -i "$in" -f lavfi -i anullsrc=r=44100:cl=stereo -vf "$vf" -shortest \
      -map 0:v -map 1:a -c:v libx264 -preset veryfast -crf 20 -c:a aac "$work/n$i.mp4"
  fi
  echo "file '$work/n$i.mp4'" >> "$list"
done
ffmpeg -nostdin -v error -y -f concat -safe 0 -i "$list" -c copy -movflags +faststart "$out"
echo "$out"
