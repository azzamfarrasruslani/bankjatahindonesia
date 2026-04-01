"use client";

import { useState, useEffect } from "react";
import { fetchLokasi, deleteLokasi } from "@/services/lokasiService";
import { toast } from "sonner";

export function useLokasi() {
  const [lokasiList, setLokasiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedLokasiId, setSelectedLokasiId] = useState(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchLokasi();
      setLokasiList(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data lokasi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenSheet = (id = null) => {
    setSelectedLokasiId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedLokasiId(null);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    const promise = deleteLokasi(itemToDelete.id);

    toast.promise(promise, {
      loading: "Menghapus lokasi...",
      success: () => {
        setLokasiList((prev) => prev.filter((item) => item.id !== itemToDelete.id));
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Lokasi berhasil dihapus!";
      },
      error: (err) => {
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Gagal menghapus lokasi: " + err.message;
      },
    });
  };

  return {
    lokasiList,
    loading,
    isSheetOpen,
    selectedLokasiId,
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
