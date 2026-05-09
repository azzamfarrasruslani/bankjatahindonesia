"use client";

import { useState, useEffect } from "react";
import { fetchProgram, deleteProgram } from "@/features/program";
import { toast } from "sonner";
import type { Program, DeleteModal } from "@/types";

export interface UseProgramReturn {
  programList: Program[];
  loading: boolean;
  isSheetOpen: boolean;
  selectedProgramId: string | null;
  deleteModal: DeleteModal<Program>;
  actions: {
    loadData: () => Promise<void>;
    handleOpenSheet: (id?: string | null) => void;
    handleCloseSheet: () => void;
    handleDeleteClick: (program: Program) => void;
    handleConfirmDelete: () => Promise<void>;
    setIsDeleteModalOpen: (open: boolean) => void;
    setItemToDelete: (item: Program | null) => void;
  };
}

export function useProgram(): UseProgramReturn {
  const [programList, setProgramList] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Program | null>(null);

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

  const handleOpenSheet = (id: string | null = null) => {
    setSelectedProgramId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedProgramId(null);
  };

  const handleDeleteClick = (program: Program) => {
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
      error: (err: Error) => {
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
