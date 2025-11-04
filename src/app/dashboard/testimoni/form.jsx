"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaStar } from "react-icons/fa";

export default function TestimoniForm({ initialData = null, onSuccess }) {
  const router = useRouter();
  const [form, setForm] = useState({
    nama: "",
    isi: "",
    rating: 5,
    tanggal: new Date().toISOString().slice(0, 10),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        nama: initialData.nama || "",
        isi: initialData.isi || "",
        rating: initialData.rating || 5,
        tanggal: initialData.tanggal
          ? new Date(initialData.tanggal).toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (value) => {
    setForm((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData?.id) {
        const { error } = await supabase
          .from("testimoni")
          .update({ ...form, updated_at: new Date().toISOString() })
          .eq("id", initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("testimoni")
          .insert([{ ...form, created_at: new Date().toISOString() }]);
        if (error) throw error;
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan testimoni: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md text-gray-700"
    >
      <div className="mb-4">
        <label className="block mb-1 font-medium">Nama</label>
        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Isi Testimoni</label>
        <textarea
          name="isi"
          value={form.isi}
          onChange={handleChange}
          required
          rows={4}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div className="mb-4 flex items-center gap-6">
        {/* Rating Bintang */}
        <div>
          <label className="block mb-1 font-medium">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((r) => (
              <FaStar
                key={r}
                size={24}
                className={`cursor-pointer transition-colors ${
                  r <= form.rating ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => handleRatingClick(r)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Tanggal</label>
          <input
            type="date"
            name="tanggal"
            value={form.tanggal}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/dashboard/testimoni")}
          className="px-5 py-2 bg-gray-200 text-gray-600 rounded-lg"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-[#FB6B00] text-white rounded-lg"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
