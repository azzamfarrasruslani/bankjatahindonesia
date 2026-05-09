"use client";

import { useState, useEffect } from "react";
import { fetchTestimoni, deleteTestimoni } from "@/features/testimoni";
import { toast } from "sonner";
import type { Testimoni, DeleteModal } from "@/types";

export interface UseTestimoniReturn {
  testimoniList: Testimoni[];
  loading: boolean;
  isSheetOpen: boolean;
  selectedTestimoniId: string | null;
  deleteModal: DeleteModal<Testimoni>;
  actions: {
    loadData: () => Promise<void>;
    handleOpenSheet: (id?: string | null) => void;
    handleCloseSheet: () => void;
    handleDeleteClick: (item: Testimoni) => void;
    handleConfirmDelete: () => Promise<void>;
    setIsDeleteModalOpen: (open: boolean) => void;
    setItemToDelete: (item: Testimoni | null) => void;
  };
}

export function useTestimoni(): UseTestimoniReturn {
  const [testimoniList, setTestimoniList] = useState<Testimoni[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedTestimoniId, setSelectedTestimoniId] = useState<string | null>(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Testimoni | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await fetchTestimoni();
      setTestimoniList(result || []);
    } catch (err: any) {
      console.error(err.message);
      setTestimoniList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenSheet = (id: string | null = null) => {
    setSelectedTestimoniId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedTestimoniId(null);
  };

  const handleDeleteClick = (item: Testimoni) => {
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
      error: (err: Error) => {
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
