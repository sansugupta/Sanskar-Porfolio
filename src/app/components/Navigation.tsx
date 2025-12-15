"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Github, Linkedin, Mail, FileText } from "lucide-react"

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
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
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
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

            <div className="hidden lg:flex items-center gap-3">
              <motion.a
                href="https://github.com/sansugupta"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/sanskargupta9/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                href="mailto:sanskargupta966@gmail.com"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 text-gray-400 hover:text-pink-400 transition-colors"
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
                <div className="flex justify-center gap-4">
                  <a href="https://github.com/sansugupta" target="_blank" rel="noopener noreferrer" className="p-3 text-gray-400 hover:text-white bg-white/5 rounded-lg">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/sanskargupta9/" target="_blank" rel="noopener noreferrer" className="p-3 text-gray-400 hover:text-cyan-400 bg-white/5 rounded-lg">
                    <Linkedin size={20} />
                  </a>
                  <a href="mailto:sanskargupta966@gmail.com" className="p-3 text-gray-400 hover:text-pink-400 bg-white/5 rounded-lg">
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