"use client";

import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";

// ✨ ParticleField with mouse parallax like Hero
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
const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sendData, setSendData] = useState(null);
  const [totalMessagesSent, setTotalMessagesSent] = useState(0);
  const [messages, setMessages] = useState([]);

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      const res = await axios.get("https://pixxelhack-backend.onrender.com/api/contact/");
      const messagesArr = Array.isArray(res.data.data) ? res.data.data : [];
      setMessages(messagesArr);
      setTotalMessagesSent(messagesArr.length);
    } catch {
      toast.error("Failed to fetch messages from backend");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendMessageToBackend = async ({ name, email, message }) => {
    const res = await axios.post("https://pixxelhack-backend.onrender.com/api/contact", {
      name,
      email,
      message,
    });
    return res.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitting(true);
    try {
      const result = await sendMessageToBackend(form);
      setSendData(result);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      await fetchMessages(); // Refresh messages after submit
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#121925] text-white">
      {/* Optional: Canvas background */}
      {/* <Canvas
        className="fixed inset-0 -z-10"
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ambientLight intensity={0.4} />
        <ParticleField />
      </Canvas> */}

      <div className="relative flex flex-col items-center justify-start py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 tracking-wider">
          Contact Us
        </h1>
        <p className="mb-10 text-center max-w-xl text-white/90 font-medium">
          We are Shreeyansh & Keshav, Full Stack Developers. Feel free to reach
          out to us!
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-lg border border-white/20"
          noValidate
        >
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-md border border-white/30 bg-white/10 px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent mb-6 transition"
            required
            disabled={submitting}
          />

          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border border-white/30 bg-white/10 px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent mb-6 transition"
            required
            disabled={submitting}
          />

          <label htmlFor="message" className="block text-sm font-semibold mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message here..."
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full rounded-md border border-white/30 bg-white/10 px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent mb-8 transition"
            required
            disabled={submitting}
          />

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 font-semibold rounded-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 transition-colors duration-300 ${
              submitting ? "cursor-not-allowed opacity-70" : ""
            } flex items-center justify-center`}
          >
            {submitting ? (
              <>
                <svg
                  className="animate-spin mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        {messages.length > 0 && (
          <div className="mt-10 w-full max-w-lg bg-white/10 rounded-lg p-6 text-center border border-white/30">
            <h2 className="text-xl font-bold mb-4 text-purple-300">
              Total Messages Sent: {messages.length}
            </h2>
            <p className="mb-4 italic text-white/80">
              "Every name below represents a voice that reached out, a story shared, and a connection made."
            </p>
            <ul className="space-y-2">
              {messages.map((msg, idx) => (
                <li key={idx} className="text-white/90 font-medium">
                  {msg.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <footer className="mt-16 text-center text-white/50 text-sm select-none">
          Made with ❤️ by Shreeyansh & Keshav - Full Stack Developers
        </footer>
      </div>
    </div>
  );
};

export { ContactUs }