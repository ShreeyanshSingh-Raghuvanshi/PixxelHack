"use client"
import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, useAnimation } from "framer-motion"

const ScrollTextAnimation = ({ children, className = "" }) => {
  const { scrollY } = useScroll()
  const [windowHeight, setWindowHeight] = useState(0)
  const controls = useAnimation()
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
    const handleResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

useEffect(() => {
  let timeout;
  if (hasAnimated) {
    timeout = setTimeout(() => {
      controls.start("hidden").then(() => {
        controls.start("inView");
      });
    }, 2000); // 2 seconds after inView finishes, restart
  }
  return () => clearTimeout(timeout);
}, [hasAnimated, controls]);

useEffect(() => {
  return scrollY.onChange(latest => {
    if (!hasAnimated && latest > windowHeight * 0.1) {
      controls.start("inView");
      setHasAnimated(true);
    }
  });
}, [scrollY, windowHeight, controls, hasAnimated]);

  // Font size and opacity transform for subtle scale
  const fontSize = useTransform(scrollY, [0, windowHeight * 2], [32, 128])
  const opacity = useTransform(scrollY, [0, windowHeight, windowHeight * 2], [1, 0.8, 0])

  // Animation variants: slide in, bounce, then bounce out
  const variants = {
    hidden: {
      x: "-100vw",
      opacity: 0,
      scale: 0.8,
    },
    inView: {
      x: 0,
      opacity: 1,
      scale: [1, 1.15, 1],
      transition: {
        x: { type: "spring", stiffness: 120, damping: 12 },
        scale: { type: "spring", stiffness: 300, damping: 10, duration: 0.7, delay: 0.2 },
        opacity: { duration: 0.3 },
        duration: 2,
      },
    },
    out: {
      x: "100vw",
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring", stiffness: 120, damping: 12 },
        opacity: { duration: 0.3 },
        duration: 0.7,
      },
    },
  }

  return (
    <motion.div
      className={`font-bold text-center ${className}`}
      style={{ fontSize, opacity }}
      initial="hidden"
      animate={controls}
      variants={variants}
      // onAnimationComplete={(def) => {
      //   if (def === "inView") controls.start("out")
      // }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollTextAnimation