"use client";

import { FiMail, FiPhone, FiUser, FiMessageSquare } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaSnapchatGhost, FaTiktok, FaTwitter } from "react-icons/fa";

export default function KontakPage() {
  // Data field formulir untuk pengulangan yang efisien
  const formFields = [
    { id: "first-name", label: "Nama Depan", placeholder: "Masukkan nama depan Anda", type: "text", icon: FiUser },
    { id: "last-name", label: "Nama Belakang", placeholder: "Masukkan nama belakang Anda", type: "text", icon: FiUser },
    { id: "email", label: "Email", placeholder: "Masukkan email Anda", type: "email", icon: FiMail },
    // Menghilangkan input "Contact Details" yang tidak ada di gambar oranye (image_1f664e.png)
  ];

  // Data kontak
  const contactInfo = [
    { id: "hotline", label: "Hotline", value: "+971 56 498 3456", icon: FiPhone },
    { id: "email-support", label: "Email", value: "support@zalomi.com", icon: FiMail },
  ];

  // Data ikon media sosial
  const socialIcons = [
    FaFacebookF, FaInstagram, FaSnapchatGhost, FaTiktok, FaTwitter
  ];

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-24 bg-gradient-to-br from-orange-50 via-white to-orange-100 text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Judul Utama */}
        <h1 className="text-4xl sm:text-5xl mt-20 font-extrabold text-center mb-16 text-[#FB6B00]">
          Hubungi Kami
        </h1>
        
        {/* Kontainer Utama Kontak */}
        <div className="flex flex-col lg:flex-row gap-10 bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Bagian Kiri: Formulir */}
          <div className="flex-1 p-8 lg:p-12 space-y-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Kirim Pesan Kepada Kami</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Punya pertanyaan atau butuh bantuan? Kirimkan pesan kepada kami dan tim kami akan segera menghubungi Anda kembali.
            </p>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mapping Input Fields (Nama dan Email) */}
              {formFields.map((field, i) => (
                <div key={i} className={field.id === "email" ? "md:col-span-2" : "relative"}> {/* Email mengambil 2 kolom */}
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <div className="relative">
                    <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                    <input
                      type={field.type}
                      id={field.id}
                      placeholder={field.placeholder}
                      // **Koreksi Ikon:** Pading kiri ditambah (pl-10) agar ikon terlihat
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#FB6B00] focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>
              ))}

              {/* Textarea Pesan */}
              <div className="md:col-span-2 relative">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Pesan
                </label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Masukkan pesan Anda"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#FB6B00] focus:border-transparent outline-none resize-none transition"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Tombol Kirim */}
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#FB6B00] text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:bg-orange-700 transition transform hover:-translate-y-0.5"
                >
                  Kirim Pesan
                </button>
              </div>
            </form>
          </div>

          {/* Bagian Kanan: Info Kontak (Warna #FB6B00) */}
          <div className="w-full lg:w-96 bg-[#FB6B00] text-white rounded-t-3xl lg:rounded-l-none lg:rounded-r-3xl p-8 flex flex-col justify-between shadow-lg">
            <div>
              <h2 className="text-2xl font-bold mb-6">Kami Siap Membantu</h2>
              
              {/* Info Kontak Detail */}
              <div className="space-y-6">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="bg-black bg-opacity-20 p-3 rounded-full flex-shrink-0 mt-0.5">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{item.label}</p>
                      <p className="text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Sosial */}
            <div className="mt-10 border-t border-white border-opacity-30 pt-6">
              <p className="font-semibold mb-4">Terhubung dengan Kami</p>
              <div className="flex gap-4">
                {socialIcons.map((Icon, i) => (
                  <a key={i} href="#" aria-label={`Ikon ${Icon.name}`} className="bg-black bg-opacity-20 p-3 rounded-full hover:bg-opacity-40 transition">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}