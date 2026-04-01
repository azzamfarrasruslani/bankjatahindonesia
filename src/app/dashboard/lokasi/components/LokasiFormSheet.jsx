"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import dynamic from "next/dynamic";
import imageCompression from "browser-image-compression";
import { 
  Building2, 
  MapPin, 
  Info, 
  Phone, 
  Clock, 
  Image as ImageIcon, 
  Plus, 
  CheckCircle, 
  X, 
  Loader2,
  Navigation
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const MapPicker = dynamic(() => import("./MapPicker"), { ssr: false });

export default function LokasiFormSheet({ isOpen, onClose, onSuccess, lokasiId = null }) {
  const [form, setForm] = useState({
    nama: "",
    jenis: "utama",
    deskripsi: "",
    alamat: "",
    gambar_url: "",
    latitude: "",
    longitude: "",
    kontak: "",
    jam_operasional: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    if (isOpen && lokasiId) {
      loadLokasi();
    } else if (isOpen) {
      setForm({
        nama: "",
        jenis: "utama",
        deskripsi: "",
        alamat: "",
        gambar_url: "",
        latitude: "",
        longitude: "",
        kontak: "",
        jam_operasional: "",
      });
      setPreview("");
      setFile(null);
    }
  }, [isOpen, lokasiId]);

  const loadLokasi = async () => {
    try {
      setLoadingData(true);
      const { data, error } = await supabase
        .from("lokasi")
        .select("*")
        .eq("id", lokasiId)
        .single();

      if (error) throw error;

      if (data) {
        setForm({
          nama: data.nama || "",
          jenis: data.jenis || "utama",
          deskripsi: data.deskripsi || "",
          alamat: data.alamat || "",
          gambar_url: data.gambar_url || "",
          latitude: data.latitude ?? "",
          longitude: data.longitude ?? "",
          kontak: data.kontak || "",
          jam_operasional: data.jam_operasional || "",
        });
        setPreview(data.gambar_url || "");
      }
    } catch (err) {
      console.error("Gagal mengambil data lokasi:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
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
        .upload(fileName, compressedFile, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("lokasi-images")
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (err) {
      console.error("Kompresi atau upload gagal:", err);
      throw new Error("Gagal mengunggah gambar.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      const imageUrl = await uploadImage();
      const payload = {
        nama: form.nama,
        jenis: form.jenis,
        deskripsi: form.deskripsi,
        alamat: form.alamat,
        gambar_url: imageUrl,
        latitude: form.latitude ? parseFloat(form.latitude) : null,
        longitude: form.longitude ? parseFloat(form.longitude) : null,
        kontak: form.kontak,
        jam_operasional: form.jam_operasional,
        updated_at: new Date().toISOString(),
      };

      if (lokasiId) {
        const { error } = await supabase.from("lokasi").update(payload).eq("id", lokasiId);
        if (error) throw error;
      } else {
        payload.created_at = new Date().toISOString();
        const { error } = await supabase.from("lokasi").insert([payload]);
        if (error) throw error;
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan: " + err.message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        className="w-full sm:max-w-2xl overflow-y-auto custom-scrollbar border-l-0 shadow-2xl p-0"
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full bg-white">
          {/* Custom Header */}
          <div className="p-8 border-b border-gray-50 bg-gradient-to-r from-orange-50/50 to-white">
            <SheetHeader className="text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-[#FB6B00] flex items-center justify-center text-white shadow-lg shadow-orange-200">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <SheetTitle className="text-2xl font-black text-gray-900 tracking-tight">
                    {lokasiId ? "Edit" : "Tambah"} <span className="text-[#FB6B00]">Lokasi</span>
                  </SheetTitle>
                  <SheetDescription className="text-gray-500 font-medium text-xs uppercase tracking-widest mt-0.5">
                    Panel Manajemen Titik Operasional
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>
          </div>

          <div className="flex-1 p-8 space-y-10">
            {loadingData ? (
              <div className="h-64 flex flex-col items-center justify-center text-gray-400 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-[#FB6B00]" />
                <p className="font-bold text-sm tracking-widest uppercase">Memuat Data...</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Visual */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                    <ImageIcon className="w-3 h-3 text-[#FB6B00]" /> Visual Lokasi
                  </label>
                  <div className="relative group/upload h-64">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-gray-100 group-hover/upload:border-[#FB6B00] rounded-[2rem] p-4 h-full transition-all flex flex-col items-center justify-center bg-gray-50/50 group-hover/upload:bg-orange-50/30 overflow-hidden shadow-inner">
                      {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-[1.5rem]" />
                      ) : (
                        <div className="flex flex-col items-center text-center p-8">
                          <Plus className="w-10 h-10 text-orange-200 mb-2" />
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pilih Foto Dokumentasi</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info Utama */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                      <Building2 className="w-3 h-3 text-[#FB6B00]" /> Nama Lokasi
                    </label>
                    <input
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      required
                      placeholder="Masukkan nama lokasi..."
                      className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                      <Info className="w-3 h-3 text-[#FB6B00]" /> Jenis
                    </label>
                    <select
                      name="jenis"
                      value={form.jenis}
                      onChange={handleChange}
                      className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-bold text-gray-900 appearance-none cursor-pointer"
                    >
                      <option value="utama">Lokasi Utama</option>
                      <option value="mitra">Lokasi Mitra</option>
                    </select>
                  </div>
                </div>

                {/* Kontak & Jam */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                      <Phone className="w-3 h-3 text-[#FB6B00]" /> Kontak (No. HP)
                    </label>
                    <input
                      name="kontak"
                      value={form.kontak}
                      onChange={handleChange}
                      placeholder="+62xxxxxxxxxxx"
                      className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                      <Clock className="w-3 h-3 text-[#FB6B00]" /> Jam Operasional
                    </label>
                    <input
                      name="jam_operasional"
                      value={form.jam_operasional}
                      onChange={handleChange}
                      placeholder="Contoh: Senin - Jumat, 08.00 - 17.00"
                      className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                    />
                  </div>
                </div>

                {/* Alamat & Deskripsi */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                      <MapPin className="w-3 h-3 text-[#FB6B00]" /> Alamat Lengkap
                    </label>
                    <input
                      name="alamat"
                      value={form.alamat}
                      onChange={handleChange}
                      placeholder="Masukkan alamat lengkap..."
                      className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                      <Info className="w-3 h-3 text-[#FB6B00]" /> Deskripsi Lokasi
                    </label>
                    <textarea
                      name="deskripsi"
                      value={form.deskripsi}
                      onChange={handleChange}
                      rows="2"
                      placeholder="Ceritakan sedikit tentang lokasi ini..."
                      className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-medium text-gray-600 resize-none shadow-sm"
                    />
                  </div>
                </div>

                {/* Koordinat & Peta */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between ml-1">
                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      <MapPin className="w-3 h-3 text-[#FB6B00]" /> Koordinat Lokasi
                    </label>
                    <div className="flex gap-4 text-[#FB6B00] font-black text-[9px] uppercase tracking-widest">
                       <span>Lat: {parseFloat(form.latitude || 0).toFixed(4)}</span>
                       <span>Lng: {parseFloat(form.longitude || 0).toFixed(4)}</span>
                    </div>
                  </div>
                  
                  <MapPicker
                    value={{
                      lat: parseFloat(form.latitude) || -0.9471,
                      lng: parseFloat(form.longitude) || 100.4172,
                    }}
                    onChange={(lat, lng) =>
                      setForm((prev) => ({ ...prev, latitude: lat, longitude: lng }))
                    }
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 pl-2 uppercase">Input Latitude</p>
                      <input
                        type="text"
                        value={form.latitude}
                        onChange={(e) => setForm(p => ({...p, latitude: e.target.value}))}
                        className="w-full border-none bg-gray-50 rounded-2xl px-6 py-3 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 pl-2 uppercase">Input Longitude</p>
                      <input
                        type="text"
                        value={form.longitude}
                        onChange={(e) => setForm(p => ({...p, longitude: e.target.value}))}
                        className="w-full border-none bg-gray-50 rounded-2xl px-6 py-3 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-3.5 text-gray-500 hover:text-gray-900 font-bold transition-all text-xs uppercase tracking-widest"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loadingSubmit || loadingData}
              className="flex items-center gap-2 px-8 py-3.5 bg-[#FB6B00] text-white hover:bg-orange-600 rounded-2xl font-black shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-[0.1em]"
            >
              {loadingSubmit ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  {lokasiId ? "Perbarui" : "Simpan"} Lokasi
                  <CheckCircle className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
