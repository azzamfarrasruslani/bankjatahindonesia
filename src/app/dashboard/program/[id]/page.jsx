"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import ProgramFormEdit from "../form-edit";

export default function EditProgramPage() {
  const { id } = useParams();
  const router = useRouter();
  const [programExists, setProgramExists] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengecek apakah ID program valid (eksis di database)
    const checkProgram = async () => {
      const { data, error } = await supabase
        .from("program")
        .select("id")
        .eq("id", id)
        .single();

      if (error || !data) {
        setProgramExists(false);
      }
      setLoading(false);
    };

    checkProgram();
  }, [id]);

  const handleSuccess = () => {
    alert("✅ Program berhasil diperbarui!");
    router.push("/dashboard/program");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Memuat data program...</p>
      </div>
    );
  }

  if (!programExists) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Program tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <section className="p-6 md:p-10 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#FB6B00] mb-1">Edit Program</h1>
          <p className="text-gray-500 text-sm">
            Perbarui informasi program Bank Jatah Indonesia.
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard/program")}
          className="bg-gray-200 text-gray-600 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm"
        >
          Kembali
        </button>
      </div>

      {/* Form Edit */}
      <ProgramFormEdit programId={id} onSuccess={handleSuccess} />
    </section>
  );
}
