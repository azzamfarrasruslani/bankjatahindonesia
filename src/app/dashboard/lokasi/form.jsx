"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import dynamic from "next/dynamic";
import imageCompression from "browser-image-compression";

const MapPicker = dynamic(() => import("./MapPicker"), { ssr: false });

export default function LokasiForm({
  lokasi: initialLokasi = null,
  onSuccess,
}) {
  const [form, setForm] = useState({
    nama: "",
    jenis: "utama",
    deskripsi: "",
    alamat: "",
    gambar_url: "",
    latitude: "",
    longitude: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (initialLokasi) {
      setForm({
        nama: initialLokasi.nama || "",
        jenis: initialLokasi.jenis || "utama",
        deskripsi: initialLokasi.deskripsi || "",
        alamat: initialLokasi.alamat || "",
        gambar_url: initialLokasi.gambar_url || "",
        latitude: initialLokasi.latitude ?? "",
        longitude: initialLokasi.longitude ?? "",
      });
      setPreview(initialLokasi.gambar_url || "");
    }
  }, [initialLokasi]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const uploadImage = async () => {
    if (!file) return form.gambar_url || "";

    try {
      const options = {
        maxSizeMB: 0.25,
        maxWidthOrHeight: 1000,
        initialQuality: 0.85,
        useWebWorker: true,
        fileType: "image/webp",
      };

      const compressedFile = await imageCompression(file, options);
      const fileName = `lokasi/${Date.now()}.webp`;

      const { error: uploadError } = await supabase.storage
        .from("lokasi-images")
        .upload(fileName, compressedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("lokasi-images")
        .getPublicUrl(fileName);
      return data.publicUrl;
    } catch (err) {
      console.error("Kompresi/upload gagal:", err);
      throw new Error("Gagal mengunggah gambar, periksa koneksi.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const publicUrl = await uploadImage();
      const payload = {
        nama: form.nama,
        jenis: form.jenis,
        deskripsi: form.deskripsi,
        alamat: form.alamat,
        gambar_url: publicUrl || form.gambar_url || null,
        latitude: form.latitude ? parseFloat(form.latitude) : null,
        longitude: form.longitude ? parseFloat(form.longitude) : null,
        updated_at: new Date().toISOString(),
      };

      if (initialLokasi?.id) {
        const { error } = await supabase
          .from("lokasi")
          .update(payload)
          .eq("id", initialLokasi.id);
        if (error) throw error;
        alert("✅ Lokasi berhasil diperbarui");
      } else {
        payload.created_at = new Date().toISOString();
        const { error } = await supabase.from("lokasi").insert([payload]);
        if (error) throw error;
        alert("✅ Lokasi berhasil ditambahkan");
      }

      if (onSuccess) onSuccess();
      else router.push("/dashboard/lokasi");
    } catch (err) {
      alert("❌ Gagal menyimpan lokasi: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto bg-white p-6 rounded-xl shadow text-gray-600"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nama Lokasi
        </label>
        <input
          name="nama"
          value={form.nama}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jenis
          </label>
          <select
            name="jenis"
            value={form.jenis}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="utama">Lokasi Utama</option>
            <option value="mitra">Lokasi Mitra</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alamat
          </label>
          <input
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Deskripsi
        </label>
        <textarea
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          rows="4"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Koordinat Lokasi
        </label>
        <MapPicker
          value={{
            lat: parseFloat(form.latitude) || -0.9471,
            lng: parseFloat(form.longitude) || 100.4172,
          }}
          onChange={(lat, lng) =>
            setForm((prev) => ({ ...prev, latitude: lat, longitude: lng }))
          }
        />
      </div>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Latitude
          </label>
          <input
            name="latitude"
            value={form.latitude}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, latitude: e.target.value }))
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Longitude
          </label>
          <input
            name="longitude"
            value={form.longitude}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, longitude: e.target.value }))
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gambar
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-3 w-full"
        />
        <input
          type="text"
          name="gambar_url"
          value={form.gambar_url}
          onChange={handleChange}
          placeholder="Atau tempel URL gambar"
          className="w-full border rounded-lg px-3 py-2 mb-3"
        />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-48 object-cover rounded-lg shadow-sm"
          />
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/dashboard/lokasi")}
          className="px-5 py-2 bg-gray-200 text-gray-600 rounded-lg"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-[#FB6B00] text-white rounded-lg"
        >
          {loading ? "Menyimpan..." : initialLokasi ? "Perbarui" : "Simpan"}
        </button>
      </div>
    </form>
  );
}
