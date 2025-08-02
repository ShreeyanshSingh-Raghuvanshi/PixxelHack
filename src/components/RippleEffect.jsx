"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const RippleEffect = ({ children, className = "" }) => {
  const [ripples, setRipples] = useState([])

  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
    }

    setRipples((prev) => [...prev, newRipple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 1000)
  }

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={createRipple}>
      {children}

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="w-5 h-5 bg-white/30 rounded-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default RippleEffect
