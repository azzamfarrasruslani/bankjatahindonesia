"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaStore } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import Toast from "@/components/common/Toast";
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

export default function LokasiPage() {
  const [activeTab, setActiveTab] = useState("utama");
  const [lokasi, setLokasi] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal & Toast
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("lokasi")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLokasi(data || []);
    } catch (err) {
      console.error("Fetch lokasi error:", err);
      showToast("❌ Gagal memuat data lokasi", "error");
    } finally {
      setLoading(false);
    }
  }

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      if (selectedItem.gambar_url) {
        const filePath = selectedItem.gambar_url.replace(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/lokasi-images/lokasi/`,
          ""
        );
        const { error: storageError } = await supabase.storage
          .from("lokasi-images")
          .remove([filePath]);
        if (storageError) console.error("Gagal menghapus gambar:", storageError);
      }

      const { error } = await supabase.from("lokasi").delete().eq("id", selectedItem.id);
      if (error) throw error;

      setLokasi((prev) => prev.filter((item) => item.id !== selectedItem.id));
      showToast("✅ Lokasi berhasil dihapus", "success");
    } catch (err) {
      console.error(err);
      showToast("❌ Gagal menghapus lokasi", "error");
    } finally {
      setIsModalOpen(false);
      setSelectedItem(null);
    }
  };

  const filteredData = lokasi.filter((l) => l.jenis === activeTab);

  const renderSkeleton = () => (
    Array.from({ length: 5 }).map((_, i) => (
      <TableRow key={i} className="border-b-gray-50">
        <TableCell className="py-4 pl-8"><Skeleton className="h-12 w-12 rounded-xl" /></TableCell>
        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
        <TableCell><Skeleton className="h-4 w-48" /></TableCell>
        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
        <TableCell className="pr-8"><Skeleton className="h-8 w-20 ml-auto rounded-lg" /></TableCell>
      </TableRow>
    ))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast({ message: "", type: "success" })}
        />
      )}

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedItem?.nama || "lokasi ini"}
      />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Manajemen <span className="text-[#FB6B00]">Lokasi</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            Atur titik jemput minyak jelantah dan lokasi mitra strategis kami.
          </p>
        </div>
        <Link
          href="/dashboard/lokasi/tambah"
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-600 text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all duration-300 font-bold"
        >
          <FaPlus className="text-sm" /> Tambah Lokasi Baru
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 w-fit">
        <button
          onClick={() => setActiveTab("utama")}
          className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
            activeTab === "utama" ? "bg-[#FB6B00] text-white shadow-md shadow-orange-100" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
          }`}
        >
          <FaMapMarkerAlt className="text-[10px]" /> Lokasi Utama
        </button>
        <button
          onClick={() => setActiveTab("mitra")}
          className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
            activeTab === "mitra" ? "bg-[#FB6B00] text-white shadow-md shadow-orange-100" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
          }`}
        >
          <FaStore className="text-[10px]" /> Lokasi Mitra
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-b-gray-100">
              <TableHead className="w-[100px] py-5 pl-8 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Foto</TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Informasi Lokasi</TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Alamat & Kontak</TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Operasional</TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px] text-right pr-8">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="wait">
              {loading ? (
                renderSkeleton()
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <FaMapMarkerAlt className="text-2xl opacity-20" />
                      </div>
                      <p className="font-medium">Belum ada lokasi tersedia.</p>
                      <Link href="/dashboard/lokasi/tambah" className="text-[#FB6B00] text-sm mt-2 hover:underline font-bold">
                        Tambah lokasi pertama
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-gray-50/50 transition-colors border-b-gray-50 last:border-0"
                  >
                    <TableCell className="py-5 pl-8">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
                        {item.gambar_url ? (
                          <img src={item.gambar_url} alt={item.nama} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
                            <FaMapMarkerAlt />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 group-hover:text-[#FB6B00] transition-colors">{item.nama}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{item.jenis}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600 font-medium line-clamp-1">{item.alamat || "-"}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.kontak || "-"}</p>
                    </TableCell>
                    <TableCell>
                      <span className="bg-gray-50 text-gray-500 border border-gray-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:border-orange-100">
                        {item.jam_operasional || "TUTUP"}
                      </span>
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/dashboard/lokasi/${item.id}`}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-[#FB6B00] hover:bg-orange-50 rounded-xl transition-all"
                        >
                          <FaEdit className="text-base" />
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setIsModalOpen(true);
                          }}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
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
          Dikelola oleh Departemen Operasional Bank Jatah Indonesia • © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
