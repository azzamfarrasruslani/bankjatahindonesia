"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DropdownLink from "./DropdownLink";

export default function ListMenu() {
  const { t, ready } = useTranslation();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!ready || !mounted) return null;

  const menuClass = (path) =>
    `relative px-3 py-2 text-sm font-medium transition-all hover:text-[#FB6B00] ${
      pathname === path ? "text-[#FB6B00] font-semibold" : "text-gray-700"
    }`;

  return (
    <ul className="flex items-center gap-4 list-none text-sm">
      <li>
        <Link href="/" className={menuClass("/")}>
          {t("navbar.beranda")}
        </Link>
      </li>
      <li>
        <Link href="/tentang-kami" className={menuClass("/tentang-kami")}>
          {t("navbar.tentang-kami")}
        </Link>
      </li>
      <li>
        <Link href="/program-kami" className={menuClass("/program-kami")}>
          {t("navbar.program-kami")}
        </Link>
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
      {/* <li>
        <DropdownLink
          items={[
            { label: t("navbar.kontak"), path: "/kontak" },
            { label: t("navbar.lokasi"), path: "/lokasi" },
            { label: t("navbar.kebijakan"), path: "/kebijakan" },
          ]}
          selected={t("navbar.lainnya")}
        />
      </li> */}
    </ul>
  );
}
