"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import FAQForm from "../form";

export default function EditFAQPage() {
  const { id } = useParams();
  const router = useRouter();
  const [faq, setFaq] = useState(null);

  useEffect(() => {
    fetchFAQ();
  }, []);

  async function fetchFAQ() {
    const { data, error } = await supabase.from("faq").select("*").eq("id", id).single();
    if (error) console.error(error);
    else setFaq(data);
  }

  async function handleSubmit(form) {
    const { error } = await supabase.from("faq").update(form).eq("id", id);
    if (error) alert("❌ Gagal memperbarui FAQ.");
    else {
      alert("✅ FAQ berhasil diperbarui.");
      router.push("/dashboard/faq");
    }
  }

  if (!faq)
    return (
      <div className="p-10 text-center text-orange-600 font-medium animate-pulse">
        Memuat data FAQ...
      </div>
    );

  return (
    <section className="p-6 md:p-10 min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <h1 className="text-2xl font-bold text-[#FB6B00] mb-4">Edit FAQ</h1>
      <FAQForm initialData={faq} onSubmit={handleSubmit} />
    </section>
  );
}
