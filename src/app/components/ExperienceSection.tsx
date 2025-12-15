"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Building2, MapPin, Calendar, ChevronRight } from "lucide-react"

const experiences = [
  {
    company: "Alyssum Global Services",
    position: "Site Reliability Engineer",
    location: "Noida, Uttar Pradesh, India",
    type: "Hybrid",
    duration: "Feb 2025 - Present",
    description: [
      "Lead 24x7 SRE support team of 5-6 members managing zero-downtime operations for JITPS (French e-commerce) across multi-region Kubernetes infrastructure serving 1M+ daily users.",
      "Architected eBPF-powered observability stack with Groundcover, Prometheus, Grafana and other monitoring tools. Transitioned Multi-Cluster Architecture of three services into Consolidated Architecture over Scaleway and diverted traffic through Cloudflare.",
      "Managed end-to-end monitoring with 3-member team for GigaSpaces (Israeli AI eRAG platform), implementing Real User Monitoring with ClickHouse over Groundcover.",
      "Orchestrated JITPS e-commerce platform reliability achieving 99.9% uptime with automated daily observability reports using Python and AWS Lambda."
    ],
    technologies: ["Kubernetes", "Prometheus", "Grafana", "eBPF", "Groundcover", "ClickHouse", "AWS Lambda", "Python", "Cloudflare", "Scaleway"],
    color: "cyan"
  },
  {
    company: "CETPA Infotech Pvt. Ltd.",
    position: "DevOps Engineer & Technical Trainer",
    location: "Remote",
    type: "Freelance",
    duration: "Sep 2024 - Jan 2025",
    description: [
      "Managed production infrastructure and deployment pipelines implementing CI/CD workflows with GitHub Actions and AWS services.",
      "Led DevOps training programs for 45+ students, delivering comprehensive curriculum covering Docker, Kubernetes, Jenkins, AWS, Terraform, and GitOps practices with 95% student satisfaction rating."
    ],
    technologies: ["GitHub Actions", "AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "GitOps"],
    color: "purple"
  },
  {
    company: "Karix Mobile Pvt. Ltd.",
    position: "DevOps Engineer",
    location: "Gurugram, Haryana, India",
    type: "On-site",
    duration: "Jan 2023 - Aug 2024",
    description: [
      "Optimized deployment processes by implementing automation with Jenkins pipelines and Docker containerization, enhancing application scalability and efficiency.",
      "Managed AWS cloud infrastructure using Terraform and monitoring tools like Prometheus, enabling proactive performance tracking and system reliability.",
      "Established robust CI/CD workflows with Git and GitHub, utilizing Blue/Green deployment pattern in production.",
      "Optimized databases and application performance for critical banking services, ensuring 99.99% uptime for OTP delivery system, handling over 1M+ daily banking transactions with zero service degradation."
    ],
    technologies: ["Jenkins", "Docker", "AWS", "Terraform", "Prometheus", "CloudWatch", "Splunk", "Blue/Green Deployment"],
    color: "pink"
  },
  {
    company: "VINSYS IT QA",
    position: "Cloud Application Developer Certification",
    location: "Remote",
    type: "Full-time",
    duration: "Mar 2022 - May 2022",
    description: [
      "Gained hands-on experience with cloud services, automated deployment, and scalable architecture design, enhancing overall cloud application performance and reliability."
    ],
    technologies: ["Linux", "Python", "Cloud Services", "Automated Deployment"],
    color: "green"
  }
]

export default function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; bg: string; text: string; dot: string }> = {
      cyan: { border: "border-cyan-500/30", bg: "bg-cyan-500/10", text: "text-cyan-400", dot: "bg-cyan-400" },
      purple: { border: "border-purple-500/30", bg: "bg-purple-500/10", text: "text-purple-400", dot: "bg-purple-400" },
      pink: { border: "border-pink-500/30", bg: "bg-pink-500/10", text: "text-pink-400", dot: "bg-pink-400" },
      green: { border: "border-green-500/30", bg: "bg-green-500/10", text: "text-green-400", dot: "bg-green-400" },
    }
    return colors[color] || colors.cyan
  }

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm">02.</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mt-4" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-pink-500/50" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const colorClasses = getColorClasses(exp.color)
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative pl-8 md:pl-20"
                >
                  <div className={`absolute left-0 md:left-8 top-0 w-4 h-4 rounded-full ${colorClasses.dot} -translate-x-1/2 border-4 border-[#0a0a0f]`} />

                  <div className={`p-6 rounded-xl bg-white/5 border ${colorClasses.border} backdrop-blur-sm hover:bg-white/[0.07] transition-all group`}>
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {exp.position}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 className={`w-4 h-4 ${colorClasses.text}`} />
                          <span className={`font-medium ${colorClasses.text}`}>{exp.company}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Calendar className="w-4 h-4" />
                          {exp.duration}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location} · {exp.type}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                          <ChevronRight className={`w-4 h-4 ${colorClasses.text} flex-shrink-0 mt-0.5`} />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 rounded text-xs font-mono ${colorClasses.bg} ${colorClasses.text} border ${colorClasses.border}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
