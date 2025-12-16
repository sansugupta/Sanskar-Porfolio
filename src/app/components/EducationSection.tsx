"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Calendar, Award, MapPin } from "lucide-react"

export default function EducationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="education" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]" />
      
      <div className="relative z-10 w-full mx-auto px-8 md:px-16 lg:px-24" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm">05.</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Education</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-all group">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    Bachelor of Technology (B.Tech)
                  </h3>
                  <p className="text-xl text-purple-400 font-medium mb-3">
                    Computer Science Engineering
                  </p>
                  <div className="flex flex-wrap gap-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>ITM College, Gwalior</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Aug 2019 - Jul 2023</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:text-right">
                <div className="inline-flex flex-col items-center md:items-end p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <Award className="w-6 h-6 text-green-400 mb-1" />
                  <span className="text-2xl font-bold text-green-400">7.85</span>
                  <span className="text-xs text-gray-400">CGPA / 10</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Relevant Coursework & Skills Acquired
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Data Structures & Algorithms",
                  "Operating Systems",
                  "Computer Networks",
                  "Database Management",
                  "Cloud Computing",
                  "Software Engineering",
                  "Linux Administration",
                  "System Design"
                ].map((course, index) => (
                  <motion.span
                    key={course}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="px-3 py-1.5 rounded-lg text-sm bg-white/5 text-gray-300 border border-white/10"
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
