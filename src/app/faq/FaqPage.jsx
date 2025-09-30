"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Data FAQ berdasarkan kategori
const faqData = [
  {
    category: "Tabungan Jelantah",
    description: "Ubah minyak jelantah menjadi tabungan bernilai ekonomi.",
    faqs: [
      {
        q: "Apa itu program Tabungan Jelantah?",
        a: "Program ini memungkinkan masyarakat menukar minyak jelantah dengan nilai tabungan digital yang bisa dicairkan atau digunakan untuk kebutuhan lain.",
      },
      {
        q: "Bagaimana sistem penimbangannya?",
        a: "Menggunakan timbangan digital dan pencatatan otomatis ke akun pengguna.",
      },
      {
        q: "Apa saja manfaat yang saya dapat?",
        a: "Setiap liter akan dikonversi jadi poin atau saldo tunai yang bisa digunakan untuk kebutuhan pokok.",
      },
    ],
  },
  {
    category: "Jual Beli Jelantah",
    description: "Jual minyak bekas dengan harga bersaing dan ramah lingkungan.",
    faqs: [
      {
        q: "Siapa saja yang bisa ikut jual beli jelantah?",
        a: "Rumah tangga, UMKM, dan pelaku usaha makanan dapat mendaftar sebagai penjual.",
      },
      {
        q: "Kemana minyak saya dijual?",
        a: "Minyak dikumpulkan lalu dijual ke mitra industri pengolahan biodiesel atau sabun.",
      },
      {
        q: "Berapa harga per liternya?",
        a: "Harga kompetitif dan disesuaikan dengan kualitas serta lokasi.",
      },
    ],
  },
  {
    category: "Sedekah Jelantah",
    description: "Salurkan jelantah sebagai bentuk kepedulian sosial.",
    faqs: [
      {
        q: "Bagaimana sistem donasi bekerja?",
        a: "Minyak dikumpulkan, dijual, dan hasilnya 100% disalurkan ke lembaga sosial.",
      },
      {
        q: "Apakah penyumbang mendapat laporan?",
        a: "Ya, transparansi dicapai dengan laporan bulanan dan sistem pelacakan digital.",
      },
      {
        q: "Apakah ada batas minimum donasi?",
        a: "Tidak ada. Setiap tetes jelantah berarti.",
      },
    ],
  },
];

export default function FaqFullPage() {
  const [openIndex, setOpenIndex] = useState({});
  const refs = useRef([]);

  const toggle = (categoryIdx, faqIdx) => {
    const key = `${categoryIdx}-${faqIdx}`;
    setOpenIndex((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToCategory = (index) => {
    refs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-[#fffefc] text-gray-800 py-16 px-6 sm:px-12 lg:px-24">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#FB6B00]">
          Pusat Pertanyaan Umum
        </h1>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto text-base md:text-lg">
          Temukan jawaban sesuai dengan program yang Anda ikuti di Bank Jatah Indonesia.
        </p>
        <div className="mt-3 w-24 h-1 mx-auto bg-gradient-to-r from-[#FB6B00] to-yellow-400 rounded-full"></div>
        <div className="mt-8 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/faq-banner.jpg"
            alt="Ilustrasi Bank Jatah Indonesia"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Tab Kategori + Konten FAQ */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Tabs */}
        <div className="flex lg:flex-col gap-4 justify-center sticky top-32 self-start lg:w-64">
          {faqData.map((section, index) => (
            <button
              key={index}
              onClick={() => scrollToCategory(index)}
              className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-[#FB6B00] text-sm font-semibold rounded-md shadow-sm transition w-full text-left"
            >
              {section.category}
            </button>
          ))}
        </div>

        {/* FAQ Konten */}
        <div className="flex-1">
          {faqData.map((section, categoryIdx) => (
            <div
              key={categoryIdx}
              ref={(el) => (refs.current[categoryIdx] = el)}
              className="mb-16 scroll-mt-32"
            >
              <h2 className="text-2xl font-bold text-[#FB6B00] mb-2">{section.category}</h2>
              <p className="text-gray-600 mb-6">{section.description}</p>

              <div className="space-y-4">
                {section.faqs.map((faq, faqIdx) => {
                  const key = `${categoryIdx}-${faqIdx}`;
                  const isOpen = openIndex[key];

                  return (
                    <div
                      key={faqIdx}
                      className="border border-gray-200 rounded-xl overflow-hidden shadow-sm transition"
                    >
                      <button
                        onClick={() => toggle(categoryIdx, faqIdx)}
                        className="w-full px-5 py-4 flex justify-between items-center text-left font-medium text-gray-800 hover:bg-orange-50"
                      >
                        <span>{faq.q}</span>
                        <span className="text-[#FB6B00] text-xl font-bold">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            key="answer"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-5 pb-4 text-sm text-gray-700"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
