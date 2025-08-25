"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const partners = [
  { name: "Partner A", logo: "/logos/partner-a.png" },
  { name: "Partner B", logo: "/logos/partner-b.png" },
  { name: "Partner C", logo: "/logos/partner-c.png" },
  { name: "Partner D", logo: "/logos/partner-d.png" },
  { name: "Partner E", logo: "/logos/partner-e.png" },
  { name: "Partner F", logo: "/logos/partner-f.png" },
];

export default function PartnerSection() {
  return (
    <section className="bg-white py-16 px-4 sm:px-8 lg:px-24 overflow-hidden">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#FB6B00]">
          Mitra <span className="text-black">Kami</span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Bank Jatah Indonesia bekerja sama dengan berbagai mitra untuk mendukung pengelolaan minyak jelantah yang berkelanjutan.
        </p>
      </div>

      {/* Logo Slider */}
      <div className="relative w-full">
        <motion.div
          className="flex gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
        >
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="min-w-[140px] h-20 relative flex items-center justify-center"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
