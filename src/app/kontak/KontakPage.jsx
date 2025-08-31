"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function KontakPage() {
  return (
    <section className="py-16 px-6 sm:px-12 lg:px-24 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-[#FB6B00] mb-12 text-center">
        Hubungi Kami
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Informasi Kontak */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="text-[#FB6B00]" />
            <div>
              <h3 className="font-semibold text-lg">Alamat</h3>
              <p className="text-gray-600">Jl. Inovasi Hijau No. 7, Jakarta Selatan</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="text-[#FB6B00]" />
            <div>
              <h3 className="font-semibold text-lg">Telepon</h3>
              <p className="text-gray-600">+62 812 3456 7890</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="text-[#FB6B00]" />
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p className="text-gray-600">info@bankjatahindonesia.com</p>
            </div>
          </div>
        </div>

        {/* Form Kontak */}
        <form className="space-y-6">
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FB6B00] focus:ring-[#FB6B00] sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FB6B00] focus:ring-[#FB6B00] sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="pesan" className="block text-sm font-medium text-gray-700">
              Pesan
            </label>
            <textarea
              id="pesan"
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FB6B00] focus:ring-[#FB6B00] sm:text-sm"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-block bg-[#FB6B00] text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-[#e65c00] transition"
          >
            Kirim Pesan
          </button>
        </form>
      </div>
    </section>
  );
}
