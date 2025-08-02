"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import StoryReader from "./StoryReader";
import * as THREE from "three";



const WalkingCharacter = ({
  position,
  isWalking,
  targetPosition,
  onArrive,
}) => {
  const group = useRef();
  const talkingRef = useRef();
  const walkRef = useRef();

  // Load both GLTF models
  const { scene: talkingScene, animations: talkingClips } = useGLTF("/anrgy_1.compressed.glb");
  const { scene: walkScene, animations: walkClips } = useGLTF("/start_walking_model_1.compressed.glb");
  const talkingAnimations = useAnimations(talkingClips, talkingRef);
  const walkAnimations = useAnimations(walkClips, walkRef);
  console.log("anrgy animations:", Object.keys(talkingAnimations.actions));
  console.log("walk animations:", Object.keys(walkAnimations.actions));

  const [phase, setPhase] = useState("idle"); // 'idle' | 'walking'
  const [hasArrived, setHasArrived] = useState(false);

  // Handle phase switching
  useEffect(() => {
    if (isWalking && !hasArrived) {
      setPhase("walking");
    } else {
      setPhase("idle");
    }
  }, [isWalking, hasArrived]);

  // Play/stop animations and show/hide models
useEffect(() => {
  Object.values(talkingAnimations.actions).forEach((a) => a?.stop());
  Object.values(walkAnimations.actions).forEach((a) => a?.stop());

  // Play a specific animation by index (e.g., Layer0.001 for idle/talking)
  const idleAnimKey = "Armature|mixamo.com|Layer0.006"; // Change index as needed
  const walkAnimKey = "Armature|mixamo.com|Layer0"; // Change index as needed

  if (phase === "idle") {
    if (talkingRef.current) talkingRef.current.visible = true;
    if (walkRef.current) walkRef.current.visible = false;
    talkingAnimations.actions[idleAnimKey]?.reset().fadeIn(0.3).play();
  }

  if (phase === "walking") {
    if (talkingRef.current) talkingRef.current.visible = false;
    if (walkRef.current) walkRef.current.visible = true;
    walkAnimations.actions[walkAnimKey]?.reset().fadeIn(0.3).play();
  }
}, [phase, talkingAnimations.actions, walkAnimations.actions]);

  useFrame((_, delta) => {
    if (phase === "walking" && targetPosition && group.current) {
      const currentPos = group.current.position;
      const target = new THREE.Vector3(...targetPosition);
      const dir = new THREE.Vector3().subVectors(target, currentPos);
      const distance = dir.length();

      if (distance < 0.1) {
        setHasArrived(true);
        setPhase("idle");
        onArrive?.();
      } else {
        dir.normalize();
        currentPos.addScaledVector(dir, delta * 1.5);
        group.current.lookAt(target);
      }
    }
  });

  useEffect(() => {
    if (isWalking) setHasArrived(false);
  }, [isWalking]);

  // Increase model size by scaling the group
  return (
    <group ref={group} position={position} scale={[2.5, 2.5, 2.5]}>
      <primitive ref={talkingRef} object={talkingScene} visible />
      <primitive ref={walkRef} object={walkScene} visible={false} />
    </group>
  );
};

