"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X, Github, Linkedin, Mail, Instagram } from "lucide-react"

type Section = "hero" | "about" | "experience" | "skills" | "projects" | "achievements" | "analytics" | "contact"

interface HeaderProps {
  activeSection: Section
  setActiveSection: (section: Section) => void
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { id: "hero" as Section, label: "Home" },
    { id: "about" as Section, label: "About" },
    { id: "experience" as Section, label: "Experience" },
    { id: "skills" as Section, label: "Skills" },
    { id: "projects" as Section, label: "Projects" },
    { id: "achievements" as Section, label: "Achievements" },
    { id: "analytics" as Section, label: "Analytics" },
    { id: "contact" as Section, label: "Contact" },
  ]

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/sanskargupta966",
      label: "GitHub",
      hoverColor: "hover:text-gray-300",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/sanskar-gupta-b4b5b5200",
      label: "LinkedIn",
      hoverColor: "hover:text-blue-400",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/sanskargupta966",
      label: "Instagram",
      hoverColor: "hover:text-pink-400",
    },
    {
      icon: Mail,
      href: "mailto:sanskargupta966@gmail.com",
      label: "Email",
      hoverColor: "hover:text-red-400",
    },
  ]

  const handleDownloadResume = () => {
    window.open("https://drive.google.com/file/d/1wkyv6cE8o3FWwUqvy7nZGHnP8wK_6KbX/view?usp=sharing", "_blank")
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 cursor-pointer"
            onClick={() => setActiveSection("hero")}
          >
            <h1 className="text-xl font-bold text-white">
              Sanskar<span className="text-red-500">Gupta</span>
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-red-500 bg-red-500/10"
                    : "text-gray-300 hover:text-white hover:bg-slate-700"
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Social Links & Resume Button */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`text-gray-400 ${social.hoverColor} transition-colors`}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
              className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition-colors"
            >
              Resume
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800 rounded-lg mt-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveSection(item.id)
                    setIsMenuOpen(false)
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-red-500 bg-red-500/10"
                      : "text-gray-300 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}

              {/* Mobile Social Links */}
              <div className="flex justify-center space-x-6 pt-4 pb-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.9 }}
                    className={`text-gray-400 ${social.hoverColor} transition-colors`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>

              {/* Mobile Resume Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleDownloadResume()
                  setIsMenuOpen(false)
                }}
                className="w-full mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition-colors"
              >
                Download Resume
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
