"use client";

import { useRouter } from "next/navigation";
import GaleriForm from "../form";

export default function TambahGaleriPage() {
  const router = useRouter();

  const handleSuccess = () => {
    alert("✅ Foto galeri berhasil ditambahkan!");
    router.push("/dashboard/galeri");
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6 md:p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 border border-orange-100">
        <h1 className="text-3xl font-bold text-[#FB6B00] mb-2">Tambah Galeri</h1>
        <p className="text-gray-500 mb-6">
          Unggah foto kegiatan beserta keterangan lengkapnya.
        </p>

        <GaleriForm onSuccess={handleSuccess} />
      </div>
    </section>
  );
}
