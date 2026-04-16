# 🧠 Agent Context — InfraBuild Partners & Sanskar Portfolio

> **Last Updated:** 2026-04-17T04:30:00+05:30
> **Session Count:** 2
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
| Marketing | `/marketing/` | HTML templates, PDF | ✅ Created |

---

## 🏢 InfraBuild Partners — Company Profile

**Mission:** Elite engineering & career solutions company providing DevOps, SRE, Development, Data Engineering, and Career Support services.

### Services & Pricing

| Service | Price | Type |
|---------|-------|------|
| Development Support | $599/month | Engineering |
| DevOps Support | $549/month | Engineering |
| SRE Support | $699/month | Engineering |
| Data Engineering | $799/month | Engineering |
| Data Analyst | $399/month | Engineering |
| Interview Support | $249/each | Career |
| Job Applying Support | $399/month | Career |
| Resume & LinkedIn | $149/month | Career |
| Full Job Search Mgmt | $1,499/month | Career |
| End-to-End Placement | $2,499 one-time | Career |

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

---

## 🔮 Future Plans / Next Steps
- **Add VERCEL_TOKEN to GitHub Secrets**: User needs to add the Vercel token to repository secrets for automated deployments.
- **Test Vercel Deployment**: Push changes to `/src/` to trigger Vercel deployment and verify the portfolio is live.
- **Domain Mapping**: Point portfolio domain to Vercel deployment when ready.
- **Domain Mapping**: Point `infrabuildpartners.com` to the Lightsail IP when purchased.

---

## 🤖 AI Adaptation Notes

When any AI session opens this repo, it should:
1. **Read this file first** — It contains the complete project context
2. **Check `/marketing/` folder** — For latest templates and assets
3. **Check `/deployments/` folder** — For current deployment status
4. **Check conversation log above** — For recent decisions and changes
5. **Update this file** — After making any significant changes

This ensures continuity across AI tools (Cursor, Claude, Gemini, ChatGPT, etc.)
