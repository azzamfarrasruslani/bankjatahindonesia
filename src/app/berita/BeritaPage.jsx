"use client";

import Image from "next/image";

const beritaList = [
  {
    id: 1,
    title: "Bank Jatah Gandeng UMKM untuk Kelola Jelantah",
    date: "27 Agustus 2025",
    excerpt:
      "Bank Jatah Indonesia meluncurkan kerja sama strategis dengan UMKM dalam mengelola minyak jelantah menjadi energi terbarukan.",
    image: "/images/berita1.jpg",
  },
  {
    id: 2,
    title: "Tabungan Jelantah Resmi Hadir di 5 Kota",
    date: "20 Agustus 2025",
    excerpt:
      "Program Tabungan Jelantah kini hadir di Jakarta, Bandung, Surabaya, Yogyakarta, dan Makassar sebagai bentuk inovasi keuangan hijau.",
    image: "/images/berita2.jpg",
  },
  {
    id: 3,
    title: "Donasi Jelantah untuk Panti Asuhan Meningkat",
    date: "15 Agustus 2025",
    excerpt:
      "Partisipasi masyarakat dalam Sedekah Jelantah meningkat tajam. Kini sudah disalurkan ke lebih dari 30 lembaga sosial.",
    image: "/images/berita3.jpg",
  },
];

export default function BeritaPage() {
  return (
    <section className="py-16 px-6 sm:px-12 lg:px-24 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-[#FB6B00] mb-12 text-center">
        Berita Terbaru
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {beritaList.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-gray-200 shadow hover:shadow-lg transition bg-white overflow-hidden"
          >
            <div className="relative h-48 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 space-y-2">
              <p className="text-sm text-gray-500">{item.date}</p>
              <h3 className="font-semibold text-lg text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.excerpt}</p>
              <a
                href="#"
                className="text-[#FB6B00] text-sm font-semibold hover:underline"
              >
                Baca Selengkapnya →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
