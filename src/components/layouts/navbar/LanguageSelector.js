"use client";

import { useTranslation } from "react-i18next";

export default function LanguageSelector({ languages }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const handleChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <select
      className="rounded-lg bg-gray-200 px-3 py-1 text-sm font-bold text-gray-800"
      value={currentLang}
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
