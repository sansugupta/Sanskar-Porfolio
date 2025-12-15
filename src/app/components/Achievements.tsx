"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, TrendingUp, Shield, Clock, Users, Target, BookOpen, Star } from "lucide-react"

export default function Achievements() {
  const achievements = [
    {
      icon: Award,
      title: "High System Uptime",
      description: "Maintained exceptional system reliability across multiple production environments",
      category: "Reliability",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
    },
    {
      icon: TrendingUp,
      title: "Faster Incident Recovery",
      description: "Significantly reduced mean time to recovery through improved monitoring and automation",
      category: "Performance",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      icon: Shield,
      title: "Enhanced Security Posture",
      description: "Implemented comprehensive security measures and compliance frameworks",
      category: "Security",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      icon: Clock,
      title: "Improved Deployment Speed",
      description: "Streamlined CI/CD pipelines resulting in faster and more reliable deployments",
      category: "DevOps",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      icon: Users,
      title: "Team Leadership",
      description: "Led cross-functional teams in implementing SRE best practices and culture",
      category: "Leadership",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
    },
    {
      icon: Target,
      title: "Cost Optimization",
      description: "Achieved significant cost savings through infrastructure optimization and automation",
      category: "Efficiency",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
  ]

  const certifications = [
    {
      title: "DevOps & Cloud Computing Professional",
      issuer: "CETPA Infotech Pvt. Ltd.",
      year: "2024-2025",
      status: "Certified",
      color: "text-green-400",
    },
    {
      title: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2024",
      status: "In Progress",
      color: "text-blue-400",
    },
    {
      title: "Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      year: "2024",
      status: "In Progress",
      color: "text-purple-400",
    },
  ]

  const careerHighlights = [
    {
      metric: "System Reliability",
      description: "Maintained high uptime across critical production systems",
      icon: Shield,
    },
    {
      metric: "Incident Response",
      description: "Improved response times through better monitoring and alerting",
      icon: Clock,
    },
    {
      metric: "Team Collaboration",
      description: "Successfully led multiple cross-functional DevOps initiatives",
      icon: Users,
    },
    {
      metric: "Process Improvement",
      description: "Enhanced deployment processes and infrastructure automation",
      icon: TrendingUp,
    },
  ]

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Achievements & <span className="text-red-500">Recognition</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Key accomplishments and professional milestones in Site Reliability Engineering and DevOps practices.
          </p>
        </motion.div>

        {/* Key Achievements */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-bold text-white mb-8 flex items-center"
          >
            <Star className="w-6 h-6 text-yellow-500 mr-3" />
            Key Achievements
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card
                  className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:${achievement.bgColor} hover:${achievement.borderColor} transition-all duration-300 h-full`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                      <Badge variant="outline" className={`${achievement.color} border-current`}>
                        {achievement.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-white">{achievement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">{achievement.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Career Highlights */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl font-bold text-white mb-8 flex items-center"
          >
            <TrendingUp className="w-6 h-6 text-green-500 mr-3" />
            Career Highlights
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.metric}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + 0.1 * index }}
              >
                <Card className="bg-slate-800/30 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <highlight.icon className="w-8 h-8 text-red-500" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{highlight.metric}</h4>
                        <p className="text-gray-300">{highlight.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <BookOpen className="w-6 h-6 text-blue-500 mr-3" />
            Certifications & Learning
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + 0.1 * index }}
              >
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">{cert.title}</CardTitle>
                    <CardDescription className="text-gray-400">{cert.issuer}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">{cert.year}</span>
                      <Badge variant="outline" className={`${cert.color} border-current`}>
                        {cert.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
