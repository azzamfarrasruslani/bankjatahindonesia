"use client";

import { useState, useEffect } from "react";
import { 
  fetchGaleriById, 
  insertGaleri, 
  updateGaleri,
  uploadImage
} from "@/services/galeriService";
import { 
  Type, 
  AlignLeft, 
  Calendar, 
  Image as ImageIcon, 
  Plus, 
  CheckCircle, 
  X, 
  Loader2,
  Images
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { toast } from "sonner";

export default function GaleriFormSheet({ isOpen, onClose, onSuccess, galeriId = null }) {
  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    tanggal: "",
    gambar_url: "",
    tipe: "foto",
    video_url: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    if (isOpen && galeriId) {
      loadGaleri();
    } else if (isOpen) {
      // Reset form for new entry
      setForm({
        judul: "",
        deskripsi: "",
        tanggal: "",
        gambar_url: "",
        tipe: "foto",
        video_url: "",
      });
      setPreview("");
      setFile(null);
    }
  }, [isOpen, galeriId]);

  const loadGaleri = async () => {
    try {
      setLoadingData(true);
      const data = await fetchGaleriById(galeriId);

      if (data) {
        setForm({
          judul: data.judul || "",
          deskripsi: data.deskripsi || "",
          tanggal: data.tanggal || "",
          gambar_url: data.gambar_url || "",
          tipe: data.tipe || "foto",
          video_url: data.video_url || "",
        });
        setPreview(data.gambar_url || "");
      }
    } catch (err) {
      console.error("Gagal mengambil data galeri:", err);
      toast.error("Gagal mengambil data galeri");
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

  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    const savingPromise = (async () => {
      // Tunggu upload selesai (bisa null jika tipe video atau tidak ganti foto)
      const imageUrl = await uploadImage(file, form.gambar_url);
      
      const payload = {
        judul: form.judul,
        deskripsi: form.deskripsi,
        tanggal: form.tanggal || new Date().toISOString().split("T")[0],
        gambar_url: imageUrl,
        tipe: form.tipe,
        video_url: form.video_url,
      };

      if (galeriId) {
        await updateGaleri(galeriId, payload);
        return "Dokumentasi berhasil diperbarui!";
      } else {
        await insertGaleri(payload);
        return "Dokumentasi berhasil ditambahkan!";
      }
    })();

    toast.promise(savingPromise, {
      loading: "Sedang menyimpan dokumentasi...",
      success: (message) => {
        onSuccess?.();
        onClose();
        return message;
      },
      error: (err) => {
        setLoadingSubmit(false);
        return "Gagal menyimpan: " + err.message;
      },
    });

    try {
      await savingPromise;
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const videoId = getYoutubeId(form.video_url);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto custom-scrollbar border-l-0 shadow-2xl p-0">
        <form onSubmit={handleSubmit} className="flex flex-col h-full bg-white">
          {/* Custom Header */}
          <div className="p-8 border-b border-gray-50 bg-gradient-to-r from-orange-50/50 to-white">
            <SheetHeader className="text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-[#FB6B00] flex items-center justify-center text-white shadow-lg shadow-orange-200">
                  <Images className="w-5 h-5" />
                </div>
                <div>
                  <SheetTitle className="text-2xl font-black text-gray-900 tracking-tight">
                    {galeriId ? "Edit" : "Tambah"} <span className="text-[#FB6B00]">Dokumentasi</span>
                  </SheetTitle>
                  <SheetDescription className="text-gray-500 font-medium text-xs uppercase tracking-widest mt-0.5">
                    Panel Manajemen Dokumentasi Visual & Video
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>
          </div>

          <div className="flex-1 p-8 space-y-10">
            {loadingData ? (
              <div className="h-64 flex flex-col items-center justify-center text-gray-400 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-[#FB6B00]" />
                <p className="font-bold text-sm tracking-widest uppercase text-center">Memuat Dokumentasi...</p>
              </div>
            ) : (
              <>
                {/* Selector Tipe */}
                <div className="p-1 px-2.5 bg-gray-100/80 rounded-2xl flex gap-1 self-start">
                   <button 
                     type="button" 
                     onClick={() => setForm(p => ({...p, tipe: 'foto'}))}
                     className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${form.tipe === 'foto' ? 'bg-white text-[#FB6B00] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                     <ImageIcon className="w-3.5 h-3.5" /> Foto
                   </button>
                   <button 
                     type="button" 
                     onClick={() => setForm(p => ({...p, tipe: 'video'}))}
                     className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${form.tipe === 'video' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                     <X className="w-3.5 h-3.5 -rotate-45" /> Video YouTube
                   </button>
                </div>

                {/* Visual Section */}
                <div className="space-y-6">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                    {form.tipe === 'foto' ? <><ImageIcon className="w-3 h-3" /> Visual Dokumentasi</> : <><X className="w-3 h-3 -rotate-45" /> Konten Video</>}
                  </label>
                  
                  {form.tipe === 'foto' ? (
                     <div className="relative group/upload w-full max-w-sm mx-auto">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="border-2 border-dashed border-gray-100 group-hover/upload:border-[#FB6B00] rounded-[2.5rem] p-4 transition-all flex flex-col items-center justify-center bg-gray-50/50 group-hover/upload:bg-orange-50/30 overflow-hidden min-h-[320px] shadow-inner">
                          {preview ? (
                            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-sm">
                              <img src={preview} alt="Preview" className="w-full h-full object-cover min-h-[290px]" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                                <p className="text-white font-bold text-xs uppercase tracking-widest">Ganti Foto</p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center text-center p-8">
                              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-[#FB6B00] mb-4 shadow-sm">
                                <Plus className="w-8 h-8" />
                              </div>
                              <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Pilih Foto Galeri</p>
                              <p className="text-[10px] text-gray-400 mt-2 font-medium">Seret foto ke sini atau klik</p>
                            </div>
                          )}
                        </div>
                      </div>
                  ) : (
                    <div className="space-y-5">
                       <div className="space-y-2">
                         <p className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Link YouTube</p>
                         <input
                          name="video_url"
                          value={form.video_url}
                          onChange={handleChange}
                          placeholder="Contoh: https://www.youtube.com/watch?v=..."
                          className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-red-100 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                        />
                      </div>
                      
                      {/* Video Preview */}
                      <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden bg-gray-50 border-2 border-dashed border-gray-100 flex items-center justify-center relative">
                        {videoId ? (
                          <iframe
                            className="w-full h-full absolute inset-0"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <div className="text-center p-8 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-4">
                              <X className="w-8 h-8 -rotate-45" />
                            </div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Masukkan link YouTube yang valid</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="space-y-6">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                    <Type className="w-3 h-3" /> Informasi Dokumentasi
                  </label>
                  
                  <div className="space-y-5">
                    <div className="space-y-2">
                       <input
                        type="text"
                        name="judul"
                        value={form.judul}
                        onChange={handleChange}
                        required
                        placeholder="Judul Dokumentasi..."
                        className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300 text-lg"
                      />
                    </div>

                    <div className="space-y-2">
                       <p className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Tanggal Kegiatan</p>
                      <input
                        type="date"
                        name="tanggal"
                        value={form.tanggal}
                        onChange={handleChange}
                        required
                        className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-bold text-gray-900 appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="space-y-2">
                       <p className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Deskripsi Singkat</p>
                      <textarea
                        name="deskripsi"
                        value={form.deskripsi}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Ceritakan sedikit tentang momen ini..."
                        className="w-full border-none bg-gray-50/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FB6B00]/20 outline-none transition-all font-medium text-gray-600 shadow-sm resize-none text-sm leading-relaxed"
                      />
                    </div>
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
                  {galeriId ? "Perbarui" : "Simpan"} Dokumentasi
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
