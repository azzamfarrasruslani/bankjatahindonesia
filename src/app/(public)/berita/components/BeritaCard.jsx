"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BeritaCard({ berita, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 bg-white border border-gray-200"
    >
      <div className="relative h-56 w-full">
        <Image
          src={berita.image || "/placeholder.jpg"}
          alt={berita.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 space-y-2">
        <div className="flex justify-between text-gray-500 text-xs">
          <span>{berita.date}</span>
          <span>{berita.views} views</span>
        </div>
        <h3 className="font-bold text-lg text-gray-900">{berita.title}</h3>
        <p className="text-gray-600 text-sm">{berita.excerpt}</p>
      </div>
    </motion.div>
  );
}
