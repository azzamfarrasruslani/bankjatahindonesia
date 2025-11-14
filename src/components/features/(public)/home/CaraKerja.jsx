"use client";
import Image from "next/image";
import { useState } from "react";

export default function CaraKerja() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Tabungan Jelantah",
      description:
        "Menabung minyak jelantah mulai dari 1 kg bisa menghasilkan saldo e-wallet, poin reward, hingga pendapatan ratusan ribu sampai puluhan juta rupiah.",
      items: [
        {
          number: 1,
          title: "Harga Tinggi Meski 1 Kg",
          desc: "Minyak jelantah yang ditabung akan tetap dihargai tinggi meskipun dalam jumlah kecil.",
          image: "/image/cara_kerja/tabungan/1.png",
        },
        {
          number: 2,
          title: "Saldo Jadi E-Wallet",
          desc: "Tabungan otomatis dikonversi menjadi saldo digital untuk membeli kebutuhan sehari-hari.",
          image: "/image/cara_kerja/tabungan/2.png",
        },
        {
          number: 3,
          title: "Program Affiliate",
          desc: "Dapatkan penghasilan tambahan dengan mengajak orang lain ikut menabung.",
          image: "/image/cara_kerja/tabungan/3.png",
        },
        {
          number: 4,
          title: "Point Reward",
          desc: "Tukar poin dengan hadiah seperti handphone, motor, hingga rumah senilai 350 juta rupiah.",
          image: "/image/cara_kerja/tabungan/4.png",
        },
      ],
    },
    {
      id: 2,
      title: "Jual Beli Jelantah",
      description:
        "Transaksi langsung di cabang Bank Jatah di seluruh Indonesia untuk jual beli minyak jelantah.",
      items: [
        {
          number: 1,
          title: "Langsung di Cabang",
          desc: "Kunjungi cabang terdekat untuk menjual minyak jelantah.",
          image: "/image/cara_kerja/jual/1.png",
        },
        {
          number: 2,
          title: "Harga Transparan",
          desc: "Harga yang kompetitif dan transparan untuk setiap kilogram minyak jelantah.",
          image: "/image/cara_kerja/jual/2.png",
        },
        {
          number: 3,
          title: "Dukungan Nasional",
          desc: "Tersedia di berbagai kabupaten di seluruh Indonesia.",
          image: "/image/cara_kerja/jual/3.png",
        },
        {
          number: 4,
          title: "Cepat & Mudah",
          desc: "Proses jual beli cepat tanpa prosedur rumit.",
          image: "/image/cara_kerja/jual/4.png",
        },
      ],
    },
    {
      id: 3,
      title: "Sedekah Jelantah",
      description:
        "Salurkan minyak jelantah Anda sebagai sedekah untuk lembaga sosial dan rumah ibadah.",
      items: [
        {
          number: 1,
          title: "Bentuk Sedekah Baru",
          desc: "Bersedekah dengan minyak jelantah yang masih memiliki nilai jual.",
          image: "/image/cara_kerja/sedekah/1.png",
        },
        {
          number: 2,
          title: "Disalurkan ke Lembaga Sosial",
          desc: "Hasil sedekah akan disalurkan ke lembaga dan rumah ibadah.",
          image: "/image/cara_kerja/sedekah/2.png",
        },
        {
          number: 3,
          title: "Membantu Masyarakat",
          desc: "Dana hasil sedekah digunakan untuk membantu masyarakat kurang mampu.",
          image: "/image/cara_kerja/sedekah/3.png",
        },
        {
          number: 4,
          title: "Nilai Sosial & Lingkungan",
          desc: "Menjaga lingkungan dan berbagi kebaikan sekaligus.",
          image: "/image/cara_kerja/sedekah/4.png",
        },
      ],
    },
  ];

  const current = steps.find((step) => step.id === currentStep);

  return (
    <div className="mx-auto p-10 max-w-7xl">
      <h1 className="text-center mb-4 text-5xl font-bold tracking-tight text-[#FB6B00]">
        Cara Kerja <span className="text-black">&</span> Manfaatnya
      </h1>

      {/* Tabs */}
      <div className="relative flex justify-center space-x-10 border-b border-gray-300">
        {steps.map((step) => (
          <button
            key={step.id}
            className={`relative pb-2 text-sm font-semibold transition-colors duration-300 ${
              currentStep === step.id
                ? "text-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
            onClick={() => setCurrentStep(step.id)}
          >
            {step.title}
            {currentStep === step.id && (
              <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-[#FB6B00]" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-10 flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-lg">
        <h2 className="mb-2 text-2xl font-bold text-black">
          {current.title}
        </h2>
        <p className="mb-6 max-w-xl text-gray-600">{current.description}</p>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-4">
          {current.items.map((item) => (
            <div
              key={item.number}
              className="flex flex-col items-center rounded-lg bg-gray-50 p-4 shadow-md hover:shadow-xl transition duration-300"
            >
              <image
                src={item.image}
                alt={item.title}
                className="mb-4 w-full rounded object-contain"
              />
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FB6B00] text-lg font-bold text-white">
                {item.number}
              </div>
              <h3 className="mb-1 font-semibold text-black">{item.title}</h3>
              <p className="text-center text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
