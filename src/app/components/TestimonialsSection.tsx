"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Paisley",
    role: "DevOps Support",
    message: "Exceptional DevOps expertise! Sanskar streamlined our CI/CD pipeline and reduced deployment time by 60%. His proactive approach to infrastructure optimization was invaluable.",
    rating: 5,
    project: "DevOps Infrastructure Optimization"
  },
  {
    name: "Muna",
    role: "SRE Support",
    message: "Outstanding SRE support! Sanskar's monitoring solutions and incident response workflows have significantly improved our system reliability. His technical depth is impressive.",
    rating: 5,
    project: "Site Reliability Engineering"
  },
  {
    name: "Oluwakush",
    role: "SRE Support",
    message: "Sanskar delivered excellent SRE solutions with comprehensive observability and alerting systems. His expertise in kubernetes and cloud infrastructure is top-notch.",
    rating: 5,
    project: "Cloud Infrastructure & Monitoring"
  },
  {
    name: "Sean",
    role: "DevOps Support",
    message: "Professional and efficient DevOps support! Sanskar automated our entire deployment process and implemented robust security practices. Highly recommended!",
    rating: 5,
    project: "DevOps Automation & Security"
  },
  {
    name: "Jason",
    role: "DevOps Project",
    message: "Excellent work on Traefik setup and bidder application deployment! Sanskar's expertise in container orchestration and load balancing was exactly what we needed. Flawless execution!",
    rating: 5,
    project: "Traefik Setup & Application Deployment"
  }
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-32 overflow-hidden bg-[#0a0a0f]">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-transparent" />
      
      <div className="relative w-full mx-auto px-8 md:px-16 lg:px-24">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative h-full bg-gradient-to-br from-[#12121a] to-[#1a1a2e] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <Quote className="w-8 h-8 text-cyan-400/30" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  "{testimonial.message}"
                </p>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-white font-semibold mb-1">{testimonial.name}</h4>
                  <p className="text-cyan-400 text-sm font-medium mb-2">{testimonial.role}</p>
                  <p className="text-gray-500 text-xs font-mono">{testimonial.project}</p>
                </div>

                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 border-2 border-[#0a0a0f] flex items-center justify-center text-xs font-bold text-white"
                >
                  {testimonials[i].name[0]}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              Trusted by <span className="text-cyan-400 font-semibold">50+</span> clients worldwide
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
