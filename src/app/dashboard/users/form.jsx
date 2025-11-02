"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserForm({ userId, initialData = {}, onSuccess }) {
  const router = useRouter();
  const [form, setForm] = useState({
    nama_lengkap: initialData.nama_lengkap || "",
    email: initialData.email || "",
    no_telepon: initialData.no_telepon || "",
    alamat: initialData.alamat || "",
    status_aktif: initialData.status_aktif ?? true,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSuccess?.(form);
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data pengguna: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-6 rounded-lg shadow-md border border-orange-100"
    >
      {/* Nama Lengkap */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Nama Lengkap
        </label>
        <input
          type="text"
          name="nama_lengkap"
          value={form.nama_lengkap}
          onChange={handleChange}
          required
          placeholder="Masukkan nama lengkap"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00] text-gray-700 placeholder-gray-600"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Masukkan email pengguna"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00] text-gray-700 placeholder-gray-600"
        />
      </div>

      {/* No Telepon */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          No Telepon
        </label>
        <input
          type="text"
          name="no_telepon"
          value={form.no_telepon}
          onChange={handleChange}
          placeholder="Masukkan nomor telepon"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00] text-gray-700 placeholder-gray-600"
        />
      </div>

      {/* Alamat */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Alamat</label>
        <textarea
          name="alamat"
          value={form.alamat}
          onChange={handleChange}
          placeholder="Masukkan alamat pengguna"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#FB6B00] text-gray-700 placeholder-gray-600"
        />
      </div>

      {/* Status */}
      <div className="flex items-center gap-3 text-gray-600">
        <input
          type="checkbox"
          name="status_aktif"
          checked={form.status_aktif}
          onChange={handleChange}
        />
        <label>Aktifkan pengguna ini</label>
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/dashboard/users")}
          className="px-5 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-all"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-[#FB6B00] text-white rounded-lg hover:bg-orange-700 transition-all"
        >
          {loading ? "Menyimpan..." : userId ? "Perbarui" : "Simpan"}
        </button>
      </div>
    </form>
  );
}
