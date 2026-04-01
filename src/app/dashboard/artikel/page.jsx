"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { fetchArtikel, deleteArtikel } from "@/lib/services/artikelService";
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
import ArtikelFormSheet from "./components/ArtikelFormSheet";

export default function ArtikelPage() {
  const [artikel, setArtikel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await fetchArtikel();
      setArtikel(result);
    } catch (err) {
      console.error(err.message);
      setArtikel([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;

    try {
      await deleteArtikel(id);
      setArtikel((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleOpenAddSheet = () => {
    setEditingId(null);
    setIsSheetOpen(true);
  };

  const handleOpenEditSheet = (id) => {
    setEditingId(id);
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <ArtikelFormSheet 
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSuccess={loadData}
        artikelId={editingId}
      />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Manajemen <span className="text-[#FB6B00]">Artikel</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            Kelola konten edukasi dan informasi menarik untuk website Anda.
          </p>
        </div>
        <button
          onClick={handleOpenAddSheet}
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-600 text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all duration-300 font-bold"
        >
          <FaPlus className="text-sm" /> Tambah Artikel Baru
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-b-gray-100">
              <TableHead className="w-[350px] py-5 pl-8 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Artikel</TableHead>
              <TableHead className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">Kategori</TableHead>
              <TableHead className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">Penulis</TableHead>
              <TableHead className="font-bold text-gray-900 uppercase tracking-wider text-[11px] text-center">Stats</TableHead>
              <TableHead className="font-bold text-gray-900 uppercase tracking-wider text-[11px] text-center">Status</TableHead>
              <TableHead className="font-bold text-gray-900 uppercase tracking-wider text-[11px] text-right pr-8">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="wait">
              {loading ? (
                // Loading Skeleton
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-b-gray-50">
                    <TableCell className="py-4 pl-8">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-12 w-12 rounded-xl" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-3 w-[100px]" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-12 mx-auto" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 mx-auto rounded-full" /></TableCell>
                    <TableCell className="pr-8"><Skeleton className="h-8 w-20 ml-auto rounded-lg" /></TableCell>
                  </TableRow>
                ))
              ) : artikel.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <FaPlus className="text-2xl opacity-20" />
                      </div>
                      <p className="font-medium">Belum ada artikel yang tercatat.</p>
                      <button onClick={handleOpenAddSheet} className="text-[#FB6B00] text-sm mt-2 hover:underline">
                        Mulai tulis artikel pertama Anda
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                artikel.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-gray-50/50 transition-colors border-b-gray-50 last:border-0"
                  >
                    <TableCell className="py-5 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                          {item.gambar_url ? (
                            <img
                              src={item.gambar_url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-orange-50 flex items-center justify-center text-orange-300 font-bold text-xs uppercase">
                              NO IMG
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 group-hover:text-[#FB6B00] transition-colors truncate max-w-[250px]">
                            {item.judul}
                          </p>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            ID: {item.id.slice(0, 8)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-3 py-1 rounded-lg bg-orange-50 text-[#FB6B00] text-[11px] font-bold uppercase tracking-wider">
                        {item.kategori || "Umum"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-gray-600">
                      {item.penulis || "Admin"}
                    </TableCell>
                    <TableCell className="text-center font-bold text-gray-900">
                      {item.views || 0}
                      <span className="block text-[10px] text-gray-400 font-medium uppercase tracking-tighter">Views</span>
                    </TableCell>
                    <TableCell className="text-center">
                      {item.is_top ? (
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_4px_10px_rgba(251,107,0,0.3)]">
                          Highlight
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                          Normal
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditSheet(item.id)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
                          title="Edit Artikel"
                        >
                          <FaEdit className="text-base" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="Hapus Artikel"
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
