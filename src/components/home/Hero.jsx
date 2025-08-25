export default function Hero() {
  return (
    <main className="relative h-screen flex-grow text-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/hero.jpeg')", // Ganti sesuai path kamu
        }}
      >
        {/* Backdrop hitam transparan */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Konten */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-10 text-white">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#FB6B00] mb-6 leading-tight drop-shadow-md">
            Ubah Minyak Jelantah Jadi Tabungan Masa Depan
          </h1>

          <p className="text-lg sm:text-xl mb-6 drop-shadow">
            Bersama <strong>Bank Jatah Indonesia</strong>, lindungi lingkungan sambil dapat manfaat ekonomi langsung. Kami hadir di seluruh Indonesia, siap menjemput minyak jelantah Anda!
          </p>

          {/* Bullet Point Manfaat */}
          <ul className="text-left text-white text-base sm:text-lg mb-8 space-y-2 mx-auto max-w-md">
            <li className="flex items-start">
              <span className="mr-2 text-[#FB6B00] text-xl">✔</span>
              Dapat saldo e-wallet dan reward point
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-[#FB6B00] text-xl">✔</span>
              Dukung pelestarian lingkungan sekitar
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-[#FB6B00] text-xl">✔</span>
              Terbuka untuk individu, komunitas & lembaga
            </li>
          </ul>

          {/* Tombol CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#about"
              className="bg-[#FB6B00] hover:bg-[#e96000] text-white font-semibold py-3 px-6 rounded-full transition duration-200 shadow-md"
            >
              Jadi Mitra Kami!
            </a>
            <a
              href="#program"
              className="border border-white hover:border-[#FB6B00] hover:text-[#FB6B00] text-white font-semibold py-3 px-6 rounded-full transition duration-200"
            >
              Lihat Program Kami
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
