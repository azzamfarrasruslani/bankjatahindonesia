"use client";

import Image from "next/image";
import { Flame, Target, Lightbulb } from "lucide-react";

export default function SejarahVisiMisi() {
  return (
    <section className="px-6 md:px-12 py-20 bg-gray-50">
      {/* Section Header */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#FB6B00] mb-4">
          Sejarah, Visi & Misi Bank Jatah
        </h2>
        <p className="text-gray-600 text-lg md:text-xl">
          Mengenal lebih dalam tentang latar belakang berdirinya Bank Jatah Indonesia dan tujuan utamanya dalam membangun solusi berbasis lingkungan dan sosial.
        </p>
      </div>

      {/* About Grid: teks kiri, gambar kanan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Mengelola Limbah, Membangun Harapan
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Bank Jatah berawal dari dampak <strong className="text-[#FB6B00]">Pandemi Covid-19</strong> pada tahun 2021, yang menyebabkan banyak usaha mengalami kerugian. Melalui inisiatif pemuda Karang Taruna, lahirlah ide menciptakan peluang usaha sekaligus mengedukasi masyarakat mengenai pentingnya pengelolaan limbah jelantah.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Tepat pada <strong className="text-[#FB6B00]">28 Agustus 2021</strong>, Bank Jatah resmi diluncurkan sebagai gerakan sosial-lingkungan yang mengubah limbah jelantah menjadi nilai ekonomi dan sosial.
          </p>
        </div>

        <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/parallax.jpeg"
            alt="Bank Jatah"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Features / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition-shadow duration-300 text-center">
          <Flame className="text-[#FB6B00] mx-auto mb-4" size={32} />
          <h4 className="text-xl font-semibold mb-2">Qualified Consultant</h4>
          <p className="text-gray-600">Tim ahli kami siap membantu pengelolaan limbah dengan solusi terbaik.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition-shadow duration-300 text-center">
          <Target className="text-[#FB6B00] mx-auto mb-4" size={32} />
          <h4 className="text-xl font-semibold mb-2">Best Business Analysis</h4>
          <p className="text-gray-600">Menganalisis kebutuhan masyarakat dan UMKM untuk solusi ramah lingkungan dan bernilai ekonomi.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition-shadow duration-300 text-center">
          <Lightbulb className="text-[#FB6B00] mx-auto mb-4" size={32} />
          <h4 className="text-xl font-semibold mb-2">Affordable Services</h4>
          <p className="text-gray-600">Solusi pengumpulan, tabungan, dan jual-beli minyak jelantah yang mudah diakses masyarakat.</p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-[#FB6B00]/10 py-12 rounded-2xl text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="text-3xl font-bold text-[#FB6B00]">25k+</h3>
            <p className="text-gray-700">Happy Clients</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#FB6B00]">4.5+</h3>
            <p className="text-gray-700">Average Rating</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#FB6B00]">330+</h3>
            <p className="text-gray-700">Completed Projects</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#FB6B00]">16+</h3>
            <p className="text-gray-700">Awards Achieved</p>
          </div>
        </div>
      </div>
    </section>
  );
}
