"use client";

import { useRouter } from "next/navigation";
import ProgramForm from "../form";

export default function TambahProgramPage() {
  const router = useRouter();

  const handleSuccess = () => {
    alert("Program berhasil ditambahkan!");
    router.push("/dashboard/program");
  };

  return (
    <section className="p-6 md:p-10 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#FB6B00] mb-1">
            Tambah Program
          </h1>
          <p className="text-gray-500 text-sm">
            Masukkan informasi program baru Bank Jatah Indonesia.
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard/program")}
          className="bg-gray-200 text-gray-600 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm"
        >
          Kembali
        </button>
      </div>

      <ProgramForm onSuccess={handleSuccess} />
    </section>
  );
}
