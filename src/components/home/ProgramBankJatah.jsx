"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const programs = [
  {
    id: 1,
    title: "Tabungan Jelantah",
    desc: "Menabung mulai 1 kg minyak jelantah untuk ditukar saldo e-wallet & reward.",
    image: "/images/program/1.jpeg",
  },
  {
    id: 2,
    title: "Jual Beli Jelantah",
    desc: "Jual minyak jelantah dengan harga bersaing dan proses penjemputan mudah.",
    image: "/images/program/2.jpeg",
  },
  {
    id: 3,
    title: "Sedekah Jelantah",
    desc: "Salurkan minyak jelantah Anda untuk mendukung program sosial & lingkungan.",
    image: "/images/program/3.jpeg",
  },
];

export default function ProgramBankJatah() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % programs.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + programs.length) % programs.length);

  return (
    <section className="w-full bg-gradient-to-b from-white to-orange-50 py-20 px-6 sm:px-10 lg:px-24">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#FB6B00] mb-2">
          Program Kami
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
          Tiga program utama Bank Jatah Indonesia untuk mengelola minyak
          jelantah secara produktif dan ramah lingkungan.
        </p>
      </div>

      {/* Grid View */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {programs.map((prog) => (
          <div
            key={prog.id}
            className="bg-white hover:shadow-2xl transition-all duration-300 shadow-md rounded-2xl overflow-hidden p-5 flex flex-col"
          >
            <div className="relative w-full h-56 rounded-xl overflow-hidden mb-4">
              <Image
                src={prog.image}
                alt={prog.title}
                fill
                className="object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </div>
            <h3 className="text-xl font-bold text-[#FB6B00] mb-2">
              {prog.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{prog.desc}</p>
          </div>
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={programs[index].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-xl rounded-2xl overflow-hidden p-5"
          >
            <div className="relative w-full h-52 rounded-xl overflow-hidden mb-4">
              <Image
                src={programs[index].image}
                alt={programs[index].title}
                fill
                className="object-cover object-center rounded-xl transition-transform duration-500 hover:scale-105"
              />
            </div>
            <h3 className="text-xl font-bold text-[#FB6B00] mb-2">
              {programs[index].title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{programs[index].desc}</p>
          </motion.div>
        </AnimatePresence>

        {/* Slider Navigation */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={prevSlide}
            className="bg-white border border-gray-300 hover:bg-[#FB6B00] hover:text-white transition-all p-2 rounded-full text-xl"
          >
            ‹
          </button>
          <div className="text-sm text-gray-600">
            {index + 1} / {programs.length}
          </div>
          <button
            onClick={nextSlide}
            className="bg-white border border-gray-300 hover:bg-[#FB6B00] hover:text-white transition-all p-2 rounded-full text-xl"
          >
            ›
          </button>
        </div>
      </div>

      {/* Tombol Lebih Lanjut */}
      <div className="mt-12 text-center">
        <Link
          href="/program-kami"
          className="inline-block bg-[#FB6B00] text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          Lihat Semua Program
        </Link>
      </div>
    </section>
  );
}
