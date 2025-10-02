"use client";

export default function FaqSidebar({ faqData, scrollToCategory, activeIndex }) {
  return (
    <div className="flex lg:flex-col gap-4 sticky top-32 self-start lg:w-64">
      {/* Judul Sidebar */}
      <div className="px-4 py-2">
        <h3 className="text-lg font-bold text-gray-800">Kategori FAQ</h3>
      </div>

      {/* Daftar Kategori */}
      {faqData.map((section, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={index}
            onClick={() => scrollToCategory(index)}
            className={`
              flex items-center justify-between
              px-4 py-3 w-full text-left
              rounded-lg font-semibold text-sm
              transition-all duration-200
              ${
                isActive
                  ? "bg-orange-200 shadow-md text-orange-700"
                  : "bg-orange-50 hover:bg-orange-100 text-orange-600"
              }
            `}
          >
            <span>{section.category}</span>
            {isActive && (
              <span className="w-2 h-2 bg-orange-600 rounded-full ml-2" />
            )}
          </button>
        );
      })}
    </div>
  );
}
