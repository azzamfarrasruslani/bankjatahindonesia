"use client";

import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function KontakPage() {
  return (
    <section className="py-16 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-white to-orange-50 text-gray-800">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#FB6B00] mb-2">
          Hubungi Kami
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kami siap membantu Anda. Silakan isi formulir di bawah atau hubungi kontak langsung kami.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Card Alamat */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start space-y-4 hover:shadow-2xl transition">
          <FiMapPin className="text-[#FB6B00] w-10 h-10" />
          <h3 className="text-xl font-semibold text-gray-900">Alamat</h3>
          <p className="text-gray-600">
            Jl. Inovasi Hijau No. 7, Jakarta Selatan, Indonesia
          </p>
        </div>

        {/* Card Telepon */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start space-y-4 hover:shadow-2xl transition">
          <FiPhone className="text-[#FB6B00] w-10 h-10" />
          <h3 className="text-xl font-semibold text-gray-900">Telepon</h3>
          <p className="text-gray-600">+62 812 3456 7890</p>
          <p className="text-gray-600">Senin - Jumat, 09.00 - 17.00 WIB</p>
        </div>

        {/* Card Email */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start space-y-4 hover:shadow-2xl transition">
          <FiMail className="text-[#FB6B00] w-10 h-10" />
          <h3 className="text-xl font-semibold text-gray-900">Email</h3>
          <p className="text-gray-600">info@bankjatahindonesia.com</p>
          <div className="flex space-x-4 mt-2">
            <FaWhatsapp className="w-6 h-6 text-[#25D366] cursor-pointer hover:scale-110 transition" />
            <FaFacebookF className="w-6 h-6 text-[#3b5998] cursor-pointer hover:scale-110 transition" />
            <FaInstagram className="w-6 h-6 text-[#C13584] cursor-pointer hover:scale-110 transition" />
            <FaTwitter className="w-6 h-6 text-[#1DA1F2] cursor-pointer hover:scale-110 transition" />
          </div>
        </div>
      </div>

      {/* Form Kontak */}
      <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#FB6B00] mb-6">
          Kirim Pesan
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="nama" className="font-medium text-gray-700 mb-2">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              placeholder="Masukkan nama lengkap"
              className="rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#FB6B00]"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Masukkan email Anda"
              className="rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#FB6B00]"
              required
            />
          </div>
          <div className="md:col-span-2 flex flex-col">
            <label htmlFor="pesan" className="font-medium text-gray-700 mb-2">
              Pesan
            </label>
            <textarea
              id="pesan"
              rows="6"
              placeholder="Tulis pesan Anda..."
              className="rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#FB6B00]"
              required
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#FB6B00] text-white font-semibold py-3 rounded-lg shadow hover:bg-orange-600 transition"
            >
              Kirim Pesan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
