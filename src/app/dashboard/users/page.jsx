"use client";

import { Plus, Edit, Trash2, Users } from "lucide-react";
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
import UserFormSheet from "./components/UserFormSheet";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { useUser } from "@/hooks/useUser";

export default function DashboardUsersPage() {
  const { 
    userList, 
    loading, 
    isSheetOpen, 
    selectedUserId, 
    deleteModal, 
    actions 
  } = useUser();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Manajemen <span className="text-[#FB6B00]">Pengguna</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            Kelola akses administrator dan staf Bank Jatah Indonesia.
          </p>
        </div>
        <button
          onClick={() => actions.handleOpenSheet()}
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-600 text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all duration-300 font-bold"
        >
          <Plus className="w-4 h-4" /> Tambah Pengguna Baru
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-b-gray-100">
              <TableHead className="py-5 pl-8 font-bold text-gray-900 uppercase tracking-wider text-[11px]">
                Nama Pengguna
              </TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px]">
                Email
              </TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px]">
                Role
              </TableHead>
              <TableHead className="py-5 font-bold text-gray-900 uppercase tracking-wider text-[11px]">
                Tanggal Bergabung
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
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[200px]" />
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
              ) : userList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Users className="w-8 h-8 opacity-20" />
                      </div>
                      <p className="font-medium">Belum ada pengguna yang terdaftar.</p>
                      <button
                        onClick={() => actions.handleOpenSheet()}
                        className="text-[#FB6B00] text-sm mt-2 hover:underline"
                      >
                        Mulai tambah pengguna pertama Anda
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                userList.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-gray-50/50 transition-colors border-b-gray-50 last:border-0"
                  >
                    <TableCell className="py-4 pl-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FB6B00] font-black text-sm">
                          {item.full_name?.charAt(0) || item.email?.charAt(0) || "?"}
                        </div>
                        <p className="font-bold text-gray-900 group-hover:text-[#FB6B00] transition-colors">
                          {item.full_name || "Tanpa Nama"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-500 font-medium">{item.email}</p>
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        item.role === 'admin' 
                          ? 'bg-red-50 text-red-600' 
                          : 'bg-blue-50 text-blue-600'
                      }`}>
                        {item.role || 'Staf'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
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
                          title="Edit Pengguna"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => actions.handleDeleteClick(item)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="Hapus Pengguna"
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
        itemName={deleteModal.item?.full_name || deleteModal.item?.email}
      />

      <UserFormSheet
        isOpen={isSheetOpen}
        onClose={actions.handleCloseSheet}
        onSuccess={actions.loadData}
        userId={selectedUserId}
      />
    </div>
  );
}
