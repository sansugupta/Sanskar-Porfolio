"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Award, Users } from "lucide-react"

export default function About() {
  const highlights = [
    {
      icon: Calendar,
      title: "2.6+ Years",
      description: "Professional Experience",
      color: "text-blue-400",
    },
    {
      icon: Award,
      title: "99.9% Uptime",
      description: "System Reliability",
      color: "text-green-400",
    },
    {
      icon: Users,
      title: "Enterprise Scale",
      description: "Financial Institutions",
      color: "text-purple-400",
    },
    {
      icon: MapPin,
      title: "Global Remote",
      description: "Israel & India",
      color: "text-orange-400",
    },
  ]

  const certifications = [
    "AWS Certified Solutions Architect",
    "Kubernetes Administrator (CKA)",
    "Prometheus Certified Associate",
    "Terraform Associate",
  ]

  return (
    <section id="about" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Passionate about building resilient, scalable systems
            </h3>

            <p className="text-gray-300 leading-relaxed">
              I'm a Site Reliability Engineer with 2.6+ years of experience architecting next-generation observability
              ecosystems. Currently working at GigaSpaces, I specialize in eBPF-powered monitoring solutions and
              cloud-native technologies.
            </p>

            <p className="text-gray-300 leading-relaxed">
              My journey began with a passion for automation and system optimization. I've successfully reduced MTTR by
              60%, achieved 99.9% uptime for mission-critical applications, and built monitoring solutions that process
              10M+ metrics per minute across 20+ Kubernetes clusters.
            </p>

            <p className="text-gray-300 leading-relaxed">
              I believe in proactive monitoring over reactive firefighting, and I'm constantly exploring cutting-edge
              technologies like eBPF, Groundcover, and advanced observability patterns to transform how we monitor and
              maintain distributed systems.
            </p>

            {/* Certifications */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4">Certifications & Training</h4>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="border-slate-600 text-gray-300">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-red-500/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <item.icon className={`w-8 h-8 mx-auto mb-3 ${item.color}`} />
                    <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
