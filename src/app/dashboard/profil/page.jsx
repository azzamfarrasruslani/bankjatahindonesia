"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilPage() {
  const [tim, setTim] = useState([]);

  useEffect(() => {
    fetchTim();
  }, []);

  async function fetchTim() {
    const { data, error } = await supabase.from("tim_perusahaan").select("*");
    if (!error) setTim(data);
  }

  async function handleDelete(id) {
    if (confirm("Yakin ingin menghapus anggota ini?")) {
      const { error } = await supabase.from("tim_perusahaan").delete().eq("id", id);
      if (!error) fetchTim();
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6 md:p-10 space-y-12">
      <div className="flex items-center justify-between border-b border-orange-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">Manajemen Tim</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola anggota tim Bank Jatah Indonesia.</p>
        </div>
        <Link href="/dashboard/profil/tambah" className="bg-[#FB6B00] text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2">
          <FaPlus /> Tambah Anggota
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {tim.map((person) => (
          <div key={person.id} className="flex flex-col items-center p-6 border border-orange-100 rounded-xl hover:shadow-md hover:scale-[1.03] transition-all duration-300 relative">
            <img
              src={person.foto_url || "/no-avatar.png"}
              alt={person.nama}
              className="w-24 h-24 rounded-full object-cover border-4 border-orange-200 mb-4"
            />
            <h3 className="font-semibold text-[#FB6B00]">{person.nama}</h3>
            <p className="text-gray-600 text-sm">{person.jabatan}</p>
            <div className="flex gap-3 absolute top-3 right-3">
              <Link href={`/dashboard/profil/${person.id}`} className="text-[#FB6B00] hover:text-orange-700">
                <FaEdit />
              </Link>
              <button onClick={() => handleDelete(person.id)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
