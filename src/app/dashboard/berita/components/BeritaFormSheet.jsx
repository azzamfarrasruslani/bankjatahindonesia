"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";
import RichTextEditor from "@/components/features/(admin)/dashboard/RichTextEditor";
import Toast from "@/components/common/Toast";
import { 
  Type, 
  User, 
  FileText, 
  Image as ImageIcon, 
  Plus,
  CheckCircle,
  X,
  Loader2
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function BeritaFormSheet({ isOpen, onClose, onSuccess, beritaId }) {
  const [form, setForm] = useState({
    judul: "",
    penulis: "",
    isi: "",
    is_top: false,
    gambar_url: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    if (!isOpen) return;

    if (beritaId) {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from("berita")
          .select("*")
          .eq("id", beritaId)
          .single();

        if (!error && data) {
          setForm({
            judul: data.judul || "",
            penulis: data.penulis || "",
            isi: data.isi || "",
            is_top: data.is_top || false,
            gambar_url: data.gambar_url || "",
          });
          setPreview(data.gambar_url || "");
          setFile(null);
        } else if (error) {
          console.error("Gagal mengambil data:", error.message);
          showToast("Gagal mengambil data berita", "error");
        }
      };

      fetchData();
    } else {
      setForm({
        judul: "",
        penulis: "",
        isi: "",
        is_top: false,
        gambar_url: "",
      });
      setPreview("");
      setFile(null);
      setToast({ message: "", type: "success" });
    }
  }, [isOpen, beritaId]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const uploadImageToStorage = async () => {
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
      const fileName = `berita/${Date.now()}.webp`;

      const { error: uploadError } = await supabase.storage
        .from("berita-images")
        .upload(fileName, compressedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("berita-images")
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (err) {
      console.error("Kompresi atau upload gagal:", err);
      throw new Error(
        "Gagal mengunggah gambar, coba file lain atau periksa koneksi."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImageToStorage();
      const payload = {
        judul: form.judul,
        penulis: form.penulis || "Admin",
        isi: form.isi,
        is_top: form.is_top,
        gambar_url: imageUrl,
      };

      if (beritaId) {
        const { error } = await supabase
          .from("berita")
          .update(payload)
          .eq("id", beritaId);
        if (error) throw error;
        showToast("✅ Berita berhasil diperbarui!", "success");
      } else {
        const { error } = await supabase.from("berita").insert([payload]);
        if (error) throw error;
        showToast("✅ Berita berhasil diterbitkan!", "success");
      }

      setTimeout(() => {
        onSuccess?.(); 
        onClose(); 
      }, 1000);
    } catch (err) {
      console.error(err);
      showToast("❌ " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="overflow-y-auto sm:max-w-2xl p-0 border-none rounded-l-[3rem] shadow-2xl">
        <div className="p-8 md:p-10 space-y-8 h-full bg-white">
          <SheetHeader>
            <SheetTitle className="text-3xl font-black text-gray-900 tracking-tight">
              {beritaId ? "Edit" : "Publikasikan"} <span className="text-[#FB6B00]">Berita</span>
            </SheetTitle>
            <SheetDescription className="text-gray-500 font-medium">
              {beritaId
                ? "Perbarui konten berita terbaru Bank Jatah Indonesia."
                : "Masukkan detail berita baru untuk dipublikasikan ke publik."}
            </SheetDescription>
          </SheetHeader>

          {toast.message && (
            <div className="fixed z-[60] right-6 top-6">
              <Toast
                message={toast.message}
                type={toast.type}
                duration={3000}
                onClose={() => setToast({ message: "", type: "success" })}
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 pb-10">
            {/* Visual Berita */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
                <ImageIcon className="w-4 h-4 text-[#FB6B00]" />
                Visual Berita
              </label>
              <div className="relative group/upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-gray-100 group-hover/upload:border-[#FB6B00] rounded-[2.5rem] p-4 transition-all flex flex-col items-center justify-center bg-gray-50/50 group-hover/upload:bg-orange-50/30 overflow-hidden min-h-[220px]">
                  {preview ? (
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-sm">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white font-black text-xs uppercase tracking-widest">Ganti Gambar</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center p-8">
                      <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-[#FB6B00] mb-4">
                        <Plus className="w-7 h-7" />
                      </div>
                      <p className="text-sm font-bold text-gray-900">Pilih Headline Image</p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Mendukung format WebP</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Judul & Penulis */}
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
                  <Type className="w-4 h-4 text-[#FB6B00]" />
                  Judul Berita
                </label>
                <input
                  type="text"
                  name="judul"
                  value={form.judul}
                  onChange={handleChange}
                  required
                  placeholder="Apa kabar hari ini?"
                  className="w-full border-2 border-gray-100 rounded-[1.2rem] px-5 py-4 focus:border-[#FB6B00] outline-none bg-gray-50/50 hover:bg-white transition-all font-bold text-gray-900 placeholder:text-gray-300 shadow-sm"
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
                  placeholder="Nama Penulis (Default: Admin)"
                  className="w-full border-2 border-gray-100 rounded-[1.2rem] px-5 py-3.5 focus:border-[#FB6B00] outline-none bg-gray-50/50 hover:bg-white transition-all font-semibold text-gray-900 placeholder:text-gray-300 shadow-sm"
                />
              </div>
            </div>

            {/* Status Berita Utama */}
            <div 
              className="flex items-center gap-4 bg-orange-50/50 p-5 rounded-[1.5rem] border-2 border-orange-100/50 hover:border-[#FB6B00]/30 transition-all cursor-pointer group/check"
              onClick={() => setForm(prev => ({ ...prev, is_top: !prev.is_top }))}
            >
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${form.is_top ? 'bg-[#FB6B00] border-[#FB6B00]' : 'border-gray-200 bg-white'}`}>
                {form.is_top && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm tracking-wide">Penyematan Headline</p>
                <p className="text-[10px] text-orange-600 font-bold uppercase tracking-widest mt-0.5 opacity-70">Tampilkan di baris teratas berita</p>
              </div>
            </div>

            {/* Isi Konten */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
                <FileText className="w-4 h-4 text-[#FB6B00]" />
                Isi Lengkap Berita
              </label>
              <div className="prose-slate max-w-none border-2 border-gray-100 rounded-[2rem] overflow-hidden focus-within:border-[#FB6B00] transition-all bg-gray-50/30">
                <RichTextEditor
                  value={form.isi}
                  onChange={(val) => setForm((prev) => ({ ...prev, isi: val }))}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-8 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-4 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-[1.2rem] font-bold transition-all text-sm"
              >
                Batalkan
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-10 py-4 bg-[#FB6B00] text-white hover:bg-orange-600 rounded-[1.2rem] font-bold shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all disabled:opacity-50 text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    {beritaId ? "Simpan Perubahan" : "Publikasikan"}
                    <CheckCircle className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
