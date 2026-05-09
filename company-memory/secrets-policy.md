# Secrets Policy

This repo can store secret references, setup instructions, and rotation notes. It must not store secret values.

## Allowed In Git

- Names of secrets, such as `DEEPSEEK_API_KEY` or `VERCEL_TOKEN`.
- Where the secret is stored, such as `~/.hermes/.env`, GitHub Actions secrets, Vercel project env vars, AWS Secrets Manager, or a password manager.
- Rotation steps and ownership notes.
- Redacted examples, such as `sk-...abcd`.
- `.env.example` files with placeholder values only.

## Not Allowed In Git

- Plaintext API keys.
- Passwords.
- SSH private keys or `.pem` files.
- Recovery codes, cookies, session tokens, OAuth refresh tokens, or billing credentials.
- Screenshots containing secrets.

## Current Secret References

| Secret | Purpose | Storage Location | Notes |
| --- | --- | --- | --- |
| `DEEPSEEK_API_KEY` | Hermes DeepSeek provider access | `~/.hermes/.env` on Sanskar's Mac | Configured 2026-05-09; rotate from DeepSeek dashboard if exposed elsewhere |
| `VERCEL_TOKEN` | Portfolio deployment | GitHub repository secret / Vercel CLI auth | Referenced by `.github/workflows/deploy.yml` |
| `LIGHTSAIL_HOST` | InfraBuild deployment target | GitHub repository secret | Used by SSH deploy action |
| `LIGHTSAIL_USER` | InfraBuild SSH user | GitHub repository secret | Used by SSH deploy action |
| `LIGHTSAIL_SSH_KEY` | InfraBuild SSH private key | GitHub repository secret | Never commit private key files |

## Local Files To Keep Out Of Git

- `.env`
- `.env.local`
- `.env.production`
- `.env*.local`
- `.vercel/`
- `*.pem`
- `*.key`
- `company-memory/secrets.local.md`

## Recommended Workflow

1. Put real values in local env files, GitHub/Vercel/AWS secret stores, or a password manager.
2. Put only the reference and usage note in this folder.
3. After sharing a key in chat, rotate it from the provider dashboard.
4. Run `git status --short` before committing and check for accidental secret files.
