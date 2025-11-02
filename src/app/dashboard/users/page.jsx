"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setUsers(data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Gagal memuat data pengguna.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus pengguna ini?")) return;

    try {
      const { error } = await supabase.from("users").delete().eq("id", id);
      if (error) throw error;
      setUsers((prev) => prev.filter((item) => item.id !== id));
      alert("✅ Pengguna berhasil dihapus");
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Gagal menghapus pengguna. Periksa izin Supabase RLS.");
    }
  };

  return (
    <section className="p-6 md:p-10 min-h-screen bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-orange-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">Manajemen Pengguna</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola data akun pengguna internal website dengan mudah.
          </p>
        </div>
        <Link
          href="/dashboard/users/tambah"
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
        >
          <FaPlus /> Tambah Pengguna
        </Link>
      </div>

      {/* Container Tabel */}
      <div className="overflow-hidden rounded-xl shadow-md border border-orange-100 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-[#FB6B00]/10 text-[#FB6B00] uppercase text-xs font-semibold tracking-wide">
            <tr>
              <th className="px-6 py-3 text-left">Nama Lengkap</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">No Telepon</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-orange-600 font-medium animate-pulse"
                >
                  Memuat data pengguna...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-400 italic bg-orange-50/30"
                >
                  Belum ada pengguna yang tercatat.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b border-orange-100 transition-all duration-200 ${
                    index % 2 === 0
                      ? "bg-white hover:bg-orange-50/60"
                      : "bg-orange-50/40 hover:bg-orange-100/50"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {user.nama_lengkap}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {user.no_telepon || "-"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {user.status_aktif ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Aktif
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                        Nonaktif
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-5">
                      <Link
                        href={`/dashboard/users/${user.id}`}
                        className="p-2 rounded-full hover:bg-orange-100 text-[#FB6B00] hover:text-orange-700 transition-all"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 transition-all"
                        title="Hapus"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="text-xs text-gray-400 text-center mt-6">
        © {new Date().getFullYear()} Dashboard Pengguna | Bank Jatah Indonesia
      </div>
    </section>
  );
}
