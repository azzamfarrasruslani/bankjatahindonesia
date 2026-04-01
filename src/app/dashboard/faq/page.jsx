"use client";

import React from "react";
import { Plus, Edit, Trash2, ChevronDown, HelpCircle } from "lucide-react";
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
import FAQFormSheet from "./components/FAQFormSheet";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { useFAQ } from "@/hooks/useFAQ";

export default function DashboardFAQPage() {
  const { 
    faqList, 
    loading, 
    isSheetOpen, 
    selectedFaqId, 
    openId, 
    categories, 
    deleteModal, 
    actions 
  } = useFAQ();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Manajemen <span className="text-[#FB6B00]">FAQ</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            Kelola daftar pertanyaan umum untuk membantu pengunjung website Anda.
          </p>
        </div>
        <button
          onClick={() => actions.handleOpenSheet()}
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-600 text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all duration-300 font-bold"
        >
          <Plus className="w-4 h-4" /> Tambah FAQ Baru
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden p-8 space-y-4">
          <Skeleton className="h-8 w-48 mb-6" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : faqList.length === 0 ? (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-20 text-center">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#FB6B00]">
            <HelpCircle className="w-10 h-10 opacity-20" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Belum ada FAQ</h3>
          <p className="text-gray-500 mt-2">Mulai dengan menambahkan pertanyaan pertama Anda.</p>
          <button onClick={() => actions.handleOpenSheet()} className="inline-block mt-6 text-[#FB6B00] font-bold hover:underline">
            Tambah FAQ Baru →
          </button>
        </div>
      ) : (
        categories.map((category) => (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-3 ml-4">
              <div className="w-2 h-2 rounded-full bg-[#FB6B00]" />
              <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest">{category}</h2>
            </div>
            
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow className="hover:bg-transparent border-b-gray-100">
                    <TableHead className="py-5 pl-8 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Pertanyaan</TableHead>
                    <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px] text-right pr-8">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faqList
                    .filter((faq) => (faq.kategori || "Umum") === category)
                    .map((faq, index) => (
                      <React.Fragment key={faq.id}>
                        <TableRow 
                          className={`group transition-colors border-b-gray-50 cursor-pointer ${openId === faq.id ? 'bg-orange-50/30' : 'hover:bg-gray-50/50'}`}
                          onClick={() => actions.toggleAccordion(faq.id)}
                        >
                          <TableCell className="py-5 pl-8">
                            <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-lg transition-colors ${openId === faq.id ? 'bg-[#FB6B00] text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-orange-100 group-hover:text-[#FB6B00]'}`}>
                                <HelpCircle className="w-4 h-4" />
                              </div>
                              <p className={`font-bold transition-colors ${openId === faq.id ? 'text-[#FB6B00]' : 'text-gray-900'}`}>
                                {faq.pertanyaan}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="pr-8 text-right">
                            <div className="flex justify-end items-center gap-4">
                              <div className={`transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''}`}>
                                <ChevronDown className="w-4 h-4 text-gray-300" />
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                        <AnimatePresence>
                          {openId === faq.id && (
                            <TableRow className="hover:bg-transparent border-b-gray-50 bg-orange-50/10">
                              <TableCell colSpan={2} className="py-0 px-0">
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-8 pl-20 space-y-6">
                                    <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm relative">
                                      <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#FB6B00] text-white px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        Jawaban
                                      </div>
                                      <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">{faq.jawaban}</p>
                                    </div>
                                    
                                    <div className="flex items-center justify-end gap-3 pt-2">
                                      <button
                                        onClick={() => actions.handleOpenSheet(faq.id)}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 hover:border-[#FB6B00] hover:text-[#FB6B00] rounded-xl font-bold transition-all text-xs shadow-sm"
                                      >
                                        <Edit className="w-4 h-4" /> Edit Pertanyaan
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          actions.handleDeleteClick(faq);
                                        }}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl font-bold transition-all text-xs"
                                      >
                                        <Trash2 className="w-4 h-4" /> Hapus Permanen
                                      </button>
                                    </div>
                                  </div>
                                </motion.div>
                              </TableCell>
                            </TableRow>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))
      )}

      <div className="p-10 text-gray-400 text-center mt-12 bg-gray-50/50 rounded-[2rem] border border-gray-100">
        <p className="text-xs font-bold uppercase tracking-widest">© {new Date().getFullYear()} Pusat Pengetahuan Bank Jatah Indonesia</p>
      </div>

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => {
          actions.setIsDeleteModalOpen(false);
          actions.setItemToDelete(null);
        }}
        onConfirm={actions.handleConfirmDelete}
        itemName={deleteModal.item?.pertanyaan}
      />

      <FAQFormSheet
        isOpen={isSheetOpen}
        onClose={actions.handleCloseSheet}
        onSuccess={actions.loadData}
        faqId={selectedFaqId}
      />
    </div>
  );
}
