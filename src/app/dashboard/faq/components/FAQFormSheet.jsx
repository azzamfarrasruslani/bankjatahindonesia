"use client";

import { useEffect, useState } from "react";
import { 
  fetchFAQ, 
  fetchFAQById, 
  insertFAQ, 
  updateFAQ 
} from "@/services/faqService";
import { toast } from "sonner";
import { 
  HelpCircle, 
  MessageSquare, 
  Tag, 
  Plus, 
  CheckCircle, 
  X,
  Loader2
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function FAQFormSheet({ isOpen, onClose, onSuccess, faqId }) {
  const [form, setForm] = useState({
    pertanyaan: "",
    jawaban: "",
    kategori: "",
  });
  const [loading, setLoading] = useState(false);
  const [kategoriOptions, setKategoriOptions] = useState([]);
  const [isNewKategori, setIsNewKategori] = useState(false);
  const [newKategori, setNewKategori] = useState("");

  useEffect(() => {
    const loadKategori = async () => {
      try {
        const data = await fetchFAQ();
        const uniqueKategori = [...new Set(data.map((item) => item.kategori).filter(Boolean))];
        setKategoriOptions(uniqueKategori);
      } catch (error) {
        console.error("Gagal memuat kategori:", error);
      }
    };
    if (isOpen) loadKategori();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    if (faqId) {
      const fetchData = async () => {
        try {
          const data = await fetchFAQById(faqId);
          if (data) {
            setForm({
              pertanyaan: data.pertanyaan || "",
              jawaban: data.jawaban || "",
              kategori: data.kategori || "",
            });
            setIsNewKategori(false);
          }
        } catch (error) {
          console.error("Gagal mengambil data:", error.message);
          toast.error("Gagal mengambil data FAQ");
        }
      };

      fetchData();
    } else {
      setForm({
        pertanyaan: "",
        jawaban: "",
        kategori: "",
      });
      setIsNewKategori(false);
      setNewKategori("");
    }
  }, [isOpen, faqId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "kategori" && value === "new") {
      setIsNewKategori(true);
      setForm((prev) => ({ ...prev, kategori: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNewKategoriChange = (e) => {
    setNewKategori(e.target.value);
    setForm((prev) => ({ ...prev, kategori: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNewKategori && !newKategori.trim()) {
      return toast.error("Masukkan nama kategori baru.");
    }
    
    setLoading(true);
    const payload = {
      pertanyaan: form.pertanyaan,
      jawaban: form.jawaban,
      kategori: form.kategori || "Umum",
    };

    const savingPromise = faqId 
      ? updateFAQ(faqId, payload) 
      : insertFAQ(payload);

    toast.promise(savingPromise, {
      loading: faqId ? "Memperbarui FAQ..." : "Menyimpan FAQ baru...",
      success: () => {
        onSuccess?.();
        onClose();
        return faqId ? "FAQ berhasil diperbarui!" : "FAQ berhasil ditambahkan!";
      },
      error: (err) => {
        setLoading(false);
        return "Gagal menyimpan: " + err.message;
      }
    });

    try {
      await savingPromise;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="overflow-y-auto sm:max-w-xl p-0 border-none rounded-l-[3rem] shadow-2xl">
        <div className="p-8 md:p-10 space-y-8 h-full bg-white">
          <SheetHeader>
            <SheetTitle className="text-3xl font-black text-gray-900 tracking-tight">
              {faqId ? "Edit" : "Tambah"} <span className="text-[#FB6B00]">FAQ</span>
            </SheetTitle>
            <SheetDescription className="text-gray-500 font-medium">
              Kelola pertanyaan yang sering diajukan untuk membantu pengguna.
            </SheetDescription>
          </SheetHeader>


          <form onSubmit={handleSubmit} className="space-y-8 pb-10">
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
                    className="w-full border-2 border-gray-100 rounded-[1.2rem] px-5 py-4 focus:border-[#FB6B00] outline-none bg-gray-50/50 hover:bg-white transition-all font-bold text-gray-900 shadow-sm cursor-pointer appearance-none"
                  >
                    <option value="">Pilih kategori...</option>
                    {kategoriOptions.map((kategori) => (
                      <option key={kategori} value={kategori}>
                        {kategori}
                      </option>
                    ))}
                    <option value="new" className="text-[#FB6B00] font-black italic"> + Tambah Kategori Baru</option>
                  </select>
                ) : (
                  <div className="flex gap-2 animate-in slide-in-from-left-4 duration-300">
                    <input
                      type="text"
                      value={newKategori}
                      onChange={handleNewKategoriChange}
                      placeholder="Ketik nama kategori baru..."
                      required
                      className="flex-1 border-2 border-[#FB6B00] rounded-[1.2rem] px-5 py-4 focus:ring-0 outline-none bg-orange-50/30 font-bold text-gray-900 shadow-sm"
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
                placeholder="Apa yang ingin ditanyakan?"
                className="w-full border-2 border-gray-100 rounded-[1.2rem] px-5 py-4 focus:border-[#FB6B00] outline-none bg-gray-50/50 hover:bg-white transition-all font-bold text-gray-900 placeholder:text-gray-300 shadow-sm"
              />
            </div>

            {/* Jawaban */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest ml-1">
                <MessageSquare className="w-4 h-4 text-[#FB6B00]" />
                Jawaban
              </label>
              <textarea
                name="jawaban"
                rows="6"
                value={form.jawaban}
                onChange={handleChange}
                required
                placeholder="Berikan jawaban yang jelas..."
                className="w-full border-2 border-gray-100 rounded-[1.5rem] px-5 py-4 focus:border-[#FB6B00] outline-none bg-gray-50/50 hover:bg-white transition-all font-medium text-gray-900 placeholder:text-gray-300 shadow-sm leading-relaxed"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-8 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-4 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-[1.2rem] font-bold transition-all text-sm"
              >
                Batalkan
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-10 py-4 bg-[#FB6B00] text-white hover:bg-orange-600 rounded-[1.2rem] font-bold shadow-[0_10px_20px_rgba(251,107,0,0.2)] hover:shadow-[0_10px_25px_rgba(251,107,0,0.3)] transition-all disabled:opacity-50 text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    {faqId ? "Simpan Perubahan" : "Simpan FAQ"}
                    <CheckCircle className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
