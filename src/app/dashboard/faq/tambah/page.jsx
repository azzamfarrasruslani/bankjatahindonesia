"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import FAQForm from "../form";

export default function TambahFAQPage() {
  const router = useRouter();

  const handleSuccess = () => {
    alert("✅ FAQ berhasil ditambahkan.");
    router.push("/dashboard/faq");
  };

  const handleSubmit = async (form) => {
    const { error } = await supabase.from("faq").insert([form]);
    if (error) alert("❌ Gagal menambahkan FAQ.");
    else handleSuccess();
  };

  return (
    <section className="p-6 md:p-10 min-h-screen bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#FB6B00] mb-1">Tambah FAQ</h1>
        <p className="text-gray-500 text-sm">
          Masukkan pertanyaan dan jawaban baru untuk FAQ Bank Jatah Indonesia.
        </p>
      </div>

      {/* Form */}
      <FAQForm onSubmit={handleSubmit} />
    </section>
  );
}
