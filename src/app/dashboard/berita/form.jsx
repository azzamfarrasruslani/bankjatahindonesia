"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";
import RichTextEditor from "@/components/dashboard/RichTextEditor";
import { useRouter } from "next/navigation";

export default function BeritaForm({ beritaId, onSuccess }) {
  const router = useRouter();
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
  const [oldImage, setOldImage] = useState("");

  // Ambil data berita jika mode edit
  useEffect(() => {
    if (!beritaId) return;

    const fetchBerita = async () => {
      const { data, error } = await supabase
        .from("berita")
        .select("*")
        .eq("id", beritaId)
        .single();

      if (error) {
        console.error("Gagal mengambil data:", error);
      } else if (data) {
        setForm({
          judul: data.judul || "",
          penulis: data.penulis || "",
          isi: data.isi || "",
          is_top: data.is_top || false,
          gambar_url: data.gambar_url || "",
        });
        setPreview(data.gambar_url || "");
        setOldImage(data.gambar_url || "");
      }
    };

    fetchBerita();
  }, [beritaId]);

  // Handle input form umum
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Pilih file dan tampilkan preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  // Upload gambar ke Supabase
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
      throw new Error("Gagal mengunggah gambar, coba file lain atau periksa koneksi.");
    }
  };

  // Simpan data ke Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage();
      const payload = {
        ...form,
        gambar_url: imageUrl,
      };

      if (beritaId) {
        // Mode Edit
        payload.id = beritaId;
        payload.old_image = oldImage; // kirim gambar lama ke backend

        const res = await fetch("/api/berita", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Gagal memperbarui berita");
      } else {
        // Mode Tambah
        const res = await fetch("/api/berita", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Gagal menambah berita");
      }

      onSuccess?.();
    } catch (err) {
      alert(err.message);
      console.error("❌ Error saat menyimpan berita:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-6 rounded-lg shadow-md"
    >
      {/* Upload gambar */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Gambar Berita
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
          name="judul"
          value={form.judul}
          onChange={handleChange}
          required
          placeholder="Masukkan judul berita"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00] text-gray-700 placeholder-gray-600"
        />
      </div>

      {/* Penulis */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Penulis</label>
        <input
          name="penulis"
          value={form.penulis}
          onChange={handleChange}
          placeholder="Kosongkan jika Admin"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00] text-gray-700 placeholder-gray-600"
        />
      </div>

      {/* Isi berita */}
      <div className="text-gray-700">
        <label className="block mb-2 font-semibold text-gray-700">
          Isi Berita
        </label>
        <RichTextEditor
          key={beritaId || "new"}
          value={form.isi}
          onChange={(val) => setForm((prev) => ({ ...prev, isi: val }))}
        />
      </div>

      {/* Checkbox berita utama */}
      <div className="flex items-center gap-3 text-gray-600">
        <input
          type="checkbox"
          name="is_top"
          checked={form.is_top}
          onChange={handleChange}
        />
        <label>Jadikan berita utama</label>
      </div>

      {/* Tombol aksi */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/dashboard/berita")}
          className="px-5 py-2 bg-gray-200 text-gray-600 rounded-lg"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-[#FB6B00] text-white rounded-lg"
        >
          {loading ? "Menyimpan..." : beritaId ? "Perbarui" : "Simpan"}
        </button>
      </div>
    </form>
  );
}
