"use client";

import { useState, useEffect } from "react";
import { fetchArtikel, deleteArtikel } from "@/features/artikel";
import { toast } from "sonner";
import type { Artikel, DeleteModal } from "@/types";

export interface UseArtikelReturn {
  artikelList: Artikel[];
  loading: boolean;
  isSheetOpen: boolean;
  selectedArtikelId: string | null;
  deleteModal: DeleteModal<Artikel>;
  actions: {
    loadData: () => Promise<void>;
    handleOpenSheet: (id?: string | null) => void;
    handleCloseSheet: () => void;
    handleDeleteClick: (artikel: Artikel) => void;
    handleConfirmDelete: () => Promise<void>;
    setIsDeleteModalOpen: (open: boolean) => void;
    setItemToDelete: (item: Artikel | null) => void;
  };
}

export function useArtikel(): UseArtikelReturn {
  const [artikelList, setArtikelList] = useState<Artikel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedArtikelId, setSelectedArtikelId] = useState<string | null>(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Artikel | null>(null);

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

  const handleOpenSheet = (id: string | null = null) => {
    setSelectedArtikelId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedArtikelId(null);
  };

  const handleDeleteClick = (artikel: Artikel) => {
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
      error: (err: Error) => {
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
