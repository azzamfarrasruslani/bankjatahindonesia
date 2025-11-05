"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import Toast from "@/components/common/Toast";

export default function TimForm({ timId, onSuccess }) {
  const router = useRouter();
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

  // Ambil data tim saat edit
  useEffect(() => {
    if (!timId) return;

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
      } else if (error) {
        console.error("Gagal mengambil data:", error.message);
        showToast("Gagal mengambil data tim", "error");
      }
    };

    fetchData();
  }, [timId]);

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
    if (!file) return form.foto_url || "";

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
        .upload(fileName, compressedFile, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("team-images").getPublicUrl(fileName);
      return data.publicUrl;
    } catch (err) {
      console.error("Kompresi atau upload gagal:", err);
      throw new Error("Gagal mengunggah gambar, coba file lain atau periksa koneksi.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage();
      const payload = { ...form, foto_url: imageUrl };

      if (timId) {
        const { error } = await supabase.from("tim").update(payload).eq("id", timId);
        if (error) throw error;
        showToast("✅ Data berhasil diperbarui!", "success");
      } else {
        const { error } = await supabase.from("tim").insert([payload]);
        if (error) throw error;
        showToast("✅ Anggota tim berhasil ditambahkan!", "success");
      }

      // Tunggu toast muncul sebentar, baru redirect
      setTimeout(() => {
        router.push("/dashboard/profil");
        router.refresh();
        onSuccess?.();
      }, 800);
    } catch (err) {
      console.error(err);
      showToast("❌ " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-6 rounded-lg shadow-md text-gray-600 relative"
    >
      {/* Toast */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast({ message: "", type: "success" })}
        />
      )}

      {/* Upload Foto */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Foto Anggota</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-3 w-full file:bg-[#FB6B00] file:text-white text-gray-600 file:py-2 file:px-4 file:rounded-full"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg shadow-sm"
          />
        )}
      </div>

      {/* Nama */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Nama</label>
        <input
          name="nama"
          value={form.nama}
          onChange={handleChange}
          required
          placeholder="Masukkan nama anggota"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00]"
        />
      </div>

      {/* Jabatan */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Jabatan</label>
        <input
          name="jabatan"
          value={form.jabatan}
          onChange={handleChange}
          required
          placeholder="Masukkan jabatan anggota"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00]"
        />
      </div>

      {/* Kategori */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Kategori</label>
        <select
          name="kategori"
          value={form.kategori}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00]"
        >
          <option value="Tim Utama">Tim Utama</option>
          <option value="Tim Unit Bisnis">Tim Unit Bisnis</option>
        </select>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="status"
          checked={form.status}
          onChange={handleChange}
          className="w-4 h-4 text-[#FB6B00] border-gray-300 rounded"
        />
        <label className="font-medium text-gray-700">Aktif</label>
      </div>

      {/* Tombol aksi */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/dashboard/profil")}
          className="px-5 py-2 bg-gray-200 text-gray-600 rounded-lg"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-[#FB6B00] text-white rounded-lg"
        >
          {loading ? "Menyimpan..." : timId ? "Perbarui" : "Simpan"}
        </button>
      </div>
    </form>
  );
}
