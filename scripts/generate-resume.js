const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; font-size: 10pt; line-height: 1.4; padding: 40px; color: #000; }
        h1 { font-size: 28pt; font-weight: bold; text-align: center; margin-bottom: 8px; }
        .contact { text-align: center; font-size: 9pt; margin-bottom: 20px; color: #0066cc; }
        .contact a { color: #0066cc; text-decoration: none; margin: 0 6px; }
        h2 { font-size: 12pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 2px solid #000; padding-bottom: 2px; }
        .job-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .job-title { font-weight: bold; font-size: 10pt; }
        .job-date { font-style: italic; font-size: 9pt; }
        .company { font-style: italic; font-size: 10pt; }
        ul { margin-left: 20px; margin-bottom: 12px; }
        li { margin-bottom: 4px; font-size: 9.5pt; }
        .skills-list { display: flex; flex-wrap: wrap; gap: 4px; }
        .skill-category { flex: 1 1 100%; margin-bottom: 6px; }
        .skill-category strong { font-weight: bold; }
    </style>
</head>
<body>
<h1>SANSKAR GUPTA</h1>
<div class="contact">
<a href="tel:+919713492857">9713492857 (Call)</a> | 
<a href="https://wa.me/919289869370">9289869370 (WA)</a> | 
<a href="mailto:sanskargupta966@gmail.com">sanskargupta966@gmail.com</a> | 
<a href="https://www.linkedin.com/in/sanskargupta9/">LinkedIn</a> | 
<a href="https://github.com/sansugupta">GitHub</a> | 
<a href="https://sanskarguptaportfolio.netlify.app/">Portfolio</a>
</div>

<h2>SUMMARY</h2>
<p style="margin-bottom: 12px;">
Site Reliability / DevOps Engineer with 3+ years architecting AWS cloud infrastructure, Kubernetes orchestration, and GenAI modules. Specialized in high-availability migrations, cross-region Disaster Recovery, and DevSecOps. Lead SRE support teams for multi-national enterprise projects, achieving 99.9% uptime through eBPF observability and automated CI/CD. Top-Rated Freelancer with a track record of delivering mission-critical cloud solutions for global clients.
</p>

<h2>TECHNICAL SKILLS</h2>
<div style="margin-bottom: 12px;">
<div class="skill-category"><strong>Languages/AI:</strong> Python, Bash, SQL, Go, YAML, PromQL, AWS Bedrock (Claude 3.5), RAG Architecture</div>
<div class="skill-category"><strong>AWS Cloud:</strong> VPC, EC2, S3, RDS, ECS/EKS, IAM, CloudFront, CloudWatch, Lambda, Bedrock, Guardrails</div>
<div class="skill-category"><strong>IaC & Automation:</strong> Terraform, Terragrunt, Ansible, Helm, GitHub Actions, Jenkins, GitOps (ArgoCD)</div>
<div class="skill-category"><strong>Networking & Security:</strong> WireGuard VPN, Cloudflare Zero Trust/WARP, Nginx Ingress, eBPF, IAM Policies</div>
<div class="skill-category"><strong>Monitoring & Observability:</strong> Prometheus, Grafana, ClickHouse, Groundcover, ELK Stack, Loki, Tempo</div>
</div>

<h2>WORK EXPERIENCE</h2>

<div class="job-header">
<div>
<div class="job-title">Site Reliability Engineer</div>
<div class="company">Alyssum Global Services, Noida · Hybrid</div>
</div>
<div class="job-date">Feb. 2025 – Present</div>
</div>
<ul>
<li>Lead SRE for E-Commerce Application client of Alyssum (Java Based), managing end-to-end AWS + Kubernetes production deployment serving 1M+ daily users with zero-downtime CI/CD and eBPF-based monitoring.</li>
<li>Achieved Fully Private Cross-Region DR Migration (Paris to Amsterdam) for PostgreSQL 14 using WireGuard site-to-site tunnels and policy routing to handle overlapping CIDRs without public internet exposure.</li>
<li>Consolidated 15 legacy Kubernetes clusters into a single multi-tenant architecture per environment, reducing infrastructure costs by 60% while simplifying operational overhead.</li>
<li>Implemented an automated monitoring stack (Prometheus, Grafana, ClickHouse) via advanced GitHub Action pipelines for multi-region Scaleway and Cloudflare infrastructures.</li>
<li>Managed end-to-end monitoring for GigaSpaces (Israeli AI eRAG platform), implementing Real User Monitoring with ClickHouse over the Groundcover. Setup Production Daily Report for all the stakeholders through python scripting.</li>
</ul>

<div class="job-header">
<div>
<div class="job-title">DevOps Engineer & Technical Trainer (Freelance)</div>
<div class="company">Upwork & CETPA Infotech, Remote / Noida</div>
</div>
<div class="job-date">Sep. 2024 – Jan. 2025</div>
</div>
<ul>
<li>Top-Rated Plus Freelancer on Upwork with $11k+ earnings; handled international enterprise clients for high-traffic projects involving AWS Bedrock, Terraform IaC, and Kubernetes scaling.</li>
<li>Architected a Universal AWS Bedrock Terraform Module for standardized RAG (Retrieval-Augmented Generation) deployment, integrating Claude 3.5, S3 context, and Lambda orchestration.</li>
<li>Led DevOps training for 45+ students, delivering a 95% satisfaction-rated curriculum on Docker, Kubernetes, Jenkins, and GitOps, bridging the gap between academia and industry production standards.</li>
</ul>

<div class="job-header">
<div>
<div class="job-title">DevOps Engineer</div>
<div class="company">Karix Mobile Pvt. Ltd., Mumbai, India</div>
</div>
<div class="job-date">Jan. 2023 – Aug. 2024</div>
</div>
<ul>
<li>Managed AWS infrastructure using Terraform/Terragrunt, implementing secure multi-tier VPCs, RDS clusters, and auto-scaling ELB configurations with observability via Splunk and CloudWatch.</li>
<li>Established robust CI/CD workflows for telecom-scale microservices using GitHub Actions and Jenkins, implementing Blue/Green deployment strategies for mission-critical SMS/WhatsApp gateways.</li>
</ul>

<h2>PERSONAL PROJECTS</h2>

<div class="job-header">
<div>
<div class="job-title">Three-Tier Web Application Deployment on AWS EKS</div>
</div>
<div class="job-date">Jul 2022 | <a href="https://github.com/sansugupta/3-tier-HQ" style="font-size: 8pt;">GitHub</a></div>
</div>
<ul>
<li>Deployed a full-stack React/Node.js/MongoDB application on EKS with Helm-based orchestration.</li>
<li>Implemented DevSecOps practices including SonarQube code analysis and Trivy vulnerability scanning.</li>
</ul>

<h2>CERTIFICATIONS & EDUCATION</h2>
<div class="job-header">
<div>
<div class="job-title">AWS Certified Cloud Practitioner</div>
<div class="company">Amazon Web Services</div>
</div>
<div class="job-date">Jun. 2022</div>
</div>

<div class="job-header">
<div>
<div class="job-title">Bachelor of Technology in Computer Science</div>
<div class="company">ITM College Gwalior</div>
</div>
<div class="job-date">2019 -- 2023 | CGPA: 7.85</div>
</div>
</body>
</html>
`;

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    
    await page.pdf({
        path: path.join(__dirname, '../public/resume.pdf'),
        format: 'Letter',
        margin: {
            top: '0.5in',
            right: '0.5in',
            bottom: '0.5in',
            left: '0.5in'
        },
        printBackground: true
    });
    
    await browser.close();
    console.log('Resume PDF generated successfully!');
})();
