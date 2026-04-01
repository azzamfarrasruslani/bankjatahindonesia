"use client";

import { useState, useEffect } from "react";
import { fetchBerita, deleteBerita } from "@/services/beritaService";
import { toast } from "sonner";

export function useBerita() {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedBeritaId, setSelectedBeritaId] = useState(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchBerita();
      setBeritaList(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data berita");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenSheet = (id = null) => {
    setSelectedBeritaId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedBeritaId(null);
  };

  const handleDeleteClick = (berita) => {
    setItemToDelete(berita);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    const promise = deleteBerita(itemToDelete.id);

    toast.promise(promise, {
      loading: "Menghapus berita...",
      success: () => {
        setBeritaList((prev) => prev.filter((item) => item.id !== itemToDelete.id));
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Berita berhasil dihapus!";
      },
      error: (err) => {
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Gagal menghapus berita: " + err.message;
      },
    });
  };

  return {
    beritaList,
    loading,
    isSheetOpen,
    selectedBeritaId,
    deleteModal: {
      isOpen: isDeleteModalOpen,
      item: itemToDelete,
    },
    actions: {
      loadData,
      handleOpenSheet,
      handleCloseSheet,
      handleDeleteClick,
      handleConfirmDelete,
      setIsDeleteModalOpen,
      setItemToDelete,
    },
  };
}
