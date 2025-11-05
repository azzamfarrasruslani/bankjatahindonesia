"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";

export default function ProgramFormEdit({ programId, onSuccess }) {
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    status: "",
    iconUrl: "",
    iconFile: null,
    details: [""],
  });
  const [loading, setLoading] = useState(false);

  // Ambil data program berdasarkan ID
  useEffect(() => {
    if (!programId) return;
    const fetch = async () => {
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
        status: data.status || "",
        iconUrl: data.icon_url || "",
        iconFile: null,
        details:
          data.details && Array.isArray(data.details) ? data.details : [""],
      });
    };
    fetch();
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
        maxSizeMB: 0.25, // target sekitar 250KB
        maxWidthOrHeight: 1000, // batasi resolusi maksimal
        initialQuality: 0.85, // pertahankan kualitas tinggi
        useWebWorker: true, // kompresi di thread terpisah
        fileType: "image/webp", // format efisien tapi tajam
      };

      const compressedFile = await imageCompression(form.iconFile, options);
      const fileName = `${Date.now()}.webp`;

      // Upload ke Supabase Storage
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
      console.error("Kompresi atau upload gagal:", err);
      throw new Error(
        "Gagal mengunggah ikon, coba file lain atau periksa koneksi."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const iconUrl = await uploadImage();
      const { error } = await supabase
        .from("program")
        .update({
          title: form.nama,
          description: form.deskripsi,
          status: form.status,
          icon_url: iconUrl,
          details: form.details,
        })
        .eq("id", programId);

      if (error) throw error;
      onSuccess?.();
    } catch (err) {
      alert("Gagal memperbarui: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-7 bg-white p-6 rounded-lg shadow-md text-gray-600"
    >
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
        <input
          type="text"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      {/* Detail/Langkah */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Langkah Program
        </label>
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

      {/* Ganti Ikon */}
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

      {/* Tombol Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-[#FB6B00] hover:bg-orange-700 text-white px-6 py-2 rounded-lg"
      >
        {loading ? "Menyimpan..." : "Perbarui Program"}
      </button>
    </form>
  );
}