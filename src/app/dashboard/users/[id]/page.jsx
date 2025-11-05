"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import UserForm from "../form";

export default function EditUserPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error ambil data:", error);
        alert("Gagal memuat data pengguna.");
      } else {
        setUser(data);
      }
      setLoading(false);
    };

    fetchUser();
  }, [id]);

  async function handleSubmit(form) {
    try {
      setLoading(true);
      const { error } = await supabase.from("users").update({
        nama_lengkap: form.nama_lengkap,
        email: form.email,
        no_telepon: form.no_telepon,
        alamat: form.alamat,
        status_aktif: form.status_aktif,
      }).eq("id", id);

      if (error) throw error;

      alert("✅ Data pengguna berhasil diperbarui!");
      router.push("/dashboard/users");
    } catch (err) {
      console.error("Error update:", err.message);
      alert("❌ Gagal memperbarui data: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="p-6 text-gray-500">Memuat data pengguna...</p>;
  if (!user) return <p className="p-6 text-red-500">Data pengguna tidak ditemukan.</p>;

  return (
    <section className="p-6 md:p-10 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Pengguna
      </h1>
      <UserForm initialData={user} onSubmit={handleSubmit} disabled={loading} />
    </section>
  );
}
