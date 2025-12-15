"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, Cloud, Database, Code, Shield, Activity, GitBranch, Container } from "lucide-react"

export default function Skills() {
  const skillCategories = [
    {
      title: "Site Reliability Engineering",
      icon: Activity,
      color: "text-red-500",
      skills: [
        { name: "Monitoring & Alerting", level: "Expert", years: "3+", icon: "⭐" },
        { name: "Incident Management", level: "Expert", years: "3+", icon: "⭐" },
        { name: "SLI/SLO/SLA Design", level: "Proficient", years: "2+", icon: "✅" },
        { name: "Capacity Planning", level: "Proficient", years: "2+", icon: "✅" },
        { name: "Performance Optimization", level: "Expert", years: "3+", icon: "⭐" },
        { name: "Disaster Recovery", level: "Proficient", years: "2+", icon: "✅" },
      ],
    },
    {
      title: "Cloud Platforms",
      icon: Cloud,
      color: "text-blue-500",
      skills: [
        { name: "Amazon Web Services", level: "Expert", years: "4+", icon: "⭐" },
        { name: "Google Cloud Platform", level: "Proficient", years: "2+", icon: "✅" },
        { name: "Microsoft Azure", level: "Familiar", years: "1+", icon: "🕐" },
        { name: "Cloud Architecture", level: "Expert", years: "3+", icon: "⭐" },
        { name: "Serverless Computing", level: "Proficient", years: "2+", icon: "✅" },
        { name: "Multi-Cloud Strategy", level: "Proficient", years: "2+", icon: "✅" },
      ],
    },
    {
      title: "DevOps & Automation",
      icon: GitBranch,
      color: "text-green-500",
      skills: [
        { name: "CI/CD Pipelines", level: "Expert", years: "4+", icon: "⭐" },
        { name: "Infrastructure as Code", level: "Expert", years: "3+", icon: "⭐" },
        { name: "Terraform", level: "Expert", years: "3+", icon: "⭐" },
        { name: "Ansible", level: "Proficient", years: "2+", icon: "✅" },
        { name: "Jenkins", level: "Expert", years: "3+", icon: "⭐" },
        { name: "GitLab CI", level: "Proficient", years: "2+", icon: "✅" },
      ],
    },
    {
      title: "Containerization",
      icon: Container,
      color: "text-purple-500",
      skills: [
        { name: "Docker", level: "Expert", years: "4+", icon: "⭐" },
        { name: "Kubernetes", level: "Expert", years: "3+", icon: "⭐" },
        { name: "Helm Charts", level: "Proficient", years: "2+", icon: "✅" },
        { name: "Container Security", level: "Proficient", years: "2+", icon: "✅" },
        { name: "Service Mesh", level: "Familiar", years: "1+", icon: "🕐" },
        { name: "Container Orchestration", level: "Expert", years: "3+", icon: "⭐" },
      ],
    },
    {
      title: "Monitoring & Observability",
      icon: Server,
      color: "text-orange-500",
      skills: [
        { name: "Prometheus", level: "Expert", years: "3+", icon: "⭐" },
        { name: "Grafana", level: "Expert", years: "3+", icon: "⭐" },
        { name: "ELK Stack", level: "Expert", years: "3+", icon: "⭐" },
        { name: "Jaeger Tracing", level: "Proficient", years: "2+", icon: "✅" },
        { name: "New Relic", level: "Proficient", years: "2+", icon: "✅" },
        { name: "DataDog", level: "Familiar", years: "1+", icon: "🕐" },
      ],
    },
    {
      title: "Programming & Scripting",
      icon: Code,
      color: "text-cyan-500",
      skills: [
        { name: "Python", level: "Expert", years: "4+", icon: "⭐" },
        { name: "Bash/Shell", level: "Expert", years: "4+", icon: "⭐" },
        { name: "Go", level: "Proficient", years: "2+", icon: "✅" },
        { name: "JavaScript/Node.js", level: "Proficient", years: "2+", icon: "✅" },
        { name: "YAML/JSON", level: "Expert", years: "4+", icon: "⭐" },
        { name: "SQL", level: "Proficient", years: "3+", icon: "✅" },
      ],
    },
    {
      title: "Database Technologies",
      icon: Database,
      color: "text-yellow-500",
      skills: [
        { name: "PostgreSQL", level: "Proficient", years: "3+", icon: "✅" },
        { name: "MySQL", level: "Proficient", years: "3+", icon: "✅" },
        { name: "MongoDB", level: "Proficient", years: "2+", icon: "✅" },
        { name: "Redis", level: "Proficient", years: "2+", icon: "✅" },
        { name: "Database Optimization", level: "Proficient", years: "2+", icon: "✅" },
        { name: "Backup & Recovery", level: "Expert", years: "3+", icon: "⭐" },
      ],
    },
    {
      title: "Security & Compliance",
      icon: Shield,
      color: "text-pink-500",
      skills: [
        { name: "Security Scanning", level: "Proficient", years: "2+", icon: "✅" },
        { name: "Vulnerability Assessment", level: "Proficient", years: "2+", icon: "✅" },
        { name: "Compliance Auditing", level: "Familiar", years: "1+", icon: "🕐" },
        { name: "Network Security", level: "Proficient", years: "2+", icon: "✅" },
        { name: "Identity Management", level: "Proficient", years: "2+", icon: "✅" },
        { name: "SSL/TLS Management", level: "Expert", years: "3+", icon: "⭐" },
      ],
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Proficient":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Familiar":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

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
            Technical <span className="text-red-500">Expertise</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive skill set spanning Site Reliability Engineering, DevOps practices, and modern cloud
            technologies with hands-on production experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                    <div>
                      <CardTitle className="text-xl text-white">{category.title}</CardTitle>
                      <CardDescription className="text-gray-400">{category.skills.length} skills</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{skill.icon}</span>
                          <div>
                            <p className="text-white font-medium group-hover:text-red-400 transition-colors">
                              {skill.name}
                            </p>
                            <p className="text-sm text-gray-400">{skill.years} years experience</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={`${getLevelColor(skill.level)} border text-xs font-medium`}>
                          {skill.level}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Skill Level Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="bg-slate-800/30 border-slate-700 backdrop-blur-sm inline-block">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Proficiency Levels</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">⭐</span>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Expert</Badge>
                  <span className="text-sm text-gray-400">3+ years, production experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">✅</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Proficient</Badge>
                  <span className="text-sm text-gray-400">2+ years, solid knowledge</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🕐</span>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Familiar</Badge>
                  <span className="text-sm text-gray-400">1+ year, learning/basic</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
