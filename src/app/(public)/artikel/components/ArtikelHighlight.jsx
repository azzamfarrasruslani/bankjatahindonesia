import { motion } from "framer-motion";
import Image from "next/image";

export default function ArtikelHighlight({
  image,
  title,
  date,
  views,
  category,
  excerpt,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex flex-col lg:flex-row gap-8 bg-white rounded-xl shadow-md overflow-hidden p-6 min-h-[420px]"
    >
      {/* Gambar dengan badge dan overlay */}
      <div className="relative w-full h-80 lg:w-1/2 lg:h-auto">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-lg hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg" />

        {/* Badge "Highlight" */}
        <div className="absolute top-4 left-4 bg-[#FB6B00] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Highlight Artikel
        </div>
      </div>

      {/* Konten */}
      <div className="flex flex-col justify-between lg:w-1/2">
        <div>
          {/* Kategori */}
          <span className="inline-block bg-orange-100 text-[#FB6B00] text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {category}
          </span>

          <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-[#FB6B00] transition-colors leading-tight">
            {title}
          </h2>

          {/* Meta info */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <span>{date}</span>
            <span>•</span>
            <span>{views} views</span>
          </div>

          <p className="text-gray-700 text-base leading-relaxed line-clamp-4">
            {excerpt}
          </p>
        </div>

        <div className="mt-6">
          <button className="text-[#FB6B00] font-semibold text-sm hover:underline transition duration-300">
            Baca Selengkapnya →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
