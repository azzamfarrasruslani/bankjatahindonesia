"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TimForm from "../form";
import { supabase } from "@/lib/supabaseClient";

export default function TambahTimPage() {
  const router = useRouter();
  const [form, setForm] = useState({ nama: "", jabatan: "", foto_url: "" });
  const [uploading, setUploading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setUploading(true);
    const { error } = await supabase.from("tim_perusahaan").insert([form]);
    setUploading(false);

    if (error) {
      console.error(error.message);
      alert("Gagal menambahkan data tim.");
    } else {
      alert("Anggota tim berhasil ditambahkan!");
      router.push("/dashboard/profil");
    }
  }

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

      <TimForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        uploading={uploading}
      />
    </section>
  );
}
