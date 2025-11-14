"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lightbulb, ArrowRight, Target } from "lucide-react";

export default function ProgramSection({ program, isReverse, index }) {
  const { title, status, shortDescription, fullDescription, steps, href, img } = program;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${
        isReverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Image Section */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="w-full lg:w-1/2 relative group"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={img}
            alt={title}
            width={600}
            height={400}
            className="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm">
              {status || "Aktif"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <Target className="w-3 h-3 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Program Unggulan
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {title}
          </h2>
        </div>

        {/* Short Description */}
        <p className="text-lg text-gray-600 leading-relaxed">
          {shortDescription}
        </p>

        {/* Divider */}
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full" />

        {/* Full Description */}
        <div className="text-gray-700 leading-relaxed space-y-4">
          {fullDescription?.split('\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Steps */}
        {steps && Array.isArray(steps) && steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-primary/5 rounded-2xl p-6 border border-primary/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Cara Kerja Program
              </h3>
            </div>
            
            <ol className="space-y-3">
              {steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-gray-700 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="pt-4"
        >
          <Link
            href={href}
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25 group"
          >
            <span>Ikuti Program Ini</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}