"use client";

import { MapPin } from "lucide-react";

const lokasiData = [
  {
    nama: "Mitra Jelantah Jakarta",
    alamat: "Jl. Melati No. 10, Jakarta Selatan",
    koordinat: "https://maps.google.com/?q=-6.2607,106.7816",
  },
  {
    nama: "Agen Bekasi Timur",
    alamat: "Jl. Karya Baru No. 15, Bekasi",
    koordinat: "https://maps.google.com/?q=-6.2488,107.0046",
  },
  {
    nama: "Mitra UMKM Bandung",
    alamat: "Jl. Riau No. 123, Bandung",
    koordinat: "https://maps.google.com/?q=-6.8971,107.6216",
  },
];

export default function LokasiPage() {
  return (
    <section className="py-16 px-6 sm:px-12 lg:px-24 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-[#FB6B00] mb-12 text-center">
        Lokasi Mitra & Agen Penampungan Jelantah
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lokasiData.map((lokasi, i) => (
          <div
            key={i}
            className="p-6 border border-gray-200 rounded-xl shadow-md transition hover:shadow-lg"
          >
            <div className="flex items-start gap-3 mb-3">
              <MapPin className="text-[#FB6B00] mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{lokasi.nama}</h3>
                <p className="text-gray-600">{lokasi.alamat}</p>
              </div>
            </div>
            <a
              href={lokasi.koordinat}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FB6B00] text-sm font-medium hover:underline"
            >
              Lihat di Google Maps →
            </a>
          </div>
        ))}
      </div>

      {/* Optional: Embed Google Maps (pusat) */}
      <div className="mt-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1982.8221555890628!2d106.7816!3d-6.2607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1693148981271"
          className="w-full h-96 rounded-xl border"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
