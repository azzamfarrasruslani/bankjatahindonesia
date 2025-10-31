"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";

export default function ProgramForm({ programId, onSuccess }) {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [status, setStatus] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [steps, setSteps] = useState([""]); // array langkah
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
        setNama(data.title || "");
        setDeskripsi(data.description || "");
        setStatus(data.status || "");
        setIconUrl(data.icon_url || "");
        setSteps(data.steps || [""]);
      }
    };
    fetchProgram();
  }, [programId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file);
      const preview = URL.createObjectURL(file);
      setIconUrl(preview);
    }
  };

  const uploadImage = async () => {
    if (!iconFile) return iconUrl;
    try {
      const options = { maxSizeMB: 0.3, maxWidthOrHeight: 800, useWebWorker: true };
      const compressedFile = await imageCompression(iconFile, options);

      const fileExt = iconFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("program-images")
        .upload(filePath, compressedFile, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("program-images")
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (err) {
      console.error("Gagal kompres/upload gambar:", err);
      alert("Gagal memproses gambar. Silakan coba gambar lain.");
      return iconUrl;
    }
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const addStep = () => setSteps([...steps, ""]);
  const removeStep = (index) => setSteps(steps.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const uploadedUrl = await uploadImage();

      const payload = {
        title: nama,
        description: deskripsi,
        status,
        icon_url: uploadedUrl,
        steps, // kirim array ke Supabase
      };

      let error;
      if (programId) {
        ({ error } = await supabase.from("program").update(payload).eq("id", programId));
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
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow-md">
      {/* === Nama Program === */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Program</label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-600 focus:ring-[#FB6B00] focus:border-[#FB6B00]"
          placeholder="Masukkan nama program"
          required
        />
      </div>

      {/* === Deskripsi === */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-600 focus:ring-[#FB6B00] focus:border-[#FB6B00]"
          rows="3"
          placeholder="Masukkan deskripsi program"
        />
      </div>

      {/* === Status === */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-600 focus:ring-[#FB6B00] focus:border-[#FB6B00]"
          placeholder="Contoh: Aktif / Nonaktif"
        />
      </div>

      {/* === Steps Dinamis === */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Langkah Program</label>
        {steps.map((step, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={step}
              onChange={(e) => handleStepChange(i, e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 placeholder-gray-600"
              placeholder={`Langkah ${i + 1}`}
            />
            {steps.length > 1 && (
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Ikon Program</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-600" />
        {iconUrl && (
          <img src={iconUrl} alt="Preview Icon" className="mt-3 w-20 h-20 object-contain border rounded-md" />
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-[#FB6B00] hover:bg-orange-700 text-white px-6 py-2 rounded-lg"
      >
        {loading ? "Menyimpan..." : programId ? "Perbarui Program" : "Tambah Program"}
      </button>
    </form>
  );
}
