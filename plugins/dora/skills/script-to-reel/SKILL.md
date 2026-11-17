---
name: script-to-reel
description: Turn a short script or voice-over text into a vertical reel - split it into 3 to 5 Dora clips, generate them in order and, where a shell with ffmpeg is available (Claude Code, Cowork), join them into one mp4. Use when the user has a script, a caption, a hook or a story and wants one finished Reel, TikTok or Short.
---

# Reel from a script

## 1. Split the script

- Break the text into 3 to 5 beats. Each beat becomes one 9:16 clip: what we see, camera, mood. One idea per clip.
- If a person appears in more than one clip, use the `storyboard` skill's character step first, so every clip gets the same reference.
- Show the beats and the total cost before generating: the cost of one clip from `list_models`, times the number of clips, in coins. Wait for the user's yes.

## 2. Generate

- Call `generate_video` for every beat with `aspect_ratio` 9:16 and the same settings for all clips (same model, resolution and duration), so they join cleanly. Defaults are fine unless the user asks otherwise.
- If a reference is used, pass the same `image_url` and `reference_image_urls` on every clip.
- Start all clips, then call `check_job` for each until all are `done` or `failed`. Redo only the clips that failed.

## 3. Join (Claude Code and Cowork)

If you can run shell commands and `ffmpeg` is installed:

```bash
bash "${CLAUDE_PLUGIN_ROOT}/skills/script-to-reel/scripts/join_clips.sh" reel.mp4 LINK1 LINK2 LINK3
```

- Pass the clip links from `check_job` in script order. The script fetches each file, matches size, frame rate and sound, and writes one mp4.
- If `CLAUDE_PLUGIN_ROOT` is not set, find `join_clips.sh` next to this file.
- Tell the user where the file is. Do not upload it anywhere.
- If `ffmpeg` is missing, say so and give the install command for their system (`brew install ffmpeg` on macOS, `sudo apt install ffmpeg` on Debian/Ubuntu), or hand over the clips as links.

In the Claude chat, where there is no shell, hand over the clips as numbered links in order.

## 4. Hand-over

The joined file's path (or the numbered links), and the script line each clip covers. Offer to redo any one clip.

Content rules, coins and errors are as in the `get-started` skill.
