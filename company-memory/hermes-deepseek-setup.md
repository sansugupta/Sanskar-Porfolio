# Hermes + DeepSeek Setup

Last configured: 2026-05-09

## Local Install

Hermes is installed outside this repo:

- Code: `~/.hermes/hermes-agent`
- Config: `~/.hermes/config.yaml`
- Secrets: `~/.hermes/.env`
- Sessions/logs/data: `~/.hermes/sessions/`, `~/.hermes/logs/`, `~/.hermes/cron/`
- Command: `~/.local/bin/hermes`

Hermes version verified:

```bash
hermes version
```

Observed version on setup day: `v0.13.0 (2026.5.7)`.

## DeepSeek Configuration

Configured values:

```yaml
model:
  default: deepseek-v4-pro
  provider: deepseek
  base_url: https://api.deepseek.com
```

The actual API key is stored only in:

```bash
~/.hermes/.env
```

Expected variable name:

```bash
DEEPSEEK_API_KEY=sk-...
```

## Verification Performed

```bash
hermes doctor
```

Result:

- DeepSeek API connectivity passed.
- Playwright Chromium is installed for Hermes browser tooling.
- Hermes built-in memory is active.
- Some optional providers are intentionally not configured.

One-shot repo test:

```bash
hermes -z "You are in this repo. In one short sentence, identify the repo purpose from visible files, and do not modify anything." --provider deepseek --model deepseek-v4-pro
```

Hermes correctly identified the repo as Sanskar's portfolio plus the InfraBuild Partners company site and marketing operations materials.

## Useful Commands

```bash
hermes
hermes --tui
hermes --continue
hermes model
hermes doctor
hermes update
hermes config show
hermes sessions list
```

## Source Notes

- Local PDF reviewed: `/Users/sanskargupta/Downloads/Hermes X DeepSeek v4 (1).pdf`
- Official DeepSeek Hermes integration checked on 2026-05-09: `https://api-docs.deepseek.com/quick_start/agent_integrations/hermes`
- Official DeepSeek API base URL: `https://api.deepseek.com`
