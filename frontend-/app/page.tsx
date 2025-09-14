"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 relative overflow-hidden">
        {/* Background Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-500 blur-3xl opacity-30"
        />

        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-6 z-10"
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            DTU Students Portal
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-300 mb-8 z-10 max-w-2xl"
        >
          Explore student profiles, departments, achievements, and more.  
          A central hub for everything related to our university students.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex gap-4 z-10"
        >
          <Link href="/students">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg">
              Explore Students
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="border-gray-500 text-white bg-gray-800">
              Learn More
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-gray-950">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Use the <span className="text-blue-400">Portal?</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              title: "Student Directory",
              desc: "Browse through detailed student profiles with academic info and achievements.",
              icon: "📘",
            },
            {
              title: "Department Insights",
              desc: "Filter students by department and discover their contributions.",
              icon: "🏫",
            },
            {
              title: "Top Performers",
              desc: "View students ranked by CGPA and track academic excellence.",
              icon: "⭐",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-800 border-gray-700 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-20 bg-gradient-to-r from-purple-700 to-blue-600 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Explore the Students?
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Start browsing and discover amazing talent at our university.
        </p>
        <Link href="/students">
          <Button size="lg" className="bg-white text-black font-semibold hover:bg-gray-200">
            Get Started →
          </Button>
        </Link>
      </section>
    </div>
  )
}
