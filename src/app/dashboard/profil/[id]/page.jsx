"use client";

import { useParams, useRouter } from "next/navigation";
import TimForm from "../form";

export default function EditTimPage() {
  const { id } = useParams();
  const router = useRouter();

  const handleSuccess = () => {
    // Redirect setelah update berhasil
    setTimeout(() => {
      router.push("/dashboard/profil");
    }, 1500);
  };

  return (
    <section className="p-6 md:p-10 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#FB6B00] mb-1">
            Edit Anggota Tim
          </h1>
          <p className="text-gray-500 text-sm">
            Perbarui informasi anggota tim perusahaan.
          </p>
        </div>
      </div>

      {/* Kirim handler sukses ke form */}
      <TimForm timId={id} onSuccess={handleSuccess} />
    </section>
  );
}
