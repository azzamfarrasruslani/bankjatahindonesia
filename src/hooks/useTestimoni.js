"use client";

import { useState, useEffect } from "react";
import { fetchTestimoni, deleteTestimoni } from "@/services/testimoniService";
import { toast } from "sonner";

export function useTestimoni() {
  const [testimoniList, setTestimoniList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedTestimoniId, setSelectedTestimoniId] = useState(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await fetchTestimoni();
      setTestimoniList(result);
    } catch (err) {
      console.error(err.message);
      setTestimoniList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenSheet = (id = null) => {
    setSelectedTestimoniId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedTestimoniId(null);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    const promise = deleteTestimoni(itemToDelete.id);

    toast.promise(promise, {
      loading: "Menghapus testimoni...",
      success: () => {
        setTestimoniList((prev) => prev.filter((item) => item.id !== itemToDelete.id));
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Testimoni berhasil dihapus!";
      },
      error: (err) => {
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Gagal menghapus testimoni: " + err.message;
      },
    });
  };

  return {
    // States
    testimoniList,
    loading,
    isSheetOpen,
    selectedTestimoniId,
    deleteModal: {
      isOpen: isDeleteModalOpen,
      item: itemToDelete,
    },
    // Actions
    actions: {
      loadData,
      handleOpenSheet,
      handleCloseSheet,
      handleDeleteClick,
      handleConfirmDelete,
      setIsDeleteModalOpen,
      setItemToDelete,
    }
  };
}
