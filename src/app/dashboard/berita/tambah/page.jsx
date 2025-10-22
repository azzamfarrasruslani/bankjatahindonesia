"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import RichTextEditor from "@/components/dashboard/RichTextEditor";

export default function BeritaForm({ editing }) {
  const router = useRouter();
  const [form, setForm] = useState(
    editing || { title: "", author: "", content: "", isTop: false, image: "" }
  );
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(editing?.image || "");
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      alert("File harus berupa gambar (jpg, png, webp, dll)");
      return;
    }
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const uploadImage = async () => {
    if (!file) return form.image;
    const fileName = `berita/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("berita-images").upload(fileName, file, { upsert: true });
    if (error) {
      console.error("Upload gagal:", error);
      alert("Upload gambar gagal!");
      return null;
    }
    const { data: publicUrlData } = supabase.storage.from("berita-images").getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage();
      if (!imageUrl) {
        alert("Gambar wajib diisi!");
        setLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      const dataToSave = {
        title: form.title,
        author: form.author || "Admin",
        content: form.content,
        is_top: form.isTop,
        image_url: imageUrl,
        owner_id: user.id,
      };

      const { error } = editing
        ? await supabase.from("berita").update(dataToSave).eq("id", editing.id)
        : await supabase.from("berita").insert([dataToSave]);

      if (error) throw error;

      alert("Berita berhasil disimpan!");
      router.push("/dashboard/berita"); // 🔹 redirect ke dashboard/berita
    } catch (err) {
      console.error("Gagal menyimpan berita:", err);
      alert("Terjadi kesalahan saat menyimpan berita.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">{editing ? "Edit Berita" : "Tambah Berita Baru"}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Gambar */}
        <div>
          <label className="block mb-1 font-medium">Gambar Berita</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />
          {preview && (
            <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded border" />
          )}
        </div>

        {/* Judul & Penulis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Judul Berita</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Penulis</label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Kosongkan jika default 'Admin'"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Isi Berita */}
        <div>
          <label className="block mb-1 font-medium">Isi Berita</label>
          <RichTextEditor
            value={form.content}
            onChange={(val) => setForm((prev) => ({ ...prev, content: val }))}
          />
        </div>

        {/* Berita Utama */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isTop"
            checked={form.isTop}
            onChange={handleChange}
          />
          <label>Jadikan Berita Utama</label>
        </div>

        {/* Tombol Submit */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"}`}
          >
            {loading ? "Menyimpan..." : "Simpan Berita"}
          </button>
        </div>
      </form>
    </section>
  );
}
