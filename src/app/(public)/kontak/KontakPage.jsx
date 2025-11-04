"use client";

import { FiMail, FiPhone, FiUser, FiMessageSquare } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaSnapchatGhost, FaTiktok, FaTwitter } from "react-icons/fa";

export default function KontakPage() {
  const formFields = [
    { id: "first-name", label: "Nama Depan", placeholder: "Masukkan nama depan Anda", type: "text", icon: FiUser },
    { id: "last-name", label: "Nama Belakang", placeholder: "Masukkan nama belakang Anda", type: "text", icon: FiUser },
    { id: "email", label: "Email", placeholder: "contoh@email.com", type: "email", icon: FiMail },
  ];

  const contactInfo = [
    { id: "hotline", label: "Hotline 24/7", value: "+971 56 498 3456", icon: FiPhone },
    { id: "email-support", label: "Email Support", value: "support@zalomi.com", icon: FiMail },
  ];

  const socialIcons = [FaFacebookF, FaInstagram, FaSnapchatGhost, FaTiktok, FaTwitter];

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-24 bg-gradient-to-br from-orange-50 via-white to-orange-100 text-gray-800">
      <div className="max-w-7xl mt-10 mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-16 text-[#FB6B00]">
          Hubungi Kami
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Formulir */}
          <div className="flex-1 bg-white rounded-3xl shadow-2xl p-8 lg:p-12 hover:shadow-orange-300 transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Kirim Pesan</h2>
            <p className="text-gray-600 mb-6">Tim kami siap merespon pertanyaan Anda secepat mungkin.</p>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.map((field, i) => (
                <div key={i} className={field.id === "email" ? "md:col-span-2 relative" : "relative"}>
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  <div className="relative">
                    <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                    <input
                      type={field.type}
                      id={field.id}
                      placeholder={field.placeholder}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#FB6B00] focus:border-transparent outline-none transition shadow-sm hover:shadow-md"
                      required
                    />
                  </div>
                </div>
              ))}

              <div className="md:col-span-2 relative">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Masukkan pesan Anda"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#FB6B00] focus:border-transparent outline-none resize-none transition shadow-sm hover:shadow-md"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#FB6B00] text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:bg-orange-700 transition transform hover:-translate-y-1 hover:shadow-xl flex items-center gap-2"
                >
                  Kirim Pesan
                  <FiMessageSquare />
                </button>
              </div>
            </form>
          </div>

          {/* Info Kontak */}
          <div className="w-full lg:w-96 bg-[#FB6B00] text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg hover:shadow-orange-400 transition-shadow">
            <div>
              <h2 className="text-2xl font-bold mb-6">Kami Siap Membantu</h2>
              <div className="space-y-6">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="bg-black bg-opacity-20 p-3 rounded-full flex-shrink-0 mt-0.5 transition-transform hover:scale-110">
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

            {/* Sosial Media */}
            <div className="mt-10 border-t border-white border-opacity-30 pt-6">
              <p className="font-semibold mb-4">Terhubung dengan Kami</p>
              <div className="flex gap-4">
                {socialIcons.map((Icon, i) => (
                  <a key={i} href="#" aria-label={`Ikon ${Icon.name}`} className="rounded-full p-3 bg-gradient-to-br from-white/30 to-white/10 hover:scale-110 transition transform shadow">
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