const StoryTimeline = () => {
  const navigate = useNavigate();
  const [completedChapters, setCompletedChapters] = useState(() => {
    // Restore from localStorage if available
    const saved = localStorage.getItem("completedChapters");
    return saved ? Number(saved) : 0;
  });
  const [isWalking, setIsWalking] = useState(false);
  const [showStoryReader, setShowStoryReader] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(null);
  const containerRef = useRef(null);
  useEffect(() => {
    localStorage.setItem("completedChapters", completedChapters);
  }, [completedChapters]);
  const chapters = [
    {
      id: 1,
      title: "The Forgotten Face",
      description:
        "Aarav's journey begins in isolation, bullied and ignored on campus. The weight of loneliness shapes his path forward.",
      position: [-8, 0, 4],
      color: "#6b7280",
      mood: "dark",
    },
    {
      id: 2,
      title: "Sparks in the Dark",
      description:
        "A glimmer of hope emerges as Aarav discovers his passion for coding. The hackathon poster changes everything.",
      position: [-4, 0, -2],
      color: "#3b82f6",
      mood: "hopeful",
    },
    {
      id: 3,
      title: "Breaking the Chains",
      description:
        "Bullying escalates, but a mentor's advice gives Aarav the courage to fight back and believe in himself.",
      position: [0, 0, 2],
      color: "#f59e0b",
      mood: "determined",
    },
    {
      id: 4,
      title: "Code and Coffee",
      description:
        "Intense preparation begins. Late nights, endless debugging, and the prototype slowly comes to life.",
      position: [4, 0, -1],
      color: "#10b981",
      mood: "energetic",
    },
    {
      id: 5,
      title: "Victory Dawn",
      description:
        "The hackathon triumph! Aarav's transformation is complete as he emerges victorious and confident.",
      position: [8, 0, 3],
      color: "#ec4899",
      mood: "triumphant",
    },
  ];

  // const handleChapterComplete = (chapterId) => {
  //   if (chapterId <= completedChapters + 1) {
  //     setIsWalking(true)

  //     setTimeout(() => {
  //       setCompletedChapters(chapterId)
  //       setIsWalking(false)
  //       setCurrentChapter(chapters.find((c) => c.id === chapterId))
  //       setShowStoryReader(true)
  //       toast.success(`Chapter ${chapterId} unlocked!`)
  //     }, 2000)
  //   } else {
  //     toast.error("Complete previous chapters first!")
  //   }
  // }

  const handleChapterComplete = (chapterId) => {
    if (chapterId <= completedChapters + 1) {
      toast.success(`Opening Chapter ${chapterId}`);
      setIsWalking(true);
      setTimeout(() => {
        setCompletedChapters(chapterId);
        setIsWalking(false);
        setCurrentChapter(chapters.find((c) => c.id === chapterId));
        setShowStoryReader(true);
        toast.success(`Chapter ${chapterId} unlocked!`);
        // Now navigate after unlock
        navigate(`/story-chapter/${chapterId}`);
      }, 3200);
    } else {
      toast.error("Complete previous chapters first!");
    }
  };

  const getCharacterPosition = () => {
    if (completedChapters === 0) return [-5, 0, 0];
    return chapters[completedChapters - 1]?.position || [-5, 0, 0];
  };

  const getTargetPosition = () => {
    if (isWalking && completedChapters < chapters.length) {
      return chapters[completedChapters]?.position;
    }
    return null;
  };

  return (
    <>
      <section
        id="story"
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 relative overflow-hidden"
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          ref={containerRef}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Journey to PixxelHack
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Follow Aarav's transformation from outcast to champion through 5
              pivotal chapters
            </p>
          </motion.div>

          {/* 3D Scene */}
          <div className="h-96 mb-16 rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10">
            <Canvas camera={{ position: [0, 3, 10], fov: 60 }}>
              <ambientLight intensity={1.2} />
              <pointLight position={[10, 10, 10]} intensity={2.5} />
              <pointLight
                position={[-10, 5, -10]}
                intensity={2}
                color="#8b5cf6"
              />

              {/* Curved Road */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[24, 16]} />
                <meshStandardMaterial
                  color="#374151"
                  transparent
                  opacity={0.8}
                />
              </mesh>

              {/* Road Path */}
              {chapters.map((chapter, index) => (
                <group key={chapter.id}>
                  {/* Chapter Marker */}
                  <mesh
                    position={[
                      ...chapter.position.slice(0, 2),
                      chapter.position[2] + 0.1,
                    ]}
                  >
                    <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
                    <meshStandardMaterial
                      color={
                        completedChapters >= chapter.id
                          ? chapter.color
                          : "#4b5563"
                      }
                      emissive={
                        completedChapters >= chapter.id
                          ? chapter.color
                          : "#000000"
                      }
                      emissiveIntensity={
                        completedChapters >= chapter.id ? 0.2 : 0
                      }
                    />
                  </mesh>

                  {/* Chapter Number */}
                  <mesh
                    position={[
                      ...chapter.position.slice(0, 2),
                      chapter.position[2] + 0.2,
                    ]}
                  >
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color="#ffffff" />
                  </mesh>
                </group>
              ))}

              {/* Walking Character */}
              <WalkingCharacter
                position={getCharacterPosition()}
                isWalking={isWalking}
                targetPosition={getTargetPosition()}
                onArrive={() => setIsWalking(false)}
              />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 4}
              />
            </Canvas>
          </div>

          {/* Chapter Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                className={`relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 cursor-pointer ${
                  completedChapters >= chapter.id
                    ? "bg-white/10 border-white/20 shadow-lg shadow-purple-500/20"
                    : completedChapters + 1 === chapter.id
                    ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30 shadow-lg shadow-purple-500/30"
                    : "bg-white/5 border-white/10 opacity-60"
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: completedChapters + 1 >= chapter.id ? 1.05 : 1,
                  y: completedChapters + 1 >= chapter.id ? -10 : 0,
                }}
                onClick={() => handleChapterComplete(chapter.id)}
              >
                {/* Chapter Status */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: chapter.color }}
                  >
                    Chapter {chapter.id}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      completedChapters >= chapter.id
                        ? "bg-green-500 border-green-500"
                        : "border-gray-400"
                    }`}
                  >
                    {completedChapters >= chapter.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {chapter.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {chapter.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    {completedChapters >= chapter.id
                      ? "Completed"
                      : completedChapters + 1 === chapter.id
                      ? "Available"
                      : "Locked"}
                  </span>

                  {completedChapters + 1 === chapter.id && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      className="w-3 h-3 bg-yellow-400 rounded-full"
                    />
                  )}
                </div>

                {/* Unlock Animation */}
                {completedChapters + 1 === chapter.id && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-yellow-400"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-16 text-center">
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>
                  {completedChapters}/{chapters.length}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-cyan-400 to-purple-400 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(completedChapters / chapters.length) * 100}%`,
                  }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Reader Modal */}
      <AnimatePresence>
        {showStoryReader && currentChapter && (
          <StoryReader
            chapter={currentChapter}
            onClose={() => setShowStoryReader(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default StoryTimeline;
