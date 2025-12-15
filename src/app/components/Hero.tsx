"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, Activity, Shield, Zap, Users, TrendingUp, Clock, Globe, Wrench, ArrowRight } from "lucide-react"

export default function Hero() {
  const stats = [
    { icon: Clock, label: "Years Experience", value: "2.6+", color: "text-blue-400" },
    { icon: TrendingUp, label: "Uptime Achieved", value: "99.9%", color: "text-green-400" },
    { icon: Globe, label: "Cloud Platforms", value: "5+", color: "text-purple-400" },
    { icon: Wrench, label: "DevOps Tools", value: "50+", color: "text-orange-400" },
  ]

  const quickActions = [
    { label: "View Experience", section: "experience", icon: Users },
    { label: "See Projects", section: "projects", icon: Server },
    { label: "Technical Skills", section: "skills", icon: Zap },
    { label: "Contact Me", section: "contact", icon: ArrowRight },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400 px-4 py-2">
              <Activity className="w-4 h-4 mr-2" />
              Available for New Opportunities
            </Badge>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Senior SRE &{" "}
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              DevOps Engineer
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Architecting resilient systems, optimizing performance, and driving operational excellence through advanced
            observability, automation, and cloud-native technologies.
          </motion.p>

          {/* Specializations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {[
              { icon: Server, text: "Kubernetes & Containerization" },
              { icon: Activity, text: "Observability & Monitoring" },
              { icon: Shield, text: "Infrastructure Security" },
              { icon: Zap, text: "Performance Optimization" },
            ].map((item, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-slate-800/50 border-slate-700 text-gray-300 px-4 py-2 text-sm"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.text}
              </Badge>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300"
                onClick={() => {
                  const element = document.getElementById(action.section)
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <action.icon className="w-5 h-5 mr-2" />
                {action.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-gray-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
