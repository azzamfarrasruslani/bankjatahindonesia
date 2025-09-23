export default function ParallaxSection() {
  return (
    <section
      className="relative h-[60vh] w-full bg-fixed bg-center bg-cover bg-no-repeat flex items-center justify-center text-center"
      style={{
        backgroundImage: "url('/images/parallax.jpeg')",
      }}
    >
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Konten Teks */}
      <div className="relative z-10 px-4">
        <h2 className="text-white text-lg md:text-xl font-medium mb-2">
          Mengelola Limbah, Membangun Harapan.
        </h2>
        <h1 className="text-[#FB6B00] text-3xl md:text-5xl font-bold leading-tight">
          Ubah Jelantah Jadi <br /> Manfaat
        </h1>
      </div>
    </section>
  );
}
