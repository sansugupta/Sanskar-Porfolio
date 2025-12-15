"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { MapPin, Briefcase, GraduationCap, Code2 } from "lucide-react"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const highlights = [
    { icon: Briefcase, label: "Current Role", value: "Site Reliability Engineer", color: "text-cyan-400" },
    { icon: MapPin, label: "Location", value: "Noida, India", color: "text-pink-400" },
    { icon: GraduationCap, label: "Education", value: "B.Tech in CS", color: "text-purple-400" },
    { icon: Code2, label: "Specialization", value: "Cloud & DevOps", color: "text-green-400" },
  ]

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm">03.</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              Site Reliability / DevOps Engineer with <span className="text-cyan-400 font-semibold">3+ years</span> architecting 
              AWS cloud infrastructure, Kubernetes orchestration, and CI/CD pipelines. Currently leading 24x7 SRE support teams 
              of 5-6 members across multi-national enterprise projects.
            </p>
            
            <p className="text-gray-400 leading-relaxed">
              Expert in observability solutions using eBPF, Prometheus, and Grafana achieving <span className="text-green-400 font-semibold">99.9% uptime</span>. 
              Specialized in DevSecOps, Infrastructure as Code, and automated incident response systems with proven track record 
              managing zero-downtime operations for mission-critical applications serving <span className="text-purple-400 font-semibold">1M+ daily users</span>.
            </p>

            <p className="text-gray-400 leading-relaxed">
              At Alyssum Global Services, I manage zero-downtime operations for JITPS (French e-commerce) across multi-region 
              Kubernetes infrastructure. I've architected eBPF-powered observability stacks, transitioned multi-cluster 
              architectures into consolidated setups, and implemented Real User Monitoring with ClickHouse.
            </p>

            <div className="pt-6">
              <h3 className="text-white font-semibold mb-4">Core Technologies:</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python", "Bash", "Go", "AWS", "Kubernetes", "Docker", 
                  "Terraform", "Prometheus", "Grafana", "Jenkins", "GitHub Actions"
                ].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 font-mono"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 space-y-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-white/5 ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">{item.label}</p>
                    <p className="text-white font-medium mt-0.5">{item.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mt-6"
            >
              <p className="text-gray-300 text-sm italic">
                "Transforming reactive monitoring into proactive system intelligence through 
                advanced observability and automation."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}