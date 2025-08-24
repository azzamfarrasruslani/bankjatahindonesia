"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import DropdownLink from "./DropdownLink";

export default function ListMenu() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const menuClass = (path) =>
    `relative text-gray-700 hover:text-yellow-600 transition-all duration-300 ${
      pathname === path ? "text-yellow-600 font-bold" : ""
    }`;

  const menuItems = [
    { label: t("navbar.beranda"), path: "/" },
    { label: t("navbar.tabungan-jelantah"), path: "/tabungan-jelantah" },
    { label: t("navbar.jual-beli-jelantah"), path: "/jual-beli-jelantah" },
    { label: t("navbar.sedekah-jelantah"), path: "/sedekah-jelantah" },
  ];

  // Dropdown menus
  const [selectedInfo] = useState(t("navbar.info-artikel"));
  const infoMenu = [
    { label: t("navbar.artikel"), path: "/artikel" },
    { label: t("navbar.berita"), path: "/berita" },
    { label: t("navbar.faq"), path: "/faq" },
  ];

  const [selectedLainnya] = useState(t("navbar.lainnya"));
  const lainnyaMenu = [
    { label: t("navbar.kontak"), path: "/kontak" },
    { label: t("navbar.lokasi"), path: "/lokasi" },
    { label: t("navbar.kebijakan"), path: "/kebijakan" },
  ];

  return (
    <ul className="hidden md:flex space-x-10 text-lg font-semibold capitalize">
      {menuItems.map((item) => (
        <li key={item.label}>
          <Link href={item.path} className={menuClass(item.path)}>
            {item.label}
            <span
              className={`absolute left-0 -bottom-1 h-0.5 w-full bg-yellow-600 transition-transform duration-300 ${
                pathname === item.path ? "scale-x-100" : "scale-x-0"
              }`}
            ></span>
          </Link>
        </li>
      ))}

      <li>
        <DropdownLink items={infoMenu} selected={selectedInfo} />
      </li>
      <li>
        <DropdownLink items={lainnyaMenu} selected={selectedLainnya} />
      </li>
    </ul>
  );
}
