import { motion } from "framer-motion";
import Image from "next/image";

export default function ArtikelCard({
  image,
  title,
  date,
  views,
  category,
  excerpt,
  index,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden transition"
    >
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
            <span>{date}</span>
            <span>•</span>
            <span>{views} views</span>
            <span>•</span>
            <span className="bg-[#FB6B00] text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
              {category}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-[#FB6B00] transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">
            {excerpt}
          </p>
        </div>
        <div className="mt-4">
          <button className="text-[#FB6B00] font-semibold text-sm hover:underline">
            Baca Selengkapnya →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
