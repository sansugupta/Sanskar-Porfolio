# Repo Analysis

Last reviewed: 2026-05-09

## High-Level Shape

This repo currently operates as a multi-product company workspace.

| Area | Path | Purpose |
| --- | --- | --- |
| Portfolio | `src/` | Sanskar Gupta personal portfolio, Next.js app, Vercel target |
| InfraBuild site | `InfraBuild-Partners/` | Static company website for InfraBuild Partners |
| InfraBuild data | `InfraBuild-Partners/data/` | JSON source of truth for services, pricing, case studies, testimonials |
| Deployment assets | `deployments/` | Docker, Helm, Lightsail, and app deployment definitions |
| GitHub Actions | `.github/workflows/deploy.yml` | Main branch production deployment automation |
| Marketing memory | `marketing-ops/` | Positioning, campaign planning, platform strategy, reusable content |
| Company memory | `company-memory/` | Cross-company technical and AI continuity memory |
| Scripts | `scripts/` | Automation and generated business collateral helpers |

## Current Deployment Model

- `main` is production.
- `upgradation` is the active preview-safe branch.
- `.github/workflows/deploy.yml` deploys only on pushes to `main`.
- Path filtering separates portfolio and InfraBuild deployments:
  - `src/**`, public assets, and Next.js config trigger Vercel portfolio deployment.
  - `InfraBuild-Partners/**`, deployment files, scripts, and workflow changes trigger Lightsail deployment.

## Source Of Truth Rules

- InfraBuild service pricing and service details belong in `InfraBuild-Partners/data/services.json`.
- InfraBuild case studies and testimonials belong in `InfraBuild-Partners/data/content.json`.
- Marketing strategy belongs in `marketing-ops/`.
- Company-building memory, agent setup, and repo-wide operations belong in `company-memory/`.

## Current Worktree Notes

As of this review, the working tree already had user/session changes before the company-memory setup:

- Modified: `InfraBuild-Partners/app.js`
- Modified: `InfraBuild-Partners/styles.css`
- Modified: `marketing-ops/session-log.md`
- Deleted/untracked Techventive/Tagmentip/reference assets and generated course/export files
- Untracked local secret-like file: `Reel-Studio.pem`

Future agents should not revert these unless Sanskar explicitly asks.

## Risk Notes

- Do not store plaintext secrets in git, even if the repo is private.
- `.env.local`, `.vercel/`, and `*.pem` style files must remain local-only.
- The user shared a DeepSeek API key during setup. Treat it as compromised for public-chat hygiene and rotate it when convenient.
