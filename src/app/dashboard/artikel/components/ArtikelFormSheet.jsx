"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { 
  uploadImage, 
  insertArtikel, 
  updateArtikel 
} from "@/lib/services/artikelService";
import RichTextEditor from "@/components/features/(admin)/dashboard/RichTextEditor";
import Toast from "@/components/common/Toast";
import { 
  Type, 
  User, 
  Tag, 
  FileText, 
  Image as ImageIcon, 
  Plus,
  CheckCircle,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function ArtikelFormSheet({ isOpen, onClose, onSuccess, artikelId }) {
  const [form, setForm] = useState({
    judul: "",
    penulis: "",
    isi: "",
    gambar_url: "",
    kategori: "",
    is_top: false,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  // Reset & Fetch Data saat Sheet Terbuka
  useEffect(() => {
    if (!isOpen) return;

    if (artikelId) {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from("artikel")
          .select("*")
          .eq("id", artikelId)
          .single();

        if (!error && data) {
          setForm({
            judul: data.judul || "",
            penulis: data.penulis || "",
            isi: data.isi || "",
            gambar_url: data.gambar_url || "",
            kategori: data.kategori || "",
            is_top: data.is_top || false,
          });
          setPreview(data.gambar_url || "");
          setFile(null);
        } else if (error) {
          console.error("Gagal mengambil data:", error.message);
          showToast("Gagal mengambil data artikel", "error");
        }
      };

      fetchData();
    } else {
      // Form Tambah Baru
      setForm({
        judul: "",
        penulis: "",
        isi: "",
        gambar_url: "",
        kategori: "",
        is_top: false,
      });
      setPreview("");
      setFile(null);
      setToast({ message: "", type: "success" });
    }
  }, [isOpen, artikelId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage(file, form.gambar_url);
      const payload = { ...form, gambar_url: imageUrl };

      if (artikelId) {
        await updateArtikel(artikelId, payload);
        showToast("✅ Artikel berhasil diperbarui!", "success");
      } else {
        await insertArtikel(payload);
        showToast("✅ Artikel berhasil diterbitkan!", "success");
      }

      // Beri sedikit jeda agar toast dapat dilihat user
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
      <SheetContent className="overflow-y-auto sm:max-w-2xl p-0">
        <div className="p-8 md:p-10 space-y-8">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-[#FB6B00]">
              {artikelId ? "Edit Artikel" : "Tambah Artikel"}
            </SheetTitle>
            <SheetDescription>
              {artikelId
                ? "Perbarui informasi artikel Bank Jatah Indonesia."
                : "Masukkan detail artikel baru untuk dipublikasikan."}
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
            {/* Upload Thumbnail */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
                <ImageIcon className="w-4 h-4 text-[#FB6B00]" />
                Thumbnail
              </label>
              <div className="relative group/upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-gray-200 group-hover/upload:border-[#FB6B00] rounded-[2rem] p-4 transition-all flex flex-col items-center justify-center bg-gray-50 group-hover/upload:bg-orange-50/30 overflow-hidden min-h-[220px]">
                  {preview ? (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center p-4">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-[#FB6B00] mb-3">
                        <Plus className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-bold text-gray-900">Pilih Gambar</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Judul */}
            <div className="space-y-4">
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
                placeholder="Judul yang menarik..."
                className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-[#FB6B00] outline-none bg-gray-50/50 hover:bg-white transition-all font-bold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kategori */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
                  <Tag className="w-4 h-4 text-[#FB6B00]" />
                  Kategori
                </label>
                <input
                  type="text"
                  name="kategori"
                  value={form.kategori}
                  onChange={handleChange}
                  placeholder="Edukasi, Berita..."
                  className="w-full border-2 border-gray-100 rounded-2xl px-5 py-3 focus:border-[#FB6B00] outline-none bg-gray-50/50 hover:bg-white transition-all font-medium"
                />
              </div>

              {/* Penulis */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
                  <User className="w-4 h-4 text-[#FB6B00]" />
                  Penulis
                </label>
                <input
                  type="text"
                  name="penulis"
                  value={form.penulis}
                  onChange={handleChange}
                  placeholder="Nama penulis"
                  className="w-full border-2 border-gray-100 rounded-2xl px-5 py-3 focus:border-[#FB6B00] outline-none bg-gray-50/50 hover:bg-white transition-all font-medium"
                />
              </div>
            </div>

            {/* Is Top */}
            <div 
              className="flex items-center gap-4 bg-orange-50/50 p-5 rounded-2xl border-2 border-orange-100 hover:border-[#FB6B00]/30 transition-all cursor-pointer group"
              onClick={() => setForm(f => ({ ...f, is_top: !f.is_top }))}
            >
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${form.is_top ? 'bg-[#FB6B00] border-[#FB6B00]' : 'border-gray-200 bg-white'}`}>
                {form.is_top && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <p className="font-bold text-gray-900 text-sm">Tampilkan sebagai Unggulan</p>
            </div>

            {/* Isi Konten */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
                <FileText className="w-4 h-4 text-[#FB6B00]" />
                Konten Artikel
              </label>
              <div className="border-2 border-gray-100 rounded-2xl overflow-hidden focus-within:border-[#FB6B00] transition-all">
                <RichTextEditor
                  value={form.isi}
                  onChange={(val) => setForm((prev) => ({ ...prev, isi: val }))}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-8 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-xl font-bold transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[#FB6B00] text-white hover:bg-orange-600 rounded-xl font-bold shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : artikelId ? "Perbarui" : "Terbitkan"}
              </button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
