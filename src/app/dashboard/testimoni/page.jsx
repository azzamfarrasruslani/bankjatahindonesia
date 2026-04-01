"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { fetchTestimoni, deleteTestimoni } from "@/lib/services/testimoniService";
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
import TestimoniFormSheet from "./components/TestimoniFormSheet";

export default function DashboardTestimoniPage() {
  const [testimoniList, setTestimoniList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedTestimoniId, setSelectedTestimoniId] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await fetchTestimoni();
      setTestimoniList(result);
    } catch (err) {
      console.error(err.message);
      setTestimoniList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenSheet = (id = null) => {
    setSelectedTestimoniId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedTestimoniId(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return;

    try {
      await deleteTestimoni(id);
      setTestimoniList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Manajemen <span className="text-[#FB6B00]">Testimoni</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            Kelola ulasan dan testimoni dari pengguna Bank Jatah Indonesia.
          </p>
        </div>
        <button
          onClick={() => handleOpenSheet()}
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-600 text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all duration-300 font-bold"
        >
          <Plus className="w-4 h-4" /> Tambah Testimoni Baru
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-b-gray-100">
              <TableHead className="w-[250px] py-5 pl-8 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Pengguna</TableHead>
              <TableHead className="font-bold text-gray-900 uppercase tracking-wider text-[11px] text-center">Rating</TableHead>
              <TableHead className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">Isi Testimoni</TableHead>
              <TableHead className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">Tanggal</TableHead>
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
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-4 w-[120px]" />
                      </div>
                    </TableCell>
                    <TableCell className="text-center"><Skeleton className="h-4 w-16 mx-auto" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[300px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell className="pr-8"><Skeleton className="h-8 w-20 ml-auto rounded-lg" /></TableCell>
                  </TableRow>
                ))
              ) : testimoniList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Plus className="w-8 h-8 opacity-20" />
                      </div>
                      <p className="font-medium">Belum ada testimoni yang tercatat.</p>
                      <button onClick={() => handleOpenSheet()} className="text-[#FB6B00] text-sm mt-2 hover:underline">
                        Mulai tambah testimoni pertama Anda
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                testimoniList.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-gray-50/50 transition-colors border-b-gray-50 last:border-0"
                  >
                    <TableCell className="py-5 pl-8">
                      <p className="font-bold text-gray-900 group-hover:text-[#FB6B00] transition-colors truncate max-w-[180px]">
                        {item.nama}
                      </p>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-0.5 text-yellow-400 drop-shadow-sm">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-current" />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600 line-clamp-2 max-w-[400px] italic">
                        "{item.isi}"
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                        {new Date(item.tanggal).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenSheet(item.id)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
                          title="Edit Testimoni"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="Hapus Testimoni"
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
          Dikelola oleh sistem Bank Jatah Indonesia • © {new Date().getFullYear()}
        </div>
      </div>

      <TestimoniFormSheet
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        onSuccess={loadData}
        testimoniId={selectedTestimoniId}
      />
    </div>
  );
}
