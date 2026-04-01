"use client";

import { useState, useEffect } from "react";
import { fetchGaleri, deleteGaleri } from "@/services/galeriService";
import { toast } from "sonner";

export function useGaleri() {
  const [galeriList, setGaleriList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedGaleriId, setSelectedGaleriId] = useState(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchGaleri();
      setGaleriList(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data galeri");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenSheet = (id = null) => {
    setSelectedGaleriId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedGaleriId(null);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    const promise = deleteGaleri(itemToDelete.id);

    toast.promise(promise, {
      loading: "Menghapus dokumentasi...",
      success: () => {
        setGaleriList((prev) => prev.filter((item) => item.id !== itemToDelete.id));
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Dokumentasi berhasil dihapus!";
      },
      error: (err) => {
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Gagal menghapus dokumentasi: " + err.message;
      },
    });
  };

  return {
    galeriList,
    loading,
    isSheetOpen,
    selectedGaleriId,
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
