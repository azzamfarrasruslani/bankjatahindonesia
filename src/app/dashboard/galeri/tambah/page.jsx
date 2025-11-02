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
    <section className="p-6 md:p-10 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#FB6B00] mb-1">
            Tambah Galeri
          </h1>
          <p className="text-gray-500 text-sm">
            Unggah foto kegiatan beserta keterangan lengkapnya untuk Galeri Bank Jatah Indonesia.
          </p>
        </div>
      </div>
      <GaleriForm onSuccess={handleSuccess} />
    </section>
  );
}
