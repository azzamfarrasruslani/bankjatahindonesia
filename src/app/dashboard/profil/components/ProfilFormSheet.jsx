"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";
import Toast from "@/components/common/Toast";
import {
  User,
  Briefcase,
  Layers,
  CheckCircle,
  Image as ImageIcon,
  Plus,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function ProfilFormSheet({ isOpen, onClose, onSuccess, timId }) {
  const [form, setForm] = useState({
    nama: "",
    jabatan: "",
    foto_url: "",
    kategori: "Tim Utama",
    status: true,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  // Reset & Fetch Data saat Sheet Terbuka
  useEffect(() => {
    if (!isOpen) return;

    if (timId) {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from("tim")
          .select("*")
          .eq("id", timId)
          .single();

        if (!error && data) {
          setForm({
            nama: data.nama || "",
            jabatan: data.jabatan || "",
            foto_url: data.foto_url || "",
            kategori: data.kategori || "Tim Utama",
            status: data.status ?? true,
          });
          setPreview(data.foto_url || "");
          setFile(null); // Reset file yang dipilih saat ganti data
        } else if (error) {
          console.error("Gagal mengambil data:", error.message);
          showToast("Gagal mengambil data tim", "error");
        }
      };

      fetchData();
    } else {
      // Form Tambah Baru
      setForm({
        nama: "",
        jabatan: "",
        foto_url: "",
        kategori: "Tim Utama",
        status: true,
      });
      setPreview("");
      setFile(null);
      setToast({ message: "", type: "success" });
    }
  }, [isOpen, timId]);

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

  const uploadImage = async () => {
    if (!file) return form.foto_url || ""; // Kalau tidak ada file baru, kembalikan base URL saat ini

    try {
      const options = {
        maxSizeMB: 0.25,
        maxWidthOrHeight: 1000,
        initialQuality: 0.85,
        useWebWorker: true,
        fileType: "image/webp",
      };

      const compressedFile = await imageCompression(file, options);
      const fileName = `team/${Date.now()}.webp`;

      const { error: uploadError } = await supabase.storage
        .from("team-images")
        .upload(fileName, compressedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("team-images")
        .getPublicUrl(fileName);
      return data.publicUrl;
    } catch (err) {
      console.error("Kompresi atau upload gagal:", err);
      throw new Error(
        "Gagal mengunggah gambar, coba file lain atau periksa koneksi.",
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage();
      const payload = { ...form, foto_url: imageUrl };

      if (timId) {
        const { error } = await supabase
          .from("tim")
          .update(payload)
          .eq("id", timId);
        if (error) throw error;
        showToast("✅ Data berhasil diperbarui!", "success");
      } else {
        const { error } = await supabase.from("tim").insert([payload]);
        if (error) throw error;
        showToast("✅ Anggota tim berhasil ditambahkan!", "success");
      }

      // Beri sedikit jeda agar toast dapat dilihat user
      setTimeout(() => {
        onSuccess?.(); // Memperbarui state lokal table
        onClose(); // Tutup sheet
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
      <SheetContent className="overflow-y-auto sm:max-w-lg p-10">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-[#FB6B00]">
            {timId ? "Edit Anggota Tim" : "Tambah Anggota Tim"}
          </SheetTitle>
          <SheetDescription>
            {timId
              ? "Perbarui informasi anggota tim perusahaan."
              : "Masukkan data anggota tim baru untuk profil perusahaan."}
          </SheetDescription>
        </SheetHeader>

        {toast.message && (
          <div className="mt-4 absolute z-50 right-6 top-6">
            <Toast
              message={toast.message}
              type={toast.type}
              duration={3000}
              onClose={() => setToast({ message: "", type: "success" })}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 mt-6 pb-6 relative">
          {/* Upload Foto */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
              <ImageIcon className="w-4 h-4 text-[#FB6B00]" />
              Foto Anggota
            </label>
            <div className="relative group/upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="border-2 border-dashed border-gray-200 group-hover/upload:border-[#FB6B00] rounded-2xl p-8 transition-all flex flex-col items-center justify-center bg-gray-50 group-hover/upload:bg-orange-50/30">
                {preview ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-[#FB6B00] mb-3">
                    <Plus className="w-8 h-8" />
                  </div>
                )}
                <p className="mt-4 text-sm font-semibold text-gray-900">
                  {preview ? "Ganti Foto Anggota" : "Unggah Foto Anggota"}
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG atau WebP (Maks. 2MB)</p>
              </div>
            </div>
          </div>

          {/* Nama */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
              <User className="w-4 h-4 text-[#FB6B00]" />
              Nama Lengkap
            </label>
            <input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              required
              placeholder="Contoh: Budi Santoso"
              className="w-full border-2 border-gray-100 rounded-[1.2rem] px-5 py-3.5 focus:border-[#FB6B00] focus:ring-0 outline-none bg-gray-50/50 hover:bg-white transition-all font-medium text-gray-900 placeholder:text-gray-300 shadow-sm"
            />
          </div>

          {/* Jabatan */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
              <Briefcase className="w-4 h-4 text-[#FB6B00]" />
              Jabatan
            </label>
            <input
              name="jabatan"
              value={form.jabatan}
              onChange={handleChange}
              required
              placeholder="Contoh: CEO & Founder"
              className="w-full border-2 border-gray-100 rounded-[1.2rem] px-5 py-3.5 focus:border-[#FB6B00] focus:ring-0 outline-none bg-gray-50/50 hover:bg-white transition-all font-medium text-gray-900 placeholder:text-gray-300 shadow-sm"
            />
          </div>

          {/* Kategori */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
              <Layers className="w-4 h-4 text-[#FB6B00]" />
              Kategori Tim
            </label>
            <select
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              className="w-full border-2 border-gray-100 rounded-[1.2rem] px-5 py-3.5 focus:border-[#FB6B00] outline-none bg-gray-50/50 hover:bg-white transition-all font-medium text-gray-900 shadow-sm cursor-pointer"
            >
              <option value="Tim Utama">Tim Utama</option>
              <option value="Tim Unit Bisnis">Tim Unit Bisnis</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 bg-gray-50/50 p-4 rounded-2xl border-2 border-gray-100/50 hover:border-[#FB6B00]/30 transition-all">
            <input
              type="checkbox"
              id="status"
              name="status"
              checked={form.status}
              onChange={handleChange}
              className="w-5 h-5 text-[#FB6B00] border-gray-300 rounded-lg focus:ring-0 cursor-pointer"
            />
            <label
              htmlFor="status"
              className="flex items-center gap-2 font-bold text-gray-900 text-sm tracking-wide select-none cursor-pointer"
            >
              <CheckCircle className={`w-4 h-4 ${form.status ? 'text-green-500' : 'text-gray-300'}`} />
              Aktif & Ditampilkan di Website
            </label>
          </div>

          {/* Tombol aksi */}
          <div className="flex justify-end gap-3 pt-6 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-[#FB6B00] text-white hover:bg-orange-600 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
            >
              {loading ? "Menyimpan..." : timId ? "Perbarui" : "Simpan"}
            </button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
