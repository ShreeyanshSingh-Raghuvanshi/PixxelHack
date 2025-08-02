"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

const TypewriterText = ({
  text,
  speed = 25,
  onComplete,
  voiceSrc,
  stopVoice,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [text, voiceSrc]);

  useEffect(() => {
    if (currentIndex === 0 && voiceSrc) {
      audioRef.current = new Audio(voiceSrc);
      audioRef.current.playbackRate = 1.4;
      audioRef.current.play();
      if (stopVoice) stopVoice.current = audioRef.current;
    }
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      if (audioRef.current) {
        audioRef.current.onended = () => onComplete();
      } else {
        onComplete();
      }
    }
  }, [currentIndex, text, speed, onComplete, voiceSrc, stopVoice]);

  return (
    <span className="text-gray-100 whitespace-pre-wrap">
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-0.5 h-5 bg-cyan-400 ml-1"
        />
      )}
    </span>
  );
};

const WalkingModel = ({ emotion = "neutral" }) => {
  const { scene } = useGLTF("/Walking_in_palce_1.compressed.glb");
  const modelRef = useRef();

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={[1, 1, 1]}
      position={[0, -1, 0]}
    />
  );
};

const StoryReader = ({ chapterId, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const stopVoice = useRef(null);
  const storyContent = {
    1: {
      title: "The Forgotten Face",
      emotion: "dark",
      pages: [
        {
          text: "The morning sun cast long, cold shadows across the university campus. But for Aarav, it felt like perpetual twilight. He walked with his head down, earbuds in, his backpack heavy.He tried to make himself invisible. Clusters of students laughed nearby, their joy sharp against his silence.",
          image: "/Images/chap1/Screenshot 2025-08-02 180010.png",
        },
        {
          text: "Inside the computer science building, whispers followed him. “There goes the weird kid,” someone muttered under their breath. Quiet snickers rippled through the hallway. Aarav’s fingers tightened around his worn laptop bag. The weight of isolation pressed down on his shoulders like a heavy, suffocating cloak.",
          image: "/Images/chap1/Screenshot 2025-08-02 180001.png",
        },
        {
          text: "During lunch, Aarav sat alone in the corner of the cafeteria. He picked at his food, staring at the floor in silence. Around him, laughter erupted from other tables. “Will I ever belong here?” he wondered, his chest aching. Friendship felt like a foreign language he had never learned to speak.",
          image: "/Images/chap1/Screenshot 2025-08-02 180034.png",
        },
      ],
    },
    2: {
      title: "Sparks in the Dark",
      emotion: "hopeful",
      pages: [
        {
          text: "Late at night, Aarav’s dorm room glowed in the soft, blue light of his monitor. His fingers danced across the keyboard, the rhythmic clicks filling the quiet. Here, surrounded by code, he felt alive. This was the world where he truly belonged.",
          image: "/Images/chap2/panel_2.jpg",
        },
        {
          text: "Lines of Python flowed like poetry. Each function felt like a verse in his own secret symphony. The code compiled successfully. On the screen, the words “Hello, World!” appeared. Aarav whispered to himself, “I did it… I can actually do this.”",
          image: "/Images/chap2/panel_3.jpg",
        },
        {
          text: "The next morning, a bright poster caught his eye. “PixxelHack Webathon – Code Your Dreams Into Reality!” His heart skipped a beat. “Maybe… just maybe… this is my chance,” he thought. For the first time in months, hope flickered in his chest.",
          image: "/Images/chap2/panel_4.jpg",
        },
      ],
    },
    3: {
      title: "Breaking the Chains",
      emotion: "determined",
      pages: [
        {
          text: "The bullying reached its breaking point after class one evening. A group of students cornered him against the wall. “Hey, laptop boy! Still hiding behind that screen?” one sneered. But this time, Aarav didn’t shrink away. He stood straighter, his eyes burning with determination they had never seen before.",
          image: "/Images/chap3/Screenshot 2025-08-02 174225.png",
        },
        {
          text: "A senior student appeared suddenly and chased the bullies awayShe placed a firm hand on Aarav’s shoulder. “You have potential. Don’t let them define you,” she said. “Show them who you really are. Show yourself first.” Her words felt like a spark, igniting something deep inside him.",
          image: "/Images/chap3/Screenshot 2025-08-02 174045.png",
        },
        {
          text: "That night, Aarav stared at his laptop screen. “I will enter PixxelHack Webathon,” he whispered to himself. Not to silence the bullies, but to prove he was capable. With every keystroke, the invisible chains of self-doubt began to crack.",
          image: "/Images/chap3/Screenshot 2025-08-02 174026.png",
        },
      ],
    },
    4: {
      title: "Code and Coffee",
      emotion: "energetic",
      pages: [
        {
          text: "The following weeks blurred into a sleepless haze of caffeine and code. Aarav’s dorm room became his fortress of focus. Empty coffee cups crowded the desk. The glow of his monitors illuminated his determined face.",
          image:
            "Images/chap4/Screenshot 2025-08-02 174426.png",
        },
        {
          text: "Finally, the day of PixxelHack Webathon arrived—a grueling 36-hour coding marathon. As the event began, the organizers announced the twist: “All domains will be revealed now. Choose wisely!” Aarav’s heart raced as the options flashed on the screen—finance, health, social impact, and storytelling. He took a deep breath. “I’ll do storytelling… something that can inspire others like me,” he decided. His mind buzzed with ideas for an interactive storytelling website, where stories of struggle and triumph could come alive.",
          image:
            "Images/chap4/Screenshot 2025-08-02 174536.png",
        },
        {
          text: "The first night was a blur of frantic typing and brainstorming. “A story website isn’t just text… I can make it dynamic, immersive,” he whispered, excitement replacing his fear. But fatigue soon crept in, and by hour 20, the prototype crashed completely. Aarav’s eyes burned. “No… not now…” he muttered, panic rising. He closed his eyes, recalling the senior’s words: “Show yourself first.” With renewed focus, he debugged line after line, determined to bring his storytelling website to life before time ran out.",
          image:
            "Images/chap4/Screenshot 2025-08-02 174406.png",
        },
      ],
    },
    5: {
      title: "Victory Dawn",
      emotion: "triumphant",
      pages: [
        {
          text: "The final morning of PixxelHack Webathon arrived, with only a few hours left. Aarav’s workstation was a battlefield of energy drink cans and empty coffee cups. His interactive storytelling website was running—simple but alive. “You’ve built something that tells your own journey,” he whispered, smiling through his exhaustion.",
          image:
            "Images/chap5/Screenshot 2025-08-02 174814.png",
        },
        {
          text: "During the presentation, his voice wavered at first but grew stronger as he demonstrated the website. Judges leaned in, impressed by how the site let users experience stories of struggle and triumph interactively. Across the room, his former bullies stared in disbelief, unable to deny his talent anymore.",
          image:
            "Images/chap5/Screenshot 2025-08-02 174639.png",
        },
        {
          text: "'The host’s voice rang out: “And the winner of PixxelHack Webathon… Team GGOT-4!” Aarav froze for a moment, hardly believing it. He had done it. He had won a 36-hour marathon of code and courage. Walking to the stage, he saw respect in the eyes that once held mockery. The forgotten face had become unforgettable.",
          image:
            "Images/chap5/Screenshot 2025-08-02 174707.png",
        },
      ],
    },
  };

  const chapter = storyContent[chapterId] || storyContent[1];
  const page = chapter.pages[currentPage];
  const voiceSrc = `/voices/chapter ${chapterId}/chap ${chapterId} line ${
    currentPage + 1
  }.mp3`;
  const currentStory = storyContent[chapter.id] || storyContent[1];
  const currentPageData = currentStory.pages[currentPage];

  // Stop voice when StoryReader is closed
  const handleClose = () => {
    if (stopVoice.current) {
      stopVoice.current.pause();
      stopVoice.current.currentTime = 0;
    }
    onClose();
  };
  // Ensure fallback to chapter 1 if invalid

  const handleNextPage = () => {
    if (currentPage < chapter.pages.length - 1) {
      setCurrentPage(currentPage + 1);
      setIsTypingComplete(false);
    } else {
      onClose();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsTypingComplete(false);
    }
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        if (isTypingComplete) handleNextPage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevPage();
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentPage, isTypingComplete]);

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 top-16 z-50 bg-[#121925] flex flex-col md:flex-row overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Left: 3D Model panel */}
      <div className="md:w-1/3 w-full h-64 md:h-auto bg-black/20 backdrop-blur-sm border-r border-cyan-500/20 flex items-center justify-center">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#06b6d4" />
          <WalkingModel emotion={chapter.emotion} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
        </Canvas>
      </div>

      {/* Right: Text & Image */}
      <main className="md:w-2/3 w-full p-6 md:p-8 text-white flex flex-col gap-4 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-start mb-4 sm:mb-6 flex-wrap gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight text-cyan-400">
              Chapter {chapterId}: {chapter.title}
            </h2>
            <p className="text-cyan-300 font-medium text-xs sm:text-sm mt-0.5">
              Page {currentPage + 1} of {chapter.pages.length}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="text-cyan-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-full text-2xl sm:text-3xl leading-none select-none transition-colors"
            title="Close"
            aria-label="Close Story Reader"
          >
            ×
          </button>
        </header>

        {/* Content */}
        <section className="flex flex-col md:flex-row gap-4 md:gap-8 flex-1">
          {/* Text */}
          <article className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-cyan-500/20 overflow-auto">
            <TypewriterText
              text={page.text}
              speed={25}
              onComplete={() => setIsTypingComplete(true)}
              voiceSrc={voiceSrc}
              stopVoice={stopVoice}
            />
          </article>

          {/* Image */}
          <figure className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-cyan-500/20 flex items-center justify-center bg-black/10">
            <img
              src={page.image || "/placeholder.svg"}
              alt={`Chapter ${chapterId} Illustration Page ${currentPage + 1}`}
              className="max-w-full max-h-72 object-contain rounded-2xl"
              loading="lazy"
              draggable={false}
              style={{ background: "#121925" }}
            />
          </figure>
        </section>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 flex-shrink-0">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 min-w-[96px] ${
              currentPage === 0
                ? "bg-white/10 text-white/50 cursor-not-allowed"
                : "bg-cyan-600/30 hover:bg-cyan-600/50 text-white border border-cyan-500/30"
            }`}
          >
            ← Previous
          </button>

          {/* Page Indicator Dots */}
          <div className="flex space-x-2">
            {chapter.pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentPage(idx);
                  setIsTypingComplete(false);
                }}
                className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  idx === currentPage
                    ? "bg-cyan-400"
                    : "bg-cyan-700 hover:bg-cyan-500"
                }`}
                title={`Page ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={!isTypingComplete}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 min-w-[96px] ${
              !isTypingComplete
                ? "bg-white/10 text-white/50 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-md shadow-cyan-500/40 hover:brightness-110 active:scale-95"
            }`}
          >
            {currentPage === chapter.pages.length - 1 ? "Finish 🎉" : "Next →"}
          </button>
        </nav>

        <p className="mt-4 text-center text-cyan-300/70 text-xs select-none">
          Wait for typing to complete, then use <kbd className="kbd">←</kbd>{" "}
          <kbd className="kbd">→</kbd> or <kbd className="kbd">Space</kbd> to
          navigate, <kbd className="kbd">ESC</kbd> to exit
        </p>
      </main>

      <style jsx global>{`
        .kbd {
          display: inline-block;
          padding: 1px 5px;
          font-size: 0.65rem;
          line-height: 1;
          color: #67e8f9;
          background-color: rgba(0, 0, 0, 0.35);
          border-radius: 5px;
          font-family: ui-monospace, monospace;
          box-shadow: inset 0 -1px 0 rgb(0 0 0 / 0.25);
          user-select: none;
          margin: 0 2px;
          font-weight: 500;
        }
      `}</style>
    </motion.div>
  );
};

// Preload the GLB model
useGLTF.preload("/start_walking_model_1.compressed.glb");

export default StoryReader;
