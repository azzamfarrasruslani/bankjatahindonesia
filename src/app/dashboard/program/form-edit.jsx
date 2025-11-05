"use client";

import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import { supabase } from "@/lib/supabaseClient";

export default function ProgramFormEdit({ programId, onSuccess }) {
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    status: "Program Aktif",
    iconUrl: "",
    iconFile: null,
    details: [""],
  });
  const [oldIcon, setOldIcon] = useState("");
  const [loading, setLoading] = useState(false);

  // Ambil data program dari Supabase
  useEffect(() => {
    if (!programId) return;
    const fetchProgram = async () => {
      const { data, error } = await supabase
        .from("program")
        .select("*")
        .eq("id", programId)
        .single();

      if (error) {
        console.error("Gagal ambil data:", error);
        return;
      }

      setForm({
        nama: data.title || "",
        deskripsi: data.description || "",
        status: data.status || "Program Aktif",
        iconUrl: data.icon_url || "",
        iconFile: null,
        details:
          data.details && Array.isArray(data.details) ? data.details : [""],
      });
      setOldIcon(data.icon_url || "");
    };
    fetchProgram();
  }, [programId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, iconFile: file, iconUrl: preview }));
    }
  };

  const uploadImage = async () => {
    if (!form.iconFile) return form.iconUrl || "";

    try {
      const options = {
        maxSizeMB: 0.25,
        maxWidthOrHeight: 1000,
        initialQuality: 0.85,
        useWebWorker: true,
        fileType: "image/webp",
      };

      const compressedFile = await imageCompression(form.iconFile, options);
      const fileName = `program/${Date.now()}.webp`;

      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          bucket: "program-images",
          path: fileName,
          file: await compressedFile.arrayBuffer(),
        }),
      });

      const result = await res.json();
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
        id: programId,
        title: form.nama,
        description: form.deskripsi,
        status: form.status,
        icon_url: iconUrl,
        details: form.details,
        old_icon: oldIcon,
      };

      const res = await fetch("/api/program", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal memperbarui program");

      alert("✅ Program berhasil diperbarui!");
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
      className="space-y-7 bg-white p-6 rounded-lg shadow-md text-gray-600"
    >
      <h2 className="text-lg font-semibold mb-3">Edit Program</h2>

      {/* Nama Program */}
      <div>
        <label className="block text-sm font-medium mb-1">Nama Program</label>
        <input
          type="text"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
          className="w-full border rounded-md px-3 py-2"
          required
        />
      </div>

      {/* Deskripsi */}
      <div>
        <label className="block text-sm font-medium mb-1">Deskripsi</label>
        <textarea
          value={form.deskripsi}
          onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
          className="w-full border rounded-md px-3 py-2"
          rows="3"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="Program Aktif">Program Aktif</option>
          <option value="Program Nonaktif">Program Nonaktif</option>
        </select>
      </div>

      {/* Detail Langkah */}
      <div>
        <label className="block text-sm font-medium mb-1">Langkah Program</label>
        {form.details.map((step, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={step}
              onChange={(e) => {
                const updated = [...form.details];
                updated[i] = e.target.value;
                setForm({ ...form, details: updated });
              }}
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
          onClick={() => setForm({ ...form, details: [...form.details, ""] })}
          className="text-sm text-[#FB6B00]"
        >
          + Tambah Langkah
        </button>
      </div>

      {/* Upload Ikon */}
      <div>
        <label className="block text-sm font-medium mb-1">Ganti Ikon</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {form.iconUrl && (
          <img
            src={form.iconUrl}
            className="mt-3 w-20 h-20 object-contain border rounded-md"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-[#FB6B00] hover:bg-orange-700 text-white px-6 py-2 rounded-lg"
      >
        {loading ? "Menyimpan..." : "Update Program"}
      </button>
    </form>
  );
}
