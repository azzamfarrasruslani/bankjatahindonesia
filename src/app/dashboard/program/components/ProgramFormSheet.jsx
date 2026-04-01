"use client";

import { useEffect, useState } from "react";
import { 
  uploadImage, 
  insertProgram, 
  updateProgram
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
  Trash2,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

export default function ProgramFormSheet({ isOpen, onClose, onSuccess, programId = null }) {
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
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (isOpen && programId) {
      loadProgram();
    } else if (isOpen) {
      // Reset form for new entry
      setForm({
        title: "",
        status: "Program Aktif",
        icon_url: "",
        description: "",
        button_label: "Ikuti Program Ini",
        details: [""],
      });
      setPreview("");
      setFile(null);
    }
  }, [isOpen, programId]);

  const loadProgram = async () => {
    try {
      setFetching(true);
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
    } finally {
      setFetching(false);
    }
  };

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
      let imageUrl = form.icon_url;
      if (file) {
        imageUrl = await uploadImage(file, form.icon_url);
      }
      
      const payload = { ...form, icon_url: imageUrl };

      if (programId) {
        await updateProgram({ id: programId, ...payload });
      } else {
        await insertProgram(payload);
      }

      onSuccess?.();
      onClose();
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
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto custom-scrollbar border-l-0 shadow-2xl p-0">
        <form onSubmit={handleSubmit} className="flex flex-col h-full bg-white">
          {/* Custom Header */}
          <div className="p-8 border-b border-gray-50 bg-gradient-to-r from-orange-50/50 to-white">
            <SheetHeader className="text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-[#FB6B00] flex items-center justify-center text-white shadow-lg shadow-orange-200">
                  <Layers3 className="w-5 h-5" />
                </div>
                <div>
                  <SheetTitle className="text-2xl font-black text-gray-900 tracking-tight">
                    {programId ? "Edit" : "Tambah"} <span className="text-[#FB6B00]">Program</span>
                  </SheetTitle>
                  <SheetDescription className="text-gray-500 font-medium text-xs uppercase tracking-widest mt-0.5">
                    Panel Manajemen Program Unggulan
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>
          </div>

          <div className="flex-1 p-8 space-y-10">
            {fetching ? (
              <div className="h-64 flex flex-col items-center justify-center text-gray-400 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-[#FB6B00]" />
                <p className="font-bold text-sm tracking-widest uppercase">Memuat Data...</p>
              </div>
            ) : (
              <>
                {/* Section 1: Media */}
                <div className="space-y-6">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                    <ImageIcon className="w-3 h-3" /> Media Visual
                  </label>
                  <div className="relative group/upload w-full max-w-sm mx-auto">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-gray-100 group-hover/upload:border-[#FB6B00] rounded-[2.5rem] p-4 transition-all flex flex-col items-center justify-center bg-gray-50/50 group-hover/upload:bg-orange-50/30 overflow-hidden min-h-[220px] shadow-inner">
                      {preview ? (
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-sm">
                          <img src={preview} alt="Preview" className="w-full h-full object-contain bg-white min-h-[190px]" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                            <p className="text-white font-bold text-xs uppercase tracking-widest">Ganti Ikon</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-center p-6">
                          <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-[#FB6B00] mb-4 shadow-sm">
                            <Plus className="w-6 h-6" />
                          </div>
                          <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Pilih Ikon Program</p>
                          <p className="text-[10px] text-gray-400 mt-2 font-medium">PNG, JPG, atau WebP (Max 2MB)</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 2: Info Dasar */}
                <div className="space-y-6">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                    <Type className="w-3 h-3" /> Informasi Dasar
                  </label>
                  
                  <div className="space-y-5">
                    <div className="space-y-2">
                       <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        placeholder="Judul Program..."
                        className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300 text-lg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Status</p>
                        <select
                          name="status"
                          value={form.status}
                          onChange={handleChange}
                          className="w-full border-none bg-gray-50/50 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-bold text-gray-900 shadow-sm appearance-none"
                        >
                          <option value="Program Aktif">Aktif</option>
                          <option value="Program Nonaktif">Nonaktif</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                         <p className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Label Tombol</p>
                        <input
                          type="text"
                          name="button_label"
                          value={form.button_label}
                          onChange={handleChange}
                          placeholder="Label Tombol..."
                          className="w-full border-none bg-gray-50/50 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-bold text-gray-900 shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                       <p className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Deskripsi Singkat</p>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Berikan deskripsi singkat tentang program ini..."
                        className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-medium text-gray-600 shadow-sm resize-none text-sm leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Langkah-langkah */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      <ListChecks className="w-3 h-3" /> Langkah Pelaksanaan
                    </label>
                    <button
                      type="button"
                      onClick={addDetail}
                      className="text-[10px] font-black uppercase tracking-widest text-[#FB6B00] hover:bg-orange-50 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-3 h-3" /> Tambah
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <AnimatePresence initial={false}>
                      {form.details.map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex items-center gap-3 group/step bg-gray-50/30 p-2 rounded-2xl border border-gray-50"
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-white shadow-sm text-[#FB6B00] flex items-center justify-center font-black text-xs border border-gray-100">
                            {i + 1}
                          </div>
                          <input
                            type="text"
                            value={step}
                            onChange={(e) => handleDetailChange(i, e.target.value)}
                            placeholder={`Masukkan langkah ${i + 1}...`}
                            className="flex-1 bg-transparent border-none p-2 focus:ring-0 outline-none transition-all font-bold text-gray-700 placeholder:text-gray-300 text-sm"
                          />
                          {form.details.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeDetail(i)}
                              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover/step:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </>
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
              disabled={loading || fetching}
              className="flex items-center gap-2 px-8 py-3.5 bg-[#FB6B00] text-white hover:bg-orange-600 rounded-2xl font-black shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-[0.1em]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  {programId ? "Perbarui" : "Simpan"} Program
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

const Layers3 = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
    <path d="m2.6 12.08 8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83l-8.58 3.91a2 2 0 0 1-1.66 0L2.6 10.25a1 1 0 0 0 0 1.83Z" />
    <path d="m2.6 17.08 8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.91a1 1 0 0 0 0-1.83l-8.58 3.9a2 2 0 0 1-1.66 0l-8.58-3.9a1 1 0 0 0 0 1.83Z" />
  </svg>
);
