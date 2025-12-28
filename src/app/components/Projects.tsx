"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Star, GitFork, Download } from "lucide-react"

export default function Projects() {
  const projects = [
    {
      title: "Enterprise Kubernetes Observability",
      description:
        "Comprehensive observability solution for enterprise Kubernetes environments using eBPF technology, Prometheus, and Grafana for real-time monitoring and alerting.",
      image: "/images/observability-dashboard.png",
      technologies: ["eBPF", "Kubernetes", "Prometheus", "Grafana", "Go", "Python"],
      github: "https://github.com/sansugupta/Obeservability---Portfolio",
      stars: 124,
      forks: 32,
      featured: true,
    },
    {
      title: "AI-Powered Observability Automation",
      description:
        "Machine learning-driven automation platform that predicts system failures and automatically scales infrastructure based on observability metrics and patterns.",
      image: "/images/ai-observability-dashboard.png",
      technologies: ["Python", "TensorFlow", "Kubernetes", "Prometheus", "FastAPI", "Docker"],
      github: "https://github.com/sansugupta/ai-observability",
      stars: 89,
      forks: 21,
      featured: true,
    },
    {
      title: "Ad Bidding System with Traefik on AWS EKS",
      description:
        "High-performance ad bidding system deployed on AWS EKS with Traefik for secure HTTPS traffic routing from Google AdX, featuring TLS termination and load balancing.",
      image: "/images/bidder-architecture.png",
      technologies: ["AWS EKS", "Traefik", "Docker", "Kubernetes", "Let's Encrypt", "NLB"],
      github: "https://github.com/sansugupta/Bidder-Deployement-with-Traefik",
      stars: 78,
      forks: 25,
      featured: true,
    },
    {
      title: "Three-Tier Web Application on AWS EKS",
      description:
        "Scalable three-tier web application deployed on AWS EKS with automated CI/CD pipelines, monitoring, and infrastructure as code using Terraform.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["AWS EKS", "Terraform", "Jenkins", "Docker", "React", "Node.js"],
      github: "https://github.com/sansugupta/3-tier-HQ",
      stars: 67,
      forks: 18,
      featured: false,
    },
    {
      title: "Cloud-Native Full-Stack Board Game",
      description:
        "Modern board game web application built with cloud-native principles, featuring real-time multiplayer gameplay, microservices architecture, and Kubernetes deployment.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Kubernetes", "Docker"],
      github: "https://github.com/sansugupta/Boardgame-CI-CD-Pipeline",
      stars: 45,
      forks: 12,
      featured: false,
    },
    {
      title: "Python API Server with K8s Deployment",
      description:
        "RESTful API server built with Python FastAPI, containerized with Docker, and deployed on Kubernetes with comprehensive monitoring and logging solutions.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["Python", "FastAPI", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
      github: "https://github.com/sansugupta/PythonAPI_Server",
      stars: 38,
      forks: 9,
      featured: false,
    },
    {
      title: "Apache Kafka on Kubernetes",
      description:
        "Production-ready Apache Kafka deployment on Kubernetes with Strimzi operator, monitoring with Prometheus, and automated scaling based on message throughput.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["Apache Kafka", "Kubernetes", "Strimzi", "Prometheus", "Grafana", "Helm"],
      github: "https://github.com/sansugupta/Apache-Kafka-Approaches",
      stars: 56,
      forks: 15,
      featured: false,
    },
    {
      title: "Java Application Monitoring Stack Deployment",
      description:
        "Java Application POC cluster including Prometheus, Loki, Grafana, OpenTelemetry, and Postgres Exporter with automated deployment scripts.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["Prometheus", "Loki", "Grafana", "OpenTelemetry", "Kubernetes", "Helm"],
      github: "https://github.com/sansugupta/JITPS",
      stars: 42,
      forks: 11,
      featured: false,
    },
    {
      title: "Ruby on Rails Application Deployment",
      description:
        "Complete Ruby on Rails application deployment with containerization, CI/CD pipelines, and cloud infrastructure setup for scalable web applications.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["Ruby on Rails", "Docker", "Kubernetes", "PostgreSQL", "Redis", "Nginx"],
      github: "https://github.com/sansugupta/Ruby-on-Rails-Application-Deployment",
      stars: 34,
      forks: 8,
      featured: false,
    },
  ]

  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  const handleDownloadResume = () => {
    // Open Google Drive link in new tab
    window.open("https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Sanskar_Gupta_DevOps___Resume_-1766926349883.pdf", "_blank")
  }

  return (
    <section id="projects" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            A showcase of my work in DevOps, SRE, and cloud-native technologies
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-slate-800/50 backdrop-blur-md border-slate-700 hover:border-red-500/50 transition-all duration-300 h-full overflow-hidden">
                <div className="relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=200&width=400"
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-red-500 text-white">Featured</Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-white text-xl">{project.title}</CardTitle>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <div className="flex items-center gap-1">
                        <Star size={14} />
                        {project.stars}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork size={14} />
                        {project.forks}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="border-slate-600 text-gray-300 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Other Notable Projects</h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <Card className="bg-slate-800/50 backdrop-blur-md border-slate-700 hover:border-red-500/50 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-white text-lg">{project.title}</CardTitle>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <div className="flex items-center gap-1">
                        <Star size={12} />
                        {project.stars}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork size={12} />
                        {project.forks}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="border-slate-600 text-gray-300 text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="border-slate-600 text-gray-400 text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-slate-600 text-gray-300 hover:bg-slate-700 text-xs bg-transparent"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github size={14} className="mr-1" />
                        View Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Resume Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600 max-w-md mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-white mb-4">Download Resume</h3>
              <p className="text-gray-300 mb-6">Get a detailed overview of my experience and skills</p>
              <Button
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold"
                onClick={handleDownloadResume}
              >
                <Download size={20} className="mr-2" />
                Download Resume
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
