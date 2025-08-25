"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import DropdownLink from "./DropdownLink";

export default function ListMenu() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const baseMenuClass =
    "relative px-2 py-1 text-sm font-medium text-gray-700 hover:text-[#FB6B00] transition duration-300";

const menuClass = (path) =>
  `${baseMenuClass} ${
    pathname === path ? "text-[#FB6B00] font-semibold" : ""
  }`;


  const beranda = { label: t("navbar.beranda"), path: "/" };
  const tentangKami = { label: t("navbar.tentang-kami"), path: "/tentang" };

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
    <ul className="flex space-x-6 text-sm font-medium">
      {/* Beranda */}
      <li>
        <Link href={beranda.path} className={menuClass(beranda.path)}>
          {beranda.label}
          <span
            className={`absolute left-0 -bottom-1 h-0.5 w-full bg-[#FB6B00] transform transition-transform duration-300 ${
              pathname === beranda.path ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </Link>
      </li>

      {/* Tentang Kami */}
      <li>
        <Link href={tentangKami.path} className={`${menuClass(tentangKami.path)} text-[15px]`}>
          {tentangKami.label}
          <span
            className={`absolute left-0 -bottom-1 h-0.5 w-full bg-[#FB6B00] transform transition-transform duration-300 ${
              pathname === tentangKami.path ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </Link>
      </li>

      {/* Dropdowns */}
      <li>
        <DropdownLink
          items={programJelantahMenu}
          selected={selectedProgramJelantah}
          className="text-sm font-normal text-gray-600 hover:text-[#FB6B00]"
        />
      </li>
      <li>
        <DropdownLink
          items={infoMenu}
          selected={selectedInfo}
          className="text-sm font-normal text-gray-600 hover:text-[#FB6B00]"
        />
      </li>
      <li>
        <DropdownLink
          items={lainnyaMenu}
          selected={selectedLainnya}
          className="text-sm font-normal text-gray-600 hover:text-[#FB6B00]"
        />
      </li>
    </ul>
  );
}
