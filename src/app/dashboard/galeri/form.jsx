"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";

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
  const [loading, setLoading] = useState(false);

  // Fetch data jika mode edit
  useEffect(() => {
    if (!galeriId) return;
    const fetchGaleri = async () => {
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
    };
    fetchGaleri();
  }, [galeriId]);

  // Handler input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handler file upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  // Upload gambar dengan kompresi sebelum ke Supabase
  const uploadImage = async () => {
    if (!file) return form.gambar_url || "";

    try {
      const options = {
        maxSizeMB: 0.25, // target sekitar 250KB
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

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow-md">
      {/* Upload gambar */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Gambar Galeri</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-3 w-full file:bg-[#FB6B00] file:text-white text-gray-600 file:py-2 file:px-4 file:rounded-full"
        />
        {preview && (
          <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-lg shadow-sm" />
        )}
      </div>

      {/* Judul */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Judul</label>
        <input
          name="judul"
          value={form.judul}
          onChange={handleChange}
          required
          placeholder="Masukkan judul galeri"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00] text-gray-700 placeholder-gray-600"
        />
      </div>

      {/* Deskripsi */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Deskripsi</label>
        <textarea
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          placeholder="Tuliskan deskripsi singkat"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00] text-gray-700 placeholder-gray-600"
          rows="4"
        />
      </div>

      {/* Tanggal */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Tanggal</label>
        <input
          type="date"
          name="tanggal"
          value={form.tanggal}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00] text-gray-700"
        />
      </div>

      {/* Tombol aksi */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/dashboard/galeri")}
          className="px-5 py-2 bg-gray-200 text-gray-600 rounded-lg"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-[#FB6B00] text-white rounded-lg"
        >
          {loading ? "Menyimpan..." : galeriId ? "Perbarui" : "Simpan"}
        </button>
      </div>
    </form>
  );
}
