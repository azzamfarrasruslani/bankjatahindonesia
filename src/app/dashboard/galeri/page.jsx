"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
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
import GaleriFormSheet from "./components/GaleriFormSheet";

export default function DashboardGaleriPage() {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedGaleriId, setSelectedGaleriId] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("galeri")
        .select("*")
        .order("tanggal", { ascending: false });

      if (error) throw error;
      setGaleri(data || []);
    } catch (err) {
      console.error(err.message);
      setGaleri([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenSheet = (id = null) => {
    setSelectedGaleriId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedGaleriId(null);
  };

  const handleDelete = async (id, gambar_url) => {
    if (!confirm("Yakin ingin menghapus dokumentasi ini?")) return;

    try {
      // Hapus gambar dari storage jika ada
      if (gambar_url) {
        const filePath = gambar_url.split("/").pop();
        await supabase.storage.from("galeri-images").remove([`galeri/${filePath}`]);
      }

      const { error } = await supabase.from("galeri").delete().eq("id", id);
      if (error) throw error;

      setGaleri((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Gagal menghapus: " + err.message);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Dokumentasi <span className="text-[#FB6B00]">Galeri</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            Kelola foto kegiatan dan dokumentasi Bank Jatah Indonesia.
          </p>
        </div>
        <button
          onClick={() => handleOpenSheet()}
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-600 text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all duration-300 font-bold"
        >
          <Plus className="w-4 h-4" /> Tambah Dokumentasi Baru
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-b-gray-100">
              <TableHead className="w-[400px] py-5 pl-8 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Konten Visual</TableHead>
              <TableHead className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">Tanggal</TableHead>
              <TableHead className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">Ringkasan</TableHead>
              <TableHead className="font-bold text-gray-900 uppercase tracking-wider text-[11px] text-right pr-8">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="wait">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-b-gray-50">
                    <TableCell className="py-4 pl-8">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-16 w-24 rounded-xl" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                    <TableCell className="pr-8"><Skeleton className="h-8 w-20 ml-auto rounded-lg" /></TableCell>
                  </TableRow>
                ))
              ) : galeri.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Plus className="w-8 h-8 opacity-20" />
                      </div>
                      <p className="font-medium">Belum ada foto yang diunggah.</p>
                      <button onClick={() => handleOpenSheet()} className="text-[#FB6B00] text-sm mt-2 hover:underline">
                        Unggah foto dokumentasi pertama Anda
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                galeri.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-gray-50/50 transition-colors border-b-gray-50 last:border-0"
                  >
                    <TableCell className="py-5 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="relative w-24 h-16 rounded-xl overflow-hidden border-2 border-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                          {item.gambar_url ? (
                            <img
                              src={item.gambar_url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                              <Plus className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 group-hover:text-[#FB6B00] transition-colors truncate max-w-[250px]">
                            {item.judul}
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                            {new Date(item.tanggal).toLocaleDateString("id-ID", { 
                              day: "numeric", 
                              month: "long", 
                              year: "numeric" 
                            })}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-gray-500 italic">
                        {item.tanggal}
                      </span>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600 line-clamp-2 max-w-[300px]">
                        {item.deskripsi}
                      </p>
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenSheet(item.id)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
                          title="Edit Dokumentasi"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.gambar_url)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="Hapus Dokumentasi"
                        >
                          <Trash2 className="w-4 h-4" />
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
          Sistem Dokumentasi Bank Jatah Indonesia • © {new Date().getFullYear()}
        </div>
      </div>

      <GaleriFormSheet
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        onSuccess={loadData}
        galeriId={selectedGaleriId}
      />
    </div>
  );
}
