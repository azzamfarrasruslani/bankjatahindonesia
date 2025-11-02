"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import FAQForm from "../form";

export default function TambahFAQPage() {
  const router = useRouter();

  async function handleSubmit(form) {
    const { error } = await supabase.from("faq").insert([form]);
    if (error) alert("❌ Gagal menambahkan FAQ.");
    else {
      alert("✅ FAQ berhasil ditambahkan.");
      router.push("/dashboard/faq");
    }
  }

  return (
    <section className="p-6 md:p-10 min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <h1 className="text-2xl font-bold text-[#FB6B00] mb-4">Tambah FAQ</h1>
      <FAQForm onSubmit={handleSubmit} />
    </section>
  );
}
