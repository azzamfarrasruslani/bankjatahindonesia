"use client";

import { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "@/services/userService";
import { toast } from "sonner";

export function useUser() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // State untuk Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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

  const handleOpenSheet = (id = null) => {
    setSelectedUserId(id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedUserId(null);
  };

  const handleDeleteClick = (user) => {
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
      error: (err) => {
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
