"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Heart, Coffee, HelpCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const AGENT_TYPES = [
  { icon: Sparkles, color: "text-cyan-400", bg: "bg-cyan-500/20" },
  { icon: Coffee, color: "text-amber-400", bg: "bg-amber-500/20" },
  { icon: Heart, color: "text-pink-400", bg: "bg-pink-500/20" },
  { icon: HelpCircle, color: "text-purple-400", bg: "bg-purple-500/20" },
]

export default function RoamingAgent() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [pos, setPos] = useState({ x: 20, y: 80 }) // Percentage
  const [agentType, setAgentType] = useState(AGENT_TYPES[0])

  // Roaming logic
  useEffect(() => {
    if (isOpen) return

    const interval = setInterval(() => {
      setPos({
        x: Math.max(10, Math.min(90, Math.random() * 100)),
        y: Math.max(10, Math.min(90, Math.random() * 100)),
      })
      setAgentType(AGENT_TYPES[Math.floor(Math.random() * AGENT_TYPES.length)])
    }, 10000)

    return () => clearInterval(interval)
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setIsSending(true)
    try {
      const response = await fetch("/api/anonymous-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })

      if (response.ok) {
        toast.success("Message sent! Thanks for the feedback.")
        setMessage("")
        setIsOpen(false)
      } else {
        throw new Error("Failed to send")
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <motion.div
        className="fixed z-[9999] cursor-pointer"
        initial={false}
        animate={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          scale: isOpen ? 0 : 1,
          opacity: isOpen ? 0 : 1,
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          scale: { duration: 0.2 },
          opacity: { duration: 0.2 },
        }}
        onClick={() => setIsOpen(true)}
      >
        <div className={`p-4 rounded-full ${agentType.bg} backdrop-blur-md border border-white/10 group relative`}>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <agentType.icon className={`w-8 h-8 ${agentType.color} filter drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]`} />
          </motion.div>
          
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/20">
            Click me to say hi!
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#0f0f1a] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl shadow-cyan-500/10"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Suggestions & Feedback</h3>
                    <p className="text-xs text-gray-400">Leave a message or a compliment!</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full hover:bg-white/5 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <Textarea
                  placeholder="What's on your mind? Suggestions, questions, or just a nice word..."
                  className="min-h-[150px] bg-white/5 border-white/10 focus:border-cyan-500/50 text-white placeholder:text-gray-500 resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-2">
                    {['suggestion', 'question', 'appreciation'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setMessage(prev => prev ? `${prev} [${type}]` : `[${type}] `)}
                        className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-white/5 text-gray-400 hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSending || !message.trim()}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 group"
                  >
                    {isSending ? (
                      "Sending..."
                    ) : (
                      <>
                        Send <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </form>

              <div className="px-6 py-4 bg-white/5 border-t border-white/5 flex items-center justify-center gap-4">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Anonymous & Secure</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
