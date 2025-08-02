"use client"

import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AnimatedCursor from "react-animated-cursor"
import { motion, AnimatePresence } from "framer-motion"
import Loader from "./components/Loader"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import StoryTimeline from "./components/StoryTimeline"
import ImageGrid from "./components/ImageGrid"
import TeamSection from "./components/TeamSection"
import Footer from "./components/Footer"
import PageTransition from "./components/PageTransition"
import ScrollTextAnimation from "./components/ScrollTextAnimation"
import MysteryElement from "./components/MysteryElement"
import StoryReader from "./components/StoryReader"
import {ContactUs} from "./components/ContactUs"

const HomePage = () => (
  <PageTransition>
    <Hero />
    <StoryTimeline />
    <ImageGrid />
    <TeamSection />
    <MysteryElement />
    <Footer />
  </PageTransition>
)
// Wrapper to extract chapter id param and pass to StoryReader
import { useParams, useNavigate } from "react-router-dom"
const StoryReaderRouteWrapper = () => {
  const { id } = useParams()
  const chapterId = parseInt(id, 10)
  const navigate = useNavigate()

  // Validate or fallback to chapter 1
  if (isNaN(chapterId) || chapterId < 1 || chapterId > 5) {
    // Redirect to chapter 1 if invalid id
    useEffect(() => {
      navigate("/story-chapter/1", { replace: true })
    }, [navigate])
    return null
  }

  // onClose navigates back to timeline/home
  const handleClose = () => {
    navigate("/", { replace: true })
  }

  return <StoryReader chapterId={chapterId} onClose={handleClose} />
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#121925] ">
        <AnimatedCursor
          innerSize={28}
          outerSize={38}
          color="99, 99, 255"
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={2}
          innerStyle={{
            background: "url('/icons8-cursor-94.png') center/cover no-repeat",
            backgroundSize: "28px 28px",
            borderRadius: "50%",
          }}
          outerStyle={{
            boxShadow: "0 0 12px 4px #6366f1",
          }}
        />
        <AnimatePresence mode="wait">
          {loading ? (
            <Loader key="loader" />
          ) : (
            <motion.div
              key="main"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              // className="pt-16" // padding top for fixed navbar height (64px)
              
              style={{ minHeight: "calc(100vh - 64px)" }}
            >
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contactUs" element={<ContactUs />} />
                <Route
                  path="/story-chapter/:id"
                  element={<StoryReaderRouteWrapper />}
                />
                {/* Add other routes as needed */}
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  )
}



export default App