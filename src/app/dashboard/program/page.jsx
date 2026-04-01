"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { fetchProgram, deleteProgram } from "@/lib/services/programService";
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

export default function DashboardProgramPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchProgram();
        setPrograms(result);
      } catch (err) {
        console.error(err.message);
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDelete = async (id, icon_url) => {
    if (!confirm("Yakin ingin menghapus program ini?")) return;

    try {
      await deleteProgram(id, icon_url);
      setPrograms((prev) => prev.filter((item) => item.id !== id));
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
            Manajemen <span className="text-[#FB6B00]">Program</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            Kelola daftar program unggulan Bank Jatah Indonesia.
          </p>
        </div>
        <Link
          href="/dashboard/program/tambah"
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-600 text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all duration-300 font-bold"
        >
          <FaPlus className="text-sm" /> Tambah Program Baru
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-b-gray-100">
              <TableHead className="w-[350px] py-5 pl-8 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Program</TableHead>
              <TableHead className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">Status</TableHead>
              <TableHead className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">Deskripsi</TableHead>
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
                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                    <TableCell className="pr-8"><Skeleton className="h-8 w-20 ml-auto rounded-lg" /></TableCell>
                  </TableRow>
                ))
              ) : programs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <FaPlus className="text-2xl opacity-20" />
                      </div>
                      <p className="font-medium">Belum ada program yang tercatat.</p>
                      <Link href="/dashboard/program/tambah" className="text-[#FB6B00] text-sm mt-2 hover:underline">
                        Mulai tambah program pertama Anda
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                programs.map((item, index) => (
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
                          {item.icon_url ? (
                            <img
                              src={item.icon_url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-orange-50 flex items-center justify-center text-orange-300 font-bold text-xs uppercase">
                              ICON
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 group-hover:text-[#FB6B00] transition-colors truncate max-w-[250px]">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            ID: {String(item.id).slice(0, 8)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider ${
                        item.status === "Aktif" 
                        ? "bg-green-50 text-green-600" 
                        : "bg-orange-50 text-[#FB6B00]"
                      }`}>
                        {item.status || "Publik"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600 line-clamp-2 max-w-[300px]">
                        {item.description}
                      </p>
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/dashboard/program/${item.id}`}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
                          title="Edit Program"
                        >
                          <FaEdit className="text-base" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id, item.icon_url)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="Hapus Program"
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