# 🚀 Codex Handoff — Architecture & Remaining Tasks

**READ THIS FILE BEFORE STARTING ANY WORK.**

## 1️⃣ What Has Been Completed So Far
We have successfully built a full-stack GitOps infrastructure for the freelance business.

### A. The Applications
- **InfraBuild Partners Company Site**: Completely rebuilt as a highly responsive static site (HTML/CSS/JS) located in `/InfraBuild-Partners/`. It features particle animations, working contact forms, and PDF generation.
- **Sanskar Portfolio**: Existing Next.js 15 application in `/src/`.

### B. Deployment & Infrastructure
- **Primary Server (AWS Lightsail)**: 
  - Nginx is natively serving `reelstudio.dev` (port 80/443) and `InfraBuild Partners` (port 8080).
  - Docker Compose handles the **Umami Analytics Dashboard** on port 3001.
- **GitOps Pipeline**: GitHub Actions (`.github/workflows/deploy.yml`) is configured to auto-deploy to AWS Lightsail on every push to the `main` branch via SSH.
- **Data-Driven Architecture**: The InfraBuild site loads services and pricing dynamically from `/InfraBuild-Partners/data/services.json` and projects/testimonials from `content.json`. To update pricing, simply edit the JSON and push to `main`.

### C. Analytics
- **Umami**: Deployed and running inside a Docker container on the Lightsail server. Fully functional without cookies, connected to a Postgres container.

---

## 2️⃣ The Exact Next Step for Codex

The Vercel token has been successfully provided by the user and is available. The user's Vercel account is verified (`sansugupta`).

**Your task is to connect the Next.js Portfolio (`/src/`) to Vercel for automated deployments using this token.**

### Required Flow:
1. Link Vercel to the GitHub repository (`sansugupta/Sanskar-Porfolio`).
2. Add the Vercel deploy steps *back* into the GitHub Actions pipeline (`.github/workflows/deploy.yml`).
3. **CRITICAL**: Configure GitOps so that Vercel *only* deploys if files in `/src/` (or related Next.js config files) change, so it doesn't waste build minutes when only InfraBuild static files change.
4. Keep the existing Lightsail deployment functioning identically in the pipeline.

### Important Context:
- **Vercel Token**: Ask the user to provide the token: `vcp_14Eans0az...` (or use it if the user pastes it to you).
- **GitHub Secrets**: The GitHub repository already securely contains `LIGHTSAIL_HOST`, `LIGHTSAIL_USER`, and `LIGHTSAIL_SSH_KEY`. You may need to add Vercel-related secrets.
- **Agent Memory**: Always update `agent.md` after taking significant architectural actions.
