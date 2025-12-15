"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Settings, Code2, Server, Activity, Cloud, GitBranch, Database, Cpu, Rocket, Users, CheckCircle2 } from "lucide-react"

export default function InfraBuildSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      icon: Shield,
      title: "Site Reliability Engineering",
      description: "Transform reactive firefighting into proactive engineering with world-class observability",
      features: ["Prometheus & Grafana", "eBPF-Based Tracing", "60% MTTR Reduction"]
    },
    {
      icon: Settings,
      title: "DevOps & Cloud Automation",
      description: "Build automated foundations for your business to scale effortlessly",
      features: ["Terraform & CloudFormation", "CI/CD Pipelines", "GitHub Actions & Jenkins"]
    },
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "From powerful backend engines to delightful user interfaces",
      features: ["React & React Native", "Python (Django, Flask)", "REST APIs & Databases"]
    },
    {
      icon: Server,
      title: "Kubernetes & Containers",
      description: "Master containerized environments that are portable and scalable",
      features: ["Docker & EKS/GKE", "Multi-cluster Management", "Zero-downtime Deployments"]
    }
  ]

  const techStack = [
    { icon: Cloud, name: "AWS" },
    { icon: Server, name: "Kubernetes" },
    { icon: Settings, name: "Docker" },
    { icon: GitBranch, name: "Terraform" },
    { icon: Activity, name: "Prometheus" },
    { icon: Database, name: "PostgreSQL" },
    { icon: Cpu, name: "Python" },
    { icon: Code2, name: "React" }
  ]

  const highlights = [
    "AI-powered attendance system with facial recognition",
    "AR application for simulating drone flight paths",
    "Enterprise-grade secure password management",
    "Real-time financial data dashboards",
    "Multi-region Kubernetes infrastructure"
  ]

  return (
    <section id="infrabuild" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d14] via-[#0a0a0f] to-[#0d0d14]" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm">02.</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">InfraBuild</span>{" "}
            Partners
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mt-4 mx-auto" />
          <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
            I lead <span className="text-white font-medium">InfraBuild Partners</span> — a dedicated team of senior Site Reliability Engineers, 
            DevOps specialists, and Full-Stack Developers. We don't just build software; we build resilient, scalable, 
            and future-proof digital businesses.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">Our Philosophy: Production-Ready from Day One</h3>
          </div>
          <p className="text-gray-300">
            We believe in a culture where development, operations, and reliability are a unified effort. 
            By embedding SRE and DevOps principles into every stage of the development lifecycle, we eliminate 
            the friction between building features and keeping them online, ensuring your product is not only 
            brilliant but also <span className="text-emerald-400 font-medium">unbreakable</span>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-300 border border-white/10"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">Tech Stack We Master</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors"
              >
                <tech.icon className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-300 text-sm font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Our Collective Portfolio</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Our team's diverse experience includes successfully delivering complex projects:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {highlights.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-6">
            When you partner with us, you aren't just hiring freelancers — you're onboarding a{" "}
            <span className="text-white font-medium">dedicated technical leadership team</span> committed to your success.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.upwork.com/freelancers/~01573b18bcb0f2c7c9"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors"
            >
              Work With Us
            </a>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}