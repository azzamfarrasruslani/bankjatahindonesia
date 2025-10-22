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
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
    const { error } = await supabase.storage
      .from("berita-images")
      .upload(fileName, file, { upsert: true });
    if (error) {
      console.error("Upload gagal:", error);
      alert("Upload gambar gagal!");
      return null;
    }
    const { data: publicUrlData } = supabase.storage
      .from("berita-images")
      .getPublicUrl(fileName);
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

      const {
        data: { user },
      } = await supabase.auth.getUser();
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
      router.push("/dashboard/berita");
    } catch (err) {
      console.error("Gagal menyimpan berita:", err);
      alert("Terjadi kesalahan saat menyimpan berita.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        {editing ? "Edit Berita" : "Tambah Berita Baru"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Gambar */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Gambar Berita
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-3 w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:opacity-90"
            {...{
              "data-file-classes": true,
              className:
                "mb-3 w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FB6B00] file:text-white hover:file:bg-[#e55a00]",
            }}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg shadow-sm"
            />
          )}
        </div>

        {/* Judul & Penulis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Judul Berita
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#FB6B00] focus:ring-2 focus:ring-[#FB6B00]/20 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Penulis
            </label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Kosongkan jika default 'Admin'"
              className="w-full px-4 py-2 rounded-lg placeholder-black/30 bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#FB6B00] focus:ring-2 focus:ring-[#FB6B00]/20 transition-all duration-200"
            />
          </div>
        </div>

        {/* Isi Berita */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Isi Berita
          </label>
          <div className="rounded-lg overflow-hidden shadow-sm">
            <RichTextEditor
              value={form.content}
              onChange={(val) => setForm((prev) => ({ ...prev, content: val }))}
            />
          </div>
        </div>

        {/* Berita Utama */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isTop"
            checked={form.isTop}
            onChange={handleChange}
            className="w-5 h-5 text-[#FB6B00] rounded focus:ring-[#FB6B00]/50"
          />
          <label className="text-gray-700 font-medium">
            Jadikan Berita Utama
          </label>
        </div>

        {/* Tombol Submit & Batal */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={() => router.push("/dashboard/berita")}
            disabled={loading}
            className="px-6 py-2.5 rounded-lg text-gray-700 font-medium bg-gray-200 hover:bg-gray-300 transition-all duration-200"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: loading ? undefined : "#FB6B00" }}
            className={`px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:brightness-95 shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? "Menyimpan..." : "Simpan Berita"}
          </button>
        </div>
      </form>
    </section>
  );
}
