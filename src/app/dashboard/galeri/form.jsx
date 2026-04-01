"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import { 
  Type, 
  AlignLeft, 
  Calendar, 
  Image as ImageIcon, 
  Plus, 
  CheckCircle, 
  X, 
  Loader2 
} from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function GaleriForm({ galeriId, onSuccess }) {
  const router = useRouter();
  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    tanggal: "",
    gambar_url: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loadingData, setLoadingData] = useState(!!galeriId);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    if (!galeriId) return;
    const fetchGaleri = async () => {
      setLoadingData(true);
      const { data, error } = await supabase
        .from("galeri")
        .select("*")
        .eq("id", galeriId)
        .single();

      if (!error && data) {
        setForm({
          judul: data.judul || "",
          deskripsi: data.deskripsi || "",
          tanggal: data.tanggal || "",
          gambar_url: data.gambar_url || "",
        });
        setPreview(data.gambar_url || "");
      }
      setLoadingData(false);
    };
    fetchGaleri();
  }, [galeriId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const uploadImage = async () => {
    if (!file) return form.gambar_url || "";

    try {
      const options = {
        maxSizeMB: 0.25,
        maxWidthOrHeight: 1000,
        initialQuality: 0.85,
        useWebWorker: true,
        fileType: "image/webp",
      };

      const compressedFile = await imageCompression(file, options);
      const fileName = `galeri/${Date.now()}.webp`;

      const { error: uploadError } = await supabase.storage
        .from("galeri-images")
        .upload(fileName, compressedFile, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("galeri-images")
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (err) {
      console.error("Kompresi atau upload gagal:", err);
      throw new Error("Gagal mengunggah gambar, coba file lain atau periksa koneksi.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      const imageUrl = await uploadImage();
      const payload = {
        judul: form.judul,
        deskripsi: form.deskripsi,
        tanggal: form.tanggal,
        gambar_url: imageUrl,
      };

      if (galeriId) {
        const { error } = await supabase.from("galeri").update(payload).eq("id", galeriId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("galeri").insert([payload]);
        if (error) throw error;
      }

      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan: " + err.message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loadingData) {
    return (
      <div className="space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="h-[400px] w-full rounded-[2rem]" />
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-14 w-full rounded-[1.2rem]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit} 
      className="space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Image Upload */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
            <ImageIcon className="w-4 h-4 text-[#FB6B00]" />
            Visual Dokumentasi
          </label>
          <div className="relative group/upload h-full min-h-[300px]">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="border-2 border-dashed border-gray-200 group-hover/upload:border-[#FB6B00] rounded-[2.5rem] p-4 h-full transition-all flex flex-col items-center justify-center bg-gray-50 group-hover/upload:bg-orange-50/30 overflow-hidden">
              {preview ? (
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-md">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover min-h-[350px]" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-bold text-sm">Ganti Foto Dokumentasi</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center p-12">
                  <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-[#FB6B00] mb-6">
                    <Plus className="w-10 h-10" />
                  </div>
                  <p className="text-base font-bold text-gray-900">Pilih Foto Galeri</p>
                  <p className="text-sm text-gray-400 mt-2">Seret foto ke sini atau klik untuk mencari</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Text Inputs */}
        <div className="flex flex-col gap-6">
          {/* Judul */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
              <Type className="w-4 h-4 text-[#FB6B00]" />
              Judul Galeri
            </label>
            <input
              name="judul"
              value={form.judul}
              onChange={handleChange}
              required
              placeholder="Berikan judul yang menarik"
              className="w-full border-2 border-gray-100 rounded-[1.2rem] px-5 py-4 focus:border-[#FB6B00] focus:ring-0 outline-none bg-gray-50/50 hover:bg-white transition-all font-bold text-gray-900 placeholder:text-gray-300 shadow-sm"
            />
          </div>

          {/* Deskripsi */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
              <AlignLeft className="w-4 h-4 text-[#FB6B00]" />
              Deskripsi Singkat
            </label>
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              placeholder="Ceritakan sedikit tentang momen ini..."
              className="w-full border-2 border-gray-100 rounded-[1.5rem] px-5 py-4 focus:border-[#FB6B00] focus:ring-0 outline-none bg-gray-50/50 hover:bg-white transition-all font-medium text-gray-900 placeholder:text-gray-300 shadow-sm min-h-[120px] leading-relaxed"
              rows="4"
            />
          </div>

          {/* Tanggal */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
              <Calendar className="w-4 h-4 text-[#FB6B00]" />
              Tanggal Kegiatan
            </label>
            <input
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-100 rounded-[1.2rem] px-5 py-4 focus:border-[#FB6B00] focus:ring-0 outline-none bg-gray-50/50 hover:bg-white transition-all font-bold text-gray-900 shadow-sm appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-4 pt-10 border-t border-gray-100 mt-4">
        <button
          type="button"
          onClick={() => router.push("/dashboard/galeri")}
          className="flex items-center gap-2 px-8 py-4 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-[1.2rem] font-bold transition-all text-sm"
        >
          <X className="w-4 h-4" /> Batal
        </button>
        <button
          type="submit"
          disabled={loadingSubmit}
          className="flex items-center gap-2 px-10 py-4 bg-[#FB6B00] text-white hover:bg-orange-600 rounded-[1.2rem] font-bold shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {loadingSubmit ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              {galeriId ? "Perbarui Dokumentasi" : "Simpan Dokumentasi"}
              <CheckCircle className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}
