"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const programs = [
  {
    id: 1,
    title: "Tabungan Jelantah",
    desc: "Menabung mulai 1 kg minyak jelantah untuk mendapatkan saldo e-wallet, poin reward, hingga penghasilan besar.",
    image: "/images/program/1.jpeg",
  },
  {
    id: 2,
    title: "Jual Beli Jelantah",
    desc: "Transaksi langsung di cabang Bank Jatah seluruh Indonesia dengan harga transparan dan proses cepat.",
    image: "/images/program/2.jpeg",
  },
  {
    id: 3,
    title: "Sedekah Jelantah",
    desc: "Salurkan minyak jelantah untuk membantu lembaga sosial dan rumah ibadah dengan nilai ekonomi dan sosial.",
    image: "/images/program/3.jpeg",
  },
];

export default function ProgramBankJatah() {
  const [activeId, setActiveId] = useState(1);
  const activeProgram = programs.find((p) => p.id === activeId);

  return (
    <section className="w-full bg-gradient-to-b from-white to-orange-50 py-20 px-6 sm:px-10 lg:px-24">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#FB6B00] drop-shadow-sm">
          Program Bank Jatah <span className="text-black">Indonesia</span>
        </h2>
        <p className="mt-3 max-w-3xl mx-auto text-gray-600 text-base md:text-lg">
          Solusi inovatif untuk pengelolaan minyak jelantah melalui program
          menabung, berdagang, dan berbagi.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center flex-wrap gap-4 mb-12">
        {programs.map((prog) => (
          <button
            key={prog.id}
            onClick={() => setActiveId(prog.id)}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 
              ${
                activeId === prog.id
                  ? "bg-[#FB6B00] text-white ring-2 ring-[#FB6B00]"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-[#FB6B00] hover:text-[#FB6B00]"
              }`}
          >
            {prog.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeProgram && (
          <motion.div
            key={activeProgram.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-10 items-center bg-white shadow-xl rounded-3xl p-8"
          >
            {/* Image */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden">
              <Image
                src={activeProgram.image}
                alt={activeProgram.title}
                fill
                className="object-cover object-center rounded-xl transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text Section - Improved UI */}
            <div className="space-y-5 text-gray-800">
              <h3 className="text-3xl font-extrabold text-[#FB6B00] tracking-tight">
                {activeProgram.title}
              </h3>

              <p className="text-base md:text-lg leading-relaxed text-gray-600">
                {activeProgram.desc}
              </p>

              <div className="mt-4">
                <h4 className="text-md font-semibold mb-2 text-[#FB6B00]">
                  Keunggulan Program:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-[#FB6B00]"></span>
                    <span className="text-sm text-gray-700">
                      Manfaat ekonomi langsung dan tidak langsung
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-[#FB6B00]"></span>
                    <span className="text-sm text-gray-700">
                      Mendukung kelestarian lingkungan
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-[#FB6B00]"></span>
                    <span className="text-sm text-gray-700">
                      Terbuka untuk individu, komunitas, hingga lembaga
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
