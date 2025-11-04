"use client";

import LokasiForm from "../form";

export default function TambahLokasiPage() {
  return (
    <section className="p-6 md:p-10 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#FB6B00]">Tambah Lokasi</h1>
        <p className="text-gray-500 text-sm">
          Tambahkan lokasi baru untuk sistem.
        </p>
      </div>
      <LokasiForm />
    </section>
  );
}
