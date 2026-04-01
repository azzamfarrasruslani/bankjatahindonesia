"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";
import Toast from "@/components/common/Toast";
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
      <SheetContent className="overflow-y-auto sm:max-w-lg">
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
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Foto Anggota
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-3 w-full file:bg-[#FB6B00] file:text-white text-gray-600 file:py-2 file:px-4 file:rounded-full file:border-0 hover:file:bg-orange-600"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg shadow-sm border"
              />
            )}
          </div>

          {/* Nama */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Nama
            </label>
            <input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              required
              placeholder="Masukkan nama anggota"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00] focus:ring-1 focus:ring-[#FB6B00] outline-none"
            />
          </div>

          {/* Jabatan */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Jabatan
            </label>
            <input
              name="jabatan"
              value={form.jabatan}
              onChange={handleChange}
              required
              placeholder="Masukkan jabatan anggota"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00] focus:ring-1 focus:ring-[#FB6B00] outline-none"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Kategori
            </label>
            <select
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00] outline-none bg-white"
            >
              <option value="Tim Utama">Tim Utama</option>
              <option value="Tim Unit Bisnis">Tim Unit Bisnis</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="status"
              name="status"
              checked={form.status}
              onChange={handleChange}
              className="w-4 h-4 text-[#FB6B00] border-gray-300 rounded focus:ring-[#FB6B00]"
            />
            <label
              htmlFor="status"
              className="font-medium text-gray-700 select-none cursor-pointer"
            >
              Aktif (Ditampilkan)
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
