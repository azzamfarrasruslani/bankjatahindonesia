"use client";

import { useState, useEffect } from "react";
import { fetchTim, deleteTim } from "@/features/tim";
import { toast } from "sonner";
import type { Tim, DeleteModal } from "@/types";

export interface UseTimReturn {
  tim: Tim[];
  loading: boolean;
  filterKategori: string;
  kategoriOptions: string[];
  isSheetOpen: boolean;
  editingId: string | null;
  deleteModal: DeleteModal<Tim>;
  actions: {
    loadData: () => Promise<void>;
    setFilterKategori: (val: string) => void;
    handleOpenAddSheet: () => void;
    handleOpenEditSheet: (id: string) => void;
    handleDeleteClick: (person: Tim) => void;
    handleConfirmDelete: () => Promise<void>;
    setIsDeleteModalOpen: (open: boolean) => void;
    setItemToDelete: (item: Tim | null) => void;
    setIsSheetOpen: (open: boolean) => void;
  };
}

export function useTim(): UseTimReturn {
  const [tim, setTim] = useState<Tim[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [kategoriOptions, setKategoriOptions] = useState<string[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Tim | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchTim();
      setTim(data || []);
      
      const uniqueKategori = [
        "Semua",
        ...new Set(data.map((item) => (item as any).kategori).filter(Boolean)),
      ];
      setKategoriOptions(uniqueKategori as string[]);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data tim");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAddSheet = () => {
    setEditingId(null);
    setIsSheetOpen(true);
  };

  const handleOpenEditSheet = (id: string) => {
    setEditingId(id);
    setIsSheetOpen(true);
  };

  const handleDeleteClick = (person: Tim) => {
    setItemToDelete(person);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    const promise = deleteTim(itemToDelete.id);

    toast.promise(promise, {
      loading: "Menghapus anggota tim...",
      success: () => {
        setTim((prev) => prev.filter((item) => item.id !== itemToDelete.id));
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Anggota tim berhasil dihapus!";
      },
      error: (err: Error) => {
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Gagal menghapus anggota tim: " + err.message;
      },
    });
  };

  const filteredTim =
    filterKategori === "Semua"
      ? tim
      : tim.filter((p) => (p as any).kategori === filterKategori);

  return {
    tim: filteredTim,
    loading,
    filterKategori,
    kategoriOptions,
    isSheetOpen,
    editingId,
    deleteModal: {
      isOpen: isDeleteModalOpen,
      item: itemToDelete,
    },
    actions: {
      loadData,
      setFilterKategori,
      handleOpenAddSheet,
      handleOpenEditSheet,
      handleDeleteClick,
      handleConfirmDelete,
      setIsDeleteModalOpen,
      setItemToDelete,
      setIsSheetOpen,
    },
  };
}
