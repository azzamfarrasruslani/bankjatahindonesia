"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    setAlert({ message: "", type: "" });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAlert({ message: "Login gagal: " + error.message, type: "error" });
    } else {
      setAlert({ message: "Login berhasil, mengalihkan ke dashboard...", type: "success" });
      setTimeout(() => router.push("/dashboard"), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Kiri */}
        <div className="relative bg-[#FB6B00]/10 p-8 flex items-center justify-center">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-[#FB6B00]">Tukar Minyak, Selamatkan Bumi!</h2>
            <p className="text-sm text-gray-600 max-w-xs mx-auto">
              Login untuk menyetor minyak dan mendukung lingkungan yang lebih baik.
            </p>
          </div>
        </div>

        {/* Kanan */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="space-y-2 mb-6">
            <h1 className="text-3xl font-bold text-[#FB6B00]">Masuk ke Akun Anda</h1>
            <p className="text-sm text-gray-600">
              Silakan login untuk melanjutkan transaksi minyak jelantah Anda.
            </p>
          </div>

          {/* Alert */}
          {alert.message && (
            <div
              className={`mb-4 px-4 py-3 rounded text-sm ${
                alert.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {alert.message}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="flex items-center gap-2 mt-1 px-3 py-2 border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-[#FB6B00]">
                <Mail size={18} className="text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm text-gray-800 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="flex items-center gap-2 mt-1 px-3 py-2 border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-[#FB6B00]">
                <Lock size={18} className="text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-sm text-gray-800 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FB6B00] hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-all"
            >
              Masuk
            </button>
          </form>

         
        </div>
      </div>
    </div>
  );
}
