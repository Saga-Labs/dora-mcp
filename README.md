# Dora MCP

Multi-model AI image and video generator, exposed as a hosted MCP connector for Claude.

A single OAuth-secured endpoint gives Claude access to **14 image and video models** through one tool surface. Cheap-first defaults, async job polling, and full-size results stored on Firebase.

- **Endpoint:** `https://doravideo.com/mcp`
- **Landing page:** [doravideo.com/claude](https://doravideo.com/claude)
- **iOS app:** [Dora on the App Store](https://apps.apple.com/app/id6747720520)
- **Web:** [doravideo.com](https://doravideo.com)
- **Smithery:** [smithery.ai/server/saga-labs/dora-mcp](https://smithery.ai/server/saga-labs/dora-mcp)

## Models

| Kind  | Model              | Coin cost | Notes                                       |
|-------|--------------------|-----------|---------------------------------------------|
| Image | `z_image`          | 10        | Cheapest text-to-image                      |
| Image | `google_nano_banana` | 40      | Low-cost text-to-image                      |
| Image | `google_nano_banana_edit` | 40 | Low-cost editing from a reference photo     |
| Image | `gpt4o_image`      | 60        | OpenAI GPT-4o image                         |
| Image | `gpt_image_2`      | 60        | OpenAI gpt-image-2                          |
| Image | `nano_banana_2`    | 100–150   | **Default** — quality + reference photo     |
| Image | `nano_banana_pro`  | 180–240   | Best face preservation                      |
| Video | `grok_text_to_video` | 100–400 | Cheap text-to-video                         |
| Video | `grok_image_to_video` | 100–400 | Cheap image-to-video                       |
| Video | `seedance_1_5_pro` | 140–1800  | **Default** — solid quality, optional audio |
| Video | `kling_2_6`        | 550–2200  | Image-to-video with audio                   |
| Video | `veo_3`            | 600       | Premium text-to-video (8 s)                 |
| Video | `seedance_2_fast`  | 620–3960  | SeeDance 2 fast                             |
| Video | `seedance_2`       | 760–12240 | SeeDance 2 — highest quality                |

## Tools

| Tool             | Purpose                                                                 |
|------------------|-------------------------------------------------------------------------|
| `list_models`    | Returns all models cheap-first with per-call cost                       |
| `generate_image` | Starts an image job; accepts `prompt`, `model`, `resolution`, `aspect_ratio`, `reference_image_url` |
| `generate_video` | Starts a video job; accepts `prompt`, `model`, `duration`, `resolution`, `aspect_ratio`, `with_audio`, `image_url` |
| `check_job`      | Polls a job; returns inline image content for small assets, plus a Firebase Storage URL |

Async model: `generate_*` returns a `job_id` immediately. Call `check_job` until `status` is `done`. Image results are returned inline (base64) when the asset fits the API limit (~3.5 MB raw); larger images and all videos return a full-size URL.

## Authentication

OAuth 2.1 with:

- PKCE (RFC 7636)
- Dynamic Client Registration (RFC 7591)
- Refresh tokens

No pre-shared API keys. Standard OAuth flow handled by the MCP client.

## Adding the connector

### Claude Code

```
claude mcp add dora https://doravideo.com/mcp
```

You'll be prompted to authorize via browser the first time.

### claude.ai (custom connector)

Settings → Connectors → Add custom connector → URL `https://doravideo.com/mcp` → authorize when prompted.

## Pricing

Generations are paid in coins. Free tier gets a small starter balance; subscriptions add monthly coin packs. See [doravideo.com/pricing](https://doravideo.com/pricing).

## Safety

Prompts are filtered for CSAM patterns at the API gateway before any model call. Generated assets are stored on Firebase Storage in the user's account scope.

## Status

Live in production since May 2026. Same backend serves the Dora iOS app (paid product on the App Store) and the [doravideo.com](https://doravideo.com) web app.

## Contact

- Email: sagalabs@proton.me
- Issues: open an issue on this repo

## License

MIT — see [LICENSE](LICENSE).
