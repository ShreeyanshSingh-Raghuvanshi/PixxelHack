
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useAnimations,
  Points,
  PointMaterial,
} from "@react-three/drei";
import { useNavigate } from "react-router-dom";

import * as THREE from "three";
import toast from "react-hot-toast";
import Marquee from "./Marquee";

const RoadImage = ({ url }) => {
  const texture = useLoader(THREE.TextureLoader, url);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1, 1);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.75, 0]}>
      <planeGeometry args={[5, 10]} />
      <meshStandardMaterial
        map={texture}
        transparent={true}
       
      />
    </mesh>
  );
};

// ✨ ParticleField background stars
const ParticleField = () => {
  const ref = useRef();
  const { mouse, viewport } = useThree();

  const [sphere] = useState(() => {
    const positions = new Float32Array(5000 * 3);
    const colors = new Float32Array(5000 * 3);

    for (let i = 0; i < 5000; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      colors[i3] = Math.random();
      colors[i3 + 1] = Math.random() * 0.5 + 0.5;
      colors[i3 + 2] = 1;
    }

    return { positions, colors };
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;

      const mouseX = (mouse.x * viewport.width) / 2;
      const mouseY = (mouse.y * viewport.height) / 2;
      ref.current.position.x = mouseX * 0.1;
      ref.current.position.y = mouseY * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={sphere.positions} colors={sphere.colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const WalkingModel = () => {
  const { scene, animations } = useGLTF("/Walking_in_palce_1.compressed.glb");
  const ref = useRef();
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (actions?.Walk) {
      actions.Walk.play();
    } else if (actions) {
      Object.values(actions)[0]?.play();
    }
  }, [actions]);

  // Animate only rotation for natural walk effect (no forward movement)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.set(0, -0.75, 0); // stays in place
      ref.current.rotation.y = Math.sin(clock.elapsedTime * 2) * 0.1;
    }
  });

  return <primitive ref={ref} object={scene} scale={2} />;
};

// 💥 Final Hero section
const Hero = ({ onReadStory }) => {
  const [ripples, setRipples] = useState([]);

  const navigate = useNavigate();

  const handleReadFullStory = () => {
    navigate("/story-chapter/1"); // Navigate to chapter 1
  };

  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };

    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  const handleExploreClick = () => {
    const storyElement = document.getElementById("story");
    if (storyElement) {
      storyElement.scrollIntoView({ behavior: "smooth" });
      toast.success("Beginning your journey!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleExploreClick();
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
    >
      {/* 🌌 Fullscreen Starfield Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ParticleField />
        </Canvas>
        {/* 3D Model Canvas - always behind, never blocks scroll/touch */}
        <div className="absolute inset-0 flex items-end justify-end pointer-events-none">
          <div className="w-full sm:w-1/2 max-w-[600px] h-[60vh] sm:h-[85vh]">
            <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
              <ambientLight intensity={2} />
              <directionalLight position={[5, 10, 5]} intensity={1} />
              <RoadImage url="/road-images.png" />
              <WalkingModel />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </div>
        </div>
      </div>

      {/* ✨ Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="text-center lg:text-left text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Code of
              </span>
              <br />
              <span className="text-white">Resilience</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Follow Aarav's transformative journey from bullied student to
              hackathon champion. A story of perseverance, code, and breaking
              free from limitations.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExploreClick}
                onKeyPress={handleKeyPress}
                onMouseDown={createRipple}
              >
                <span className="relative z-10">Explore the Story</span>
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="absolute bg-white opacity-30 rounded-full animate-ping"
                    style={{
                      left: ripple.x - 10,
                      top: ripple.y - 10,
                      width: 20,
                      height: 20,
                    }}
                  />
                ))}
              </motion.button>

              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReadFullStory}
              >
                Read Full Story
              </motion.button>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* 🌀 Marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <Marquee />
      </div>
    </section>
  );
};

export default Hero;
