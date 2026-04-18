# 🧠 Agent Context — InfraBuild Partners & Sanskar Portfolio

> **Last Updated:** 2026-04-18T16:18:00+05:30
> **Session Count:** 5
> **Owner:** Sanskar Gupta
> **Company:** InfraBuild Partners
> **GitHub:** github.com/sansugupta/Sanskar-Porfolio

---

## 📌 Repository Overview

This monorepo contains:

| Component | Path | Tech Stack | Status |
|-----------|------|------------|--------|
| Sanskar Portfolio | `/src/` | Next.js 15, React 19, Tailwind, Framer Motion | ✅ Live |
| InfraBuild Partners | `/InfraBuild-Partners/` | Static HTML/CSS/JS | ✅ Rebuilt |
| Deployments | `/deployments/` | Docker, Helm, GitHub Actions | ✅ Ready |
| Marketing Ops | `/marketing-ops/` | Strategy memory, templates, automation notes | ✅ Created |

---

## 🏢 InfraBuild Partners — Company Profile

**Mission:** Elite engineering & career solutions company providing DevOps, SRE, Development, Data Engineering, and Career Support services.

### Services & Pricing

| Service | Price | Type |
|---------|-------|------|
| Development Support | $599/month | Engineering |
| DevOps Support | $499/month | Engineering |
| Bootcamp Service | $499/month | Engineering |
| SRE Support | $549/month | Engineering |
| Data Engineering | $399/month | Engineering |
| Data Analyst | $349/month | Engineering |
| Interview Support | $149/each | Engineering |
| Job Applying Support | $249/month | Career |
| Resume & LinkedIn | $149/month | Career |
| Full Job Search Mgmt | $349/month | Career |
| End-to-End Placement | $1,899 one-time | Career |

### Key Clients & Testimonials
- **Paisley** — DevOps Infrastructure Optimization
- **Ravi Raj Jha** — Site Reliability Engineering
- **Oluwakush** — Cloud Infrastructure & Monitoring
- **Sean** — DevOps Automation & Security
- **Prem** — Traefik Setup & Application Deployment
- **Rohit Sahu** — React & Node.js Web App
- **Amit** — ML Analytics & Forecasting
- **Priya** — DevSecOps Security Pipeline
- **Vikram** — Node.js Microservices Platform
- **Dr. Kumar** — Python Data Analysis Suite

### Key Projects Portfolio
1. Enterprise Java Microservices Stack (K8s, Terraform, DR)
2. Enterprise AWS Bedrock Agent Terraform Module
3. AI-Powered Observability Automation System
4. Three-Tier Web Application on AWS EKS
5. React Task Management Dashboard
6. Cloud-Native Full-Stack Board Game
7. Node.js API Security Gateway
8. ML Customer Churn Prediction
9. React E-Commerce Platform
10. DevSecOps Pipeline Automation
11. Ad Bidding System with Traefik on AWS EKS
12. Python Data Analysis Toolkit
13. Node.js Microservices Architecture
14. Java Application Monitoring Stack Deployment

---

## 📝 Conversation Log

### Session 1 — 2026-04-17 (Initial Setup)
**Topics Covered:**
- Repo analysis and understanding
- InfraBuild Partners static website rebuild
- agent.md created

### Session 2 — 2026-04-17 (Deployments & Analytics)
**Topics Covered:**
- Extracted pricing/services into `data/services.json` and `data/content.json` for GitOps-style data loading.
- Deployed InfraBuild Partners statically on AWS Lightsail Nginx (port 8080).
- Deployed Umami Analytics dynamically in Docker on AWS Lightsail (port 3001).
- Set up automated GitHub Actions deploy script (`.github/workflows/deploy.yml` -> `~/scripts/deploy.sh` on Lightsail).
- Updated website contact addresses.

**Key Decisions:**
- Lightsail serves as the primary host for InfraBuild and Umami.
- Vercel will be used exclusively for the Next.js Sanskar Portfolio.
- Data-Driven UI: You don't need to touch HTML to change pricing. Edit `.json` files, push, and GitHub Actions automatically SSH deploys it.

