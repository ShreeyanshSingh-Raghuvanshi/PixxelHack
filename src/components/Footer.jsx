"use client";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaTwitter, FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";

const Footer = () => {
  const handleSocialClick = (platform) => {
    toast.success(`Opening ${platform}`);
  };

  const handleKeyPress = (e, platform) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSocialClick(platform);
    }
  };

  return (
    <footer
      id="contact"
      className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Code of Resilience
            </h3>
            <p className="text-gray-300 leading-relaxed">
              A story that inspires developers worldwide to overcome challenges
              and achieve their dreams through perseverance and code.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Story", "Team", "Chapters", "Community"].map((link) => (
                <li key={link}>
                  <motion.button
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                    whileHover={{ x: 5 }}
                    onClick={() => toast.success(`Navigating to ${link}`)}
                    onKeyPress={(e) => handleKeyPress(e, link)}
                  >
                    {link}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-semibold mb-6">Connect With Us</h4>
            <div className="flex space-x-4 mb-6">
              {[
                {
                  name: "GitHub",
                  icon: <FaGithub />,
                  url: "https://github.com/Keshav-63",
                },
                {
                  name: "LinkedIn",
                  icon: <FaLinkedin />,
                  url: "https://www.linkedin.com/in/keshav-suthar",
                }
              ].map(({ name, icon, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${name}`}
                >
                  <motion.button
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSocialClick(name)}
                    onKeyPress={(e) => handleKeyPress(e, name)}
                  >
                    <span className="text-xl">{icon}</span>
                  </motion.button>
                </a>
              ))}
            </div>
            <p className="text-gray-300 text-sm">
              Join our community of resilient developers and share your own
              coding journey.
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-700 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400">
            © 2025 Code of Resilience - Developed by Shreeyansh & Keshav
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
