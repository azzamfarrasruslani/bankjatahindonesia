"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DropdownLink from "./DropdownLink";
import { useEffect, useState } from "react";

export default function ListMenu() {
  const { t, ready } = useTranslation();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!ready || !mounted) return null; // pastikan hanya render di client

  const menuClass = (path) =>
    `relative inline-flex items-center px-2 py-1 text-sm font-medium leading-none transition duration-300 hover:text-[#FB6B00] ${
      pathname === path ? "text-[#FB6B00] font-semibold" : "text-gray-700"
    }`;

  return (
    <ul className="flex items-center space-x-6 text-sm font-medium list-none whitespace-nowrap">
      <li>
        <Link href="/" className={menuClass("/")}>
          {t("navbar.beranda")}
          <span
            className={`absolute left-0 -bottom-1 h-0.5 w-full bg-[#FB6B00] transform transition-transform duration-300 ${
              pathname === "/" ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </Link>
      </li>
      <li>
        <Link href="/tentang" className={menuClass("/tentang")}>
          {t("navbar.tentang-kami")}
          <span
            className={`absolute left-0 -bottom-1 h-0.5 w-full bg-[#FB6B00] transform transition-transform duration-300 ${
              pathname === "/tentang" ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </Link>
      </li>
      <li>
        <DropdownLink
          items={[
            { label: t("navbar.tabungan-jelantah"), path: "/tabungan-jelantah" },
            { label: t("navbar.jual-beli-jelantah"), path: "/jual-beli-jelantah" },
            { label: t("navbar.sedekah-jelantah"), path: "/sedekah-jelantah" },
          ]}
          selected={t("navbar.program-jelantah")}
        />
      </li>
      <li>
        <DropdownLink
          items={[
            { label: t("navbar.artikel"), path: "/artikel" },
            { label: t("navbar.berita"), path: "/berita" },
            { label: t("navbar.faq"), path: "/faq" },
          ]}
          selected={t("navbar.info-artikel")}
        />
      </li>
      <li>
        <DropdownLink
          items={[
            { label: t("navbar.kontak"), path: "/kontak" },
            { label: t("navbar.lokasi"), path: "/lokasi" },
            { label: t("navbar.kebijakan"), path: "/kebijakan" },
          ]}
          selected={t("navbar.lainnya")}
        />
      </li>
    </ul>
  );
}
