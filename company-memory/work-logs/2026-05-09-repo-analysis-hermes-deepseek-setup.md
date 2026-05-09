# repo-analysis-hermes-deepseek-setup

Date: 2026-05-09

## Goal

- Analyze the full repo before deeper company-building work.
- Establish durable AI continuity memory for long-running conversations.
- Set up Hermes Agent with DeepSeek V4 Pro locally.
- Keep credentials out of git while documenting how future agents should find the setup.

## Context Read

- AGENTS.md
- agent.md
- company-memory/README.md
- company-memory/session-log.md
- README.md
- handoff.md
- marketing-ops/README.md
- marketing-ops/session-log.md
- .github/workflows/deploy.yml
- /Users/sanskargupta/Downloads/Hermes X DeepSeek v4 (1).pdf

## Work Done

- Reviewed repo file structure and deployment workflow.
- Confirmed existing memory files: `AGENTS.md`, `agent.md`, `handoff.md`, and `marketing-ops/`.
- Added `company-memory/` for broad company continuity.
- Added secret policy and secret reference inventory.
- Added Hermes DeepSeek setup notes.
- Added `scripts/record-ai-session.sh` for future work-log templates.
- Updated `.gitignore` to keep `.pem`, key files, and local private memory files out of git.
- Updated Hermes local config to use DeepSeek V4 Pro.
- Verified Hermes doctor and a one-shot repo identification test.

## Decisions

- `company-memory/` is the repo-wide memory layer.
- `marketing-ops/` remains the marketing-specific memory layer.
- Secrets are referenced in repo docs but stored outside git.
- Hermes config and sessions remain in `~/.hermes/`.

## Follow-Ups

- Rotate the DeepSeek API key from the DeepSeek platform when convenient because it was pasted into chat.
- Decide whether to add a real password manager or cloud secret manager as the company grows.
- Review existing untracked/generated files before any future commit.
- Consider cleaning or formally organizing old Techventive/Tagmentip/reference assets in a separate branch.

## Secret Handling

- No plaintext secrets stored in git.
