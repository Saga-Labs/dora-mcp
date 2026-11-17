---
name: product-ad
description: Make short product ad videos with Dora from a photo of the product - a turntable spin, the product in use and a lifestyle scene - in vertical and square. Use when the user wants an ad, a product video, a listing video or social clips for something they sell.
---

# Product ad from one photo

## 1. The photo

- Dora needs the product photo as an https link: a shop listing image, a CDN link, a Dora result with `?raw=1`, or, for a local file in Claude Code or Cowork, the `photo_url` from `get_upload_link` (see `get-started`). Never invent one.
- If the user has no link, offer to make a clean product image first with `generate_image` from their description, show it, and use it once they approve.
- A plain background and the whole product in frame give the best results.

## 2. The plan

Three variants, each in 9:16 (Reels, TikTok, Shorts) and 1:1 (feeds), so six videos:

1. **Spin**: the product turns slowly on a clean surface, soft studio light, no hands.
2. **In use**: hands use the product the way it is meant to be used, close-up.
3. **Scene**: the product in a place that fits its buyer (kitchen counter, desk, bathroom shelf, outdoors), light camera movement.

- Ask what the product is called and what it does if that is not clear from the photo; the prompts need it.
- Before generating, say how many videos and the total in coins (cost of one from `list_models`, times six) and wait for the user's yes. If they want fewer, start with the three vertical ones.

## 3. Generating

- Call `generate_video` with `image_url` set to the product photo, `aspect_ratio` 9:16 or 1:1, and the variant's prompt. Name the product and keep its shape, colour, logo and label exactly as in the photo ("keep the label and logo exactly as in the photo, no new text").
- Never add text, prices or claims inside the video; those go in the post, not the picture.
- Start them all, then call `check_job` for each until all are `done` or `failed`.

## 4. Hand-over

One message: a short heading per variant and its two links (vertical, square). Offer to redo any one with a different scene.

Content rules, coins and errors are as in the `get-started` skill.
