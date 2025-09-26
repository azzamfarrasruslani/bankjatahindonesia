"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ProgramCard({ program, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="rounded-xl shadow-lg overflow-hidden bg-white border border-gray-100"
    >
      <Image
        src={program.img}
        alt={program.title}
        width={600}
        height={400}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 space-y-2">
        <h3 className="text-xl font-semibold text-[#FB6B00]">{program.title}</h3>
        <p className="text-sm text-gray-600">{program.shortDescription}</p>
        <Link
          href={program.href}
          className="inline-block mt-3 text-sm text-[#FB6B00] font-medium hover:underline"
        >
          Lihat Selengkapnya →
        </Link>
      </div>
    </motion.div>
  );
}
