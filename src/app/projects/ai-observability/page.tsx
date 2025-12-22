"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Github, Zap, Shield, Database, Globe, Search, BarChart3 } from "lucide-react"
import Link from "next/link"
import Navigation from "../../components/Navigation"

export default function projectPage() {
  const stats = [
    { label: "MTTR Reduction", value: "60%", icon: Zap, color: "text-yellow-400" },
    { label: "Logs Processed", value: "10B+", icon: Database, color: "text-purple-400" },
    { label: "Dashboards", value: "50+", icon: BarChart3, color: "text-cyan-400" },
    { label: "Automated Alerts", value: "100%", icon: Shield, color: "text-green-400" },
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
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                  Kubernetes
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono">
                  eBPF
                </span>
                <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono">
                  Observability
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Observability System</span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Architected a comprehensive observability platform, transforming reactive monitoring into proactive system intelligence with eBPF and intelligent alerting.
              </p>

              <div className="flex gap-4">
                <button 
                  onClick={() => window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: "https://github.com/sansugupta/AI-Powered-Observability-Automation-System" } }, "*")}
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
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center p-8"
            >
               <BarChart3 className="w-24 h-24 text-cyan-500/20 absolute" />
               <div className="relative z-10 text-center">
                  <span className="text-gray-500 font-mono text-sm">ARCHITECTURAL PREVIEW</span>
                  <div className="mt-4 flex gap-4 justify-center">
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"><Search className="text-cyan-400"/></div>
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"><BarChart3 className="text-purple-400"/></div>
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
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Search className="w-5 h-5 text-cyan-400" />
                  </div>
                  System Intelligence
                </h2>
                <div className="prose prose-invert max-w-none text-gray-400 text-lg leading-relaxed">
                  <p>
                    This system leverages <strong>Groundcover (eBPF)</strong> for deep protocol inspection without sidecar injection, combined with <strong>Prometheus</strong> and <strong>Grafana</strong> for metric visualization. 
                    The architecture enables granular insights into network latency, pod health, and cross-service communication.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Database className="w-5 h-5 text-purple-400" />
                  </div>
                  Data Strategy
                </h2>
                <div className="space-y-8">
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-bold mb-4 text-white">ClickHouse Long-term Storage</h3>
                    <p className="text-gray-400">
                      Logs and traces are aggregated and moved to <strong>ClickHouse</strong> for high-performance analytical queries, allowing for historical trend analysis and capacity planning.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 sticky top-32">
                <h3 className="text-xl font-bold mb-6 uppercase tracking-wider text-cyan-400 text-sm">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {["Kubernetes", "Prometheus", "Grafana", "eBPF", "ClickHouse", "Python", "Alertmanager", "Loki", "Tempo"].map((tech) => (
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
