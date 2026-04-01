"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  CheckCircle, 
  Plus, 
  X, 
  Loader2,
  Users
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function UserFormSheet({ isOpen, onClose, onSuccess, userId = null }) {
  const [form, setForm] = useState({
    nama_lengkap: "",
    email: "",
    password: "",
    no_telepon: "",
    alamat: "",
    status_aktif: true,
  });
  const [loadingData, setLoadingData] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    if (isOpen && userId) {
      loadUser();
    } else if (isOpen) {
      setForm({
        nama_lengkap: "",
        email: "",
        password: "",
        no_telepon: "",
        alamat: "",
        status_aktif: true,
      });
    }
  }, [isOpen, userId]);

  const loadUser = async () => {
    try {
      setLoadingData(true);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;

      if (data) {
        setForm({
          nama_lengkap: data.nama_lengkap || "",
          email: data.email || "",
          password: "", // Jangan tampilkan password lama
          no_telepon: data.no_telepon || "",
          alamat: data.alamat || "",
          status_aktif: data.status_aktif ?? true,
        });
      }
    } catch (err) {
      console.error("Gagal mengambil data user:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      const payload = {
        nama_lengkap: form.nama_lengkap,
        email: form.email,
        no_telepon: form.no_telepon,
        alamat: form.alamat,
        status_aktif: form.status_aktif,
      };

      // Hanya update password jika diisi (untuk edit) atau wajib jika tambah
      if (form.password) {
        payload.password = form.password; // Catatan: Seharusnya sudah di-hash di backend/lib
      }

      if (userId) {
        const { error } = await supabase.from("users").update(payload).eq("id", userId);
        if (error) throw error;
      } else {
        if (!form.password) throw new Error("Password wajib diisi untuk pengguna baru.");
        const { error } = await supabase.from("users").insert([payload]);
        if (error) throw error;
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan: " + err.message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto custom-scrollbar border-l-0 shadow-2xl p-0">
        <form onSubmit={handleSubmit} className="flex flex-col h-full bg-white">
          {/* Custom Header */}
          <div className="p-8 border-b border-gray-50 bg-gradient-to-r from-orange-50/50 to-white">
            <SheetHeader className="text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-[#FB6B00] flex items-center justify-center text-white shadow-lg shadow-orange-200">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <SheetTitle className="text-2xl font-black text-gray-900 tracking-tight">
                    {userId ? "Edit" : "Tambah"} <span className="text-[#FB6B00]">Pengguna</span>
                  </SheetTitle>
                  <SheetDescription className="text-gray-500 font-medium text-xs uppercase tracking-widest mt-0.5">
                    Panel Manajemen Akun Internal
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>
          </div>

          <div className="flex-1 p-8 space-y-8">
            {loadingData ? (
              <div className="h-64 flex flex-col items-center justify-center text-gray-400 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-[#FB6B00]" />
                <p className="font-bold text-sm tracking-widest uppercase text-center">Memuat Data...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Nama Lengkap */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                    <User className="w-3 h-3 text-[#FB6B00]" /> Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="nama_lengkap"
                    value={form.nama_lengkap}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: Ahmad Fauzi"
                    className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                    <Mail className="w-3 h-3 text-[#FB6B00]" /> Alamat Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="email@bankjatah.com"
                    className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                    <Lock className="w-3 h-3 text-[#FB6B00]" /> {userId ? "Ubah Password (Opsional)" : "Password"}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required={!userId}
                    placeholder="Minimal 8 karakter..."
                    className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                  />
                </div>

                {/* No Telepon */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                    <Phone className="w-3 h-3 text-[#FB6B00]" /> No. Telepon
                  </label>
                  <input
                    type="text"
                    name="no_telepon"
                    value={form.no_telepon}
                    onChange={handleChange}
                    placeholder="0812xxxx"
                    className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                  />
                </div>

                {/* Alamat */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                    <MapPin className="w-3 h-3 text-[#FB6B00]" /> Alamat Domisili
                  </label>
                  <textarea
                    name="alamat"
                    value={form.alamat}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Masukkan alamat lengkap..."
                    className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-medium text-gray-600 shadow-sm resize-none"
                  />
                </div>

                {/* Status Aktif */}
                <div className="flex items-center justify-between bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#FB6B00]" />
                    <div>
                      <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Status Akun</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Izinkan akses dashboard</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="status_aktif"
                      checked={form.status_aktif}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FB6B00]"></div>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-3.5 text-gray-500 hover:text-gray-900 font-bold transition-all text-xs uppercase tracking-widest"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loadingSubmit || loadingData}
              className="flex items-center gap-2 px-8 py-3.5 bg-[#FB6B00] text-white hover:bg-orange-600 rounded-2xl font-black shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-[0.1em]"
            >
              {loadingSubmit ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  {userId ? "Perbarui" : "Simpan"} Pengguna
                  <CheckCircle className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
