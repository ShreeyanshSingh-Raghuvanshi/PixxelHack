"use client"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

const Marquee = () => {
  const messages = [
    "🚀 From Zero to Hero",
    "💻 Code Your Dreams",
    "🏆 Hackathon Champions",
    "💪 Resilience Wins",
    "🌟 Break Your Chains",
    "🔥 Never Give Up",
    "⚡ Transform Your Life",
    "🎯 Aim Higher",
  ]

  // Control animation using useAnimation hook
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      x: -1920,
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    })
  }, [controls])

  // Pause animation on hover, resume when mouse leaves
  const handleMouseEnter = () => {
    controls.stop()
  }

  const handleMouseLeave = () => {
    controls.start({
      x: -1920,
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    })
  }

  return (
    <div className="bg-black py-3 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex"
          animate={controls}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ x: 0 }} // start position must be explicitly set
        >
          {[...messages, ...messages].map((message, index) => (
            <span
              key={index}
              className="inline-block px-8 text-lg font-semibold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {message}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Marquee