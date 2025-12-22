"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Github, Zap, Shield, Database, Layout, Server, Cpu } from "lucide-react"
import Link from "next/link"
import Navigation from "../../components/Navigation"

export default function projectPage() {
  const stats = [
    { label: "Deployment Type", value: "EKS", icon: Cpu, color: "text-orange-400" },
    { label: "Stability", value: "99.9%", icon: Shield, color: "text-green-400" },
    { label: "Downtime", value: "0", icon: Zap, color: "text-cyan-400" },
    { label: "Security", value: "Tiered", icon: Database, color: "text-purple-400" },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-cyan-500/30">
      <Navigation />
      
      <main className="relative pt-32 pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/#projects" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm uppercase tracking-wider">Back to Projects</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono">
                  AWS EKS
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
                  Terraform
                </span>
                <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono">
                  CI/CD
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                Three-Tier Web <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">on AWS EKS</span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Deployed a microservices-based web application (React.js, Node.js, MongoDB) on AWS EKS with comprehensive CI/CD and monitoring integration.
              </p>

              <div className="flex gap-4">
                <button 
                  onClick={() => window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: "https://github.com/sansugupta/3-tier-HQ" } }, "*")}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-orange-400 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  Source Code
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center p-8"
            >
               <Layout className="w-24 h-24 text-orange-500/20 absolute" />
               <div className="relative z-10 text-center">
                  <span className="text-gray-500 font-mono text-sm">ARCHITECTURAL PREVIEW</span>
                  <div className="mt-4 flex gap-4 justify-center">
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"><Server className="text-orange-400"/></div>
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"><Layout className="text-blue-400"/></div>
                  </div>
               </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-24">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 text-center"
              >
                <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color}`} />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-500 text-sm font-mono uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <Server className="w-5 h-5 text-orange-400" />
                  </div>
                  Infrastructure as Code
                </h2>
                <div className="prose prose-invert max-w-none text-gray-400 text-lg leading-relaxed">
                  <p>
                    Utilized <strong>Terraform</strong> to provision all AWS resources, including VPC, EKS Cluster, Node Groups, and IAM roles. 
                    This ensures repeatable and consistent environments across staging and production.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-400" />
                  </div>
                  Deployment Strategy
                </h2>
                <div className="space-y-8">
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-bold mb-4 text-white">Blue/Green Jenkins Pipeline</h3>
                    <p className="text-gray-400">
                      Implemented a Jenkins pipeline that automates Docker image builds, scans them with Trivy, and performs <strong>zero-downtime Blue/Green deployments</strong> on EKS.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 sticky top-32">
                <h3 className="text-xl font-bold mb-6 uppercase tracking-wider text-orange-400 text-sm">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {["AWS EKS", "Terraform", "Jenkins", "Docker", "React", "Node.js", "MongoDB", "Prometheus", "Grafana", "SonarQube", "Trivy"].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
