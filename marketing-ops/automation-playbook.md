# InfraBuild Partners Automation Playbook

## Core principle
Use platform-native workflows first. Add AI generation and third-party orchestration only where they reduce repetitive work without breaking platform policy.

## Operating model
- Source of truth:
  - strategy and prompts live in `marketing-ops/`
  - service claims and pricing live in `InfraBuild-Partners/data/services.json`
- AI generation:
  - use AI for post drafts, hooks, reel scripts, carousel copy, captions, DM replies, job descriptions, and candidate-screening prompts
- Human approval:
  - founder approval stays required for final publishing, pricing claims, refund claims, and hiring announcements

## Channel model
- LinkedIn:
  - founder-led authority, case studies, hiring updates, trust-building
- Instagram:
  - reels, carousels, service explainers, behind-the-scenes educational content, DM funnels
- WhatsApp:
  - one-way broadcast via channel for jobs, updates, and launches
  - direct lead or candidate conversation through WhatsApp Business or the WhatsApp Business Platform

## Official platform reality
- WhatsApp:
  - use **WhatsApp Channels** for one-way broadcast communication
  - use **WhatsApp Business** for manual direct conversations
  - use the **WhatsApp Business Platform / Cloud API** only when you are ready for webhook-based automation and approved templates
- Instagram:
  - native replies and inbox handling should stay inside Meta tools first
  - if you automate comments-to-DM flows, stay on official Instagram Messaging / Messenger Platform capabilities
- LinkedIn:
  - organization posting can be automated through LinkedIn's Posts API only when the account has the right organization authorization and social permissions
  - company profile edits and high-trust brand changes should still be reviewed manually by an admin

## Recommended stack by maturity
- Stage 1: safest launch
  - LinkedIn manual publishing with AI-written drafts
  - Instagram manual posting with AI-written captions and scripts
  - WhatsApp Channel for hiring and company updates
  - WhatsApp Business app for direct candidate and client chat
- Stage 2: low-code growth layer
  - Manychat for Instagram DM automation and comment-to-DM flows
  - Make or Zapier for moving approved content from docs/sheets into scheduling or CRM systems
  - WATI or a direct WhatsApp Business Platform setup for structured auto-replies and lead routing
- Stage 3: custom AI system
  - a small Node or Python backend
  - OpenAI for content generation, lead triage, candidate screening, and response drafting
  - webhooks from Instagram or WhatsApp flows into a CRM or Airtable / Notion / Supabase store

## Best workflows to build first
- Content repurposing engine:
  - one case study becomes a LinkedIn post, a LinkedIn carousel, an Instagram reel script, an Instagram carousel, and a WhatsApp channel update
- Hiring intake flow:
  - Instagram DM keyword or reel comment
  - automated reply with qualification questions
  - redirect to WhatsApp Channel and direct WhatsApp chat
- Client lead flow:
  - service explainer post or reel
  - CTA to DM `SERVICE`
  - auto-send discovery questions
  - route serious leads to WhatsApp or email consultation

## Weekly content rhythm
- Monday:
  - authority post on LinkedIn
- Wednesday:
  - Instagram reel or carousel around one service
- Friday:
  - hiring or opportunity update on LinkedIn and WhatsApp Channel
- Saturday:
  - proof post using a client outcome, workflow breakdown, or engineering tip

## InfraBuild-specific automation ideas
- Founder authority series:
  - short posts on deployment mistakes, SRE lessons, cloud cost wins, interview prep, and hiring advice
- Bootcamp acquisition engine:
  - reel about what learners build
  - DM keyword for syllabus or brochure
  - WhatsApp follow-up for consult booking
- Hiring distribution system:
  - publish requirements to WhatsApp Channel
  - mirror them on LinkedIn
  - push qualified responders into direct chat, not public groups
- Client proof system:
  - turn each finished project into a 30-second reel, one LinkedIn case study, and one visual carousel

## Guardrails
- Do not auto-add people to WhatsApp groups
- Do not scrape candidates or leads from platforms in ways that violate platform rules
- Do not let AI publish pricing, guarantees, or hiring claims without approval
- Do not promise fully autonomous hiring or placement decisions

## Notes on current tools
- Manychat:
  - useful for Instagram comment replies, DMs, and follow-up flows
  - some features are Meta-gated or beta-limited, so availability can vary by account
- WATI:
  - useful when you want a faster WhatsApp Business Platform inbox and automation layer without building the API stack yourself
- Make / Zapier:
  - useful as the orchestration glue between approved content, spreadsheets, CRMs, and notifications

## Rule for future sessions
- When a tool, workflow, or approval step changes, update this file and `session-log.md`
