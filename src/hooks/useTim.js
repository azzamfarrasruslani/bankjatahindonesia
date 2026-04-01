"use client";

import { useState, useEffect } from "react";
import { fetchTim, deleteTim } from "@/services/timService";
import { toast } from "sonner";

export function useTim() {
  const [tim, setTim] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [kategoriOptions, setKategoriOptions] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchTim();
      setTim(data || []);
      
      const uniqueKategori = [
        "Semua",
        ...new Set(data.map((item) => item.kategori).filter(Boolean)),
      ];
      setKategoriOptions(uniqueKategori);
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

  const handleOpenEditSheet = (id) => {
    setEditingId(id);
    setIsSheetOpen(true);
  };

  const handleDeleteClick = (person) => {
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
      error: (err) => {
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Gagal menghapus anggota tim: " + err.message;
      },
    });
  };

  const filteredTim =
    filterKategori === "Semua"
      ? tim
      : tim.filter((p) => p.kategori === filterKategori);

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
