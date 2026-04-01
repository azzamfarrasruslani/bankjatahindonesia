"use client";

import { useState, useEffect } from "react";
import { fetchArtikel, deleteArtikel } from "@/services/artikelService";
import { toast } from "sonner";

export function useArtikel() {
  const [artikelList, setArtikelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedArtikelId, setSelectedArtikelId] = useState(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchArtikel();
      setArtikelList(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data artikel");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenSheet = (id = null) => {
    setSelectedArtikelId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedArtikelId(null);
  };

  const handleDeleteClick = (artikel) => {
    setItemToDelete(artikel);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    const promise = deleteArtikel(itemToDelete.id);

    toast.promise(promise, {
      loading: "Menghapus artikel...",
      success: () => {
        setArtikelList((prev) => prev.filter((item) => item.id !== itemToDelete.id));
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Artikel berhasil dihapus!";
      },
      error: (err) => {
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Gagal menghapus artikel: " + err.message;
      },
    });
  };

  return {
    artikelList,
    loading,
    isSheetOpen,
    selectedArtikelId,
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
