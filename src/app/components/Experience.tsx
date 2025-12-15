"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building, TrendingUp } from "lucide-react"

export default function Experience() {
  const experiences = [
    {
      company: "GigaSpaces",
      position: "Site Reliability Engineer",
      location: "Israel (Remote)",
      duration: "Nov 2023 - Present",
      type: "Full-time",
      description:
        "Leading eBPF-based observability initiatives for enterprise Kubernetes environments, implementing zero-instrumentation monitoring solutions that process 10M+ metrics per minute.",
      achievements: [
        "Architected enterprise observability platform using Groundcover and eBPF technology",
        "Reduced MTTR by 65% through intelligent alerting and automated remediation workflows",
        "Implemented ML-enhanced monitoring reducing false positives by 75%",
        "Achieved 99.9% uptime for mission-critical financial applications",
        "Saved $250K+ annually through infrastructure optimization and resource management",
      ],
      technologies: ["eBPF", "Groundcover", "Kubernetes", "Prometheus", "Grafana", "ClickHouse", "Python", "Go"],
      impact: {
        uptime: "99.9%",
        mttr: "-65%",
        savings: "$250K+",
        metrics: "10M+/min",
      },
    },
    {
      company: "Karix Mobile",
      position: "DevOps Engineer",
      location: "India",
      duration: "Aug 2024 - Oct 2024",
      type: "Contract",
      description:
        "Developed AI-powered observability automation systems with advanced data correlation engines and predictive analytics for proactive infrastructure management.",
      achievements: [
        "Built automated observability platform with 95% accurate failure prediction",
        "Integrated Real User Monitoring (RUM) with ClickHouse for enhanced UX analytics",
        "Developed data correlation engine improving incident response by 40%",
        "Implemented self-healing workflows reducing manual intervention by 87%",
        "Created comprehensive monitoring dashboards with business KPI correlation",
      ],
      technologies: ["Python", "ClickHouse", "RUM", "Machine Learning", "Automation", "Kubernetes", "Docker"],
      impact: {
        accuracy: "95%",
        response: "+40%",
        automation: "87%",
        prediction: "Real-time",
      },
    },
    {
      company: "Cogoport",
      position: "DevOps Engineer",
      location: "India",
      duration: "Jul 2022 - Oct 2023",
      type: "Full-time",
      description:
        "Managed cloud-native infrastructure and CI/CD pipelines for logistics platform serving global supply chain operations with high availability requirements.",
      achievements: [
        "Designed and implemented comprehensive CI/CD pipelines using Jenkins and GitOps",
        "Managed 20+ Kubernetes clusters with advanced orchestration and monitoring",
        "Implemented infrastructure as code using Terraform and Ansible",
        "Established monitoring and alerting systems with Prometheus and Grafana",
        "Optimized container orchestration reducing deployment time by 60%",
      ],
      technologies: ["Kubernetes", "Docker", "Jenkins", "Terraform", "Ansible", "AWS", "Prometheus", "Grafana"],
      impact: {
        clusters: "20+",
        deployment: "-60%",
        availability: "99.8%",
        automation: "Full CI/CD",
      },
    },
  ]

  return (
    <section id="experience" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Professional Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            2.6+ years of hands-on experience in Site Reliability Engineering, DevOps, and cloud-native technologies
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="bg-slate-800/50 backdrop-blur-md border-slate-700 hover:border-red-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl text-white mb-2">{exp.position}</CardTitle>
                      <div className="flex items-center gap-4 text-gray-300">
                        <div className="flex items-center gap-2">
                          <Building size={16} className="text-blue-400" />
                          <span className="font-semibold">{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-green-400" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-purple-400" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-red-500/30 text-red-400 w-fit">
                      {exp.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">{exp.description}</p>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {Object.entries(exp.impact).map(([key, value], i) => (
                      <div key={i} className="bg-slate-700/30 rounded-lg p-3 text-center border border-slate-600/30">
                        <div className="text-lg font-bold text-red-400">{value}</div>
                        <div className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                      </div>
                    ))}
                  </div>

                  {/* Key Achievements */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp size={18} className="text-green-400" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start text-gray-300">
                          <span className="text-red-500 mr-3 mt-1">▸</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Technologies & Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <Badge key={i} variant="outline" className="border-slate-600 text-gray-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Career Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Career Progression & Impact</h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">2.6+</div>
                  <div className="text-gray-300">Years of Experience</div>
                  <div className="text-gray-400 text-sm mt-1">Continuous Growth</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                  <div className="text-gray-300">Average Uptime</div>
                  <div className="text-gray-400 text-sm mt-1">Across All Roles</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-400 mb-2">$250K+</div>
                  <div className="text-gray-300">Cost Savings</div>
                  <div className="text-gray-400 text-sm mt-1">Through Optimization</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
