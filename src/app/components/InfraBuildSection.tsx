"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Server, Shield, Activity, Code, Cloud, Clock, Users, Zap, CheckCircle2 } from "lucide-react"

export default function InfraBuildSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      icon: Shield,
      title: "Site Reliability Engineering (SRE)",
      description: "Transform reactive firefighting into proactive engineering with 24/7 uptime monitoring",
      features: [
        "eBPF-based tracing for kernel-level insights",
        "Prometheus, Grafana & ClickHouse observability",
        "Intelligent alerting (60% reduced MTTR)",
      ],
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: Cloud,
      title: "DevOps & Cloud Automation",
      description: "Build automated foundations for effortless scaling with infrastructure as code",
      features: [
        "Terraform & CloudFormation (IaC)",
        "CI/CD with GitHub Actions, GitLab, Jenkins",
        "Kubernetes (EKS, GKE) orchestration",
      ],
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "From powerful backends to delightful UIs, we build complete solutions",
      features: [
        "Python (Django, Flask) backend APIs",
        "React & React Native frontend",
        "Firebase & cloud service integration",
      ],
      color: "from-green-400 to-cyan-500"
    },
  ]

  const stats = [
    { icon: Users, value: "5-6", label: "Team Members" },
    { icon: Clock, value: "24/7", label: "SRE Support" },
    { icon: Activity, value: "99.9%", label: "Uptime SLA" },
    { icon: Zap, value: "60%", label: "Faster MTTR" },
  ]

  return (
    <section id="infrabuild" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d14] via-[#0a0a0f] to-[#0d0d14]" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm">InfraBuild Partners</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Your End-to-End Technical Partner
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mt-4 mx-auto" />
          <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
            We are a dedicated team of senior SRE, DevOps specialists, and Full-Stack Developers. 
            We don't just build software; we build <span className="text-cyan-400 font-semibold">resilient, scalable, and future-proof</span> digital businesses.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-center group hover:border-cyan-500/30 transition-all"
            >
              <div className="inline-flex p-3 rounded-lg bg-cyan-500/10 text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="space-y-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.15 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${service.color} text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
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
          transition={{ delay: 0.9 }}
          className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/20 backdrop-blur-sm"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Production-Ready from Day One
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Too many projects fail at the deployment line. We embed SRE and DevOps principles into every stage 
              of the development lifecycle, eliminating the friction between building features and keeping them online. 
              Your product is not only <span className="text-cyan-400 font-semibold">brilliant but also unbreakable</span>.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/919713492857"
                onClick={(e) => {
                  e.preventDefault()
                  window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: "https://wa.me/919713492857" } }, "*")
                }}
                className="px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Server className="w-5 h-5" />
                Start Your Project
              </a>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-colors"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
