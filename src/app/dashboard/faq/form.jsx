"use client";

import { useState } from "react";

export default function FAQForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    pertanyaan: initialData.pertanyaan || "",
    jawaban: initialData.jawaban || "",
    kategori: initialData.kategori || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md border border-orange-100">
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
        <input
          type="text"
          name="kategori"
          value={form.kategori}
          onChange={handleChange}
          placeholder="Contoh: Pendaftaran / Transaksi"
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-[#FB6B00] focus:border-[#FB6B00]"
        />
      </div>

      <button
        type="submit"
        className="bg-[#FB6B00] text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all"
      >
        Simpan
      </button>
    </form>
  );
}
