# Company Memory

This folder is the long-term operating memory for building InfraBuild Partners and Sanskar Gupta's portfolio ecosystem.

## Read Order For Any AI

1. `AGENTS.md` for repo rules and product boundaries.
2. `agent.md` for the high-level handoff and historical project context.
3. `company-memory/session-log.md` for the latest company-building work.
4. `company-memory/repo-analysis.md` for the current repo map.
5. `marketing-ops/` before any marketing, campaign, positioning, or content work.

## What Belongs Here

- Company-wide plans, technical architecture notes, setup decisions, and operating memory.
- Tool setup notes for agents such as Hermes, Codex, Claude Code, or future AI assistants.
- Secret inventory by reference only: what exists, where it is stored, and how to rotate it.
- Session logs after meaningful work.

## What Does Not Belong Here

- Plaintext passwords, API keys, SSH private keys, cookies, recovery codes, or billing data.
- Customer private data unless explicitly approved and redacted.
- Large generated artifacts that can be recreated.

## Logging Rule

After meaningful work, update `company-memory/session-log.md` and, if architecture or ownership changed, update `agent.md`.

For a new session template, run:

```bash
scripts/record-ai-session.sh "short-session-title"
```
