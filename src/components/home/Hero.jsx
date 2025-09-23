"use client";

export default function Hero() {
  return (
    <div className="px-4 md:px-4 lg:px-6 pt-6">
      <section className="relative h-screen w-full overflow-hidden rounded-2xl shadow-lg">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center rounded-2xl overflow-hidden"
          style={{
            backgroundImage: "url('/images/hero.jpeg')", // Pastikan path benar
          }}
        >
          <div className="absolute inset-0 bg-black/60 rounded-2xl" />
        </div>

        {/* Konten Utama */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-white text-center">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
              Ubah Minyak Jelantah Jadi <br />
              Tabungan{" "}
              <span className="bg-gradient-to-r from-[#FB6B00] to-white bg-clip-text text-transparent drop-shadow-md">
                Masa Depan
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl mb-8 drop-shadow-sm">
              Bersama <strong>Bank Jatah Indonesia</strong>, lindungi lingkungan
              sambil dapat manfaat ekonomi langsung. Kami hadir di seluruh
              Indonesia, siap menjemput minyak jelantah Anda!
            </p>

            {/* Tombol CTA */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#mitra"
                className="bg-[#FB6B00] hover:bg-[#e35e00] text-white font-semibold py-3 px-6 rounded-full transition duration-200 shadow-md"
              >
                Jadi Mitra Kami!
              </a>
              <a
                href="#program"
                className="bg-white text-gray-900 hover:text-[#FB6B00] hover:border-[#FB6B00] font-semibold py-3 px-6 rounded-full border border-white transition duration-200"
              >
                Lihat Program Kami
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
