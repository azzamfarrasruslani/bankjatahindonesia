"use client";

import { useState, useEffect } from "react";
import { fetchProgram, deleteProgram } from "@/services/programService";
import { toast } from "sonner";

export function useProgram() {
  const [programList, setProgramList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchProgram();
      setProgramList(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data program");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenSheet = (id = null) => {
    setSelectedProgramId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedProgramId(null);
  };

  const handleDeleteClick = (program) => {
    setItemToDelete(program);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    const promise = deleteProgram(itemToDelete.id);

    toast.promise(promise, {
      loading: "Menghapus program...",
      success: () => {
        setProgramList((prev) => prev.filter((item) => item.id !== itemToDelete.id));
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Program berhasil dihapus!";
      },
      error: (err) => {
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Gagal menghapus program: " + err.message;
      },
    });
  };

  return {
    programList,
    loading,
    isSheetOpen,
    selectedProgramId,
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
