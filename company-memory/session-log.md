# Company Session Log

## 2026-05-09 — Full Platform Build (Session 7)

### Completed
- Deployed Management Console at https://infrabuildpartners.com/console (FastAPI + static UI)
- Built 3 agents: Lead Finder, Job Applier, Content Creator
- Deployed n8n automation platform at https://infrabuildpartners.com/n8n/ (Docker)
- Set up Cloudflare Email Routing: info@, sanskar@, careers@ → sanskargupta966@gmail.com
- Configured Gemini Flash for Hermes vision support
- Logged into Instagram @infrabuildpartners (needs Business conversion)
- Wrote comprehensive AI handoff: company-memory/ai-handoff.md

### In Progress
- Meta App creation for Instagram Graph API (Facebook login rate-limited — retry after 15min)
- Instagram Business account conversion

### Next Session
1. Create Meta App at developers.facebook.com using the account owner credentials from the password manager/local secure store
2. Get App ID + App Secret
3. Generate Instagram access token → wire into n8n auto-posting
4. Google Places API for live lead scraping

## 2026-05-09 - Devodus Client Workspace Setup

- Captured the business model: InfraBuild Partners is the delivery engine, Techventive LLC is an existing collaborator/client channel, and Devodus is a new collaborator/client channel.
- Created `clients/devodus/` as an isolated workspace for Devodus website, pamphlet, service, hosting, and handoff work.
- Reviewed the public Devodus WordPress site and captured its current service catalog and pricing baseline.
- Documented that Devodus services must be preserved while adding InfraBuild/Techventive-style technical, job-support, bootcamp, and career services.
- Added Namecheap hosting notes and an access inventory with credential references only.
- Reconfirmed that plaintext credentials must not be committed; any pasted credentials should be rotated after setup.
- Started the first static Devodus rebuild in `clients/devodus/site/`, with services rendered from `site/data/services.json`.

## Ongoing Rules

- Use `company-memory/` for broad company setup, technical operations, AI agent setup, and long-term continuity.
- Use `marketing-ops/` for InfraBuild positioning, content strategy, channel plans, and marketing automation decisions.
- Update `agent.md` after major architecture or operational changes.
- Never commit plaintext secrets. Use local env files, GitHub/Vercel/AWS secret stores, or a proper password manager.
