"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Cloud, Container, GitBranch, Database, Shield, Code, Activity, Server } from "lucide-react"

const skillCategories = [
  {
    title: "Languages",
    icon: Code,
    color: "cyan",
    skills: ["Python", "Bash", "SQL", "Go", "YAML", "PromQL"]
  },
  {
    title: "AWS Cloud",
    icon: Cloud,
    color: "orange",
    skills: ["VPC", "EC2", "S3", "ELB", "RDS", "ECS/EKS", "IAM", "CloudFront", "CloudWatch", "SQS/SNS", "Lambda", "Auto Scaling"]
  },
  {
    title: "IaC & Automation",
    icon: GitBranch,
    color: "green",
    skills: ["Terraform", "Terragrunt", "Ansible", "Helm", "GitHub Actions", "Jenkins", "GitOps"]
  },
  {
    title: "Containers & Orchestration",
    icon: Container,
    color: "purple",
    skills: ["Docker", "Kubernetes", "EKS", "Helm", "Istio", "Service Mesh", "Datadog", "Databricks"]
  },
  {
    title: "Monitoring & Observability",
    icon: Activity,
    color: "pink",
    skills: ["Prometheus", "Grafana", "CloudWatch", "New Relic", "Splunk", "Groundcover (eBPF)", "ELK Stack", "ClickHouse"]
  },
  {
    title: "Security",
    icon: Shield,
    color: "red",
    skills: ["AWS Security Best Practices", "IAM Policies", "DevSecOps", "Vulnerability Scanning", "RBAC"]
  }
]

const getColorClasses = (color: string) => {
  const colors: Record<string, { text: string; bg: string; border: string; glow: string }> = {
    cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", glow: "group-hover:shadow-cyan-500/20" },
    orange: { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30", glow: "group-hover:shadow-orange-500/20" },
    green: { text: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30", glow: "group-hover:shadow-green-500/20" },
    purple: { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", glow: "group-hover:shadow-purple-500/20" },
    pink: { text: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/30", glow: "group-hover:shadow-pink-500/20" },
    red: { text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", glow: "group-hover:shadow-red-500/20" },
  }
  return colors[color] || colors.cyan
}

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm">05.</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Technical Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const colorClasses = getColorClasses(category.color)
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all hover:shadow-lg ${colorClasses.glow}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-lg ${colorClasses.bg} ${colorClasses.text}`}>
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 + i * 0.03 }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono ${colorClasses.bg} ${colorClasses.text} border ${colorClasses.border}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-white/10"
        >
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Cloud Platforms", value: "AWS, GCP, Scaleway" },
              { label: "Container Runtime", value: "Docker, containerd" },
              { label: "Orchestration", value: "Kubernetes, EKS" },
              { label: "CI/CD", value: "Jenkins, GitHub Actions" },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-white font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}