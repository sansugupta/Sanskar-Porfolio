"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import HeroSection from "./components/HeroSection"
import InfraBuildSection from "./components/InfraBuildSection"
import AboutSection from "./components/AboutSection"
import ClientStatsSection from "./components/ClientStatsSection"
import TestimonialsSection from "./components/TestimonialsSection"
import ExperienceSection from "./components/ExperienceSection"
import SkillsSection from "./components/SkillsSection"
import ProjectsSection from "./components/ProjectsSection"
import EducationSection from "./components/EducationSection"
import CertificationsSection from "./components/CertificationsSection"
import ContactSection from "./components/ContactSection"
import Navigation from "./components/Navigation"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0f]">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <Navigation />
      
      <main className="relative">
        <HeroSection />
        <InfraBuildSection />
        <AboutSection />
        <ClientStatsSection />
        <TestimonialsSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      <footer className="py-8 border-t border-white/10 bg-[#0a0a0f]">
        <div className="w-full mx-auto px-8 md:px-16 lg:px-24 text-center">
          <p className="text-gray-500 font-mono text-sm">
            Designed & Built by Sanskar Gupta
          </p>
        </div>
      </footer>
    </div>
  )
}