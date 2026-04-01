"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { 
  User, 
  Star, 
  MessageSquare, 
  Calendar, 
  Plus, 
  CheckCircle, 
  X, 
  Loader2,
  Quote
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function TestimoniFormSheet({ isOpen, onClose, onSuccess, testimoniId = null }) {
  const [form, setForm] = useState({
    nama: "",
    rating: 5,
    isi: "",
    tanggal: new Date().toISOString().split('T')[0],
  });
  const [loadingData, setLoadingData] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    if (isOpen && testimoniId) {
      loadTestimoni();
    } else if (isOpen) {
      setForm({
        nama: "",
        rating: 5,
        isi: "",
        tanggal: new Date().toISOString().split('T')[0],
      });
    }
  }, [isOpen, testimoniId]);

  const loadTestimoni = async () => {
    try {
      setLoadingData(true);
      const { data, error } = await supabase
        .from("testimoni")
        .select("*")
        .eq("id", testimoniId)
        .single();

      if (error) throw error;

      if (data) {
        setForm({
          nama: data.nama || "",
          rating: data.rating || 5,
          isi: data.isi || "",
          tanggal: data.tanggal || new Date().toISOString().split('T')[0],
        });
      }
    } catch (err) {
      console.error("Gagal mengambil data testimoni:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (val) => {
    setForm((prev) => ({ ...prev, rating: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      const payload = {
        nama: form.nama,
        rating: parseInt(form.rating),
        isi: form.isi,
        tanggal: form.tanggal,
      };

      if (testimoniId) {
        const { error } = await supabase.from("testimoni").update(payload).eq("id", testimoniId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimoni").insert([payload]);
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
                  <Quote className="w-5 h-5" />
                </div>
                <div>
                  <SheetTitle className="text-2xl font-black text-gray-900 tracking-tight">
                    {testimoniId ? "Edit" : "Tambah"} <span className="text-[#FB6B00]">Testimoni</span>
                  </SheetTitle>
                  <SheetDescription className="text-gray-500 font-medium text-xs uppercase tracking-widest mt-0.5">
                    Panel Manajemen Ulasan Pengguna
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>
          </div>

          <div className="flex-1 p-8 space-y-10">
            {loadingData ? (
              <div className="h-64 flex flex-col items-center justify-center text-gray-400 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-[#FB6B00]" />
                <p className="font-bold text-sm tracking-widest uppercase text-center">Memuat Testimoni...</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Pengguna */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                    <User className="w-3 h-3 text-[#FB6B00]" /> Nama Pengguna
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nama lengkap..."
                    className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                  />
                </div>

                {/* Rating */}
                <div className="space-y-3">
                   <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                    <Star className="w-3 h-3 text-[#FB6B00]" /> Rating Kepuasan
                  </label>
                  <div className="flex gap-2 bg-gray-50/50 p-4 rounded-2xl justify-center shadow-inner">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleRatingChange(num)}
                        className="transition-all hover:scale-110 active:scale-95"
                      >
                        <Star 
                          className={`w-8 h-8 transition-colors ${
                            num <= form.rating 
                            ? "fill-yellow-400 text-yellow-400 drop-shadow-sm" 
                            : "text-gray-200"
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tanggal */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                    <Calendar className="w-3 h-3 text-[#FB6B00]" /> Tanggal Ulasan
                  </label>
                  <input
                    type="date"
                    name="tanggal"
                    value={form.tanggal}
                    onChange={handleChange}
                    required
                    className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-bold text-gray-900 cursor-pointer"
                  />
                </div>

                {/* Isi Testimoni */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                    <MessageSquare className="w-3 h-3 text-[#FB6B00]" /> Pesan Testimoni
                  </label>
                  <textarea
                    name="isi"
                    value={form.isi}
                    onChange={handleChange}
                    rows="5"
                    required
                    placeholder="Masukkan ulasan atau pengalaman pengguna di sini..."
                    className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-medium text-gray-600 shadow-sm resize-none leading-relaxed italic"
                  />
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
                  {testimoniId ? "Perbarui" : "Simpan"} Testimoni
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
