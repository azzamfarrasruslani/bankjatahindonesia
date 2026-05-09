"use client";

import { useState, useEffect } from "react";
import { fetchBerita, deleteBerita } from "@/features/berita";
import { toast } from "sonner";
import type { Berita, DeleteModal } from "@/types";

export interface UseBeritaReturn {
  beritaList: Berita[];
  loading: boolean;
  isSheetOpen: boolean;
  selectedBeritaId: string | null;
  deleteModal: DeleteModal<Berita>;
  actions: {
    loadData: () => Promise<void>;
    handleOpenSheet: (id?: string | null) => void;
    handleCloseSheet: () => void;
    handleDeleteClick: (berita: Berita) => void;
    handleConfirmDelete: () => Promise<void>;
    setIsDeleteModalOpen: (open: boolean) => void;
    setItemToDelete: (item: Berita | null) => void;
  };
}

export function useBerita(): UseBeritaReturn {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedBeritaId, setSelectedBeritaId] = useState<string | null>(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Berita | null>(null);

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

  const handleOpenSheet = (id: string | null = null) => {
    setSelectedBeritaId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedBeritaId(null);
  };

  const handleDeleteClick = (berita: Berita) => {
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
      error: (err: Error) => {
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
