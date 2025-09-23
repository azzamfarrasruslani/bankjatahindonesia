"use client";

import { FiMail, FiPhone, FiMapPin, FiUser } from "react-icons/fi";

export default function KontakPage() {
  return (
    <section className="relative py-20 px-6 sm:px-12 lg:px-24 bg-gradient-to-br from-orange-50 via-white to-orange-100 text-gray-800">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
        <span className="bg-gradient-to-r from-[#FB6B00] to-orange-600 bg-clip-text text-transparent">
          Hubungi Kami
        </span>
        <div className="w-20 h-1 bg-[#FB6B00] mx-auto mt-4 rounded-full"></div>
      </h1>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Informasi Kontak */}
        <div className="space-y-6">
          {[
            {
              icon: <FiMapPin className="text-[#FB6B00] w-8 h-8" />,
              title: "Alamat",
              detail: "Jl. Inovasi Hijau No. 7, Jakarta Selatan, Indonesia",
            },
            {
              icon: <FiPhone className="text-[#FB6B00] w-8 h-8" />,
              title: "Telepon",
              detail: "+62 812 3456 7890",
            },
            {
              icon: <FiMail className="text-[#FB6B00] w-8 h-8" />,
              title: "Email",
              detail: "info@bankjatahindonesia.com",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition"
            >
              {item.icon}
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form Kontak */}
        <form className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-lg hover:shadow-xl transition space-y-6">
          {[
            { id: "nama", label: "Nama", type: "text", placeholder: "Masukkan nama Anda", icon: <FiUser className="text-gray-400" /> },
            { id: "email", label: "Email", type: "email", placeholder: "Masukkan email Anda", icon: <FiMail className="text-gray-400" /> },
          ].map((field, i) => (
            <div key={i}>
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3">{field.icon}</span>
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  className="pl-10 pr-3 py-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-[#FB6B00] focus:ring-[#FB6B00] sm:text-sm"
                  required
                />
              </div>
            </div>
          ))}

          <div>
            <label htmlFor="pesan" className="block text-sm font-medium text-gray-700 mb-1">
              Pesan
            </label>
            <textarea
              id="pesan"
              rows="4"
              placeholder="Tulis pesan Anda..."
              className="p-3 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-[#FB6B00] focus:ring-[#FB6B00] sm:text-sm"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="inline-flex justify-center items-center gap-2 bg-[#FB6B00] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:scale-[1.02] active:scale-95 transition w-full"
          >
            ✉️ Kirim Pesan
          </button>
        </form>
      </div>
    </section>
  );
}
