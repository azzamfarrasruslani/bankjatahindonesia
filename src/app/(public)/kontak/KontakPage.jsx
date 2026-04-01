"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FiMail, FiPhone, FiUser, FiMessageSquare } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import HeroSection from "@/components/common/HeroSection";
import { Send, MapPin } from "lucide-react";

export default function KontakPage() {
  const [kontak, setKontak] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKontak = async () => {
      try {
        const { data, error } = await supabase
          .from("kontak")
          .select("*")
          .limit(1)
          .maybeSingle();
        if (error && error.code !== "PGRST116") throw error;
        setKontak(data || {});
      } catch (error) {
        console.error("Gagal mengambil data kontak:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchKontak();
  }, []);

  const formFields = [
    {
      id: "first-name",
      label: "Nama Depan",
      placeholder: "Nama depan Anda",
      type: "text",
      icon: FiUser,
    },
    {
      id: "last-name",
      label: "Nama Belakang",
      placeholder: "Nama belakang Anda",
      type: "text",
      icon: FiUser,
    },
    {
      id: "email",
      label: "Alamat Email",
      placeholder: "nama@email.com",
      type: "email",
      icon: FiMail,
    },
    {
      id: "phone",
      label: "Nomor Telepon",
      placeholder: "08xx xxxx xxxx",
      type: "tel",
      icon: FiPhone,
    },
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <HeroSection
          title="Hubungi Kami"
          description="Kami siap mendengar dan membantu Anda. Silakan sampaikan pertanyaan, kritik, atau saran melalui saluran komunikasi di bawah ini."
          imageUrl="/images/kontak-banner.jpeg"
        />
        <section className="py-24 px-6 max-w-7xl mx-auto mt-8 relative z-20">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 lg:p-12 h-[600px] animate-pulse shimmer-bg" />
            <div className="w-full lg:w-[400px] bg-gray-100 rounded-[2.5rem] p-8 h-[600px] animate-pulse shimmer-bg" />
          </div>
        </section>
      </main>
    );
  }

  if (!kontak) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center flex-col gap-6">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
          <span className="text-4xl">⚠️</span>
        </div>
        <p className="text-gray-600 font-medium text-lg">
          Konfigurasi data kontak belum tersedia dari server.
        </p>
      </main>
    );
  }

  const contactInfo = [
    {
      id: "whatsapp",
      label: "Customer Service WhatsApp",
      value: kontak.whatsapp,
      link: kontak.whatsapp_link,
      icon: FaWhatsapp,
    },
    {
      id: "telepon",
      label: "Layanan Telepon",
      value: kontak.telepon,
      icon: FiPhone,
    },
    {
      id: "email",
      label: "Alamat Email Resmi",
      value: kontak.email,
      icon: FiMail,
    },
    {
      id: "alamat",
      label: "Kantor Pusat",
      value: kontak.alamat || "Jl. Sudirman No. 123, Jakarta",
      icon: MapPin,
    },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: kontak.facebook, name: "Facebook" },
    { icon: FaInstagram, href: kontak.instagram, name: "Instagram" },
  ];

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Cinematic Hero */}
      <HeroSection
        title="Hubungi Kami"
        description="Punya pertanyaan seputar pengelolaan minyak jelantah? Tim kami selalu siap mendengar dan memberikan solusi terbaik untuk Anda."
        imageUrl="/images/faq-banner.jpeg"
      />

      <section className="relative mt-8 px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 pl-0">
          {/* Form Section (Left side on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 bg-white rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 lg:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100"
          >
            <div className="mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
                Tinggalkan Pesan
              </h2>
              <p className="text-gray-500 font-light leading-relaxed">
                Isi formulir di bawah ini dengan lengkap. Tim perwakilan kami
                akan segera menghubungi Anda kembali untuk menindaklanjuti pesan
                Anda.
              </p>
            </div>

            <form
              className="space-y-6 lg:space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Fitur simulasi pengiriman pesan berhasil.");
              }}
            >
              {/* Input Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {formFields.map((field, i) => (
                  <div key={i} className="relative group/input">
                    <label
                      htmlFor={field.id}
                      className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 ml-1 opacity-70 group-hover/input:opacity-100 transition-opacity"
                    >
                      {field.label}
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover/input:text-orange-500 transition-colors z-10 bg-white p-1">
                        <field.icon className="w-5 h-5" />
                      </div>
                      <input
                        type={field.type}
                        id={field.id}
                        placeholder={field.placeholder}
                        className="w-full pl-14 pr-6 py-4 rounded-[1.2rem] border-2 border-gray-100 focus:ring-0 focus:border-orange-500 bg-gray-50/50 hover:bg-white outline-none transition-all shadow-sm placeholder-gray-300 text-gray-900 font-medium"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Textarea */}
              <div className="relative group/input">
                <label
                  htmlFor="message"
                  className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 ml-1 opacity-70 group-hover/input:opacity-100 transition-opacity"
                >
                  Isi Pesan
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-5 text-gray-400 group-hover/input:text-orange-500 transition-colors z-10 bg-white p-1">
                    <FiMessageSquare className="w-5 h-5" />
                  </div>
                  <textarea
                    id="message"
                    rows="6"
                    placeholder="Tuliskan detail pertanyaan atau masukan Anda di sini..."
                    className="w-full pl-14 pr-6 py-5 rounded-[1.2rem] border-2 border-gray-100 focus:ring-0 focus:border-orange-500 bg-gray-50/50 hover:bg-white outline-none resize-none transition-all shadow-sm placeholder-gray-300 text-gray-900 font-medium leading-relaxed"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="group flex gap-3 items-center justify-center w-full sm:w-auto px-10 py-4 bg-gray-900 hover:bg-orange-500 text-white rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:-translate-y-1"
                >
                  <span>Kirim Pesan Sekarang</span>
                  <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
                <p className="text-gray-400 text-xs mt-4 text-center sm:text-left ml-2">
                  Pesan Anda dilindungi dan tidak akan dipublikasikan.
                </p>
              </div>
            </form>
          </motion.div>

          {/* Contact Info Card (Right side on Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-[420px] shrink-0"
          >
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(249,115,22,0.25)] text-white relative overflow-hidden flex flex-col h-full border-[3px] border-white/20">
              {/* Decorative Background Accents */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

              <div className="relative z-10 w-full mb-12">
                <h2 className="text-2xl sm:text-3xl font-black mb-2 tracking-tight">
                  Informasi
                  <br />
                  Layanan Cepat
                </h2>
                <p className="text-orange-100 font-medium text-sm">
                  Hubungi kami melalui saluran resmi berikut.
                </p>
              </div>

              <div className="space-y-8 relative z-10 mb-12 flex-grow">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-12 h-12 shrink-0 rounded-[1rem] bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-orange-600 text-white shadow-inner">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-orange-100 text-xs font-bold uppercase tracking-widest mb-1 opacity-80">
                        {item.label}
                      </span>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-bold text-white hover:text-gray-900 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-base font-bold text-white leading-snug">
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media Footer */}
              <div className="relative z-10 border-t border-white/20 pt-8 mt-auto flex flex-col gap-4">
                <span className="text-orange-100 text-xs font-bold uppercase tracking-widest">
                  Atau Ikuti Sosial Media Kami
                </span>
                <div className="flex gap-4">
                  {socialLinks.map((soc, i) =>
                    soc.href ? (
                      <a
                        key={i}
                        href={soc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-[1rem] bg-white/10 backdrop-blur-md hover:bg-white hover:text-orange-600 border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                        title={soc.name}
                      >
                        <soc.icon className="w-5 h-5" />
                      </a>
                    ) : null,
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
