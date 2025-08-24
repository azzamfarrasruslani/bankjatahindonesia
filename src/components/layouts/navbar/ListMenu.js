"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import DropdownLink from "./DropdownLink";

export default function ListMenu() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const menuClass = (path) =>
    `relative transition duration-300 px-2 py-1 text-gray-700 hover:text-[#FB6B00] ${
      pathname === path ? "text-[#FB6B00] font-bold" : ""
    }`;

  const beranda = { label: t("navbar.beranda"), path: "/" };

  // Dropdown: Program Jelantah
  const [selectedProgramJelantah] = useState(t("navbar.program-jelantah"));
  const programJelantahMenu = [
    { label: t("navbar.tabungan-jelantah"), path: "/tabungan-jelantah" },
    { label: t("navbar.jual-beli-jelantah"), path: "/jual-beli-jelantah" },
    { label: t("navbar.sedekah-jelantah"), path: "/sedekah-jelantah" },
  ];

  // Dropdown: Info & Artikel
  const [selectedInfo] = useState(t("navbar.info-artikel"));
  const infoMenu = [
    { label: t("navbar.artikel"), path: "/artikel" },
    { label: t("navbar.berita"), path: "/berita" },
    { label: t("navbar.faq"), path: "/faq" },
  ];

  // Dropdown: Lainnya
  const [selectedLainnya] = useState(t("navbar.lainnya"));
  const lainnyaMenu = [
    { label: t("navbar.kontak"), path: "/kontak" },
    { label: t("navbar.lokasi"), path: "/lokasi" },
    { label: t("navbar.kebijakan"), path: "/kebijakan" },
  ];

  return (
    <ul className="flex space-x-8 text-base font-medium">
      <li>
        <Link href={beranda.path} className={menuClass(beranda.path)}>
          {beranda.label}
          <span
            className={`absolute left-0 -bottom-1 h-0.5 w-full bg-[#FB6B00] transform transition-transform duration-300 ${
              pathname === beranda.path ? "scale-x-100" : "scale-x-0"
            }`}
          ></span>
        </Link>
      </li>

      <li>
        <DropdownLink items={programJelantahMenu} selected={selectedProgramJelantah} />
      </li>

      <li>
        <DropdownLink items={infoMenu} selected={selectedInfo} />
      </li>

      <li>
        <DropdownLink items={lainnyaMenu} selected={selectedLainnya} />
      </li>
    </ul>
  );
}
