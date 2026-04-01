"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaUserShield } from "react-icons/fa";
import { fetchUsers, deleteUser } from "@/lib/services/userService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus pengguna ini?")) return;

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Gagal menghapus pengguna: " + err.message);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Manajemen <span className="text-[#FB6B00]">Pengguna</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            Kelola data akun pengguna internal website Bank Jatah Indonesia.
          </p>
        </div>
        <Link
          href="/dashboard/users/tambah"
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-600 text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all duration-300 font-bold"
        >
          <FaPlus className="text-sm" /> Tambah Pengguna Baru
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-b-gray-100">
              <TableHead className="w-[300px] py-5 pl-8 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Nama Lengkap</TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Email</TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px]">No Telepon</TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px] text-center">Status</TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px] text-right pr-8">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="wait">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-b-gray-50">
                    <TableCell className="py-4 pl-8">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                    </TableCell>
                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell className="text-center"><Skeleton className="h-6 w-20 mx-auto rounded-full" /></TableCell>
                    <TableCell className="pr-8"><Skeleton className="h-8 w-20 ml-auto rounded-lg" /></TableCell>
                  </TableRow>
                ))
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <FaUserShield className="text-2xl opacity-20" />
                      </div>
                      <p className="font-medium">Belum ada pengguna yang tercatat.</p>
                      <Link href="/dashboard/users/tambah" className="text-[#FB6B00] text-sm mt-2 hover:underline">
                        Daftarkan pengguna pertama Anda
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-gray-50/50 transition-colors border-b-gray-50 last:border-0"
                  >
                    <TableCell className="py-5 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FB6B00] flex items-center justify-center font-black text-xs shadow-sm ring-1 ring-orange-100 group-hover:ring-[#FB6B00] transition-all">
                          {user.nama_lengkap?.charAt(0).toUpperCase()}
                        </div>
                        <p className="font-bold text-gray-900 group-hover:text-[#FB6B00] transition-colors">
                          {user.nama_lengkap}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium text-gray-600">{user.email}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium text-gray-600">{user.no_telepon || "-"}</p>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                        user.status_aktif 
                          ? "bg-green-50 text-green-600 border border-green-100" 
                          : "bg-red-50 text-red-600 border border-red-100"
                      }`}>
                        {user.status_aktif ? "Aktif" : "Nonaktif"}
                      </span>
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/dashboard/users/${user.id}`}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
                          title="Edit Pengguna"
                        >
                          <FaEdit className="text-base" />
                        </Link>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="Hapus Pengguna"
                        >
                          <FaTrash className="text-base" />
                        </button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
        <div className="p-6 bg-gray-50/30 border-t border-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">
          Keamanan akun dikelola secara terpusat • © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
