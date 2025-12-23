"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Award, ExternalLink, CheckCircle } from "lucide-react"

const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: "Jun 2022",
    credentialId: "W6ZRHJZDNJVE1TGE",
    score: "755/1000",
    color: "orange",
    skills: ["Cloud Infrastructure", "Linux System Administration", "AWS Services", "Cloud Architecture"]
  },
  {
    title: "Microsoft Technology Associate (MTA)",
    issuer: "Microsoft",
    date: "Jul 2022",
    credentialId: "nbCB-DwhQ",
    color: "cyan",
    skills: ["Complex Sales", "Technical Skills", "Cloud Fundamentals"]
  }
]

const getColorClasses = (color: string) => {
  const colors: Record<string, { text: string; bg: string; border: string }> = {
    orange: { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30" },
    cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
    purple: { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30" },
    green: { text: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" },
  }
  return colors[color] || colors.cyan
}

export default function CertificationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="certifications" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]" />
      
      <div className="relative z-10 w-full mx-auto px-8 md:px-16 lg:px-24" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm">07.</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Certifications</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => {
            const colorClasses = getColorClasses(cert.color)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`group p-6 rounded-xl bg-white/5 border ${colorClasses.border} backdrop-blur-sm hover:bg-white/[0.07] transition-all`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${colorClasses.bg} ${colorClasses.text} group-hover:scale-110 transition-transform`}>
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      {cert.title}
                    </h3>
                    <p className={`text-sm ${colorClasses.text}`}>{cert.issuer}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center justify-between text-gray-400">
                    <span>Issued</span>
                    <span className="text-white">{cert.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <span>Credential ID</span>
                    <span className="text-white font-mono text-xs">{cert.credentialId}</span>
                  </div>
                  {cert.score && (
                    <div className="flex items-center justify-between text-gray-400">
                      <span>Score</span>
                      <span className="text-green-400 font-semibold">{cert.score}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 rounded text-xs ${colorClasses.bg} ${colorClasses.text} border ${colorClasses.border}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verified Certification</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Currently Pursuing</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            {[
              { title: "CKA", desc: "Kubernetes Administrator" },
              { title: "AWS SAA", desc: "Solutions Architect Associate" },
              { title: "Terraform", desc: "Associate Certification" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-cyan-400 font-bold mb-1">{item.title}</p>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}