"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";

export default function TimForm({ timId, onSuccess }) {
  const router = useRouter();
  const [form, setForm] = useState({
    nama: "",
    jabatan: "",
    foto_url: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Ambil data tim untuk mode edit
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
        });
        setPreview(data.foto_url || "");
      } else if (error) {
        console.error("Gagal mengambil data:", error.message);
      }
    };

    fetchData();
  }, [timId]);

  // Handle input teks
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  // Upload gambar dengan kompresi sebelum ke Supabase
  const uploadImage = async () => {
    if (!file) return form.foto_url || "";

    try {
      const options = {
        maxSizeMB: 0.25, // target 250KB
        maxWidthOrHeight: 1000,
        initialQuality: 0.85,
        useWebWorker: true,
        fileType: "image/webp",
      };

      const compressedFile = await imageCompression(file, options);
      const fileName = `${Date.now()}.webp`;

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
        "Gagal mengunggah gambar, coba file lain atau periksa koneksi."
      );
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage();
      const payload = {
        nama: form.nama,
        jabatan: form.jabatan,
        foto_url: imageUrl,
      };

      if (timId) {
        const { error } = await supabase
          .from("tim")
          .update(payload)
          .eq("id", timId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("tim").insert([payload]);
        if (error) throw error;
      }

      alert("✅ Data berhasil disimpan!");
      onSuccess?.();
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-6 rounded-lg shadow-md"
    >
      {/* Upload Foto */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Foto Anggota
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

      {/* Nama */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Nama</label>
        <input
          name="nama"
          value={form.nama}
          onChange={handleChange}
          required
          placeholder="Masukkan nama anggota"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00] text-gray-700 placeholder-gray-600"
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
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00] text-gray-700 placeholder-gray-600"
        />
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
