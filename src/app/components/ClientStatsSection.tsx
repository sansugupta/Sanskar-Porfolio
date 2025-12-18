"use client"

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Users, Globe, TrendingUp, Award } from "lucide-react"

const stats = [
  {
    value: 60,
    suffix: "+",
    label: "Clients Served",
    icon: Users,
    color: "from-cyan-400 to-blue-500",
    delay: 0
  },
  {
    value: 240,
    suffix: "+",
    label: "Global Projects",
    icon: Globe,
    color: "from-purple-400 to-pink-500",
    delay: 0.2
  },
  {
    value: 7,
    suffix: "+",
    label: "Industry Domain",
    icon: Award,
    color: "from-green-400 to-emerald-500",
    delay: 0.4
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Retention",
    icon: TrendingUp,
    color: "from-orange-400 to-red-500",
    delay: 0.6
  }
]

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100
  })
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString()
      }
    })
    return unsubscribe
  }, [springValue])

  return <span ref={ref}>0</span>
}

export default function ClientStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" })

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-purple-950/20 to-[#0a0a0f]" />
      
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
              <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Impact & Results
              </span>
            </div>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Delivering Excellence Worldwide
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: stat.delay,
                type: "spring",
                stiffness: 100
              }}
              className="group relative"
            >
              <motion.div
                  className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}
                />
              
              <motion.div
                className="relative h-full bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-2xl p-8 border border-white/10 group-hover:border-cyan-500/30 transition-all duration-500"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="mb-6 relative"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto relative`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-white/20"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                    <stat.icon className="w-8 h-8 text-white relative z-10" />
                  </motion.div>
                </motion.div>

                <div className="text-center">
                  <motion.div
                    className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-br bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`
                    }}
                    className={`text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}
                  >
                    <AnimatedCounter value={stat.value} />
                    <span>{stat.suffix}</span>
                  </motion.div>
                  
                  <motion.p
                    className="text-gray-400 text-sm font-medium tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: stat.delay + 0.3 }}
                  >
                    {stat.label}
                  </motion.p>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    backgroundImage: `linear-gradient(90deg, var(--tw-gradient-stops))`
                  }}
                  className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10"
            whileHover={{ scale: 1.05, borderColor: "rgba(6, 182, 212, 0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-400"
            />
            <p className="text-sm text-gray-400">
              Currently serving clients across <span className="text-cyan-400 font-semibold">15+ countries</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
