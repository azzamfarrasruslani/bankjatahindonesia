"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  uploadImage, 
  insertProgram, 
  updateProgram,
  fetchProgram
} from "@/lib/services/programService";
import { supabase } from "@/lib/supabaseClient";
import { 
  Type, 
  Info, 
  Image as ImageIcon, 
  Plus,
  CheckCircle,
  X,
  MousePointer2,
  ListChecks,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProgramForm({ programId = null, onSuccess }) {
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

  // Ambil data program jika mode edit
  useEffect(() => {
    if (!programId) return;

    const loadProgram = async () => {
      try {
        const { data, error } = await supabase
          .from("program")
          .select("*")
          .eq("id", programId)
          .single();

        if (error) throw error;

        setForm({
          title: data.title || "",
          status: data.status || "Program Aktif",
          icon_url: data.icon_url || "",
          description: data.description || "",
          button_label: data.button_label || "Ikuti Program Ini",
          details: data.details || [""],
        });

        setPreview(data.icon_url || "");
      } catch (err) {
        console.error("Gagal mengambil data program:", err);
      }
    };

    loadProgram();
  }, [programId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage(file, form.icon_url);
      const payload = { ...form, icon_url: imageUrl };

      if (programId) {
        await updateProgram({ id: programId, ...payload });
      } else {
        await insertProgram(payload);
      }

      onSuccess?.();
    } catch (err) {
      alert("Gagal simpan program: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailChange = (i, value) => {
    const updated = [...form.details];
    updated[i] = value;
    setForm({ ...form, details: updated });
  };

  const addDetail = () => setForm({ ...form, details: [...form.details, ""] });

  const removeDetail = (i) => {
    if (form.details.length <= 1) return;
    setForm({ ...form, details: form.details.filter((_, j) => j !== i) });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Media & Primary Info */}
        <div className="space-y-8">
          {/* Upload ikon */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
              <ImageIcon className="w-4 h-4 text-[#FB6B00]" />
              Ikon Program
            </label>
            <div className="relative group/upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="border-2 border-dashed border-gray-200 group-hover/upload:border-[#FB6B00] rounded-[2rem] p-4 transition-all flex flex-col items-center justify-center bg-gray-50 group-hover/upload:bg-orange-50/30 overflow-hidden min-h-[250px]">
                {preview ? (
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md">
                    <img src={preview} alt="Preview" className="w-full h-full object-contain bg-white min-h-[210px]" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white font-bold text-sm">Ganti Ikon</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-[#FB6B00] mb-4">
                      <Plus className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-bold text-gray-900">Pilih Ikon Program</p>
                    <p className="text-xs text-gray-400 mt-1">Format: PNG, JPG, atau WebP</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Judul */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
                <Type className="w-4 h-4 text-[#FB6B00]" />
                Judul Program
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Contoh: Tabungan Kurban"
                className="w-full border-2 border-gray-100 rounded-[1.2rem] px-5 py-4 focus:border-[#FB6B00] focus:ring-0 outline-none bg-gray-50/50 hover:bg-white transition-all font-bold text-gray-900 placeholder:text-gray-300 shadow-sm"
              />
            </div>

            {/* Status & Button Label */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
                  <Info className="w-4 h-4 text-[#FB6B00]" />
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 rounded-[1.2rem] px-5 py-4 focus:border-[#FB6B00] focus:ring-0 outline-none bg-gray-50/50 hover:bg-white transition-all font-bold text-gray-900 shadow-sm appearance-none"
                >
                  <option value="Program Aktif">Program Aktif</option>
                  <option value="Program Nonaktif">Program Nonaktif</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
                  <MousePointer2 className="w-4 h-4 text-[#FB6B00]" />
                  Teks Tombol
                </label>
                <input
                  type="text"
                  name="button_label"
                  value={form.button_label}
                  onChange={handleChange}
                  placeholder="Contoh: Ikuti Program"
                  className="w-full border-2 border-gray-100 rounded-[1.2rem] px-5 py-4 focus:border-[#FB6B00] focus:ring-0 outline-none bg-gray-50/50 hover:bg-white transition-all font-bold text-gray-900 shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Steps & Description */}
        <div className="space-y-8">
          {/* Deskripsi */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
              <Info className="w-4 h-4 text-[#FB6B00]" />
              Deskripsi Program
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Jelaskan secara singkat tentang program ini..."
              className="w-full border-2 border-gray-100 rounded-[1.5rem] px-5 py-4 focus:border-[#FB6B00] focus:ring-0 outline-none bg-gray-50/50 hover:bg-white transition-all font-medium text-gray-900 shadow-sm resize-none"
            />
          </div>

          {/* Langkah Program */}
          <div className="space-y-4">
            <div className="flex items-center justify-between ml-1">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest">
                <ListChecks className="w-4 h-4 text-[#FB6B00]" />
                Langkah-langkah
              </label>
              <button
                type="button"
                onClick={addDetail}
                className="text-[10px] font-black uppercase tracking-widest text-[#FB6B00] hover:text-orange-600 flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-lg transition-all"
              >
                <Plus className="w-3 h-3" /> Tambah Langkah
              </button>
            </div>
            
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {form.details.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-3 group/step"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-[#FB6B00] flex items-center justify-center font-bold text-xs">
                      {i + 1}
                    </div>
                    <input
                      type="text"
                      value={step}
                      onChange={(e) => handleDetailChange(i, e.target.value)}
                      placeholder={`Masukkan langkah ${i + 1}...`}
                      className="flex-1 border-2 border-gray-100 rounded-[1.2rem] px-5 py-3 focus:border-[#FB6B00] focus:ring-0 outline-none bg-gray-50/50 hover:bg-white transition-all font-medium text-gray-900 shadow-sm"
                    />
                    {form.details.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDetail(i)}
                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover/step:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-100 mt-12">
        <button
          type="button"
          onClick={() => router.push("/dashboard/program")}
          className="flex items-center gap-2 px-8 py-4 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-[1.2rem] font-bold transition-all text-sm"
        >
          <X className="w-4 h-4" /> Batal & Kembali
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-10 py-4 bg-[#FB6B00] text-white hover:bg-orange-600 rounded-[1.2rem] font-bold shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              {programId ? "Perbarui Program" : "Simpan Program Sekarang"}
              <CheckCircle className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}
