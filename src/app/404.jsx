"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, AlertCircle } from "lucide-react";

export default function NotFoundPage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Delay animasi masuk
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
      <div className="min-h-screen flex items-center justify-center bg-white to-primary/5 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center relative z-10 max-w-2xl mx-auto mt-10"
      >
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative inline-flex">
            <div className="w-32 h-32 bg-primary rounded-3xl flex items-center justify-center shadow-2xl">
              <AlertCircle className="w-16 h-16 text-white" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="absolute -top-2 -right-2 w-12 h-12 bg-white border-4 border-white rounded-2xl shadow-lg flex items-center justify-center"
            >
              <span className="text-2xl font-bold text-primary">?</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Error Code */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
              className="text-8xl sm:text-9xl font-black bg-primary bg-clip-text text-transparent drop-shadow-sm"
            >
              404
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-3"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Halaman Tidak Ditemukan
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                Maaf, halaman yang Anda cari tidak dapat ditemukan. 
                Mungkin halaman ini telah dipindahkan atau tidak tersedia.
              </p>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <Link href="/" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25 group"
              >
                <Home className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span>Kembali ke Beranda</span>
              </motion.div>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 bg-transparent text-gray-700 hover:text-primary font-semibold px-8 py-4 rounded-2xl border-2 border-gray-200 hover:border-primary/30 transition-all duration-300 group"
              >
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                <span>Kembali Sebelumnya</span>
              </motion.div>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-8 text-sm text-gray-500"
      >
        Error 404 • Page Not Found
      </motion.div>
    </div>
  );
}
