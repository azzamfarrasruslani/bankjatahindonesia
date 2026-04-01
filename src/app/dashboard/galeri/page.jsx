"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaPlus, FaTrash, FaEdit, FaImage } from "react-icons/fa";
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

export default function DashboardGaleriPage() {
  const router = useRouter();
  const [galeriList, setGaleriList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGaleri = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("galeri")
        .select("*")
        .order("tanggal", { ascending: false });

      if (error) throw error;
      setGaleriList(data || []);
    } catch (err) {
      console.error("Gagal mengambil data galeri:", err.message || err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, gambar_url) => {
    if (!confirm("Yakin ingin menghapus foto ini beserta gambarnya?")) return;

    try {
      if (gambar_url) {
        const filePath = gambar_url.replace(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/galeri-images/galeri/`,
          ""
        );
        const { error: storageError } = await supabase.storage
          .from("galeri-images")
          .remove([filePath]);
        if (storageError)
          console.error("Gagal menghapus gambar galeri:", storageError);
      }

      const { error } = await supabase.from("galeri").delete().eq("id", id);
      if (error) throw error;

      fetchGaleri();
    } catch (err) {
      alert("Gagal menghapus foto. Cek console.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Manajemen <span className="text-[#FB6B00]">Galeri</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            Dokumentasikan setiap momen berharga dan kegiatan Bank Jatah Indonesia.
          </p>
        </div>
        <Link
          href="/dashboard/galeri/tambah"
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-600 text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all duration-300 font-bold"
        >
          <FaPlus className="text-sm" /> Tambah Galeri Foto
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-b-gray-100">
              <TableHead className="w-[120px] py-5 pl-8 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Foto</TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Judul & Deskripsi</TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Tanggal</TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px] text-right pr-8">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="wait">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-b-gray-50">
                    <TableCell className="py-4 pl-8">
                      <Skeleton className="h-16 w-16 rounded-xl" />
                    </TableCell>
                    <TableCell className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-3 w-[200px]" />
                    </TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell className="pr-8"><Skeleton className="h-8 w-20 ml-auto rounded-lg" /></TableCell>
                  </TableRow>
                ))
              ) : galeriList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <FaImage className="text-2xl opacity-20" />
                      </div>
                      <p className="font-medium">Belum ada foto galeri.</p>
                      <Link href="/dashboard/galeri/tambah" className="text-[#FB6B00] text-sm mt-2 hover:underline">
                        Mulai unggah foto pertama Anda
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                galeriList.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-gray-50/50 transition-colors border-b-gray-50 last:border-0"
                  >
                    <TableCell className="py-5 pl-8">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={item.gambar_url}
                          alt={item.judul}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 group-hover:text-[#FB6B00] transition-colors">
                          {item.judul}
                        </p>
                        <p className="text-xs text-gray-400 line-clamp-1 mt-1">
                          {item.deskripsi}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-gray-600">
                        {new Date(item.tanggal).toLocaleDateString("id-ID", {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => router.push(`/dashboard/galeri/${item.id}`)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-[#FB6B00] hover:bg-orange-50 rounded-xl transition-all"
                          title="Edit Foto"
                        >
                          <FaEdit className="text-base" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.gambar_url)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          title="Hapus Foto"
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
          Dikelola oleh sistem Bank Jatah Indonesia • © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
