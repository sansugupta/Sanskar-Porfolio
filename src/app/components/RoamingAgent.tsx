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
          className="fixed bottom-0 right-8 z-[9999] cursor-pointer"
          initial={{ y: 100 }}
          animate={{ 
            y: isOpen ? 200 : 0,
            opacity: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          onClick={() => setIsOpen(true)}
        >
          <div className="relative group flex flex-col items-center">
            {/* Jumping Animation Wrapper */}
            <motion.div
              animate={{ 
                y: [0, -30, 0],
                scaleY: [1, 0.95, 1.05, 1],
                scaleX: [1, 1.05, 0.95, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
              className="relative flex flex-col items-center pb-2"
            >
              {/* Heart/Love Symbols popping up */}
              <AnimatePresence>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      y: -60 - (i * 20),
                      x: (i % 2 === 0 ? 20 : -20),
                      scale: [0.5, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      delay: i * 0.4
                    }}
                    className="absolute text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Robotic Doll Body */}
              <div className="relative w-16 h-20 flex flex-col items-center">
                {/* Head */}
                <motion.div 
                  className="w-12 h-11 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-[20px] border-2 border-white/40 shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center relative overflow-hidden"
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  {/* Eyes - Heart Shaped when jumping */}
                  <div className="flex gap-2.5">
                    {[0, 1].map((j) => (
                      <motion.div 
                        key={j}
                        className="w-3 h-3 text-white flex items-center justify-center"
                        animate={{ 
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
                      >
                        <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </motion.div>
                    ))}
                  </div>
                  {/* Blush */}
                  <div className="absolute bottom-2 left-1 w-2.5 h-1.5 bg-pink-400/60 blur-[1px] rounded-full" />
                  <div className="absolute bottom-2 right-1 w-2.5 h-1.5 bg-pink-400/60 blur-[1px] rounded-full" />
                </motion.div>
                
                {/* Neck */}
                <div className="w-2 h-1 bg-gray-400" />
                
                {/* Body */}
                <div className="w-14 h-11 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-[15px] border-2 border-white/30 relative flex flex-col items-center justify-center gap-1">
                  {/* Heart on chest */}
                  <div className="w-5 h-5 text-pink-500/80 animate-pulse">
                    <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  
                  {/* Arms */}
                  <motion.div 
                    className="absolute -right-3 top-1 w-3 h-8 bg-cyan-300 rounded-full origin-top border border-white/20"
                    animate={{ rotate: [20, 160, 20] }}
                    transition={{ repeat: Infinity, duration: 3, repeatDelay: 2, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="absolute -left-3 top-1 w-3 h-8 bg-cyan-300 rounded-full origin-top border border-white/20"
                    animate={{ rotate: [-20, -40, -20] }}
                    transition={{ repeat: Infinity, duration: 3, repeatDelay: 2, ease: "easeInOut" }}
                  />
                </div>

                {/* Jumping "Hi" Bubble */}
                <motion.div
                  className="absolute -top-10 -right-12 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-[9px] py-1.5 px-3 rounded-full shadow-lg border border-white/20 whitespace-nowrap"
                  animate={{ 
                    y: [0, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
                >
                  Feedback? ❤️
                </motion.div>
              </div>
            </motion.div>
            
            <div className="mt-2 mb-4 bg-white/5 backdrop-blur-md text-white text-[9px] py-1 px-3 rounded-full border border-white/10 font-mono tracking-tighter shadow-xl uppercase">
              Feedback Hub
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
