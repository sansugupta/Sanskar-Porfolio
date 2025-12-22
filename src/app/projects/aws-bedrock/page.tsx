"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Shield, 
  Cpu, 
  Database, 
  Server, 
  Lock, 
  Workflow, 
  Search, 
  CheckCircle2, 
  Code2, 
  ExternalLink 
} from "lucide-react"
import Link from "next/link"

export default function BedrockProjectPage() {
  const roadmapSteps = [
    { title: "Core RAG Module", status: "completed", desc: "Base Agent, Guardrails, Lambda, S3, KMS." },
    { title: "Supervisor Agent", status: "in-progress", desc: "Implementation of a 'Boss' agent to route queries." },
    { title: "SQL Agent", status: "planned", desc: "Sub-agent capability to generate and execute Athena SQL queries." },
    { title: "Vector Integration", status: "planned", desc: "Native integration with OpenSearch Serverless for Knowledge Bases." },
    { title: "Classifier Logic", status: "planned", desc: "Embedded routing logic to distinguish between Reasoning vs. Retrieval tasks." },
  ]

  const components = [
    { icon: <Shield className="w-6 h-6 text-cyan-400" />, name: "Bedrock Guardrails", detail: "Multi-layered PII filtering and topic restriction." },
    { icon: <Cpu className="w-6 h-6 text-purple-400" />, name: "Anthropic Claude 3.5", detail: "SOTA reasoning and response generation." },
    { icon: <Workflow className="w-6 h-6 text-green-400" />, name: "Lambda Orchestration", detail: "Serverless logic for action groups and automation." },
    { icon: <Database className="w-6 h-6 text-orange-400" />, name: "S3 Context Storage", detail: "Encrypted storage for retrieval-augmented context." },
    { icon: <Lock className="w-6 h-6 text-red-400" />, name: "KMS Encryption", detail: "Full data-at-rest and in-transit security." },
    { icon: <Search className="w-6 h-6 text-blue-400" />, name: "Vector Search", detail: "Semantic similarity matching for accurate retrieval." },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-cyan-500/30">
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/#projects" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm tracking-widest uppercase">Back to Projects</span>
          </Link>
          <div className="flex gap-4">
            <Link 
              href="https://github.com/sansugupta/Enterprise-AWS-Bedrock-Agent-Terraform-Module" 
              target="_blank"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-mono transition-colors flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" /> REPO
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-[10px] font-mono tracking-widest uppercase">
                  Production Ready
                </span>
                <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-[10px] font-mono tracking-widest uppercase">
                  Infrastructure as Code
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter">
                AWS Bedrock <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Enterprise Agent</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-xl">
                A standardized, compliant, and fully integrated AI orchestration system. 
                Deploy secure RAG architectures across environments with a single Terraform block.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {["Terraform", "AWS Bedrock", "Python", "Lambda", "Anthropic Claude"].map(tech => (
                  <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square lg:aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5 group shadow-2xl"
            >
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-12-19-at-01.08.49-resized-1766420425913.jpeg" 
                alt="Architecture Diagram"
                className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
            </motion.div>
          </div>

          {/* Project Details */}
          <div className="grid lg:grid-cols-3 gap-12 mb-32">
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-4">
                  <span className="w-8 h-px bg-cyan-500" /> Executive Overview
                </h2>
                <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed space-y-4">
                  <p>
                    In the era of Generative AI, manual deployment of agents is error-prone and unscalable. 
                    This module treats GenAI Infrastructure as Code, allowing DevOps engineers and Architects 
                    to spin up standardized, compliant, and fully integrated AI Agents across multiple 
                    environments (Dev, Test, Prod).
                  </p>
                  <p>
                    The current implementation deploys a Single-Agent RAG Architecture, handling the complete 
                    lifecycle from IAM roles to serverless compute encryption. 
                    It is designed for enterprises requiring high security and strict guardrails.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                  <span className="w-8 h-px bg-purple-500" /> Multi-Agent Supervisor Roadmap
                </h2>
                <div className="mb-8 rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                  <img 
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-12-19-at-01.07.39-1766420425888.jpeg" 
                    alt="Supervisor Logic"
                    className="w-full object-contain p-8"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                       <Workflow className="w-5 h-5"/> Supervisor Agent (The Brain)
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Acts as the single interface for the user, maintaining conversation memory and delegating tasks to specialized workers.
                    </p>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <h3 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
                       <Cpu className="w-5 h-5"/> Specialized Workers
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Includes SQL Generators (Athena), Context Retrieval Agents (S3), and Deep Reasoning workers for complex comparative analysis.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-12">
              <section>
                <h3 className="text-xl font-bold mb-6 text-white/50 uppercase tracking-widest text-sm font-mono">Core Capabilities</h3>
                <div className="grid gap-4">
                  {components.map((c, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="shrink-0">{c.icon}</div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{c.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{c.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-6 text-white/50 uppercase tracking-widest text-sm font-mono">Future Roadmap</h3>
                <div className="space-y-6">
                  {roadmapSteps.map((step, i) => (
                    <div key={i} className="relative pl-8 border-l border-white/10">
                      <div className={`absolute left-[-5px] top-1 w-2 h-2 rounded-full ${
                        step.status === 'completed' ? 'bg-green-500' : 
                        step.status === 'in-progress' ? 'bg-cyan-500 animate-pulse' : 'bg-white/20'
                      }`} />
                      <div className="flex items-center gap-2 mb-1">
                         <h4 className="font-bold text-sm">{step.title}</h4>
                         {step.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                      </div>
                      <p className="text-xs text-gray-500">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-12 rounded-[3rem] bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-white/10 text-center"
          >
            <h2 className="text-4xl font-black mb-6 tracking-tighter">Ready for Enterprise Scale?</h2>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              This module is actively maintained and being evolved into a multi-agent orchestration framework. 
              Review the full documentation and contribution guide on GitHub.
            </p>
            <div className="flex justify-center gap-6">
              <Link 
                href="https://github.com/sansugupta/Enterprise-AWS-Bedrock-Agent-Terraform-Module" 
                target="_blank"
                className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-cyan-400 hover:scale-105 transition-all flex items-center gap-3"
              >
                GITHUB REPOSITORY <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 text-center px-8">
        <p className="text-gray-600 font-mono text-xs uppercase tracking-[0.3em]">
          Designed & Built for Production AI Infrastructure
        </p>
      </footer>
    </div>
  )
}
