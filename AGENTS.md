# Repo Operating Memory

## Product Split
- `src/` is Sanskar Gupta's portfolio and deploys to Vercel.
- `InfraBuild-Partners/` is the company website and deploys through the infra workflow / Lightsail server stack.
- Keep portfolio and InfraBuild changes logically separate unless the user explicitly wants both touched.

## Branching + Deploys
- `main` is the protected production branch.
- Use `upgradation` or another feature branch for preview-safe changes unless the user says otherwise.
- Merging to `main` triggers the GitHub Actions deployment workflow in `.github/workflows/deploy.yml`.

## InfraBuild Service Source Of Truth
- All InfraBuild service pricing, offer copy, and detail modal content must live in `InfraBuild-Partners/data/services.json`.
- Do not hardcode service prices in `index.html` or `app.js` unless you are updating static fallback markup to mirror the JSON.
- If the user wants a new service, a price change, or richer service detail, update `data/services.json` first and then ensure the renderer consumes it.

## InfraBuild Content Source Of Truth
- Case studies and testimonials live in `InfraBuild-Partners/data/content.json`.
- Prefer JSON-first edits so non-developers can maintain the site from Git without touching the JavaScript.

## Marketing Ops Memory
- The professional marketing workspace lives in `marketing-ops/`.
- Before doing InfraBuild marketing work, read:
  - `marketing-ops/README.md`
  - `marketing-ops/brand-memory.md`
  - `marketing-ops/session-log.md`
- When a marketing strategy, automation decision, campaign idea, or platform positioning changes, persist it in `marketing-ops/` so future AI sessions inherit context instead of starting from zero.

## Marketing Expectations
- InfraBuild Partners is being positioned as both a services company and a training / career-support brand.
- Ongoing priorities include LinkedIn content, Instagram content, WhatsApp channel strategy, and AI-assisted content operations.
- When recommending automations or platform tooling, prefer official platform capabilities first, then clearly label third-party recommendations as optional.
