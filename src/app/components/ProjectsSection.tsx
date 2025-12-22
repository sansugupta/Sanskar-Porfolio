"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Github, ExternalLink, Folder } from "lucide-react"

const projects = [
    {
      title: "Enterprise Java Microservices Stack: Automated K8s Infrastructure & Cross-Region DR",
      description: "Consolidated Multi-Tenant Cluster Architecture paired with a Cold-Standby Disaster Recovery (DR) Site. Reduced infra costs by 65% while maintaining 99.9% availability for Java Spring Boot and Odoo ERP ecosystems.",
      technologies: ["Kubernetes", "Terraform", "GitHub Actions", "WireGuard", "PostgreSQL", "NGINX Ingress"],
      github: "https://github.com/sansugupta/JITPS",
      featured: true,
      slug: "enterprise-java-stack",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1766419833284.png",
      highlights: ["65% Cost Reduction", "DR RTO < 5 Minutes", "Cross-Region Live Sync", "Zero-Trust Security"]
    },
    {
      title: "Enterprise AWS Bedrock Agent Terraform Module",
      description: "Production-ready, reusable Terraform Module for deploying secure, scalable RAG architecture using AWS Bedrock Agents. Treats GenAI Infrastructure as Code, enabling DevOps engineers to spin up standardized AI Agents across Dev/Test/Prod environments.",
      technologies: ["Terraform", "AWS Bedrock", "Python", "Lambda", "S3", "KMS", "IAM"],
      github: "https://github.com/sansugupta/Enterprise-AWS-Bedrock-Agent-Terraform-Module",
      featured: true,
      slug: "aws-bedrock-module",
      image: "https://images.unsplash.com/photo-1664382953518-4a664ab8a8c9?w=1200&q=80",
      highlights: ["RAG Architecture", "Multi-Agent Supervisor System", "Serverless Lambda Integration", "PII Guardrails"]
    },
    {
      title: "AI-Powered Observability Automation System",
      description: "Architected and implemented a comprehensive observability platform for Kubernetes environments, transforming reactive monitoring into proactive system intelligence. Built end-to-end monitoring ecosystem using Groundcover (eBPF), Prometheus, Grafana, and ClickHouse.",
      technologies: ["Kubernetes", "Prometheus", "Grafana", "eBPF", "ClickHouse", "Python"],
      github: "https://github.com/sansugupta/AI-Powered-Observability-Automation-System",
      featured: true,
      slug: "ai-observability",
      highlights: ["Reduced MTTR by 60%", "Intelligent dashboards with drill-down", "Automated alerting with Slack"]
    },
    {
      title: "Three-Tier Web Application on AWS EKS",
      description: "Deployed microservices-based web app (React.js, Node.js, MongoDB) on AWS EKS with monitoring integration. Built CI/CD pipeline with Jenkins, Docker, and Terraform, using Blue/Green deployments for zero downtime.",
      technologies: ["AWS EKS", "Terraform", "Jenkins", "Docker", "React", "Node.js", "MongoDB"],
      github: "https://github.com/sansugupta/3-tier-HQ",
      featured: true,
      slug: "three-tier-eks",
      highlights: ["Zero-downtime deployments", "Prometheus & Grafana monitoring", "SonarQube & Trivy scanning"]
    },
  {
    title: "React Task Management Dashboard",
    description: "Full-stack task management app with React, Node.js, and MongoDB. Features real-time updates, drag-and-drop interface, user authentication with JWT, and comprehensive task analytics dashboard.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Socket.io"],
    github: "https://github.com/sansugupta/react-task-dashboard",
    featured: true,
    highlights: ["Real-time updates", "Drag-and-drop UI", "JWT authentication"]
  },
  {
    title: "Cloud-Native Full-Stack Board Game",
    description: "Architected end-to-end CI/CD pipeline on AWS, Kubernetes, Jenkins, and advanced cloud-native technologies. Implemented automated multi-stage security scanning with Trivy, SonarQube, and Kubernetes RBAC.",
    technologies: ["AWS", "Kubernetes", "Jenkins", "Docker", "SonarQube", "Trivy"],
    github: "https://github.com/sansugupta/Boardgame-CI-CD-Pipeline",
    featured: false,
    highlights: ["Multi-stage security scanning", "Kubernetes RBAC", "Microservices architecture"]
  },
  {
    title: "Node.js API Security Gateway",
    description: "Built enterprise-grade API gateway with Node.js featuring rate limiting, OAuth2 authentication, request validation, and comprehensive security headers. Includes API key management and audit logging.",
    technologies: ["Node.js", "Express", "Redis", "OAuth2", "Helmet", "Rate-Limiter"],
    github: "https://github.com/sansugupta/nodejs-api-gateway",
    featured: false,
    highlights: ["OAuth2 integration", "Rate limiting", "Audit logging"]
  },
  {
    title: "ML Customer Churn Prediction",
    description: "Data science project using Python and scikit-learn to predict customer churn. Features exploratory data analysis, feature engineering, model comparison (RandomForest, XGBoost, SVM), and interactive visualization dashboard.",
    technologies: ["Python", "Scikit-learn", "Pandas", "XGBoost", "Matplotlib", "Seaborn"],
    github: "https://github.com/sansugupta/churn-prediction-ml",
    featured: false,
    highlights: ["92% accuracy", "Feature importance analysis", "Interactive dashboard"]
  },
  {
    title: "React E-Commerce Platform",
    description: "Modern e-commerce platform with React frontend, Node.js backend, Stripe payment integration, and product recommendation system. Features shopping cart, order tracking, and admin dashboard.",
    technologies: ["React", "Node.js", "Stripe", "PostgreSQL", "Redux", "Express"],
    github: "https://github.com/sansugupta/react-ecommerce",
    featured: false,
    highlights: ["Stripe payments", "Product recommendations", "Admin dashboard"]
  },
  {
    title: "DevSecOps Pipeline Automation",
    description: "Comprehensive DevSecOps pipeline with automated security scanning (SAST, DAST, SCA), vulnerability management, and compliance reporting. Integrated with Jenkins, GitLab, and Kubernetes.",
    technologies: ["Jenkins", "GitLab CI", "Trivy", "OWASP ZAP", "SonarQube", "Kubernetes"],
    github: "https://github.com/sansugupta/devsecops-automation",
    featured: false,
    highlights: ["SAST/DAST integration", "Compliance reporting", "Vulnerability tracking"]
  },
  {
    title: "Ad Bidding System with Traefik on AWS EKS",
    description: "High-performance ad bidding system deployed on AWS EKS with Traefik for secure HTTPS traffic routing from Google AdX, featuring TLS termination and load balancing.",
    technologies: ["AWS EKS", "Traefik", "Docker", "Let's Encrypt", "NLB"],
    github: "https://github.com/sansugupta/Bidder-Deployement-with-Traefik",
    featured: false,
    highlights: ["TLS termination", "Load balancing", "Google AdX integration"]
  },
  {
    title: "Python Data Analysis Toolkit",
    description: "Advanced data analysis toolkit for business intelligence with automated reporting, statistical analysis, time-series forecasting, and data visualization. Supports CSV, Excel, and SQL data sources.",
    technologies: ["Python", "Pandas", "NumPy", "Plotly", "Statsmodels", "SQLAlchemy"],
    github: "https://github.com/sansugupta/python-data-toolkit",
    featured: false,
    highlights: ["Automated reporting", "Time-series forecasting", "Multi-source support"]
  },
  {
    title: "Node.js Microservices Architecture",
    description: "Scalable microservices platform with Node.js, featuring service discovery, API gateway, event-driven communication with RabbitMQ, distributed tracing, and centralized logging.",
    technologies: ["Node.js", "Docker", "RabbitMQ", "Consul", "Elasticsearch", "Jaeger"],
    github: "https://github.com/sansugupta/nodejs-microservices",
    featured: false,
    highlights: ["Service discovery", "Event-driven", "Distributed tracing"]
  },
  {
    title: "JITPS Monitoring Stack Deployment",
    description: "Comprehensive monitoring stack deployment for JITPS POC cluster including Prometheus, Loki, Grafana, OpenTelemetry, and Postgres Exporter with automated deployment scripts.",
    technologies: ["Prometheus", "Loki", "Grafana", "OpenTelemetry", "Kubernetes", "Helm"],
    github: "https://github.com/sansugupta/JITPS",
    featured: false,
    highlights: ["Full observability stack", "Automated deployment", "Multi-tool integration"]
  }
]

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.preventDefault()
    window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url } }, "*")
  }

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]" />
      
      <div className="relative z-10 w-full mx-auto px-8 md:px-16 lg:px-24" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm">06.</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mt-4" />
        </motion.div>

