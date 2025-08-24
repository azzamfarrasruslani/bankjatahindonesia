import Image from "next/image";
import Navbar from "./layout/navbar";
import Footer from "@/app/layout/footer";
import CaraKerja from "@/components/CaraKerja";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* Header */}
      <Navbar />

      {/* Hero */}
      <main className="relative flex-grow text-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/hero.jpeg')", // ganti dengan path gambar kamu
          }}
        >
          {/* Backdrop hitam */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Konten */}
        <div className="relative z-10 flex items-center justify-center min-h-[500px] px-6 py-20">
          <div className="max-w-3xl mx-auto  p-8 rounded-xl shadow-lg">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#FB6B00] mb-4 leading-tight">
              Ubah Minyak Jelantah Jadi Tabungan Masa Depan
            </h2>
            <p className="text-lg text-white">
              Bank Jatah Indonesia mengajak Anda menyelamatkan lingkungan dengan
              cara sederhana namun berdampak besar.
            </p>
            <div className="mt-6">
              <a
                href="#about"
                className="bg-[#FB6B00] hover:bg-[#e96000] text-white font-semibold py-3 px-6 rounded-full transition duration-200"
              >
                Jelajahi Sekarang
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* About */}
      <section id="about" className="py-20 px-6 bg-white">
        {/* <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-[#FB6B00] mb-4">Kenapa Harus Peduli Jelantah?</h3>
          <p className="text-gray-700 leading-relaxed">
            Minyak jelantah bekas pakai jika dibuang sembarangan bisa mencemari tanah dan air. Kami hadir memberikan solusi: menabung jelantah untuk masa depan yang sehat dan berkelanjutan.
          </p>
        </div> */}

        <CaraKerja />
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6 bg-[#1a1a1a] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-[#FB6B00] mb-12">
            Layanan Unggulan Kami
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Tabungan Jelantah",
                desc: "Kumpulkan minyak jelantah, tukar dengan poin dan hadiah menarik.",
              },
              {
                title: "Penjemputan Mandiri",
                desc: "Kami datang langsung menjemput jelantah di lokasi Anda.",
              },
              {
                title: "Sosialisasi Lingkungan",
                desc: "Edukasi ke sekolah dan komunitas untuk peduli lingkungan.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white text-black p-6 rounded-xl shadow-md hover:scale-105 transform transition duration-300"
              >
                <h4 className="text-lg font-bold text-[#FB6B00] mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
