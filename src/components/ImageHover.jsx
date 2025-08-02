"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const ImageHover = ({ images, className = "" }) => {
  const [currentImage, setCurrentImage] = useState(0)
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

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 1500)
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <motion.div
        className="relative w-full h-full cursor-pointer overflow-hidden rounded-2xl"
        onMouseMove={createRipple}
        onHoverStart={() => setCurrentImage(1)}
        onHoverEnd={() => setCurrentImage(0)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          key={currentImage}
          src={images[currentImage]}
          alt="Hover effect"
          className="block w-full h-auto object-cover rounded-2xl"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Overlay effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 pointer-events-none"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Ripple Effects */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="absolute pointer-events-none rounded-full bg-white/50"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 20,
                height: 20,
                marginLeft: -10,
                marginTop: -10,
              }}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default ImageHover