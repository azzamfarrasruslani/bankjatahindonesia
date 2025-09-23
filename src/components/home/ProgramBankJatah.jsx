"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";

const programs = [
  {
    id: 1,
    title: "Tabungan Jelantah",
    desc: "Menabung mulai 1 kg minyak jelantah untuk mendapatkan saldo e-wallet, poin reward, hingga penghasilan besar.",
    image: "/images/program/1.jpeg",
    icon: "/icons/tabungan.png",
    href: "/program/tabungan-jelantah",
  },
  {
    id: 2,
    title: "Jual Beli Jelantah",
    desc: "Jual minyak jelantah dengan harga bersaing dan proses penjemputan mudah di kelurahan Anda.",
    image: "/images/program/2.jpeg",
    icon: "/icons/jualbeli.png",
    href: "/program/jual-beli-jelantah",
  },
  {
    id: 3,
    title: "Sedekah Jelantah",
    desc: "Salurkan minyak jelantah Anda untuk mendukung program sosial & pelestarian lingkungan.",
    image: "/images/program/3.jpeg",
    icon: "/icons/sedekah.png",
    href: "/program/sedekah-jelantah",
  },
];

export default function ProgramBankJatah() {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const nextSlide = () => setIndex((prev) => (prev + 1) % programs.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + programs.length) % programs.length);

  const current = programs[index];

  return (
    <section className="w-full bg-white py-20 px-4 sm:px-8 md:px-16">
      {/* Judul Section */}
      <div className="text-center mb-12">
        {/* Judul */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight relative inline-block">
          <span className="relative z-10">
            <span className="text-[#FB6B00]">Program</span>{" "}
            <span className="bg-gradient-to-r from-[#FB6B00] to-orange-200 bg-clip-text text-transparent">
              Bank Jatah Indonesia
            </span>
          </span>

          {/* Garis dekoratif atas */}
          <div className="flex justify-center mt-3">
            <div className="w-16 h-1 bg-[#FB6B00] rounded-full" />
          </div>

          {/* Efek bayangan latar (tanpa framer-motion) */}
          <span className="absolute inset-0 transform translate-x-1 translate-y-1 bg-[#FB6B00]/10 blur-sm rounded-md -z-10" />
        </h2>

        {/* Deskripsi */}
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          Solusi inovatif untuk pengelolaan minyak jelantah melalui program
          menabung, berdagang, dan berbagi.
        </p>
      </div>

      {/* Desktop Grid View */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {programs.map((program, i) => (
          <motion.div
            key={program.id}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.2, duration: 0.6 }}
          >
            <Image
              src={program.image}
              alt={program.title}
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="relative z-20 h-full flex flex-col justify-end p-6 text-white">
              <Image
                src={program.icon}
                alt="icon"
                width={100}
                height={50}
                className="mb-3"
              />
              <h3 className="text-2xl font-bold text-[#FB6B00] mb-2">
                {program.title}
              </h3>
              <p className="text-sm text-gray-100 mb-4">{program.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile Slider View */}
      <div className="md:hidden relative mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="relative h-[420px] rounded-2xl overflow-hidden shadow-md"
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="relative z-20 h-full flex flex-col justify-end p-6 text-white">
              <Image
                src={current.icon}
                alt="icon"
                width={50}
                height={50}
                className="mb-3"
              />
              <h3 className="text-2xl font-bold text-[#FB6B00] mb-2">
                {current.title}
              </h3>
              <p className="text-sm text-gray-100 mb-4">{current.desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center items-center gap-6 mt-6">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-gray-300 hover:bg-[#FB6B00] hover:text-white transition text-xl text-gray-800 bg-white"
          >
            ‹
          </button>
          <span className="text-gray-600 text-sm">
            {index + 1} / {programs.length}
          </span>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-gray-300 hover:bg-[#FB6B00] hover:text-white transition text-xl text-gray-800 bg-white"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
