"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ProgramCard({ program, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={program.img}
          alt={program.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            {program.status || "Aktif"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-800 transition-colors leading-tight">
            {program.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {program.shortDescription}
          </p>
        </div>

        {/* CTA Button */}
        <Link
          href={program.href}
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold text-sm group/btn transition-all duration-300"
        >
          <span>Lihat Selengkapnya</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/10 transition-all duration-500" />
    </motion.div>
  );
}