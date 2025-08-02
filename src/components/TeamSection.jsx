"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import RippleEffect from "./RippleEffect"; // Reusable ripple wrapper like in ImageGrid

const TeamSection = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Keshav Suthar",
      role: "Full-Stack Developer",
      bio: "Keshav is a full-stack developer skilled in backend development using Spring Boot, Python, and the MERN stack. He focuses on production-ready systems, scalable system design, API development, and database management.",
      image: "/Keshav.png",
      skills: ["Spring Boot", "Python", "React", "Node.js", "MongoDB", "APIs"],
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: 2,
      name: "Shreeyansh Singh",
      role: "Full-Stack Developer",
      bio: "Shreeyansh is a full-stack developer passionate about solving real-world problems. Skilled in frontend and growing expertise in the MERN stack, he builds scalable web applications.",
      image: "/Shreeyansh.png",
      skills: ["React", "TailwindCSS", "Node.js", "MongoDB", "UI/UX"],
      color: "from-green-500 to-emerald-600",
    },
  ];

  const handleMemberClick = (member) => {
    toast.success(`Meet ${member.name} - ${member.role}`);
  };

  return (
    <section
      id="team"
      className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-[#0f172a] dark:to-[#1e293b]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Meet Our Developers
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The passionate minds behind our platform — crafting scalable, 
            production-ready solutions with creativity and precision.
          </p>
        </motion.div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {teamMembers.map((member, index) => (
            <RippleEffect
              key={member.id}
              className="relative group cursor-pointer rounded-2xl"
              onClick={() => handleMemberClick(member)}
              tabIndex={0}
              role="button"
              aria-label={`Learn more about ${member.name}`}
            >
              <motion.div
                className="glass rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-2xl bg-white/80 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700"
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredMember(member.id)}
                onHoverEnd={() => setHoveredMember(null)}
              >
                {/* Profile Image */}
                <div className="relative mb-6">
                  <motion.div
                    className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {member.name}
                  </h3>

                  <motion.div
                    className={`inline-block px-4 py-1 rounded-full text-white text-sm font-medium mb-4 bg-gradient-to-r ${member.color}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {member.role}
                  </motion.div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs rounded-full shadow-sm"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </RippleEffect>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              toast.success("You're now part of our developer community!")
            }
          >
            Join Our Community
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
