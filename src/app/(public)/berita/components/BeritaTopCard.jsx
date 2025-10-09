"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BeritaTopCard({ berita }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12 relative rounded-xl overflow-hidden shadow-md bg-white border border-gray-200"
    >
      <div className="relative h-80 w-full">
        <Image
          src={berita.image}
          alt={berita.title}
          fill
          className="object-cover"
        />
        <span className="absolute top-3 left-3 bg-[#FB6B00] text-white text-xs font-semibold px-2 py-1 rounded-full">
          {berita.category}
        </span>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
            {berita.title}
          </h2>
          <div className="flex items-center text-gray-300 text-sm space-x-4">
            <span>{berita.date}</span>
            <span>{berita.views} views</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
