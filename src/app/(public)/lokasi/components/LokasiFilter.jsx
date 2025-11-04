import { Search } from "lucide-react";

export default function LokasiFilter({ filterJenis, setFilterJenis, searchTerm, setSearchTerm }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">Filter Jenis:</label>
        <select
          value={filterJenis}
          onChange={(e) => setFilterJenis(e.target.value)}
          className="border border-orange-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="semua">Semua</option>
          <option value="utama">Lokasi Utama</option>
          <option value="mitra">Mitra</option>
        </select>
      </div>

      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari lokasi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-orange-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
    </div>
  );
}
