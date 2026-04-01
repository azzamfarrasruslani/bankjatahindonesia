"use client";

import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
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
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { useGaleri } from "@/hooks/useGaleri";

export default function DashboardGaleriPage() {
  const { 
    galeriList, 
    loading, 
    isSheetOpen, 
    selectedGaleriId, 
    deleteModal, 
    actions 
  } = useGaleri();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Manajemen <span className="text-[#FB6B00]">Galeri</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            Kelola foto dan video dokumentasi kegiatan Bank Jatah Indonesia.
          </p>
        </div>
        <button
          onClick={() => actions.handleOpenSheet()}
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
              <TableHead className="w-[100px] py-5 pl-8 font-bold text-gray-900 uppercase tracking-wider text-[11px]">
                Media
              </TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px]">
                Judul Dokumentasi
              </TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px]">
                Kategori
              </TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px]">
                Tanggal
              </TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px] text-right pr-8">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="wait">
              {loading ? (
                // Loading Skeleton
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-b-gray-50">
                    <TableCell className="py-4 pl-8">
                      <Skeleton className="h-12 w-12 rounded-xl" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[250px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell className="pr-8">
                      <Skeleton className="h-8 w-20 ml-auto rounded-lg" />
                    </TableCell>
                  </TableRow>
                ))
              ) : galeriList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Plus className="w-8 h-8 opacity-20" />
                      </div>
                      <p className="font-medium">Belum ada dokumentasi yang tercatat.</p>
                      <button
                        onClick={() => actions.handleOpenSheet()}
                        className="text-[#FB6B00] text-sm mt-2 hover:underline"
                      >
                        Mulai tambah dokumentasi pertama Anda
                      </button>
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
                    <TableCell className="py-4 pl-8">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
                        {item.tipe === "video" ? (
                          <div className="w-full h-full flex items-center justify-center bg-orange-50 text-orange-400">
                             <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                               <div className="ml-0.5 w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-current border-b-[4px] border-b-transparent"></div>
                             </div>
                          </div>
                        ) : item.gambar_url ? (
                          <img
                            src={item.gambar_url}
                            alt={item.judul}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-bold text-gray-900 group-hover:text-[#FB6B00] transition-colors truncate max-w-[300px]">
                        {item.judul}
                      </p>
                    </TableCell>
                    <TableCell>
                       <span className="px-3 py-1 bg-orange-50 text-[#FB6B00] rounded-full text-[10px] font-black uppercase tracking-widest">
                        {item.kategori || "Lainnya"}
                      </span>
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
                          onClick={() => actions.handleOpenSheet(item.id)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
                          title="Edit Dokumentasi"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => actions.handleDeleteClick(item)}
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
          Dikelola secara aman di server Bank Jatah Indonesia • ©{" "}
          {new Date().getFullYear()}
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

      <GaleriFormSheet
        isOpen={isSheetOpen}
        onClose={actions.handleCloseSheet}
        onSuccess={actions.loadData}
        galeriId={selectedGaleriId}
      />
    </div>
  );
}
