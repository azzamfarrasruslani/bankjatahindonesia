import { useEffect, useState } from "react";

export default function LanguageSelector({ changeLanguage, currentLang, languages }) {
  const [selectedLang, setSelectedLang] = useState(currentLang || "en");

  // Hanya sekali saat pertama mount
  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      setSelectedLang(savedLang);
      changeLanguage(savedLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const newLang = e.target.value;
    setSelectedLang(newLang);
    localStorage.setItem("language", newLang);
    changeLanguage(newLang);
    window.location.reload(); // Refresh untuk update teks yang sudah terload
  };

  return (
    <select
      className="rounded-lg bg-gray-200 px-3 py-1 text-sm font-bold text-gray-800"
      value={selectedLang}
      onChange={handleChange}
    >
      {languages.map((lng) => (
        <option key={lng} value={lng} className="bg-white text-black">
          {lng.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
