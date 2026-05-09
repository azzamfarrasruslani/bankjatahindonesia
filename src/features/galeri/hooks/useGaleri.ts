"use client";

import { useState, useEffect } from "react";
import { fetchGaleri, deleteGaleri } from "@/features/galeri";
import { toast } from "sonner";
import type { Galeri, DeleteModal } from "@/types";

export interface UseGaleriReturn {
  galeriList: Galeri[];
  loading: boolean;
  isSheetOpen: boolean;
  selectedGaleriId: string | null;
  deleteModal: DeleteModal<Galeri>;
  actions: {
    loadData: () => Promise<void>;
    handleOpenSheet: (id?: string | null) => void;
    handleCloseSheet: () => void;
    handleDeleteClick: (item: Galeri) => void;
    handleConfirmDelete: () => Promise<void>;
    setIsDeleteModalOpen: (open: boolean) => void;
    setItemToDelete: (item: Galeri | null) => void;
  };
}

export function useGaleri(): UseGaleriReturn {
  const [galeriList, setGaleriList] = useState<Galeri[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedGaleriId, setSelectedGaleriId] = useState<string | null>(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Galeri | null>(null);

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

  const handleOpenSheet = (id: string | null = null) => {
    setSelectedGaleriId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedGaleriId(null);
  };

  const handleDeleteClick = (item: Galeri) => {
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
      error: (err: Error) => {
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
