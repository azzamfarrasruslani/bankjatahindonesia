"use client";

import { Plus, Edit, Trash2, Newspaper } from "lucide-react";
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
import BeritaFormSheet from "./components/BeritaFormSheet";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { useBerita } from "@/hooks/useBerita";

export default function DashboardBeritaPage() {
  const { 
    beritaList, 
    loading, 
    isSheetOpen, 
    selectedBeritaId, 
    deleteModal, 
    actions 
  } = useBerita();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Manajemen <span className="text-[#FB6B00]">Berita</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            Kelola liputan kegiatan dan informasi terbaru Bank Jatah Indonesia.
          </p>
        </div>
        <button
          onClick={() => actions.handleOpenSheet()}
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-600 text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all duration-300 font-bold"
        >
          <Plus className="w-4 h-4" /> Tambah Berita Baru
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-b-gray-100">
              <TableHead className="w-[350px] py-5 pl-8 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Berita</TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Tanggal Publish</TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Penulis</TableHead>
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
                        <Skeleton className="h-12 w-12 rounded-xl" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-3 w-[100px]" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 mx-auto rounded-full" /></TableCell>
                    <TableCell className="pr-8"><Skeleton className="h-8 w-20 ml-auto rounded-lg" /></TableCell>
                  </TableRow>
                ))
              ) : beritaList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Plus className="w-8 h-8 opacity-20" />
                      </div>
                      <p className="font-medium">Belum ada berita yang tercatat.</p>
                      <button onClick={() => actions.handleOpenSheet()} className="text-[#FB6B00] text-sm mt-2 hover:underline font-bold">
                        Buat berita pertama Anda
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                beritaList.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-gray-50/50 transition-colors border-b-gray-50 last:border-0 text-sm"
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
                            <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300 font-bold text-[10px] uppercase">
                              NO IMG
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 group-hover:text-[#FB6B00] transition-colors truncate max-w-[250px]">
                            {item.judul}
                          </p>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            KABAR TERKINI • {item.id.slice(0, 8)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-600">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="font-semibold text-gray-700">
                      {item.penulis || "Admin"}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.is_top ? (
                        <span className="bg-[#FB6B00] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_4px_10px_rgba(251,107,0,0.3)]">
                          Utama
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                          Biasa
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => actions.handleOpenSheet(item.id)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-[#FB6B00] hover:bg-orange-50 rounded-xl transition-all"
                          title="Edit Berita"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => actions.handleDeleteClick(item)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          title="Hapus Berita"
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
          Pusat Informasi Bank Jatah Indonesia • © {new Date().getFullYear()}
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => {
          actions.setIsDeleteModalOpen(false);
          actions.setItemToDelete(null);
        }}
        onConfirm={actions.handleConfirmDelete}
        itemName={deleteModal.item?.judul}
      />

      <BeritaFormSheet
        isOpen={isSheetOpen}
        onClose={actions.handleCloseSheet}
        onSuccess={actions.loadData}
        beritaId={selectedBeritaId}
      />
    </div>
  );
}