"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl text-gray-600 shadow-md border border-orange-100"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Pertanyaan</label>
        <input
          type="text"
          name="pertanyaan"
          value={form.pertanyaan}
          onChange={handleChange}
          required
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-[#FB6B00] focus:border-[#FB6B00]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Jawaban</label>
        <textarea
          name="jawaban"
          rows="4"
          value={form.jawaban}
          onChange={handleChange}
          required
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-[#FB6B00] focus:border-[#FB6B00]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Kategori</label>
        {!isNewKategori ? (
          <select
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-[#FB6B00] focus:border-[#FB6B00]"
          >
            <option value="">Pilih kategori</option>
            {kategoriOptions.map((kategori) => (
              <option key={kategori} value={kategori}>
                {kategori}
              </option>
            ))}
            <option value="new">Tambah kategori baru...</option>
          </select>
        ) : (
          <input
            type="text"
            value={newKategori}
            onChange={handleNewKategoriChange}
            placeholder="Masukkan kategori baru"
            required
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-[#FB6B00] focus:border-[#FB6B00]"
          />
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2 bg-gray-200 text-gray-600 rounded-lg"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-[#FB6B00] text-white rounded-lg"
        >
          {loading ? "Menyimpan..." : initialData.id ? "Perbarui" : "Simpan"}
        </button>
      </div>
    </form>
  );
}
