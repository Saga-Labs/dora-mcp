---
name: welcome
description: Short tour of Dora for someone who has just connected it, greets, or asks what Dora can do, how to start or what to post. Explains what Dora makes and costs, asks three questions about their social media and proposes three video ideas. Not for someone who already said what to make.
---

# Welcome to Dora

Use this when the user has not said what to make: they have just installed the plugin or connected Dora, they say hello, or they ask what Dora can do, how to start, or what to post. If they already said what to make, skip this and use `get-started`.

## 1. A tour of six lines at most

Call `get_balance` and `list_models` first, then say in the user's language:

- Dora makes short vertical videos from a description, ready for TikTok, Reels and Shorts.
- It can bring a photo to life: they attach it in the chat.
- It makes images too.
- It keeps the same person across several videos when given reference photos.
- It can copy the moves of a dance or clip onto a person in a photo.
- What the default video and the default image cost in coins (from `list_models`, never from memory) and how many coins they have now.

No model names, no settings, no table.

## 2. Three questions, one at a time

1. Where do you post? (TikTok, Instagram, YouTube Shorts or elsewhere)
2. What is your account about?
3. Do you appear in your videos? If yes, ask them to attach a photo of themselves.

Wait for each answer before the next question. Do not ask them again later in the conversation.

## 3. Three ideas, then make one

Propose three concrete video ideas for that account and that platform: one line each, with what it shows and its cost in coins. Generate the one they pick with the tool defaults, as `get-started` describes, and wait for it to finish.

## 4. Keep them going

When a video is done, send its link and offer one next idea that fits their account: a follow-up, the same idea with their own photo, or a series with the same character (the `storyboard` skill). One idea, not a list.
