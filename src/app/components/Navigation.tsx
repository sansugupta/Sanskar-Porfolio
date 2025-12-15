"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Github, Linkedin, Mail, FileText, MessageCircle } from "lucide-react"

function UpworkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
    </svg>
  )
}

const navItems = [
  { id: "hero", label: "Home" },
  { id: "infrabuild", label: "InfraBuild" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.preventDefault()
    window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url } }, "*")
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <motion.button
              onClick={() => scrollToSection("hero")}
              whileHover={{ scale: 1.05 }}
              className="font-mono text-lg font-bold"
            >
              <span className="text-cyan-400">&lt;</span>
              <span className="text-white">SG</span>
              <span className="text-cyan-400">/&gt;</span>
            </motion.button>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id ? "text-cyan-400" : "text-gray-400 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <motion.a
                href="https://www.upwork.com/freelancers/~01573b18bcb0f2c7c9"
                onClick={(e) => handleExternalLink(e, "https://www.upwork.com/freelancers/~01573b18bcb0f2c7c9")}
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 text-gray-400 hover:text-[#14a800] transition-colors"
                title="Upwork"
              >
                <UpworkIcon className="w-[18px] h-[18px]" />
              </motion.a>
              <motion.a
                href="https://github.com/sansugupta"
                onClick={(e) => handleExternalLink(e, "https://github.com/sansugupta")}
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/sanskargupta9/"
                onClick={(e) => handleExternalLink(e, "https://www.linkedin.com/in/sanskargupta9/")}
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                href="https://wa.me/919713492857"
                onClick={(e) => handleExternalLink(e, "https://wa.me/919713492857")}
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                title="WhatsApp"
              >
                <MessageCircle size={18} />
              </motion.a>
              <motion.a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sanskargupta966@gmail.com"
                onClick={(e) => handleExternalLink(e, "https://mail.google.com/mail/?view=cm&fs=1&to=sanskargupta966@gmail.com")}
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 text-gray-400 hover:text-pink-400 transition-colors"
                title="Email"
              >
                <Mail size={18} />
              </motion.a>
              <motion.button
                onClick={() => {
                  fetch('/resume.pdf').then(response => response.blob()).then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'Sanskar_Gupta_Resume.pdf';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                  });
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-medium rounded-lg flex items-center gap-2"
              >
                <FileText size={16} />
                Resume
              </motion.button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-[#0a0a0f]/95 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-16 bottom-0 w-72 bg-[#12121a] border-l border-white/10 p-6"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeSection === item.id
                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex justify-center gap-3">
                  <a href="https://www.upwork.com/freelancers/~01573b18bcb0f2c7c9" onClick={(e) => handleExternalLink(e, "https://www.upwork.com/freelancers/~01573b18bcb0f2c7c9")} className="p-3 text-gray-400 hover:text-[#14a800] bg-white/5 rounded-lg">
                    <UpworkIcon className="w-5 h-5" />
                  </a>
                  <a href="https://github.com/sansugupta" onClick={(e) => handleExternalLink(e, "https://github.com/sansugupta")} className="p-3 text-gray-400 hover:text-white bg-white/5 rounded-lg">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/sanskargupta9/" onClick={(e) => handleExternalLink(e, "https://www.linkedin.com/in/sanskargupta9/")} className="p-3 text-gray-400 hover:text-cyan-400 bg-white/5 rounded-lg">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://wa.me/919713492857" onClick={(e) => handleExternalLink(e, "https://wa.me/919713492857")} className="p-3 text-gray-400 hover:text-green-400 bg-white/5 rounded-lg">
                    <MessageCircle size={20} />
                  </a>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sanskargupta966@gmail.com" onClick={(e) => handleExternalLink(e, "https://mail.google.com/mail/?view=cm&fs=1&to=sanskargupta966@gmail.com")} className="p-3 text-gray-400 hover:text-pink-400 bg-white/5 rounded-lg">
                    <Mail size={20} />
                  </a>
                </div>
                <button
                  onClick={() => {
                    fetch('/resume.pdf').then(response => response.blob()).then(blob => {
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'Sanskar_Gupta_Resume.pdf';
                      document.body.appendChild(a);
                      a.click();
                      window.URL.revokeObjectURL(url);
                      document.body.removeChild(a);
                    });
                  }}
                  className="mt-4 block w-full text-center px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-medium rounded-lg"
                >
                  Download Resume
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}