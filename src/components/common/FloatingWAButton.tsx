"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function FloatingWAButton() {
  const [isHover, setIsHover] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");

  useEffect(() => {
    const fetchKontak = async () => {
      const { data, error } = await supabase
        .from("kontak")
        .select("whatsapp_link")
        .order("id", { ascending: true })
        .limit(1)
        .maybeSingle(); // Hindari error jika tabel kosong

      if (error && error.code !== "PGRST116") {
        console.error("Gagal memuat data kontak:", error);
      } else {
        setWhatsappLink(data?.whatsapp_link || "");
      }
    };

    fetchKontak();
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50 flex items-center space-x-2"
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
    >
      <motion.a
        href={whatsappLink || "#"}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`${
          whatsappLink
            ? "bg-[#25D366] cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
        } text-white p-4 rounded-full shadow-lg flex items-center justify-center`}
        title="Hubungi via WhatsApp"
      >
        <MessageCircle size={24} />
      </motion.a>

      <AnimatePresence>
        {isHover && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white text-[#25D366] px-4 py-2 rounded-full shadow-md text-sm font-semibold"
          >
            Chat Kami
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
