"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import ImageHover from "./ImageHover";

const images = [
  "Images/chap4/Screenshot 2025-08-02 174426.png",
  "Images/chap4/Screenshot 2025-08-02 174536.png",
  "Images/chap3/Screenshot 2025-08-02 174007.png",
  "Images/chap2/panel_4.jpg",
  "Images/chap1/Screenshot 2025-08-02 180001.png",
  "Images/chap1/Screenshot 2025-08-02 180034.png",
  "Images/chap2/panel_1.jpg",
  "Images/chap2/panel_2.jpg",
  "Images/chap2/panel_3.jpg",
  "Images/chap3/Screenshot 2025-08-02 174045.png",
  "Images/chap3/Screenshot 2025-08-02 174025.png",
  "Images/chap4/Screenshot 2025-08-02 174654.png",
  "Images/chap5/Screenshot 2025-08-02 174740.png",
  "Images/chap5/Screenshot 2025-08-02 174707.png",
];

const ImageGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="min-h-screen bg-[#121925] py-16 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-white tracking-tight">
          Story Gallery
        </h2>
        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 coursor:none">
          {images.map((src, index) => (
            <motion.div
              key={index}
              className="mb-4 break-inside-avoid relative rounded-2xl overflow-hidden shadow-lg bg-[#121925] border-white-20 border-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <ImageHover
                images={[src, src]}
                className="w-full h-auto rounded-2xl"
              />
              {/* Gradient overlay fade on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-indigo-600/60 to-transparent rounded-2xl opacity-0 pointer-events-none"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              />
              {/* Animated border on hover */}
              {hoveredIndex === index && (
                <motion.div
                  className="absolute inset-0 rounded-2xl border-4 border-indigo-500 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGrid;