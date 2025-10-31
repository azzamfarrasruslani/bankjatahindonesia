"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";

export default function ProgramForm({ programId, onSuccess }) {
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    status: "",
    iconUrl: "",
    iconFile: null,
    steps: [""],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!programId) return;

    const fetchProgram = async () => {
      const { data, error } = await supabase
        .from("program")
        .select("*")
        .eq("id", programId)
        .single();

      if (!error && data) {
        setForm({
          nama: data.title || "",
          deskripsi: data.description || "",
          status: data.status || "",
          iconUrl: data.icon_url || "",
          iconFile: null,
          steps: data.steps || [""],
        });
      }
    };

    fetchProgram();
  }, [programId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setForm((prev) => ({
        ...prev,
        iconFile: file,
        iconUrl: preview,
      }));
    }
  };

  const uploadImage = async () => {
    if (!form.iconFile) return form.iconUrl;

    try {
      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(form.iconFile, options);
      const fileExt = form.iconFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("program-images")
        .upload(filePath, compressedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("program-images")
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (err) {
      console.error("Gagal kompres/upload gambar:", err);
      alert("Gagal memproses gambar. Silakan coba gambar lain.");
      return form.iconUrl;
    }
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...form.steps];
    newSteps[index] = value;
    setForm((prev) => ({ ...prev, steps: newSteps }));
  };

  const addStep = () =>
    setForm((prev) => ({ ...prev, steps: [...prev.steps, ""] }));

  const removeStep = (index) =>
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedUrl = await uploadImage();

      const payload = {
        title: form.nama,
        description: form.deskripsi,
        status: form.status,
        icon_url: uploadedUrl,
        steps: form.steps,
      };

      let error;
      if (programId) {
        ({ error } = await supabase
          .from("program")
          .update(payload)
          .eq("id", programId));
      } else {
        ({ error } = await supabase.from("program").insert([payload]));
      }

      if (error) throw error;
      onSuccess?.();
    } catch (err) {
      alert("Gagal menyimpan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-7 bg-white p-6 rounded-lg shadow-md"
    >
      {/* === Nama Program === */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nama Program
        </label>
        <input
          type="text"
          value={form.nama}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, nama: e.target.value }))
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-600 focus:ring-[#FB6B00] focus:border-[#FB6B00]"
          placeholder="Masukkan nama program"
          required
        />
      </div>

      {/* === Deskripsi === */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Deskripsi
        </label>
        <textarea
          value={form.deskripsi}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, deskripsi: e.target.value }))
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-600 focus:ring-[#FB6B00] focus:border-[#FB6B00]"
          rows="3"
          placeholder="Masukkan deskripsi program"
        />
      </div>

      {/* === Status === */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <input
          type="text"
          value={form.status}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, status: e.target.value }))
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-600 focus:ring-[#FB6B00] focus:border-[#FB6B00]"
          placeholder="Contoh: Aktif / Nonaktif"
        />
      </div>

      {/* === Steps Dinamis === */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Langkah Program
        </label>
        {form.steps.map((step, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={step}
              onChange={(e) => handleStepChange(i, e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 placeholder-gray-600"
              placeholder={`Langkah ${i + 1}`}
            />
            {form.steps.length > 1 && (
              <button
                type="button"
                onClick={() => removeStep(i)}
                className="text-red-500 text-sm hover:text-red-700"
              >
                Hapus
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addStep}
          className="text-sm text-[#FB6B00] hover:underline"
        >
          + Tambah Langkah
        </button>
      </div>

      {/* === Upload Ikon === */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Ikon Program
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-600"
        />
        {form.iconUrl && (
          <img
            src={form.iconUrl}
            alt="Preview Icon"
            className="mt-3 w-20 h-20 object-contain border rounded-md"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-[#FB6B00] hover:bg-orange-700 text-white px-6 py-2 rounded-lg"
      >
        {loading
          ? "Menyimpan..."
          : programId
          ? "Perbarui Program"
          : "Tambah Program"}
      </button>
    </form>
  );
}
