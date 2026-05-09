"use client";

import { useState, useCallback } from "react";

export default function useToast() {
  const [toast, setToast] = useState({ message: "", type: "success", visible: false });

  const showToast = useCallback((message, type = "success", duration = 3000) => {
    setToast({ message, type, visible: true });

    setTimeout(() => {
      setToast({ message: "", type, visible: false });
    }, duration);
  }, []);

  return { toast, showToast };
}
