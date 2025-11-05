"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";

export default function ProgramFormAdd({ onSuccess }) {
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    status: "Program Aktif",
    iconUrl: "",
    iconFile: null,
    details: [""],
  });
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, iconFile: file, iconUrl: preview }));
    }
  };

  // ✅ Upload ke API route pakai FormData
  const uploadImage = async () => {
    if (!form.iconFile) return "";

    try {
      const options = {
        maxSizeMB: 0.25,
        maxWidthOrHeight: 1000,
        fileType: "image/webp",
      };

      const compressed = await imageCompression(form.iconFile, options);
      const fileName = `program/${Date.now()}.webp`;

      const formData = new FormData();
      formData.append("file", compressed, fileName);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json().catch(() => {
        throw new Error("Response bukan JSON (cek console)");
      });

      if (!res.ok) throw new Error(result.error || "Gagal upload icon");
      return result.url;
    } catch (err) {
      console.error("Upload gagal:", err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const iconUrl = await uploadImage();
      const payload = {
        title: form.nama,
        description: form.deskripsi,
        status: form.status,
        icon_url: iconUrl,
        details: form.details,
      };

      const res = await fetch("/api/program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal menyimpan program");

      alert("✅ Program berhasil ditambahkan!");
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
      className="space-y-6 bg-white p-6 rounded-lg shadow text-gray-700"
    >
      <div>
        <label className="block font-medium mb-1">Nama Program</label>
        <input
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
          className="w-full border rounded-md px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Deskripsi</label>
        <textarea
          value={form.deskripsi}
          onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
          rows={3}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Status</label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border rounded-md px-3 py-2"
        >
          <option>Program Aktif</option>
          <option>Program Nonaktif</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Langkah Program</label>
        {form.details.map((s, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              value={s}
              onChange={(e) => {
                const details = [...form.details];
                details[i] = e.target.value;
                setForm({ ...form, details });
              }}
              placeholder={`Langkah ${i + 1}`}
              className="flex-1 border rounded-md px-3 py-2"
            />
            {form.details.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    details: form.details.filter((_, j) => j !== i),
                  })
                }
                className="text-red-500"
              >
                Hapus
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setForm({ ...form, details: [...form.details, ""] })
          }
          className="text-sm text-[#FB6B00]"
        >
          + Tambah Langkah
        </button>
      </div>

      <div>
        <label className="block font-medium mb-1">Upload Ikon</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {form.iconUrl && (
          <img
            src={form.iconUrl}
            alt="Preview"
            className="mt-3 w-20 h-20 object-contain border rounded-md"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-[#FB6B00] hover:bg-orange-700 text-white px-6 py-2 rounded-md"
      >
        {loading ? "Menyimpan..." : "Tambah Program"}
      </button>
    </form>
  );
}
