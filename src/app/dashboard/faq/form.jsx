"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { 
  HelpCircle, 
  MessageSquare, 
  Tag, 
  Plus, 
  CheckCircle, 
  X,
  PlusCircle,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";

export default function FAQForm({ initialData = {}, onSubmit }) {
  const router = useRouter();
  const [form, setForm] = useState({
    pertanyaan: initialData.pertanyaan || "",
    jawaban: initialData.jawaban || "",
    kategori: initialData.kategori || "",
  });
  const [loading, setLoading] = useState(false);
  const [kategoriOptions, setKategoriOptions] = useState([]);
  const [isNewKategori, setIsNewKategori] = useState(false);
  const [newKategori, setNewKategori] = useState("");

  useEffect(() => {
    const fetchKategori = async () => {
      const { data, error } = await supabase
        .from("faq")
        .select("kategori")
        .not("kategori", "is", null);

      if (error) return console.error("Gagal memuat kategori:", error);

      const uniqueKategori = [...new Set(data.map((item) => item.kategori))];
      setKategoriOptions(uniqueKategori);
    };
    fetchKategori();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "kategori" && value === "new") {
      setIsNewKategori(true);
      setForm({ ...form, kategori: "" });
    } else {
      setIsNewKategori(false);
    }
  };

  const handleNewKategoriChange = (e) => {
    setNewKategori(e.target.value);
    setForm({ ...form, kategori: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNewKategori && !newKategori.trim()) {
      return alert("Masukkan nama kategori baru.");
    }
    setLoading(true);
    try {
      await onSubmit(form);
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan FAQ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 max-w-4xl mx-auto"
    >
      <div className="space-y-6">
        {/* Kategori Selection */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
            <Tag className="w-4 h-4 text-[#FB6B00]" />
            Kategori FAQ
          </label>
          <div className="relative">
            {!isNewKategori ? (
              <select
                name="kategori"
                value={form.kategori}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-100 rounded-[1.2rem] px-5 py-4 focus:border-[#FB6B00] outline-none bg-gray-50/50 hover:bg-white transition-all font-medium text-gray-900 shadow-sm cursor-pointer appearance-none"
              >
                <option value="">Pilih kategori yang sudah ada</option>
                {kategoriOptions.map((kategori) => (
                  <option key={kategori} value={kategori}>
                    {kategori}
                  </option>
                ))}
                <option value="new" className="text-[#FB6B00] font-bold"> + Tambah Kategori Baru</option>
              </select>
            ) : (
              <div className="flex gap-2 animate-in slide-in-from-left-4 duration-300">
                <input
                  type="text"
                  value={newKategori}
                  onChange={handleNewKategoriChange}
                  placeholder="Ketik nama kategori baru..."
                  required
                  className="flex-1 border-2 border-[#FB6B00] rounded-[1.2rem] px-5 py-4 focus:ring-0 outline-none bg-orange-50/30 font-medium text-gray-900 shadow-sm"
                  autoFocus
                />
                <button 
                  type="button" 
                  onClick={() => setIsNewKategori(false)}
                  className="px-4 text-gray-400 hover:text-red-500 transition-colors"
                  title="Batal kategori baru"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Pertanyaan */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
            <HelpCircle className="w-4 h-4 text-[#FB6B00]" />
            Pertanyaan
          </label>
          <input
            type="text"
            name="pertanyaan"
            value={form.pertanyaan}
            onChange={handleChange}
            required
            placeholder="Contoh: Bagaimana cara mendonorkan sisa minyak?"
            className="w-full border-2 border-gray-100 rounded-[1.2rem] px-5 py-4 focus:border-[#FB6B00] focus:ring-0 outline-none bg-gray-50/50 hover:bg-white transition-all font-bold text-gray-900 placeholder:text-gray-300 shadow-sm"
          />
        </div>

        {/* Jawaban */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
            <MessageSquare className="w-4 h-4 text-[#FB6B00]" />
            Jawaban Lengkap
          </label>
          <textarea
            name="jawaban"
            rows="6"
            value={form.jawaban}
            onChange={handleChange}
            required
            placeholder="Berikan jawaban yang jelas dan membantu..."
            className="w-full border-2 border-gray-100 rounded-[1.5rem] px-5 py-4 focus:border-[#FB6B00] focus:ring-0 outline-none bg-gray-50/50 hover:bg-white transition-all font-medium text-gray-900 placeholder:text-gray-300 shadow-sm leading-relaxed"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-100 mt-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 px-8 py-4 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-[1.2rem] font-bold transition-all text-sm"
        >
          <X className="w-4 h-4" /> Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-10 py-4 bg-[#FB6B00] text-white hover:bg-orange-600 rounded-[1.2rem] font-bold shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              {initialData.id ? "Perbarui Jawaban" : "Simpan FAQ Baru"}
              <CheckCircle className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}
