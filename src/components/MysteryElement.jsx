"use client"
import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"

const ParticleField = () => {
  const ref = useRef()
  const { mouse, viewport } = useThree()

  const [sphere] = useState(() => {
    const positions = new Float32Array(5000 * 3)
    const colors = new Float32Array(5000 * 3)

    for (let i = 0; i < 5000; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 10
      positions[i3 + 1] = (Math.random() - 0.5) * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 10

      colors[i3] = Math.random()
      colors[i3 + 1] = Math.random() * 0.5 + 0.5
      colors[i3 + 2] = 1
    }

    return { positions, colors }
  })

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1
      ref.current.rotation.y = state.clock.elapsedTime * 0.15

      // Mouse interaction
      const mouseX = (mouse.x * viewport.width) / 2
      const mouseY = (mouse.y * viewport.height) / 2
      ref.current.position.x = mouseX * 0.1
      ref.current.position.y = mouseY * 0.1
    }
  })

  return (
    <Points ref={ref} positions={sphere.positions} colors={sphere.colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

const MysteryElement = () => {
  const [isActive, setIsActive] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* 3D Particle Field */}
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ParticleField />
      </Canvas>

      {/* Interactive Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-6xl font-bold text-white mb-8"
            animate={{
              textShadow: ["0 0 20px #6366f1", "0 0 40px #8b5cf6", "0 0 20px #6366f1"],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            The Code Universe
          </motion.h2>

          <motion.div
            className="relative"
            animate={{
              rotateY: mousePos.x * 20,
              rotateX: mousePos.y * 20,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <motion.button
              className="px-12 py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xl font-bold rounded-full relative overflow-hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsActive(!isActive)}
              onMouseEnter={() => setIsActive(true)}
              onMouseLeave={() => setIsActive(false)}
            >
              <span className="relative z-10">Enter the Matrix</span>

              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
                animate={{
                  x: isActive ? ["-100%", "100%"] : "0%",
                }}
                transition={{
                  duration: 1.5,
                  repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                  ease: "linear",
                }}
              />
            </motion.button>
          </motion.div>

          {/* Floating Code Snippets */}
          {isActive && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-green-400 font-mono text-sm opacity-70"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [50, -50, -100],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                >
                  {
                    [
                      "console.log('Hello World')",
                      "function dream()",
                      "if (resilience)",
                      "while (coding)",
                      "return success",
                    ][Math.floor(Math.random() * 5)]
                  }
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Ambient Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-indigo-900/20 via-transparent to-transparent pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

export default MysteryElement
