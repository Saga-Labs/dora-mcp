---
name: storyboard
description: Turn a story idea into a short storyboard of Dora video shots that keep the same character, face and outfit in every shot. Use when the user wants a series of clips, scenes, an episode, a short story or a recurring character.
---

# Storyboard with a consistent character

The way to keep a character the same across shots is to give Dora the same reference images on every shot. This skill builds those references first, then the shots.

## 1. The character

- If the user has a public https link to a photo of the character, use it.
- Otherwise make a character sheet with `generate_image` (default model `nano_banana_2`, 1K): one image, plain light background, the character full body and face clearly visible, front view, in the outfit they will wear in every shot. Describe age, hair, clothes and colours in concrete words.
- Show the sheet to the user and ask if it is right before any video. Images cost much less than videos, so fix the look here.
- From then on, the reference is the sheet's link with `?raw=1` at the end (`https://doravideo.com/v/<id>?raw=1`).

## 2. The shot list

- Write 3 to 6 shots, one line each: what happens, where, camera (close-up, wide, slow push-in), and mood. One action per shot.
- Show the list and the total cost before generating. Get the cost of one video from `list_models`, multiply by the number of shots, and say it in coins.
- Wait for the user's yes. Every shot spends coins.

## 3. The shots

- For each shot call `generate_video` with:
  - `image_url`: the character reference (`...?raw=1`);
  - `reference_image_urls`: the same reference, plus any second character or key prop;
  - the prompt: the shot line, plus the character in a few fixed words that never change between shots ("the same woman with short red hair and a yellow raincoat").
- Keep the user's aspect ratio for every shot; default 9:16.
- Start all shots, then call `check_job` for each until all are `done` or `failed`.
- If one shot fails, offer to redo only that one.

## 4. Hand-over

One message with the shots in order, one link per line, numbered as in the shot list. If this is Claude Code or Cowork and the user wants a single video, follow the `script-to-reel` skill's join step.

Content rules, coins and errors are as in the `get-started` skill.