<div className="space-y-8 mb-16">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-all overflow-hidden"
              >
                <div className="absolute top-4 right-4 flex gap-3 z-30">
                  <a
                    href={project.github}
                    onClick={(e) => handleExternalLink(e, project.github)}
                    className="p-2 text-gray-400 hover:text-cyan-400 transition-colors bg-black/50 rounded-lg backdrop-blur-sm"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>

                {'image' in project && project.image && (
                  <div className="relative w-full h-64 md:h-80">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
                  </div>
                )}
                
                <div className={`p-8 ${'image' in project && project.image ? '-mt-20 relative z-10' : ''}`}>
                  <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
                    Featured Project
                  </span>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.highlights.map((highlight, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-green-500/10 text-green-400 text-xs border border-green-500/20">
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 rounded text-xs font-mono bg-white/5 text-gray-300 border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
          ))}
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl font-semibold text-white mb-8 text-center"
        >
          Other Noteworthy Projects
        </motion.h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all hover:-translate-y-1"
            >
                <div className="flex items-start justify-between mb-4">
                  <Folder className="w-10 h-10 text-purple-400" />
                  <a
                    href={project.github}
                    onClick={(e) => handleExternalLink(e, project.github)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>

              <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                {project.title}
              </h4>

              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span key={i} className="text-xs font-mono text-gray-500">
                    {tech}{i < Math.min(project.technologies.length - 1, 3) ? " ·" : ""}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
            <a
              href="https://github.com/sanskargupta966"
              onClick={(e) => handleExternalLink(e, "https://github.com/sanskargupta966")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all"
            >
              <Github className="w-5 h-5" />
              View All Projects on GitHub
            </a>
        </motion.div>
      </div>
    </section>
  )
}
