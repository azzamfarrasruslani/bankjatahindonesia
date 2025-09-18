"use client";

import { motion } from "framer-motion";

export default function TimKami() {
  const teamMembers = [
    { name: "Budi", role: "CEO", img: "/img/budi.jpg" },
    { name: "Siti", role: "CTO", img: "/img/siti.jpg" },
    { name: "Andi", role: "Designer", img: "/img/andi.jpg" },
    { name: "Rina", role: "Marketing", img: "/img/rina.jpg" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-12"
    >
      <h2 className="text-3xl font-bold text-[#FB6B00] text-center mb-10">
        Tim Kami
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-lg transition text-center p-4"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-[#FB6B00]/20"
            />
            <h4 className="text-lg font-semibold">{member.name}</h4>
            <p className="text-sm text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
