"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import UserForm from "../form";

export default function TambahUserPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(form) {
    try {
      setLoading(true);

      // 1️⃣ Cek apakah email sudah ada di tabel users
      const { data: existing } = await supabase
        .from("users")
        .select("id")
        .eq("email", form.email)
        .maybeSingle();

      if (existing) {
        throw new Error("Email sudah terdaftar di sistem.");
      }

      // 2️⃣ Buat akun Auth Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("User auth tidak berhasil dibuat");

      const userId = authData.user.id;

      // 3️⃣ Simpan ke tabel public.users
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: userId,
          nama_lengkap: form.nama_lengkap,
          email: form.email,
          no_telepon: form.no_telepon,
          alamat: form.alamat,
          status_aktif: form.status_aktif,
        },
      ]);

      if (insertError) throw insertError;

      // 4️⃣ Notifikasi dan redirect ke halaman daftar user
      alert("✅ Pengguna baru berhasil dibuat!");
      window.location.href = "/dashboard/users"; // redirect manual
    } catch (err) {
      console.error("❌ Error:", err.message);
      alert("❌ Terjadi kesalahan: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="p-6 md:p-10 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tambah Pengguna</h1>
      <UserForm onSubmit={handleSubmit} disabled={loading} />
    </section>
  );
}
