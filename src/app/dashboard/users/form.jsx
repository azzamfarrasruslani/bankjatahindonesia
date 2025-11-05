"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserForm({ onSubmit, disabled, initialData }) {
  const router = useRouter();

  const [form, setForm] = useState({
    nama_lengkap: "",
    email: "",
    password: "",
    no_telepon: "",
    alamat: "",
    status_aktif: true,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nama_lengkap: initialData.nama_lengkap || "",
        email: initialData.email || "",
        password: "",
        no_telepon: initialData.no_telepon || "",
        alamat: initialData.alamat || "",
        status_aktif: initialData.status_aktif ?? true,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!disabled) onSubmit(form);
  };

  const handleCancel = () => {
    router.push("/dashboard/users");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white shadow-md p-6 rounded-lg text-gray-700"
    >
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
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-orange-500"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-orange-500"
          disabled={disabled}
        />
      </div>

      {/* Password hanya muncul saat tambah data */}
      {!initialData && (
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-orange-500"
            placeholder="Minimal 8 karakter"
            disabled={disabled}
          />
        </div>
      )}

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          No. Telepon
        </label>
        <input
          type="text"
          name="no_telepon"
          value={form.no_telepon}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-orange-500"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">Alamat</label>
        <textarea
          name="alamat"
          value={form.alamat}
          onChange={handleChange}
          rows="3"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-orange-500"
          disabled={disabled}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="status_aktif"
          checked={form.status_aktif}
          onChange={handleChange}
          className="mr-2"
          disabled={disabled}
        />
        <label className="font-semibold text-gray-700">Status Aktif</label>
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-all"
          disabled={disabled}
        >
          Batal
        </button>

        <button
          type="submit"
          className={`${
            disabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          } text-white px-4 py-2 rounded-lg transition-all`}
          disabled={disabled}
        >
          {disabled
            ? "Menyimpan..."
            : initialData
            ? "Perbarui"
            : "Simpan"}
        </button>
      </div>
    </form>
  );
}
