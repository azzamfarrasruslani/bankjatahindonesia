"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import RichTextEditor from "@/components/dashboard/RichTextEditor";
import imageCompression from "browser-image-compression";
import Toast from "@/components/common/Toast"; // pakai Toast custom

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

  const handleCheckbox = (e) => {
    const { checked } = e.target;
    setForm((prev) => ({ ...prev, is_top: checked }));
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
      const fileName = `artikel/${Date.now()}.webp`;

      const { error } = await supabase.storage
        .from("artikel-images")
        .upload(fileName, compressedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      const { data } = supabase.storage
        .from("artikel-images")
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (err) {
      console.error("Upload gagal:", err);
      Toast.error("Gagal mengunggah gambar. Periksa koneksi atau file Anda.");
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage();
      const payload = { ...form, gambar_url: imageUrl };

      let res;
      if (artikel?.id) {
        payload.id = artikel.id;
        payload.old_image = artikel.gambar_url;
        res = await fetch("/api/artikel", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Gagal memperbarui artikel");
        Toast.success("Artikel berhasil diperbarui!");
      } else {
        res = await fetch("/api/artikel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Gagal menambah artikel");
        Toast.success("Artikel berhasil ditambahkan!");
      }

      onSuccess?.();
    } catch (err) {
      console.error(err);
      Toast.error(err.message || "Terjadi kesalahan saat menyimpan artikel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-6 rounded-lg shadow-md mx-auto text-gray-600"
    >
      {/* Upload gambar */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Gambar Artikel
        </label>
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

      {/* Judul */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Judul</label>
        <input
          type="text"
          name="judul"
          value={form.judul}
          onChange={handleChange}
          required
          placeholder="Masukkan judul artikel"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00]"
        />
      </div>

      {/* Penulis */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Penulis
        </label>
        <input
          type="text"
          name="penulis"
          value={form.penulis}
          onChange={handleChange}
          placeholder="Kosongkan jika Admin"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00]"
        />
      </div>

      {/* Kategori */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Kategori
        </label>
        <input
          type="text"
          name="kategori"
          value={form.kategori}
          onChange={handleChange}
          placeholder="Masukkan kategori"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00]"
        />
      </div>

      {/* Artikel Utama */}
      <div>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.is_top}
            onChange={handleCheckbox}
            className="form-checkbox h-5 w-5 text-[#FB6B00]"
          />
          Tandai sebagai Artikel Utama
        </label>
      </div>

      {/* Isi Artikel */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Isi Artikel
        </label>
        <RichTextEditor
          key={artikel?.id || "new"}
          value={form.isi}
          onChange={(val) => setForm((prev) => ({ ...prev, isi: val }))}
        />
      </div>

      {/* Tombol */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/dashboard/artikel")}
          className="px-5 py-2 bg-gray-200 text-gray-600 rounded-lg"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-[#FB6B00] text-white rounded-lg"
        >
          {loading ? "Menyimpan..." : artikel?.id ? "Perbarui" : "Simpan"}
        </button>
      </div>
    </form>
  );
}
