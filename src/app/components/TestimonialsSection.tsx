"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Star, Quote, Server, Container, GitBranch, Cloud, Gauge, Shield, Database, Terminal, Cpu, Workflow } from "lucide-react"
import { useRef } from "react"

const testimonials = [
  {
    name: "Paisley",
    role: "DevOps Support",
    message: "Exceptional DevOps expertise! Sanskar streamlined our CI/CD pipeline and reduced deployment time by 60%. His proactive approach to infrastructure optimization was invaluable.",
    rating: 5,
    project: "DevOps Infrastructure Optimization",
    icon: GitBranch,
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    name: "Muna",
    role: "SRE Support",
    message: "Outstanding SRE support! Sanskar's monitoring solutions and incident response workflows have significantly improved our system reliability. His technical depth is impressive.",
    rating: 5,
    project: "Site Reliability Engineering",
    icon: Gauge,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Oluwakush",
    role: "SRE Support",
    message: "Sanskar delivered excellent SRE solutions with comprehensive observability and alerting systems. His expertise in kubernetes and cloud infrastructure is top-notch.",
    rating: 5,
    project: "Cloud Infrastructure & Monitoring",
    icon: Cloud,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    name: "Sean",
    role: "DevOps Support",
    message: "Professional and efficient DevOps support! Sanskar automated our entire deployment process and implemented robust security practices. Highly recommended!",
    rating: 5,
    project: "DevOps Automation & Security",
    icon: Shield,
    gradient: "from-orange-500 to-red-500"
  },
  {
    name: "Jason",
    role: "DevOps Project",
    message: "Excellent work on Traefik setup and bidder application deployment! Sanskar's expertise in container orchestration and load balancing was exactly what we needed. Flawless execution!",
    rating: 5,
    project: "Traefik Setup & Application Deployment",
    icon: Container,
    gradient: "from-indigo-500 to-violet-500"
  }
]

const floatingIcons = [
  { Icon: Server, delay: 0, duration: 20 },
  { Icon: Container, delay: 2, duration: 25 },
  { Icon: Database, delay: 4, duration: 22 },
  { Icon: Terminal, delay: 1, duration: 24 },
  { Icon: Cpu, delay: 3, duration: 21 },
  { Icon: Workflow, delay: 5, duration: 23 },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-32 overflow-hidden bg-[#0a0a0f]">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-transparent" />
      
        {floatingIcons.map((item, index) => {
          const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1200
          const randomX = () => Math.random() * viewportWidth
          const randomY = () => Math.random() * 800 - 400

          return (
            <motion.div
              key={index}
              className="absolute pointer-events-none"
              initial={{ 
                x: randomX(),
                y: randomY(),
                opacity: 0
              }}
              animate={{
                x: [randomX(), randomX(), randomX()],
                y: [randomY(), randomY(), randomY()],
                opacity: [0, 0.15, 0.15, 0],
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <item.Icon className="w-8 h-8 text-cyan-400/30" />
            </motion.div>
          )
        })}


      <motion.div style={{ opacity }} className="relative w-full mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
              <Quote className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">Client Testimonials</span>
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
              What Clients Say
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real feedback from clients I've had the privilege to work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -12, 
                rotateY: 5,
                scale: 1.02,
                transition: { duration: 0.3 } 
              }}
              className="group relative perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative h-full bg-gradient-to-br from-[#12121a] to-[#1a1a2e] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-500 backdrop-blur-sm">
                <motion.div
                  className="absolute -top-6 -right-6 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  }}
                  className={`absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center shadow-2xl border-4 border-[#0a0a0f]`}
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.15,
                    transition: { duration: 0.6 }
                  }}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                >
                  <testimonial.icon className="w-8 h-8 text-white" />
                </motion.div>

                <div className="flex items-start justify-between mb-4">
                  <Quote className="w-8 h-8 text-cyan-400/30" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: index * 0.1 + i * 0.05,
                          type: "spring",
                          stiffness: 200
                        }}
                        viewport={{ once: true }}
                      >
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6 relative z-10">
                  "{testimonial.message}"
                </p>

                <div className="pt-4 border-t border-white/10">
                  <motion.h4 
                    className="text-white font-semibold mb-1"
                    whileHover={{ x: 5, color: "#22d3ee" }}
                    transition={{ duration: 0.2 }}
                  >
                    {testimonial.name}
                  </motion.h4>
                  <p className="text-cyan-400 text-sm font-medium mb-2">{testimonial.role}</p>
                  <p className="text-gray-500 text-xs font-mono">{testimonial.project}</p>
                </div>

                <motion.div 
                  className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "linear"
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex -space-x-3">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} border-4 border-[#0a0a0f] flex items-center justify-center text-sm font-bold text-white shadow-lg`}
                  initial={{ scale: 0, x: -20 }}
                  whileInView={{ scale: 1, x: 0 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.3, 
                    zIndex: 10,
                    transition: { duration: 0.2 }
                  }}
                >
                  {testimonial.name[0]}
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              Trusted by <motion.span 
                className="text-cyan-400 font-semibold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                50+
              </motion.span> clients worldwide
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
