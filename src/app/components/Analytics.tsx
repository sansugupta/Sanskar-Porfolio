"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Eye } from "lucide-react"

export default function Analytics() {
  const [analytics, setAnalytics] = useState({
    totalVisitors: 0,
    pageViews: 0,
  })

  useEffect(() => {
    // Simulate fetching analytics data
    const fetchAnalytics = async () => {
      try {
        // In a real app, this would fetch from your analytics API
        // For now, we'll simulate some realistic numbers
        const mockAnalytics = {
          totalVisitors: Math.floor(Math.random() * 500) + 150,
          pageViews: Math.floor(Math.random() * 1200) + 400,
        }

        setAnalytics(mockAnalytics)
      } catch (error) {
        console.error("Failed to fetch analytics:", error)
      }
    }

    fetchAnalytics()
  }, [])

  const analyticsCards = [
    {
      title: "Total Visitors",
      value: analytics.totalVisitors,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Unique visitors to the portfolio",
    },
    {
      title: "Page Views",
      value: analytics.pageViews,
      icon: Eye,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Total page views across all sections",
    },
  ]

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Portfolio <span className="text-red-500">Analytics</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Simple analytics overview showing visitor engagement with the portfolio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {analyticsCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card
                className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:${card.bgColor} transition-all duration-300`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">{card.title}</CardTitle>
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <CardDescription className="text-gray-400">{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="text-4xl font-bold text-white mb-2"
                  >
                    {card.value.toLocaleString()}
                  </motion.div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((card.value / 1000) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                      className={`h-2 rounded-full ${card.color.replace("text-", "bg-")}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Card className="bg-slate-800/30 border-slate-700 backdrop-blur-sm inline-block">
            <CardContent className="p-6">
              <p className="text-gray-400 text-sm">
                Analytics data is updated in real-time as visitors interact with the portfolio.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
