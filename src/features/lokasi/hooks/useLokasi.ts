"use client";

import { useState, useEffect } from "react";
import { fetchLokasi, deleteLokasi } from "@/features/lokasi";
import { toast } from "sonner";
import type { Lokasi, DeleteModal } from "@/types";

export interface UseLokasiReturn {
  lokasiList: Lokasi[];
  loading: boolean;
  isSheetOpen: boolean;
  selectedLokasiId: string | null;
  deleteModal: DeleteModal<Lokasi>;
  actions: {
    loadData: () => Promise<void>;
    handleOpenSheet: (id?: string | null) => void;
    handleCloseSheet: () => void;
    handleDeleteClick: (item: Lokasi) => void;
    handleConfirmDelete: () => Promise<void>;
    setIsDeleteModalOpen: (open: boolean) => void;
    setItemToDelete: (item: Lokasi | null) => void;
  };
}

export function useLokasi(): UseLokasiReturn {
  const [lokasiList, setLokasiList] = useState<Lokasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedLokasiId, setSelectedLokasiId] = useState<string | null>(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Lokasi | null>(null);

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

  const handleOpenSheet = (id: string | null = null) => {
    setSelectedLokasiId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedLokasiId(null);
  };

  const handleDeleteClick = (item: Lokasi) => {
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
      error: (err: Error) => {
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