### Session 3 — 2026-04-17 (Vercel Portfolio Integration)
**Topics Covered:**
- Connected GitHub repository to Vercel using provided token.
- Created Vercel project `sanskar-portfolio` in `sansuguptas-projects` scope.
- Updated `.github/workflows/deploy.yml` with conditional deployments:
  - Lightsail deployment runs only when `/src/` files are NOT modified.
  - Vercel deployment runs only when `/src/` files are modified or added.
- Configured `vercel.json` with build command `cd src && npm run build` for Next.js app in `/src/` directory.
- Added `VERCEL_TOKEN` requirement to GitHub repository secrets.

**Key Decisions:**
- Portfolio deployments are now automated via GitHub Actions to Vercel.
- Build optimization: Only deploy to Vercel when portfolio code changes, saving build minutes.
- Maintained existing Lightsail deployment for InfraBuild Partners static site.

### Session 4 — 2026-04-18 (InfraBuild Offer System + Marketing Ops Memory)
**Topics Covered:**
- Added a JSON-driven service detail system for InfraBuild Partners with clickable overview tiles.
- Introduced the Bootcamp Service offer and refreshed the pricing model across engineering and career services.
- Added repo-level AI memory in `AGENTS.md` plus a dedicated `marketing-ops/` workspace for strategy continuity.
- Fixed the public brochure download on the portfolio preview branch and stabilized the preview flow on `upgradation`.
- Updated Lightsail Nginx so `infrabuildpartners.com` serves the InfraBuild site independently from Reel Studio.

**Key Decisions:**
- `InfraBuild-Partners/data/services.json` is now the primary source of truth for service copy, pricing, and overview content.
- `marketing-ops/` is the persistent place for InfraBuild marketing strategy, platform plans, and session notes.
- Future AI sessions should prefer `AGENTS.md` first, then `marketing-ops/`, before making marketing or pricing changes.

### Session 5 — 2026-04-18 (Marketing Intelligence + Automation Blueprint)
**Topics Covered:**
- Renamed the loose marketing workspace into `marketing-ops/` and preserved reusable post templates there.
- Expanded the marketing operating docs for LinkedIn, Instagram, and WhatsApp with practical automation guardrails.
- Drafted a fuller LinkedIn company profile baseline in `marketing-ops/linkedin-company-profile.md`.
- Interpreted the requested `pipeline support` price as the application-pipeline offer and updated Job Applying Support to `$249/month`.

**Key Decisions:**
- Future marketing sessions should treat `marketing-ops/automation-playbook.md` as the approval-aware automation baseline.
- WhatsApp growth should use `Channel + direct business chat`, not open member-visible groups.
- Service pricing remains Git-editable, with InfraBuild website updates flowing from `InfraBuild-Partners/data/services.json`.

---

## 🔮 Future Plans / Next Steps
- **Add VERCEL_TOKEN to GitHub Secrets**: User needs to add the Vercel token to repository secrets for automated deployments.
- **Test Vercel Deployment**: Push changes to `/src/` to trigger Vercel deployment and verify the portfolio is live.
- **Domain Mapping**: Point portfolio domain to Vercel deployment when ready.
- **Marketing Automation Buildout**: Finalize the first publish/respond flows for LinkedIn, Instagram, and WhatsApp.
- **LinkedIn Company Page**: Use the drafted profile copy in `marketing-ops/linkedin-company-profile.md` as the baseline.

---

## 🤖 AI Adaptation Notes

When any AI session opens this repo, it should:
1. **Read this file first** — It contains the complete project context
2. **Check `/marketing-ops/` folder** — For latest strategy memory, templates, and assets
3. **Check `/deployments/` folder** — For current deployment status
4. **Check conversation log above** — For recent decisions and changes
5. **Update this file** — After making any significant changes

This ensures continuity across AI tools (Cursor, Claude, Gemini, ChatGPT, etc.)
