"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DropdownLink from "./DropdownLink";

export default function ListMenu() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const menuClass = (path: any) =>
    `relative px-3 py-2 text-[13px] font-medium transition-all hover:text-[#FB6B00] ${
      pathname === path ? "text-[#FB6B00] font-semibold" : "text-gray-700"
    }`;

  return (
    <ul className="flex items-center gap-4 list-none text-[13px]">
      <li>
        <Link href="/" className={menuClass("/")}>
          Beranda
        </Link>
      </li>
      <li>
        <Link href="/tentang-kami" className={menuClass("/tentang-kami")}>
          Tentang Kami
        </Link>
      </li>
      <li>
        <Link href="/program-kami" className={menuClass("/program-kami")}>
          Program Kami
        </Link>
      </li>
      <li>
        <DropdownLink
          items={[
            { label: "Artikel", path: "/artikel" },
            { label: "Berita", path: "/berita" },
            { label: "FAQ", path: "/faq" },
          ]}
          selected="Info & Artikel"
        />
      </li>
      <li>
        <DropdownLink
          items={[
            { label: "Kontak", path: "/kontak" },
            { label: "Lokasi", path: "/lokasi" },
            { label: "Galeri", path: "/galeri" },
          ]}
          selected="Lainnya"
        />
      </li>
    </ul>
  );
}
