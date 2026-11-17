---
name: get-started
description: Make one short AI video or image with Dora from a description or a photo link, and hand back the result. Use when the user asks for a video, a clip, an animation or an image and has not asked for a storyboard, a reel or a product ad.
---

# Making one video or image with Dora

Dora turns a description, or a photo, into a short video or an image. The tools come from the Dora connector in this plugin: `generate_video`, `generate_image`, `check_job`, `get_balance` and `list_models`.

## Before generating

- If the user has not said what to make, ask only: "What do you want to create?" Offer no list of options.
- If it is not clear whether they want a video or an image, ask only that. If it is clear, do not ask.
- Then generate straight away with the tool defaults: for video, vertical 9:16, 8 seconds, 480p, sound on; images at 1K, square. Change a setting only when the user asks.
- Photos reach Dora as an https link (`image_url` for video, `reference_image_url` for images). Never invent a link.
  - **With a shell (Claude Code, Cowork):** for a local photo, call `get_upload_link` (one per photo, with its `content_type`), run the `curl` it returns with the file path, and pass the returned `photo_url`. The link works once and expires after 15 minutes; it costs no coins.
  - **Without a shell (the Claude chat):** a photo attached in the chat cannot reach Dora. Ask for a public https link to it, or offer to make it from a description instead.

## Generating

1. Call `generate_video` or `generate_image`. It returns a `job_id` right away.
2. Tell the user it is on its way.
3. Call `check_job` with the `job_id` until the status is `done` or `failed`. Do not end your turn before that. If you cannot keep waiting, say plainly that the result is not ready yet and that they can ask you for it later.
4. When it is done, send one message with the link from `check_job`, as text, and repeat only the settings the tool returned. If it failed, say so plainly and offer to try again; the coins for a failed generation go back to the account automatically.

## When something stops the request

- `CONTENT_POLICY`: Dora does not make sexual content, content involving minors, graphic violence or self-harm. Say this request cannot be made and offer a different direction. Do not rephrase the same request to get around the filter.
- `INSUFFICIENT_CREDITS`: the account does not have enough coins for this. Say so and share the link in `plans_url`.
- `AUTH_EXPIRED`: ask the user to reconnect Dora.

## Balance and models

- If the user asks how many coins they have, or whether they have a plan, call `get_balance`. It only reads.
- If the user asks what models exist or what something costs, call `list_models` and answer from it. Do not quote prices from memory.

## Using a result again

A Dora link looks like `https://doravideo.com/v/<id>`. To use a finished image as the reference for the next generation, pass it with `?raw=1` at the end, which serves the file itself.
