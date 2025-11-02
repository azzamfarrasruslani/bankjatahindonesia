"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function GaleriForm({ galeri, onSuccess }) {
  const [form, setForm] = useState({
    judul: galeri?.judul || "",
    deskripsi: galeri?.deskripsi || "",
    gambar_url: galeri?.gambar_url || "",
    tanggal: galeri?.tanggal || "",
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const filePath = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("galeri-images")
      .upload(filePath, file);

    if (error) alert("Gagal upload gambar: " + error.message);
    else {
      const { data: publicUrl } = supabase.storage
        .from("galeri-images")
        .getPublicUrl(filePath);
      setForm((prev) => ({ ...prev, gambar_url: publicUrl.publicUrl }));
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = galeri
      ? await supabase.from("galeri").update(form).eq("id", galeri.id)
      : await supabase.from("galeri").insert([form]);

    if (error) alert("Gagal menyimpan data: " + error.message);
    else onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <div>
        <label className="block font-medium">Judul</label>
        <input
          type="text"
          name="judul"
          value={form.judul}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Deskripsi</label>
        <textarea
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          rows="3"
        />
      </div>

      <div>
        <label className="block font-medium">Tanggal</label>
        <input
          type="date"
          name="tanggal"
          value={form.tanggal}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Upload Gambar</label>
        <input type="file" onChange={handleUpload} accept="image/*" />
        {uploading && <p className="text-sm text-gray-500">Mengunggah...</p>}
        {form.gambar_url && (
          <img
            src={form.gambar_url}
            alt="preview"
            className="w-40 h-40 object-cover mt-3 rounded-lg"
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-[#FB6B00] text-white px-4 py-2 rounded-lg hover:bg-orange-700"
      >
        Simpan
      </button>
    </form>
  );
}
