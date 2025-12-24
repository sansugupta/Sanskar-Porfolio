"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function RoamingAgent() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)

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
        className="fixed bottom-8 right-8 z-[9999] cursor-pointer"
        initial={{ y: 0 }}
        animate={{ 
          y: isOpen ? 100 : [0, -20, 0],
          opacity: isOpen ? 0 : 1,
          scale: isOpen ? 0.8 : 1
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          },
          opacity: { duration: 0.2 },
          scale: { duration: 0.2 }
        }}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative group">
          {/* Robotic Doll Body */}
          <div className="relative w-16 h-20 flex flex-col items-center">
            {/* Head */}
            <motion.div 
              className="w-12 h-10 bg-cyan-500 rounded-xl border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] flex items-center justify-center relative overflow-hidden"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <div className="flex gap-2">
                <motion.div 
                  className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_white]"
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3, times: [0, 0.1, 0.2] }}
                />
                <motion.div 
                  className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_white]"
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3, times: [0, 0.1, 0.2] }}
                />
              </div>
              <div className="absolute bottom-1 w-6 h-0.5 bg-cyan-900/30 rounded-full" />
            </motion.div>
            
            {/* Neck */}
            <div className="w-4 h-2 bg-cyan-700" />
            
            {/* Body */}
            <div className="w-14 h-12 bg-cyan-600 rounded-lg border-2 border-cyan-500 relative flex flex-col items-center justify-center gap-1">
              <div className="w-8 h-1 bg-cyan-400/50 rounded-full" />
              <div className="w-6 h-1 bg-cyan-400/50 rounded-full" />
              
              {/* Arms */}
              <motion.div 
                className="absolute -right-4 top-2 w-4 h-8 bg-cyan-500 rounded-full origin-top"
                animate={{ rotate: [20, 60, 20] }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -left-4 top-2 w-4 h-8 bg-cyan-500 rounded-full origin-top"
                animate={{ rotate: [-20, -40, -20] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
            </div>

            {/* Jumping "Hi" Bubble */}
            <motion.div
              className="absolute -top-10 -right-8 bg-white text-cyan-600 font-bold text-xs py-1 px-3 rounded-full shadow-lg border border-cyan-100"
              animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Hi!
            </motion.div>
          </div>
          
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-[10px] py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 font-mono">
            DROP A MESSAGE
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="bg-[#0a0a0f] border border-cyan-500/20 rounded-3xl w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.1)]"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/20 rounded-2xl border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                    <Bot className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-white tracking-tight">Drop a Message</h3>
                    <p className="text-xs text-cyan-400/60 font-mono uppercase tracking-widest">Robo-Assistant v1.0</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Transmission Content</label>
                  <Textarea
                    placeholder="Type your suggestion, question, or appreciation here..."
                    className="min-h-[180px] bg-white/[0.02] border-white/10 focus:border-cyan-500/50 text-white placeholder:text-gray-600 resize-none rounded-2xl p-4 transition-all focus:ring-1 focus:ring-cyan-500/50"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-6">
                  <div className="flex flex-wrap gap-2">
                    {['Suggestion', 'Question', 'Appreciation'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setMessage(prev => prev ? `${prev} [${type}]` : `[${type}] `)}
                        className="text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-all active:scale-95"
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSending || !message.trim()}
                    className="w-full h-14 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl shadow-lg shadow-cyan-900/20 group relative overflow-hidden transition-all active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    {isSending ? (
                      "TRANSUMITTING..."
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        SEND MESSAGE
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>

              <div className="px-8 py-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                <p className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-bold">End-to-End Encrypted</p>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
                  <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse delay-75" />
                  <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse delay-150" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
