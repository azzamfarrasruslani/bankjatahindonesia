"use client";

import { useRouter } from "next/navigation";
import TimForm from "../form";

export default function TambahTimPage() {
  const router = useRouter();

  const handleSuccess = () => {
    // Redirect setelah form sukses
    setTimeout(() => {
      router.push("/dashboard/profil");
    }, 1500);
  };

  return (
    <section className="p-6 md:p-10 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#FB6B00] mb-1">
            Tambah Anggota Tim
          </h1>
          <p className="text-gray-500 text-sm">
            Masukkan data anggota tim baru untuk profil perusahaan.
          </p>
        </div>
      </div>

      {/* Form reuse */}
      <TimForm onSuccess={handleSuccess} />
    </section>
  );
}
