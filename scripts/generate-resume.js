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
        Site Reliability / DevOps Engineer with 3+ years architecting AWS cloud infrastructure, Kubernetes orchestration, and CI/CD pipelines. Lead 24x7 SRE support teams of 5-6 members across multi-national enterprise projects. Expert in observability solutions using eBPF, Prometheus, and Grafana achieving 99.9% uptime. Specialized in DevSecOps, Infrastructure as Code, and automated incident response systems with proven track record managing zero-downtime operations for mission-critical applications.
    </p>

    <h2>TECHNICAL SKILLS</h2>
    <div style="margin-bottom: 12px;">
        <div class="skill-category"><strong>Languages:</strong> Python, Bash, SQL, Go, YAML, PromQL</div>
        <div class="skill-category"><strong>AWS Cloud:</strong> VPC, EC2, S3, ELB, RDS, ECS/EKS, IAM, CloudFront, CloudWatch, SQS/SNS, Lambda, Auto Scaling</div>
        <div class="skill-category"><strong>IaC & Automation:</strong> Terraform, Terragrunt, Ansible, Helm, GitHub Actions, Jenkins, GitOps</div>
        <div class="skill-category"><strong>Containers & Orchestration:</strong> Docker, Kubernetes, EKS, Helm, Istio, Service Mesh, Datadog and Databricks</div>
        <div class="skill-category"><strong>Monitoring & Observability:</strong> Prometheus, Grafana, CloudWatch, New Relic, Splunk, Groundcover (eBPF), ELK Stack, ClickHouse</div>
        <div class="skill-category"><strong>Security:</strong> AWS Security Best Practices, IAM Policies, DevSecOps, Vulnerability Scanning, RBAC</div>
    </div>

    <h2>WORK EXPERIENCE</h2>
    
    <div class="job-header">
        <div>
            <div class="job-title">Site Reliability Engineer</div>
            <div class="company">Alyssum Global Services, Noida · Hybrid</div>
        </div>
        <div class="job-date">Feb. 2025 -- Present</div>
    </div>
    <ul>
        <li>Lead 24x7 SRE support team of 5-6 members managing zero-downtime operations for JITPS (French e-commerce) across multi-region Kubernetes infrastructure serving 1M+ daily users.</li>
        <li>Architected kube-prometheus-stack containing Prometheus, Grafana and other monitoring tools. Created highly advanced end-to-end pipeline to create complete infrastructure from scratch and deploy all services with monitoring stack using helm charts and GitHub actions. Transitioned Multi-Cluster Architecture into Consolidated Architecture over Scaleway and diverted traffic through Cloudflare. Setup DR's as Cold for Preprod and Hot Standby for Prod with automated rerouting.</li>
        <li>Managed end-to-end monitoring for GigaSpaces (Israeli AI eRAG platform), implementing Real User Monitoring with ClickHouse over Groundcover. Setup Production Daily Report for all stakeholders through Python scripting.</li>
    </ul>

    <div class="job-header">
        <div>
            <div class="job-title">DevOps Engineer & Technical Trainer (Freelance)</div>
            <div class="company">CETPA Infotech Pvt. Ltd., Noida, India</div>
        </div>
        <div class="job-date">Sep. 2024 -- Jan. 2025</div>
    </div>
    <ul>
        <li>Managed production infrastructure and deployment pipelines implementing CI/CD workflows with GitHub Actions and AWS services.</li>
        <li>Led DevOps training programs for 45+ students, delivering comprehensive curriculum covering Docker, Kubernetes, Jenkins, AWS, Terraform, and GitOps practices with 95% student satisfaction rating.</li>
    </ul>

    <div class="job-header">
        <div>
            <div class="job-title">DevOps Engineer</div>
            <div class="company">Karix Mobile Pvt. Ltd., Mumbai, India</div>
        </div>
        <div class="job-date">Jan. 2023 -- Aug. 2024</div>
    </div>
    <ul>
        <li>Managed AWS infrastructure using Terraform/Terragrunt for IaC, implementing VPC, EC2, S3, ELB, RDS with monitoring via Prometheus, CloudWatch, and Splunk.</li>
        <li>Established CI/CD workflows with GitHub Actions and Jenkins, implementing Blue/Green deployments with AWS Load Balancer for zero-downtime releases.</li>
    </ul>

    <h2>PERSONAL PROJECTS</h2>
    
    <div class="job-header">
        <div>
            <div class="job-title">Three-Tier Web Application Deployment on AWS EKS</div>
        </div>
        <div class="job-date">Jul 2022 -- Aug 2022 | <a href="https://github.com/sansugupta/3-tier-HQ" style="font-size: 8pt;">GitHub</a></div>
    </div>
    <ul>
        <li>Deployed microservices-based web app (React.js, Node.js, MongoDB) on AWS EKS with monitoring integration.</li>
        <li>Built CI/CD pipeline with Jenkins, Docker, and Terraform, using Blue/Green deployments for zero downtime.</li>
        <li>Implemented Kubernetes orchestration with Helm, integrating Prometheus and Grafana for observability.</li>
        <li>Set up testing with SonarQube and Trivy, ensuring robust security and high code quality.</li>
    </ul>

    <h2>CERTIFICATIONS</h2>
    <div class="job-header">
        <div>
            <div class="job-title">AWS Certified Cloud Practitioner (Score: 755/1000)</div>
            <div class="company">Amazon Web Services</div>
        </div>
        <div class="job-date">Jun. 2022</div>
    </div>

    <h2>EDUCATION</h2>
    <div class="job-header">
        <div>
            <div class="job-title">Bachelor of Technology in Computer Science</div>
            <div class="company">ITM College Gwalior</div>
        </div>
        <div class="job-date">May 2019 -- May 2023 | CGPA: 7.85</div>
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
