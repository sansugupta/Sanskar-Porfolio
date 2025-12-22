"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Layers, Shield, Zap, Database, Globe } from "lucide-react"
import Link from "next/link"
import Navigation from "../../components/Navigation"

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-cyan-500/30">
      <Navigation />
      
      <main className="relative pt-32 pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Back Link */}
          <Link 
            href="/#projects" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm uppercase tracking-wider">Back to Projects</span>
          </Link>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                  Cloud Architecture
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono">
                  Kubernetes
                </span>
                <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono">
                  DevSecOps
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                Enterprise Java <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Microservices Stack</span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Automated K8s Infrastructure & Cross-Region Disaster Recovery for mission-critical enterprise platforms.
              </p>

              <div className="flex gap-4">
                <button 
                  onClick={() => window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: "https://github.com/sansugupta/JITPS" } }, "*")}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-cyan-400 transition-colors"
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
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group"
            >
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1766419833284.png" 
                alt="Architecture Diagram" 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* Stats/Overview */}
          <div className="grid md:grid-cols-4 gap-8 mb-24">
            {[
              { label: "Cost Reduction", value: "65%", icon: Zap, color: "text-yellow-400" },
              { label: "Availability SLA", value: "99.9%", icon: Shield, color: "text-green-400" },
              { label: "RTO", value: "< 5 Min", icon: Globe, color: "text-cyan-400" },
              { label: "Environments", value: "5 Optimized", icon: Layers, color: "text-purple-400" },
            ].map((stat, i) => (
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

          {/* Content Sections */}
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-cyan-400" />
                  </div>
                  Project Vision & Strategy
                </h2>
                <div className="prose prose-invert max-w-none text-gray-400 text-lg leading-relaxed">
                  <p>
                    This ecosystem serves as a mission-critical platform integrating a Java Spring Boot frontend, 
                    an Odoo ERP backend, and Keycloak Identity Management. The project inherited a legacy model 
                    with 15 separate clusters across 5 environments, leading to massive overhead and brittle connectivity.
                  </p>
                  <p className="mt-4">
                    The solution was a <strong>Consolidated Multi-Tenant Cluster Architecture</strong> paired 
                    with a <strong>Cold-Standby Disaster Recovery (DR) Site</strong>, reducing costs while 
                    dramatically increasing reliability.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Database className="w-5 h-5 text-purple-400" />
                  </div>
                  Engineering Implementations
                </h2>
                <div className="space-y-8">
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-bold mb-4 text-white">Cross-Region Data Integrity</h3>
                    <p className="text-gray-400">
                      Implemented managed PostgreSQL with cross-region replication over a private WireGuard VPN. 
                      GitHub Actions automate the promotion process, transforming replicas into primaries in under 60 seconds.
                    </p>
                  </div>
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-bold mb-4 text-white">Advanced Ingress Engineering</h3>
                    <p className="text-gray-400">
                      Architected a Dual-Path Ingress Strategy to handle Odoo's long-polling mechanism on port 8072, 
                      utilizing custom NGINX annotations for persistent connections.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-white/5 to-transparent p-8 rounded-3xl border border-white/10">
                <h2 className="text-3xl font-bold mb-8">Elastic Stack Integration</h2>
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-resized-1766419822180.webp" 
                  alt="Elastic Deployment" 
                  className="w-full rounded-xl mb-8 border border-white/10"
                />
                <p className="text-gray-400 text-lg">
                  For the Java App to communicate with Elasticsearch over mTLS, I engineered an InitContainer 
                  that builds a dynamic Java KeyStore (JKS) from Kubernetes Secrets during the pod startup phase.
                </p>
              </section>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 sticky top-32">
                <h3 className="text-xl font-bold mb-6 uppercase tracking-wider text-cyan-400 text-sm">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Kubernetes", "Terraform", "ArgoCD", "GitHub Actions", 
                    "Java Spring Boot", "Odoo", "Keycloak", "WireGuard", 
                    "PostgreSQL", "Cloudflare Tunnel", "Loki", "Grafana", "Tempo", "Mimir"
                  ].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm font-mono">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-12 space-y-6">
                  <div>
                    <h4 className="text-white font-bold mb-2">Platform</h4>
                    <p className="text-gray-500 font-mono text-sm">Scaleway / AWS</p>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Category</h4>
                    <p className="text-gray-500 font-mono text-sm">Infrastructure Automation</p>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Role</h4>
                    <p className="text-gray-500 font-mono text-sm">SRE / DevOps Architect</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <p className="text-gray-500 font-mono text-sm mb-4 italic">
            "Proprietary logic generalized to 'Enterprise Java Application' for confidentiality."
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto" />
        </div>
      </footer>
    </div>
  )
}
