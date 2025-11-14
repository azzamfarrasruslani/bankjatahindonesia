"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImage, insertArtikel, updateArtikel } from "@/lib/services/artikelService";
import RichTextEditor from "@/components/dashboard/RichTextEditor";

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

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage(file, form.gambar_url);
      const payload = { ...form, gambar_url: imageUrl };

      if (artikel?.id) {
        await updateArtikel(artikel.id, payload);
      } else {
        await insertArtikel(payload);
      }

      onSuccess?.();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow-md mx-auto text-gray-600">
      
      {/* Upload gambar */}
      <div>
        <label className="block mb-2 font-semibold">Gambar Artikel</label>
        <input type="file" accept="image/*" onChange={handleFileChange}
          className="mb-3 w-full file:bg-[#FB6B00] file:text-white file:py-2 file:px-4 file:rounded-full" />
        {preview && (
          <img src={preview} className="w-full h-64 object-cover rounded-lg" />
        )}
      </div>

      <div>
        <label className="block mb-2 font-semibold">Judul</label>
        <input type="text" name="judul" value={form.judul} onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
      </div>

      <div>
        <label className="block mb-2 font-semibold">Penulis</label>
        <input type="text" name="penulis" value={form.penulis} onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2" />
      </div>

      <div>
        <label className="block mb-2 font-semibold">Kategori</label>
        <input type="text" name="kategori" value={form.kategori} onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2" />
      </div>

      <label className="inline-flex items-center gap-2">
        <input type="checkbox" checked={form.is_top} onChange={e => setForm(prev => ({ ...prev, is_top: e.target.checked }))} />
        Tandai sebagai Artikel Utama
      </label>

      <div>
        <label className="block mb-2 font-semibold">Isi Artikel</label>
        <RichTextEditor value={form.isi} onChange={val => setForm(prev => ({ ...prev, isi: val }))} />
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={() => router.push("/dashboard/artikel")} className="px-5 py-2 bg-gray-200 text-gray-600 rounded-lg">
          Batal
        </button>
        <button type="submit" disabled={loading} className="px-5 py-2 bg-[#FB6B00] text-white rounded-lg">
          {loading ? "Menyimpan..." : artikel?.id ? "Perbarui" : "Simpan"}
        </button>
      </div>
    </form>
  );
}
