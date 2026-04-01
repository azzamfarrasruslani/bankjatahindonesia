"use client";

import { useState, useEffect } from "react";
import { fetchFAQ, deleteFAQ } from "@/services/faqService";
import { toast } from "sonner";

export function useFAQ() {
  const [faqList, setFaqList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedFaqId, setSelectedFaqId] = useState(null);
  const [openId, setOpenId] = useState(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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

  const handleOpenSheet = (id = null) => {
    setSelectedFaqId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedFaqId(null);
  };

  const handleDeleteClick = (faq) => {
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
      error: (err) => {
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Gagal menghapus FAQ: " + err.message;
      },
    });
  };

  const toggleAccordion = (id) => setOpenId(openId === id ? null : id);

  const categories = [...new Set(faqList.map((faq) => faq.kategori || "Umum"))];

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
