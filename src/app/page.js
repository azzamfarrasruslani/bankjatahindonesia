import Image from "next/image";
import Navbar from "./layout/navbar";
import Footer from "@/app/layout/footer";
import ProgramBankJatah from "@/components/home/ProgramBankJatah";
import Hero from "@/components/home/Hero";
import Mitra from "@/components/home/Mitra";
import ManfaatJelantah from "@/components/home/ManfaatJelantah";
import TestimoniMasyarakat from "@/components/home/TestimoniMasyarakat";
import FAQ from "@/components/home/FAQ";
import TentangKami from "@/components/home/TentangKami";
import { Tent } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* Header */}
      {/* <Navbar /> */}

      {/* Hero */}
      <Hero />

      {/* Tentang Kami */}
      <section id="tentangkami" className="py-20 px-6 bg-white">
        <TentangKami />
      </section>


      {/* Program */}
      <section id="program" className="py-20 px-6 bg-white">
        <ProgramBankJatah />
      </section>


      {/* Manfaat */}
      <section id="Manfaat" className="py-20 px-6 bg-white">
        <ManfaatJelantah />
      </section>

      {/* Testimoni */}
      <section id="Testimoni" className="py-20 px-6 bg-white">
        <TestimoniMasyarakat />
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-white">
        <FAQ />
      </section>


      {/* Mitra */}
      <section id="Mitra" className="py-20 px-6 bg-white">
        <Mitra />
      </section>

      {/* Services */}
      {/* <section id="services" className="py-20 px-6 bg-[#1a1a1a] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-[#FB6B00] mb-12">
            Layanan Unggulan Kami
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Tabungan Jelantah",
                desc: "Kumpulkan minyak jelantah, tukar dengan poin dan hadiah menarik.",
              },
              {
                title: "Penjemputan Mandiri",
                desc: "Kami datang langsung menjemput jelantah di lokasi Anda.",
              },
              {
                title: "Sosialisasi Lingkungan",
                desc: "Edukasi ke sekolah dan komunitas untuk peduli lingkungan.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white text-black p-6 rounded-xl shadow-md hover:scale-105 transform transition duration-300"
              >
                <h4 className="text-lg font-bold text-[#FB6B00] mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
