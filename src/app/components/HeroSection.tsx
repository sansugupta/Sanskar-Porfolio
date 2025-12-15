"use client"

import { motion } from "framer-motion"
import { ArrowDown, Terminal, Server, Activity, Shield, Code2, Cloud, Users } from "lucide-react"

function UpworkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
    </svg>
  )
}

export default function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.preventDefault()
    window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url } }, "*")
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0a0f] to-[#0a0a0f]" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
        backgroundSize: "40px 40px"
      }} />

      <div className="relative z-[50] max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex flex-wrap justify-center gap-3"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-mono">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Available for Contractual Projects
          </span>
          <a
            href="https://www.upwork.com/freelancers/~01573b18bcb0f2c7c9"
            onClick={(e) => handleExternalLink(e, "https://www.upwork.com/freelancers/~01573b18bcb0f2c7c9")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14a800]/10 border border-[#14a800]/30 text-[#14a800] text-sm font-mono hover:bg-[#14a800]/20 transition-colors"
          >
            <UpworkIcon className="w-4 h-4" />
            Hire on Upwork
          </a>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
        >
          <span className="text-white">Sanskar</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Gupta
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <Terminal className="w-5 h-5 text-cyan-400" />
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            DevOps & SRE Specialist | Full-Stack Developer
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <Users className="w-4 h-4 text-purple-400" />
          <p className="text-purple-400 font-medium">
            Team Lead at <span className="text-white">InfraBuild Partners</span>
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          3+ years architecting AWS cloud infrastructure, Kubernetes orchestration, and CI/CD pipelines. 
          Supporting big projects with 24x7 SRE support, achieving 99.9% uptime for mission-critical applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {[
            { icon: Server, label: "Kubernetes & AWS", color: "text-cyan-400" },
            { icon: Activity, label: "Observability & Monitoring", color: "text-green-400" },
            { icon: Shield, label: "DevSecOps", color: "text-purple-400" },
            { icon: Code2, label: "Full-Stack Development", color: "text-pink-400" },
            { icon: Cloud, label: "Cloud Architecture", color: "text-blue-400" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm hover:border-white/20 transition-colors"
            >
              <item.icon className={`w-4 h-4 ${item.color}`} />
              {item.label}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12"
        >
          {[
            { value: "3+", label: "Years Experience" },
            { value: "99.9%", label: "Uptime Achieved" },
            { value: "1M+", label: "Daily Users Served" },
            { value: "24/7", label: "Enterprise Support" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="https://www.upwork.com/freelancers/~01573b18bcb0f2c7c9"
            onClick={(e) => handleExternalLink(e, "https://www.upwork.com/freelancers/~01573b18bcb0f2c7c9")}
            className="px-6 py-3 rounded-lg bg-[#14a800] text-white font-medium flex items-center gap-2 hover:bg-[#14a800]/90 transition-colors"
          >
            <UpworkIcon className="w-5 h-5" />
            View Upwork Profile
          </a>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
          >
            Start a Project
          </button>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-white transition-colors"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  )
}