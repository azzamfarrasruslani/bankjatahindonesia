"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "./components/HeroSection";

export default function ProgramKamiPage() {
  const programs = [
    {
      title: "Tabungan Jelantah",
      description: "Ubah minyak jelantah menjadi tabungan bernilai ekonomi.",
      href: "/tabungan-jelantah",
      img: "/images/tabungan.jpg",
    },
    {
      title: "Jual Beli Jelantah",
      description: "Jual minyak bekas dengan harga bersaing dan ramah lingkungan.",
      href: "/jual-beli-jelantah",
      img: "/images/jualbeli.jpg",
    },
    {
      title: "Sedekah Jelantah",
      description: "Salurkan jelantah sebagai bentuk kepedulian untuk rumah ibadah & sosial.",
      href: "/sedekah-jelantah",
      img: "/images/sedekah.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
        <HeroSection />

      {/* Program List */}
      <section className="px-6 sm:px-12 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {programs.map((program, index) => (
            <motion.div
              key={index}
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
                <p className="text-sm text-gray-600">{program.description}</p>
                <Link
                  href={program.href}
                  className="inline-block mt-3 text-sm text-[#FB6B00] font-medium hover:underline"
                >
                  Lihat Selengkapnya →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
