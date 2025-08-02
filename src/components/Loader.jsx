"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const Loader = () => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing...")

  const loadingSteps = [
    "Initializing...",
    "Loading Characters...",
    "Building Story World...",
    "Preparing Journey...",
    "Almost Ready...",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2
        const stepIndex = Math.floor(newProgress / 20)
        if (stepIndex < loadingSteps.length) {
          setLoadingText(loadingSteps[stepIndex])
        }
        return newProgress > 100 ? 100 : newProgress
      })
    }, 60)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Main Logo Animation */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="w-32 h-32 mx-auto relative">
            <motion.div
              className="absolute inset-0 border-4 border-white/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 border-4 border-white/50 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">CR</span>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Code of Resilience
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl text-white/80 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          A Journey of Transformation
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          className="w-80 mx-auto mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-white/70 text-sm mt-2">{progress}%</p>
        </motion.div>

        {/* Loading Text */}
        <motion.p
          className="text-white/90 text-lg font-medium"
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {loadingText}
        </motion.p>

        {/* Floating Dots */}
        <motion.div
          className="flex justify-center space-x-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Loader
