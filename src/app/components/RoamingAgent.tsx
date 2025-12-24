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
            className="fixed bottom-0 right-4 z-[9999] cursor-pointer"
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
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut"
                }}
                className="relative flex flex-col items-center pb-0"
              >
                {/* Robotic Doll Body */}
                <div className="relative w-16 h-24 flex flex-col items-center justify-end">
                  {/* Head */}
                  <motion.div 
                    className="w-12 h-11 bg-gradient-to-br from-slate-700 to-slate-900 rounded-[12px] border-2 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] flex items-center justify-center relative overflow-hidden mb-[-2px] z-10"
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  >
                    {/* Eyes - Cyan glowing rectangles */}
                    <div className="flex gap-3">
                      {[0, 1].map((j) => (
                        <motion.div 
                          key={j}
                          className="w-2.5 h-1 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] rounded-full"
                          animate={{ 
                            opacity: [1, 0.4, 1],
                            scaleX: [1, 1.2, 1]
                          }}
                          transition={{ repeat: Infinity, duration: 4, delay: j * 0.2 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Body - Professional Slate/Cyan Look */}
                  <div className="w-14 h-12 bg-gradient-to-br from-slate-800 to-slate-950 rounded-t-[10px] rounded-b-[4px] border-2 border-cyan-500/20 relative flex flex-col items-center justify-center gap-1 shadow-2xl">
                    {/* Technical details on chest */}
                    <div className="w-6 h-1 bg-cyan-500/40 rounded-full blur-[1px]" />
                    <div className="w-4 h-1 bg-cyan-500/20 rounded-full" />
                    
                    {/* Arms */}
                    <motion.div 
                      className="absolute -right-2 top-2 w-2 h-6 bg-slate-700 rounded-full origin-top border border-cyan-500/10"
                      animate={{ rotate: [10, 30, 10] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    />
                    <motion.div 
                      className="absolute -left-2 top-2 w-2 h-6 bg-slate-700 rounded-full origin-top border border-cyan-500/10"
                      animate={{ rotate: [-10, -30, -10] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    />
                  </div>
  
                  {/* "Hi!" Bubble */}
                  <motion.div
                    className="absolute -top-4 -left-10 bg-cyan-500 text-[#0a0a0f] font-black text-[10px] py-1 px-3 rounded-full rounded-br-none shadow-[0_0_15px_rgba(6,182,212,0.4)] whitespace-nowrap z-20"
                    animate={{ 
                      y: [0, -3, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ repeat: Infinity, duration: 5, repeatDelay: 1 }}
                  >
                    Hi! 🤖
                  </motion.div>
                </div>
              </motion.div>
              
              <div className="mt-1 mb-0 bg-cyan-500/10 backdrop-blur-md text-cyan-400 text-[10px] py-1 px-4 rounded-t-lg border-t border-x border-cyan-500/20 font-bold tracking-[0.2em] shadow-xl uppercase group-hover:bg-cyan-500/20 transition-all">
                Click me
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
