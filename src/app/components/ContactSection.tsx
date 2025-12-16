"use client"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2, MessageCircle } from "lucide-react"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." })
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus({ type: "error", message: "Failed to send message. Please try again." })
      }
    } catch {
      setSubmitStatus({ type: "error", message: "Network error. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.preventDefault()
    window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url } }, "*")
  }

  const contactInfo = [
    { icon: Mail, label: "Email", value: "sanskargupta966@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=sanskargupta966@gmail.com" },
      { icon: Phone, label: "Phone", value: "+91 9669439887", href: "tel:+919669439887" },
      { icon: MessageCircle, label: "WhatsApp", value: "+91 9669439887", href: "https://wa.me/919669439887" },
    { icon: MapPin, label: "Location", value: "Noida, India", href: null },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/sansugupta", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sanskargupta9/", label: "LinkedIn" },
    { icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=sanskargupta966@gmail.com", label: "Email" },
    { icon: MessageCircle, href: "https://wa.me/919713492857", label: "WhatsApp" },
  ]

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]" />
      
      <div className="relative z-10 w-full mx-auto px-8 md:px-16 lg:px-24" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm">08.</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mt-4 mx-auto" />
          <p className="text-gray-400 mt-6 max-w-lg mx-auto">
            Looking for a reliable technical partner? Whether it's DevOps, SRE, or full-stack development,
            let's discuss how I can help your project succeed!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group"
              >
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{item.label}</p>
                  {item.href ? (
                    <a 
                      href={item.href} 
                      onClick={(e) => handleExternalLink(e, item.href!)}
                      className="text-white hover:text-cyan-400 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="pt-6"
            >
              <p className="text-gray-500 text-sm mb-4">Connect with me</p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    onClick={(e) => handleExternalLink(e, social.href)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/30 transition-all"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 border border-green-500/20 text-green-400"
                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}"use client"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2, MessageCircle } from "lucide-react"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." })
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus({ type: "error", message: "Failed to send message. Please try again." })
      }
    } catch {
      setSubmitStatus({ type: "error", message: "Network error. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.preventDefault()
    window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url } }, "*")
  }

  const contactInfo = [
    { icon: Mail, label: "Email", value: "sanskargupta966@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=sanskargupta966@gmail.com" },
      { icon: Phone, label: "Phone", value: "+91 9669439887", href: "tel:+919669439887" },
      { icon: MessageCircle, label: "WhatsApp", value: "+91 9669439887", href: "https://wa.me/919669439887" },
    { icon: MapPin, label: "Location", value: "Noida, India", href: null },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/sansugupta", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sanskargupta9/", label: "LinkedIn" },
    { icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=sanskargupta966@gmail.com", label: "Email" },
      { icon: MessageCircle, href: "https://wa.me/919669439887", label: "WhatsApp" },
  ]

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]" />
      
      <div className="relative z-10 w-full mx-auto px-8 md:px-16 lg:px-24" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm">08.</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mt-4 mx-auto" />
          <p className="text-gray-400 mt-6 max-w-lg mx-auto">
            Looking for a reliable technical partner? Whether it's DevOps, SRE, or full-stack development,
            let's discuss how I can help your project succeed!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group"
              >
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{item.label}</p>
                  {item.href ? (
                    <a 
                      href={item.href} 
                      onClick={(e) => handleExternalLink(e, item.href!)}
                      className="text-white hover:text-cyan-400 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="pt-6"
            >
              <p className="text-gray-500 text-sm mb-4">Connect with me</p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    onClick={(e) => handleExternalLink(e, social.href)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/30 transition-all"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 border border-green-500/20 text-green-400"
                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}