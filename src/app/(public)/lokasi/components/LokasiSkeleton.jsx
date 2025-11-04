export default function LokasiSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
      {/* SKELETON LIST */}
      <div className="space-y-6 h-[550px] overflow-y-auto pr-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md border border-orange-100 p-5 flex flex-col sm:flex-row gap-5"
          >
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-orange-100 rounded w-3/4"></div>
              <div className="h-3 bg-orange-100 rounded w-full"></div>
              <div className="h-3 bg-orange-100 rounded w-2/3"></div>
              <div className="h-8 bg-orange-200 rounded w-1/3 mt-4"></div>
            </div>
            <div className="w-40 h-40 bg-orange-100 rounded-xl"></div>
          </div>
        ))}
      </div>

      {/* SKELETON MAP */}
      <div className="w-full h-[550px] bg-orange-100 rounded-3xl shadow-inner"></div>
    </div>
  );
}
