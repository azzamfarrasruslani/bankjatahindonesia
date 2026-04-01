"use client";

import { useState, React } from "react";
import { useRouter } from "next/navigation";
import {
  uploadImage,
  insertArtikel,
  updateArtikel,
} from "@/lib/services/artikelService";
import RichTextEditor from "@/components/features/(admin)/dashboard/RichTextEditor";
import { 
  Type, 
  User, 
  Tag, 
  FileText, 
  Image as ImageIcon, 
  Plus,
  CheckCircle,
  X
} from "lucide-react";
import { motion } from "framer-motion";

export default function ArtikelForm({ artikel = null, onSuccess }) {
  const [form, setForm] = useState({
    judul: artikel?.judul || "",
    penulis: artikel?.penulis || "",
    isi: artikel?.isi || "",
    gambar_url: artikel?.gambar_url || "",
    kategori: artikel?.kategori || "",
    is_top: artikel?.is_top || false,
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(artikel?.gambar_url || "");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage(file, form.gambar_url);
      const payload = { ...form, gambar_url: imageUrl };

      if (artikel?.id) {
        await updateArtikel(artikel.id, payload);
      } else {
        await insertArtikel(payload);
      }

      onSuccess?.();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Media & Primary Info */}
        <div className="space-y-8">
          {/* Upload gambar */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
              <ImageIcon className="w-4 h-4 text-[#FB6B00]" />
              Thumbnail Artikel
            </label>
            <div className="relative group/upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="border-2 border-dashed border-gray-200 group-hover/upload:border-[#FB6B00] rounded-[2rem] p-4 transition-all flex flex-col items-center justify-center bg-gray-50 group-hover/upload:bg-orange-50/30 overflow-hidden min-h-[300px]">
                {preview ? (
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover min-h-[260px]" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white font-bold text-sm">Ganti Gambar</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-[#FB6B00] mb-4">
                      <Plus className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-bold text-gray-900">Pilih Gambar Utama</p>
                    <p className="text-xs text-gray-400 mt-1">Rekomendasi 1200x630 (16:9)</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Judul */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
                <Type className="w-4 h-4 text-[#FB6B00]" />
                Judul Artikel
              </label>
              <input
                type="text"
                name="judul"
                value={form.judul}
                onChange={handleChange}
                required
                placeholder="Masukkan judul yang menarik..."
                className="w-full border-2 border-gray-100 rounded-[1.2rem] px-5 py-4 focus:border-[#FB6B00] focus:ring-0 outline-none bg-gray-50/50 hover:bg-white transition-all font-bold text-gray-900 placeholder:text-gray-300"
              />
            </div>

            {/* Kategori & Penulis Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
                  <Tag className="w-4 h-4 text-[#FB6B00]" />
                  Kategori
                </label>
                <input
                  type="text"
                  name="kategori"
                  value={form.kategori}
                  onChange={handleChange}
                  placeholder="Edukasi, Berita, dll"
                  className="w-full border-2 border-gray-100 rounded-[1.2rem] px-5 py-4 focus:border-[#FB6B00] focus:ring-0 outline-none bg-gray-50/50 hover:bg-white transition-all font-medium text-gray-900 shadow-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
                  <User className="w-4 h-4 text-[#FB6B00]" />
                  Penulis
                </label>
                <input
                  type="text"
                  name="penulis"
                  value={form.penulis}
                  onChange={handleChange}
                  placeholder="Nama Penulis"
                  className="w-full border-2 border-gray-100 rounded-[1.2rem] px-5 py-4 focus:border-[#FB6B00] focus:ring-0 outline-none bg-gray-50/50 hover:bg-white transition-all font-medium text-gray-900 shadow-sm"
                />
              </div>
            </div>

            {/* Status Utama */}
            <div className="flex items-center gap-4 bg-orange-50/50 p-5 rounded-[1.5rem] border-2 border-orange-100/50 hover:border-[#FB6B00]/30 transition-all cursor-pointer group/check" 
                 onClick={() => setForm(prev => ({ ...prev, is_top: !prev.is_top }))}>
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${form.is_top ? 'bg-[#FB6B00] border-[#FB6B00]' : 'border-gray-200 bg-white'}`}>
                {form.is_top && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <div className="select-none">
                <p className="font-bold text-gray-900 text-sm tracking-wide">Tampilkan sebagai Unggulan</p>
                <p className="text-[10px] text-orange-600 font-bold uppercase tracking-widest mt-0.5 opacity-70">Akan muncul di bagian utama beranda</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Content Editor */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
            <FileText className="w-4 h-4 text-[#FB6B00]" />
            Konten Artikel
          </label>
          <div className="prose-slate max-w-none border-2 border-gray-100 rounded-[2rem] overflow-hidden focus-within:border-[#FB6B00] transition-all bg-gray-50/30">
            <RichTextEditor
              value={form.isi}
              onChange={(val) => setForm((prev) => ({ ...prev, isi: val }))}
            />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-100 mt-12">
        <button
          type="button"
          onClick={() => router.push("/dashboard/artikel")}
          className="flex items-center gap-2 px-8 py-4 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-[1.2rem] font-bold transition-all text-sm"
        >
          <X className="w-4 h-4" /> Batal & Kembali
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-10 py-4 bg-[#FB6B00] text-white hover:bg-orange-600 rounded-[1.2rem] font-bold shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              {artikel?.id ? "Perbarui Artikel" : "Terbitkan Artikel Sekarang"}
              <CheckCircle className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}
