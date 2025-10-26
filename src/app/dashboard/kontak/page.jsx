"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

export default function ManajemenKontakPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [kontak, setKontak] = useState(null);
  const [tempData, setTempData] = useState({});

  // Fetch kontak dari Supabase
  const fetchKontak = async () => {
    const { data, error } = await supabase
      .from("kontak")
      .select("*")
      .order("id", { ascending: true })
      .limit(1)
      .single(); // Ambil kontak pertama saja
    if (error) console.error(error);
    else {
      setKontak(data);
      setTempData(data);
    }
  };

  useEffect(() => {
    fetchKontak();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!kontak) {
      // Insert baru jika belum ada
      const { data, error } = await supabase
        .from("kontak")
        .insert([tempData])
        .select();
      if (error) alert("Error: " + error.message);
      else setKontak(data[0]);
    } else {
      // Update kontak
      const { data, error } = await supabase
        .from("kontak")
        .update(tempData)
        .eq("id", kontak.id)
        .select(); // <- wajib agar data tersedia
      if (error) alert("Error: " + error.message);
      else setKontak(data[0]);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(kontak);
    setIsEditing(false);
  };

  if (!kontak) return <p>Loading...</p>;

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white px-6 py-10 md:p-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-10 border-b border-orange-200 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">
            Manajemen Kontak
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola seluruh informasi kontak resmi Bank Jatah Indonesia.
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white shadow-sm transition-all ${
            isEditing
              ? "bg-red-500 hover:bg-red-600"
              : "bg-[#FB6B00] hover:bg-orange-700"
          }`}
        >
          {isEditing ? <FaTimes /> : <FaEdit />}{" "}
          {isEditing ? "Batal" : "Edit Kontak"}
        </button>
      </div>

      {/* Kontak */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md border border-orange-100">
        <div className="grid sm:grid-cols-2 gap-6">
          {/** WhatsApp **/}
          <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl bg-orange-50/30 hover:shadow-sm transition">
            <FaWhatsapp className="text-green-500 text-2xl" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">WhatsApp</p>
              {isEditing ? (
                <input
                  type="text"
                  name="whatsapp"
                  value={tempData.whatsapp || ""}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB6B00] focus:outline-none"
                />
              ) : (
                <p className="font-medium text-gray-700">{kontak.whatsapp}</p>
              )}
            </div>
          </div>

          {/** Email **/}
          <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl bg-orange-50/30 hover:shadow-sm transition">
            <FaEnvelope className="text-[#FB6B00] text-2xl" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Email</p>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={tempData.email || ""}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB6B00] focus:outline-none"
                />
              ) : (
                <p className="font-medium text-gray-700">{kontak.email}</p>
              )}
            </div>
          </div>

          {/** Telepon **/}
          <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl bg-orange-50/30 hover:shadow-sm transition">
            <FaPhoneAlt className="text-blue-500 text-2xl" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Nomor Telepon</p>
              {isEditing ? (
                <input
                  type="text"
                  name="telepon"
                  value={tempData.telepon || ""}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB6B00] focus:outline-none"
                />
              ) : (
                <p className="font-medium text-gray-700">{kontak.telepon}</p>
              )}
            </div>
          </div>

          {/** Facebook **/}
          <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl bg-orange-50/30 hover:shadow-sm transition">
            <FaFacebook className="text-blue-600 text-2xl" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Facebook</p>
              {isEditing ? (
                <input
                  type="url"
                  name="facebook"
                  value={tempData.facebook || ""}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB6B00] focus:outline-none"
                />
              ) : (
                <a
                  href={kontak.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#FB6B00] hover:underline"
                >
                  {kontak.facebook}
                </a>
              )}
            </div>
          </div>

          {/** Instagram **/}
          <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl bg-orange-50/30 hover:shadow-sm transition">
            <FaInstagram className="text-pink-500 text-2xl" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Instagram</p>
              {isEditing ? (
                <input
                  type="url"
                  name="instagram"
                  value={tempData.instagram || ""}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB6B00] focus:outline-none"
                />
              ) : (
                <a
                  href={kontak.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#FB6B00] hover:underline"
                >
                  {kontak.instagram}
                </a>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end mt-8 gap-3">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-5 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
            >
              <FaTimes /> Batal
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 bg-[#FB6B00] text-white rounded-xl hover:bg-orange-700 transition"
            >
              <FaSave /> Simpan Perubahan
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-400 text-center mt-10">
        © {new Date().getFullYear()} Manajemen Kontak | Bank Jatah Indonesia
      </div>
    </section>
  );
}
