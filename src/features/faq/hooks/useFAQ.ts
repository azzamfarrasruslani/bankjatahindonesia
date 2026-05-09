"use client";

import { useState, useEffect } from "react";
import { fetchFAQ, deleteFAQ } from "@/features/faq";
import { toast } from "sonner";
import type { FAQ, DeleteModal } from "@/types";

export interface UseFAQReturn {
  faqList: FAQ[];
  loading: boolean;
  isSheetOpen: boolean;
  selectedFaqId: string | null;
  openId: string | null;
  categories: string[];
  deleteModal: DeleteModal<FAQ>;
  actions: {
    loadData: () => Promise<void>;
    handleOpenSheet: (id?: string | null) => void;
    handleCloseSheet: () => void;
    handleDeleteClick: (faq: FAQ) => void;
    handleConfirmDelete: () => Promise<void>;
    toggleAccordion: (id: string) => void;
    setIsDeleteModalOpen: (open: boolean) => void;
    setItemToDelete: (item: FAQ | null) => void;
  };
}

export function useFAQ(): UseFAQReturn {
  const [faqList, setFaqList] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedFaqId, setSelectedFaqId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<FAQ | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchFAQ();
      setFaqList(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data FAQ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenSheet = (id: string | null = null) => {
    setSelectedFaqId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedFaqId(null);
  };

  const handleDeleteClick = (faq: FAQ) => {
    setItemToDelete(faq);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    const promise = deleteFAQ(itemToDelete.id);

    toast.promise(promise, {
      loading: "Menghapus FAQ...",
      success: () => {
        setFaqList((prev) => prev.filter((item) => item.id !== itemToDelete.id));
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "FAQ berhasil dihapus!";
      },
      error: (err: Error) => {
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Gagal menghapus FAQ: " + err.message;
      },
    });
  };

  const toggleAccordion = (id: string) => setOpenId(openId === id ? null : id);

  // Categories need to map out from the list, assuming FAQ could have an optional kategori property in the original list
  // Even if not in type, the original JS did this:
  const categories = [...new Set(faqList.map((faq) => (faq as any).kategori || "Umum"))];

  return {
    faqList,
    loading,
    isSheetOpen,
    selectedFaqId,
    openId,
    categories,
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
      toggleAccordion,
      setIsDeleteModalOpen,
      setItemToDelete,
    },
  };
}
