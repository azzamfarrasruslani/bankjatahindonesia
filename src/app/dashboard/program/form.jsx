"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";

export default function ProgramForm({ programId, onSuccess }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    status: "Program Aktif",
    icon_url: "",
    description: "",
    button_label: "Ikuti Program Ini",
    details: [""],
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Ambil data program jika mode edit
  useEffect(() => {
    if (!programId) return;

    const fetchProgram = async () => {
      const { data, error } = await supabase
        .from("program")
        .select("*")
        .eq("id", programId)
        .single();

      if (error) {
        console.error("Gagal mengambil data program:", error);
        return;
      }

      setForm({
        title: data.title || "",
        status: data.status || "Program Aktif",
        icon_url: data.icon_url || "",
        description: data.description || "",
        button_label: data.button_label || "Ikuti Program Ini",
        details: data.details || [""],
      });

      setPreview(data.icon_url || "");
    };

    fetchProgram();
  }, [programId]);

  // 🔹 Input umum
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Upload ikon (pilih file)
  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // 🔹 Upload ke Supabase Storage
  const uploadImage = async () => {
    if (!file) return form.icon_url || "";

    try {
      const options = {
        maxSizeMB: 0.25,
        maxWidthOrHeight: 1000,
        initialQuality: 0.85,
        useWebWorker: true,
        fileType: "image/webp",
      };

      const compressedFile = await imageCompression(file, options);
      const fileName = `program/${Date.now()}.webp`;

      const { error: uploadError } = await supabase.storage
        .from("program-images")
        .upload(fileName, compressedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("program-images")
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (err) {
      console.error("Upload gagal:", err);
      throw new Error("Gagal upload ikon program.");
    }
  };

  // 🔹 Simpan data ke Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage();
      const payload = {
        title: form.title,
        status: form.status,
        icon_url: imageUrl,
        description: form.description,
        button_label: form.button_label,
        details: form.details,
      };

      if (programId) {
        // UPDATE
        const { error } = await supabase
          .from("program")
          .update(payload)
          .eq("id", programId);
        if (error) throw error;
      } else {
        // INSERT
        const { error } = await supabase.from("program").insert([payload]);
        if (error) throw error;
      }

      alert(
        programId
          ? "✅ Program berhasil diperbarui"
          : "✅ Program berhasil ditambahkan"
      );
      onSuccess?.();
      router.push("/dashboard/program");
    } catch (err) {
      alert("❌ " + err.message);
      console.error("Gagal simpan program:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Tambah atau hapus langkah program
  const handleDetailChange = (i, value) => {
    const updated = [...form.details];
    updated[i] = value;
    setForm({ ...form, details: updated });
  };

  const addDetail = () => setForm({ ...form, details: [...form.details, ""] });

  const removeDetail = (i) => {
    setForm({ ...form, details: form.details.filter((_, j) => j !== i) });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md text-gray-700"
    >
      <h2 className="text-lg font-semibold">
        {programId ? "Edit Program" : "Tambah Program"}
      </h2>

      {/* Upload Ikon */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Ikon Program
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-2 w-full file:bg-[#FB6B00] file:text-white file:py-2 file:px-4 file:rounded-full"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-28 h-28 object-contain rounded-lg border"
          />
        )}
      </div>

      {/* Judul */}
      <div>
        <label className="block mb-1 font-medium">Judul Program</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      {/* Deskripsi */}
      <div>
        <label className="block mb-1 font-medium">Deskripsi</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          rows="3"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="Program Aktif">Program Aktif</option>
          <option value="Program Nonaktif">Program Nonaktif</option>
        </select>
      </div>

      {/* Tombol Label */}
      <div>
        <label className="block mb-1 font-medium">Teks Tombol</label>
        <input
          name="button_label"
          value={form.button_label}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      {/* Langkah-langkah */}
      <div>
        <label className="block mb-2 font-medium">Langkah Program</label>
        {form.details.map((step, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={step}
              onChange={(e) => handleDetailChange(i, e.target.value)}
              className="flex-1 border rounded-md px-3 py-2"
              placeholder={`Langkah ${i + 1}`}
            />
            {form.details.length > 1 && (
              <button
                type="button"
                onClick={() => removeDetail(i)}
                className="text-red-500 text-sm"
              >
                Hapus
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addDetail}
          className="text-sm text-[#FB6B00]"
        >
          + Tambah Langkah
        </button>
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/dashboard/program")}
          className="px-5 py-2 bg-gray-200 text-gray-600 rounded-lg"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-[#FB6B00] text-white rounded-lg"
        >
          {loading ? "Menyimpan..." : programId ? "Perbarui" : "Simpan"}
        </button>
      </div>
    </form>
  );
}
