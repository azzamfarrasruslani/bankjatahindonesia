"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  Facebook,
  Instagram,
  Mail,
  Phone,
  Edit,
  X,
  Save,
} from "lucide-react";
import { fetchKontak, updateKontak } from "@/lib/services/kontakService";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

export default function ManajemenKontakPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [kontak, setKontak] = useState(null);
  const [tempData, setTempData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchKontak();
        setKontak(data);
        setTempData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!kontak?.id) return;
    try {
      setSaving(true);
      const updated = await updateKontak(kontak.id, tempData);
      setKontak(updated);
      setIsEditing(false);
    } catch (err) {
      alert("Gagal menyimpan: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setTempData(kontak);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        <Skeleton className="h-[120px] w-full rounded-[2rem]" />
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 grid md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Manajemen <span className="text-[#FB6B00]">Kontak</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            Kelola seluruh informasi kontak resmi Bank Jatah Indonesia.
          </p>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3.5 rounded-2xl transition-all duration-300 font-bold"
              >
                <X className="w-4 h-4" /> Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-600 text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all duration-300 font-bold disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> {saving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-600 text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all duration-300 font-bold"
            >
              <Edit className="w-4 h-4" /> Edit Informasi Kontak
            </button>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            <motion.div 
              layout
              className="grid gap-6"
            >
              {[
                { name: "whatsapp", label: "WhatsApp", icon: MessageCircle, color: "text-green-500", bg: "bg-green-50" },
                { name: "email", label: "Email", icon: Mail, color: "text-[#FB6B00]", bg: "bg-orange-50" },
                { name: "telepon", label: "Nomor Telepon", icon: Phone, color: "text-blue-500", bg: "bg-blue-50" },
                { name: "facebook", label: "Facebook", icon: Facebook, color: "text-blue-600", bg: "bg-blue-50/50" },
                { name: "instagram", label: "Instagram", icon: Instagram, color: "text-pink-500", bg: "bg-pink-50" },
                { name: "whatsapp_link", label: "Link WhatsApp", icon: MessageCircle, color: "text-green-600", bg: "bg-emerald-50" },
              ].map((item) => (
                <div 
                  key={item.name}
                  className={`flex items-center gap-5 p-6 rounded-[1.5rem] border border-gray-50 transition-all duration-300 ${isEditing ? 'bg-gray-50 ring-2 ring-transparent focus-within:ring-[#FB6B00]/20 focus-within:border-[#FB6B00]/30' : 'hover:bg-gray-50/50'}`}
                >
                  <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
                      {item.label}
                    </p>
                    {isEditing ? (
                      <input
                        type="text"
                        name={item.name}
                        value={tempData[item.name] || ""}
                        onChange={handleChange}
                        className="w-full bg-transparent border-none p-0 text-gray-900 font-bold focus:ring-0 placeholder:text-gray-300"
                        placeholder={`Masukkan ${item.label}...`}
                      />
                    ) : (
                      <p className="text-gray-900 font-bold truncate">
                        {kontak?.[item.name] || <span className="text-gray-300 italic font-medium">Belum diisi</span>}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Info Card */}
          <div className="bg-[#FB6B00]/5 rounded-[2rem] p-10 border border-[#FB6B00]/10 flex flex-col justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-sm">
              <Phone className="w-10 h-10 text-[#FB6B00]" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900">Pusat Informasi</h3>
              <p className="text-gray-500 mt-2 font-medium leading-relaxed">
                Informasi kontak ini akan ditampilkan secara publik di website utama Bank Jatah Indonesia. Pastikan data yang dimasukkan sudah benar dan valid.
              </p>
            </div>
            <div className="pt-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[11px] font-bold text-[#FB6B00] shadow-sm uppercase tracking-wider">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Sistem Kontak Aktif
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50/30 border-t border-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">
          Terakhir diperbarui: {kontak?.updated_at ? new Date(kontak.updated_at).toLocaleString("id-ID") : "-"}
        </div>
      </div>
    </div>
  );
}
