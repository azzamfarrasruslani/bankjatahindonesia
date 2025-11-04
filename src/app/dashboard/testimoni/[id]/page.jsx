"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import TestimoniForm from "../form";

export default function EditTestimoniPage() {
  const { id } = useParams();
  const router = useRouter();
  const [testimoni, setTestimoni] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("testimoni")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error(error);
      else setTestimoni(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!testimoni) return <p>Testimoni tidak ditemukan.</p>;

  return (
    <section className="min-h-screen p-6 md:p-10 bg-orange-50">
      <h1 className="text-3xl font-bold text-[#FB6B00] mb-6">Edit Testimoni</h1>
      <TestimoniForm
        initialData={testimoni}
        onSuccess={() => router.push("/dashboard/testimoni")}
      />
    </section>
  );
}
