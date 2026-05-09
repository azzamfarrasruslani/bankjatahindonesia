"use client";

import { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "@/features/users";
import { toast } from "sonner";
import type { User, DeleteModal } from "@/types";

export interface UseUserReturn {
  userList: User[];
  loading: boolean;
  isSheetOpen: boolean;
  selectedUserId: string | null;
  deleteModal: DeleteModal<User>;
  actions: {
    loadData: () => Promise<void>;
    handleOpenSheet: (id?: string | null) => void;
    handleCloseSheet: () => void;
    handleDeleteClick: (user: User) => void;
    handleConfirmDelete: () => Promise<void>;
    setIsDeleteModalOpen: (open: boolean) => void;
    setItemToDelete: (item: User | null) => void;
  };
}

export function useUser(): UseUserReturn {
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<User | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUserList(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data pengguna");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenSheet = (id: string | null = null) => {
    setSelectedUserId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedUserId(null);
  };

  const handleDeleteClick = (user: User) => {
    setItemToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    const promise = deleteUser(itemToDelete.id);

    toast.promise(promise, {
      loading: "Menghapus pengguna...",
      success: () => {
        setUserList((prev) => prev.filter((item) => item.id !== itemToDelete.id));
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Pengguna berhasil dihapus!";
      },
      error: (err: Error) => {
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        return "Gagal menghapus pengguna: " + err.message;
      },
    });
  };

  return {
    userList,
    loading,
    isSheetOpen,
    selectedUserId,
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
