"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section) => {
    setIsOpen(false); // Close menu on navigation

    if (section === "contact") {
      navigate("/contactUs");
      return;
    }
    if (section === "story") {
      navigate("/story-chapter/1");
      return;
    }

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleKeyPress = (e, section) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNavClick(section);
    }
  };

  const menuItems = ["story", "team", "contact"];

  return (
    <motion.nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 border border-white ${
        scrolled
          ? "bg-black/50 backdrop-blur-sm shadow-lg"
          : "bg-black/50 backdrop-blur-sm shadow-lg"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")} // Go to home page on logo click
          >
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide font-mono whitespace-nowrap">
              Code of Resilience
            </h1>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <motion.button
                key={item}
                className="text-white hover:text-indigo-400 px-3 py-2 text-sm font-medium capitalize transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick(item)}
                onKeyPress={(e) => handleKeyPress(e, item)}
              >
                {item}
              </motion.button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <motion.div
                className="w-6 h-6 flex flex-col justify-between items-center"
                animate={isOpen ? "open" : "closed"}
              >
                <motion.span
                  className="w-6 h-0.5 bg-current block origin-center"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 },
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-current block origin-center"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-current block origin-center"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 },
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-black/90 backdrop-blur-md px-6 py-4 space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
          >
            {menuItems.map((item) => (
              <motion.button
                key={item}
                className="block w-full text-left text-lg font-semibold text-white hover:text-indigo-400 capitalize"
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick(item)}
                onKeyPress={(e) => handleKeyPress(e, item)}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
