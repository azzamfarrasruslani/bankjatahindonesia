import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <Image
            src="/images/Logo.png"
            alt="Logo Bank Jatah"
            width={160}
            height={50}
            className="mb-4"
          />
          <p className="text-sm leading-relaxed">
            Bank Jatah Indonesia adalah solusi pengelolaan minyak jelantah melalui program tabungan, sedekah, dan jual beli jelantah secara ramah lingkungan.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Beranda</Link></li>
            <li><Link href="/tabungan-jelantah" className="hover:underline">Tabungan Jelantah</Link></li>
            <li><Link href="/jual-beli-jelantah" className="hover:underline">Jual Beli Jelantah</Link></li>
            <li><Link href="/sedekah-jelantah" className="hover:underline">Sedekah Jelantah</Link></li>
          </ul>
        </div>

        {/* Info & Artikel */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Informasi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/artikel" className="hover:underline">Artikel</Link></li>
            <li><Link href="/berita" className="hover:underline">Berita</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/kontak" className="hover:underline">Kontak Kami</Link></li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Kontak</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} />
              <span>Jl. Flamboyan No.7, Rumbai, Pekanbaru, Riau</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a href="mailto:info@bankjatahindonesia.com" className="hover:underline">
                info@bankjatahindonesia.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <a href="https://wa.me/6281234567890" className="hover:underline">
                0812-3456-7890
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/30 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm max-w-7xl mx-auto">
        <p>&copy; {new Date().getFullYear()} Bank Jatah Indonesia. All rights reserved.</p>

        <div className="flex gap-4">
          <a href="#" aria-label="Facebook" className="hover:text-gray-200">
            <Facebook size={18} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-gray-200">
            <Instagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
