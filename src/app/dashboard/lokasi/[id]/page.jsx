"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import LokasiForm from "../form";

export default function EditLokasiPage() {
  const { id } = useParams();
  const [lokasi, setLokasi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchLokasi = async () => {
      try {
        const { data, error } = await supabase
          .from("lokasi")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        setLokasi(data);
      } catch (err) {
        console.error("Fetch lokasi gagal:", err);
        alert("Gagal memuat data lokasi.");
      } finally {
        setLoading(false);
      }
    };
    fetchLokasi();
  }, [id]);

  if (loading) return <div className="p-6">Memuat data lokasi...</div>;
  if (!lokasi)
    return <div className="p-6 text-red-500">Lokasi tidak ditemukan.</div>;

  return (
    <section className="p-6 md:p-10 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#FB6B00]">Edit Lokasi</h1>
        <p className="text-gray-500 text-sm">Perbarui informasi lokasi.</p>
      </div>
      <LokasiForm lokasi={lokasi} />
    </section>
  );
}
