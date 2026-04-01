"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2, Plus, Users } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Toast from "@/components/common/Toast";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import ProfilFormSheet from "./components/ProfilFormSheet";
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

export default function ProfilPage() {
  const [tim, setTim] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [kategoriOptions, setKategoriOptions] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTim();
  }, []);

  async function fetchTim() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("tim")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      
      setTim(data || []);
      const uniqueKategori = [
        "Semua",
        ...new Set(data.map((item) => item.kategori).filter(Boolean)),
      ];
      setKategoriOptions(uniqueKategori);
    } catch (err) {
      console.error("Gagal memuat data tim:", err.message);
      showToast("Gagal memuat data tim", "error");
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
      const res = await fetch("/api/team", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedItem.id,
          foto_url: selectedItem.foto_url,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus");

      setTim((prev) => prev.filter((item) => item.id !== selectedItem.id));
      showToast("✅ Anggota dan gambarnya berhasil dihapus", "success");
    } catch (err) {
      console.error(err);
      showToast("❌ Gagal menghapus anggota", "error");
    } finally {
      setIsModalOpen(false);
      setSelectedItem(null);
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

  const filteredTim =
    filterKategori === "Semua"
      ? tim
      : tim.filter((p) => p.kategori === filterKategori);

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

      <ProfilFormSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSuccess={fetchTim}
        timId={editingId}
      />

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedItem?.nama || "anggota ini"}
      />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Manajemen <span className="text-[#FB6B00]">Tim</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            Kelola profil anggota tim dan struktur organisasi Bank Jatah Indonesia.
          </p>
        </div>
        <button
          onClick={handleOpenAddSheet}
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-600 text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all duration-300 font-bold"
        >
          <Plus className="w-4 h-4" /> Tambah Anggota Tim
        </button>
      </div>

      {/* Filter Kategori */}
      <div className="flex flex-wrap gap-2 px-4">
        {kategoriOptions.map((k) => (
          <button
            key={k}
            onClick={() => setFilterKategori(k)}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border-2 ${
              filterKategori === k
                ? "bg-[#FB6B00] text-white border-[#FB6B00] shadow-md shadow-orange-100"
                : "bg-white text-gray-500 border-gray-100 hover:border-[#FB6B00]/30 hover:text-[#FB6B00]"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-b-gray-100">
              <TableHead className="w-[300px] py-5 pl-8 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Anggota</TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Jabatan</TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Kategori</TableHead>
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
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[150px]" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                    <TableCell className="pr-8"><Skeleton className="h-8 w-20 ml-auto rounded-lg" /></TableCell>
                  </TableRow>
                ))
              ) : filteredTim.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Users className="w-8 h-8 opacity-20" />
                      </div>
                      <p className="font-medium">Tidak ada anggota tim ditemukan.</p>
                      <button onClick={handleOpenAddSheet} className="text-[#FB6B00] text-sm mt-2 hover:underline font-bold">
                        Daftarkan anggota tim pertama
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTim.map((person, index) => (
                  <motion.tr
                    key={person.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-gray-50/50 transition-colors border-b-gray-50 last:border-0"
                  >
                    <TableCell className="py-5 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-gray-50 group-hover:ring-orange-50 transition-all">
                          <img
                            src={person.foto_url || "/no-avatar.png"}
                            alt={person.nama}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <p className="font-bold text-gray-900 group-hover:text-[#FB6B00] transition-colors">
                          {person.nama}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-semibold text-gray-600">
                        {person.jabatan}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span className="bg-gray-50 text-gray-500 border border-gray-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:border-orange-100">
                        {person.kategori}
                      </span>
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditSheet(person.id)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-[#FB6B00] hover:bg-orange-50 rounded-xl transition-all"
                          title="Edit Anggota"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedItem(person);
                            setIsModalOpen(true);
                          }}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          title="Hapus Anggota"
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
          Dikelola oleh Departemen SDM Bank Jatah Indonesia • © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
