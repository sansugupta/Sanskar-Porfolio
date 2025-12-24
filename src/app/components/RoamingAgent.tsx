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
                y: [0, -40, 0],
                scaleY: [1, 0.9, 1.1, 1],
                scaleX: [1, 1.1, 0.9, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative flex flex-col items-center pb-2"
            >
              {/* Heart/Love Symbol above head */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-8 text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>

              {/* Robotic Doll Body */}
              <div className="relative w-16 h-20 flex flex-col items-center">
                {/* Head */}
                <motion.div 
                  className="w-12 h-11 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-[20px] border-2 border-white/40 shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center relative overflow-hidden"
                  animate={{ rotate: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                >
                  {/* Eyes */}
                  <div className="flex gap-2.5">
                    <motion.div 
                      className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_white] relative"
                      animate={{ scaleY: [1, 0.1, 1] }}
                      transition={{ repeat: Infinity, duration: 4, times: [0, 0.1, 0.2] }}
                    >
                      <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-cyan-400 rounded-full" />
                    </motion.div>
                    <motion.div 
                      className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_white] relative"
                      animate={{ scaleY: [1, 0.1, 1] }}
                      transition={{ repeat: Infinity, duration: 4, times: [0, 0.1, 0.2] }}
                    >
                      <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-cyan-400 rounded-full" />
                    </motion.div>
                  </div>
                  {/* Blush */}
                  <div className="absolute bottom-2 left-1 w-2 h-1 bg-pink-400/40 blur-[2px] rounded-full" />
                  <div className="absolute bottom-2 right-1 w-2 h-1 bg-pink-400/40 blur-[2px] rounded-full" />
                  {/* Mouth */}
                  <div className="absolute bottom-2 w-4 h-1 border-b border-white/50 rounded-full" />
                </motion.div>
                
                {/* Neck */}
                <div className="w-3 h-1 bg-gray-400" />
                
                {/* Body */}
                <div className="w-14 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[15px] border-2 border-white/30 relative flex flex-col items-center justify-center gap-1">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-cyan-300 animate-pulse" />
                  </div>
                  
                  {/* Arms */}
                  <motion.div 
                    className="absolute -right-4 top-1 w-4 h-9 bg-cyan-400 rounded-full origin-top border border-white/20"
                    animate={{ rotate: [30, 140, 30] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="absolute -left-4 top-1 w-4 h-9 bg-cyan-400 rounded-full origin-top border border-white/20"
                    animate={{ rotate: [-30, -50, -30] }}
                    transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                  />
                </div>

                {/* Jumping "Hi" Bubble */}
                <motion.div
                  className="absolute -top-12 -right-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-[10px] py-1.5 px-3.5 rounded-full shadow-lg border border-white/20 whitespace-nowrap"
                  animate={{ 
                    y: [0, -8, 0],
                    scale: [1, 1.15, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  Click Me! ❤️
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
