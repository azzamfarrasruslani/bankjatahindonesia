"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import TimForm from "../form";

export default function EditTimPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tim, setTim] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTim = async () => {
      const { data, error } = await supabase
        .from("tim_perusahaan")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Gagal mengambil data tim:", error);
      } else {
        setTim(data);
      }
      setLoading(false);
    };

    fetchTim();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("tim_perusahaan")
        .update({
          nama: tim.nama,
          jabatan: tim.jabatan,
          foto_url: tim.foto_url,
        })
        .eq("id", id);

      if (error) throw error;

      alert("Data anggota tim berhasil diperbarui!");
      router.push("/dashboard/profil");
    } catch (err) {
      console.error("Gagal memperbarui data:", err.message);
      alert("Gagal memperbarui data.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Memuat data anggota tim...</p>
      </div>
    );
  }

  if (!tim) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Data anggota tim tidak ditemukan.</p>
      </div>
    );
  }

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

      <TimForm
        form={tim}
        setForm={setTim}
        handleSubmit={handleSubmit}
        uploading={false}
      />
    </section>
  );
}
