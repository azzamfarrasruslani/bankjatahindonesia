"use client";

import { useRouter } from "next/navigation";
import ArtikelForm from "../form";

export default function TambahArtikelPage() {
  const router = useRouter();

  const handleSuccess = () => {
    alert("Artikel berhasil ditambahkan!");
    router.push("/dashboard/artikel");
  };

  return (
    <section className="p-6 md:p-10 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#FB6B00] mb-1">
            Tambah Artikel
          </h1>
          <p className="text-gray-500 text-sm">
            Masukkan informasi artikel baru Bank Jatah Indonesia.
          </p>
        </div>
      </div>

      <ArtikelForm onSuccess={handleSuccess} />
    </section>
  );
}
