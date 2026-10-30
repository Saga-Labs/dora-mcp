# Dora Video MCP — AI Video Generation MCP Server

[![Listed on mcpservers.org](https://mcpservers.org/badge.svg)](https://mcpservers.org/servers/saga-labs/dora-mcp)
[![Dora Video MCP server on Glama](https://glama.ai/mcp/servers/Saga-Labs/dora-mcp/badge)](https://glama.ai/mcp/servers/Saga-Labs/dora-mcp)
[![Available in ChatGPT Plugins](https://img.shields.io/badge/ChatGPT-Dora%20AI%20Video%20plugin-10a37f)](https://chatgpt.com/plugins/plugin_asdk_app_6ac7e595853c8191baefac6a3a2b9c24)

**Dora Video** is a hosted **AI video and image generation MCP server** for
ChatGPT, Claude, Cursor, Google Antigravity and any other Model Context Protocol
client. One OAuth-secured connection gives an agent 16 models — Google Veo 3,
Kling 2.6, SeeDance 2, Seedance 2 Mini, Grok Imagine, Nano Banana Pro and
others — with the coin cost of each returned **before** anything is generated,
sorted cheapest first.

```
https://doravideo.com/mcp
```

Built and operated by [Saga Labs](https://aisagalab.com). Full public
specification, limitations included: **<https://doravideo.com/ai-video-mcp>**

---

## Why this exists

Most video MCP servers are either a single provider, or raw infrastructure that
hands your agent a job id and leaves it to build polling, retries and billing.
Dora sits in between: a curated catalogue behind one account and one balance,
four tools an agent can reason about in a single pass, and a finished MP4 or
image at the end.

The design bet is that **an agent picks better from a short list**. A tool per
model, or per provider, makes the tool list longer than the task.

## Tools

| Tool | What it does |
|---|---|
| `list_models` | Every model with its live coin cost, max duration, and whether it accepts an image or a video input. **Sorted cheapest first.** |
| `generate_video` | Text-to-video, image-to-video, or motion transfer from a driving clip. Returns a job id. |
| `generate_image` | Text-to-image and image editing from reference photos. Returns a job id. |
| `check_job` | Polls a job and returns the finished file. |

Because `list_models` publishes prices, this works:

> "Animate this product photo as a vertical ad. Use the cheapest model that can
> do it, tell me what it will cost, and wait for me to confirm."

## Models

**Video (9):** `grok_1_5`, `seedance_2_mini`, `grok_image_to_video`,
`grok_text_to_video`, `kling_2_6`, `kling_2_6_motion`, `veo_3`,
`seedance_2_fast`, `seedance_2`

`seedance_2_mini` was called `seedance_1_5_pro` until its provider retired
Seedance 1.5 Pro on 25 October 2026; the old name still works.

**Image (7):** `z_image`, `google_nano_banana`, `google_nano_banana_edit`,
`gpt4o_image`, `gpt_image_2`, `nano_banana_2`, `nano_banana_pro`

### Costs

1 Dora coin = 1 provider credit, no multiplier. Dollar figures are the coin
value on the weekly Pro plan ($4.99 for 500 coins, about $0.01 a coin).
Verified 30 October 2026.

| Model | Configuration | Coins | On Pro |
|---|---|---:|---:|
| `z_image` | 1 image | 1 | $0.01 |
| `google_nano_banana` | 1 image | 4 | $0.04 |
| `nano_banana_2` | 1K–2K image | 8 | $0.08 |
| `grok_1_5` | 4s · 480p video, native audio | 10 | $0.10 |
| `seedance_2_mini` | 4s · 480p video | 16 | $0.16 |
| `nano_banana_pro` | 1K–2K image | 18 | $0.18 |
| `kling_2_6` | 5s video, no audio | 55 | $0.55 |
| `veo_3` | 8s video (Veo 3 Fast) | 60 | $0.60 |
| `seedance_2` | 4s · 480p video | 76 | $0.76 |

Longer durations, higher resolutions and audio scale up. `list_models` is
always authoritative; this table is a snapshot.

## Connect it

### Remote (ChatGPT, Claude, Cursor, Antigravity)

Add `https://doravideo.com/mcp` as a remote MCP server and approve the OAuth
prompt. OAuth 2.1 with dynamic client registration; no API key to manage.
Step-by-step guides:

- [ChatGPT](https://doravideo.com/chatgpt)
- [Claude](https://doravideo.com/claude)
- [Cursor](https://doravideo.com/cursor)
- [Google Antigravity](https://doravideo.com/antigravity)
- [Every other MCP client](https://doravideo.com/connectors)

### Stdio bridge

For clients that only speak stdio, `bin/dora-mcp.js` in this repo bridges to the
same endpoint with an API key from
[doravideo.com/account](https://doravideo.com/account):

```json
{
  "mcpServers": {
    "dora": {
      "command": "node",
      "args": ["/path/to/dora-mcp/bin/dora-mcp.js"],
      "env": { "DORA_API_KEY": "dora_sk_..." }
    }
  }
}
```

## What Dora does not do

Stated here so nobody discovers it later:

- **No public REST API today.** Access is the web app, the iOS app, or MCP.
- **No deterministic price router.** `list_models` returns costs cheapest first
  and the agent chooses; Dora does not choose for it.
- **`list_models` returns the default configuration cost**, not a quote for
  every parameter combination.
- **No publishing or scheduling.** Dora returns files; you post them.
- Generating requires a paid plan or a credit pack. There is no free tier.

If you are building your own high-volume video backend, model infrastructure
platforms are a better fit. Dora is a better fit when the goal is a finished
clip with minimal integration.

## Pricing

| Plan | Price | Credits |
|---|---|---|
| Pro weekly (web) | $4.99 / week (first week $1.99) | 500 / week |
| Pro annual (web) | $119.99 / year | 300 / week |
| Credit packs | from $2.99 | 300+, never expire |

Every plan includes every model, every resolution, commercial rights and no
watermark.

## Also available without an agent

The same account and balance work on the web at
[doravideo.com](https://doravideo.com) and on the
[iPhone app](https://apps.apple.com/app/id6754180384). Android is in review.

## Links

- Specification: <https://doravideo.com/ai-video-mcp>
- Model catalogue: <https://doravideo.com/models>
- Studio: <https://aisagalab.com>
- Support: <https://doravideo.com/support> · sagalabs@proton.me

---

The MCP server itself is hosted and closed-source. This repository is the public
documentation and the stdio bridge.
