// components/common/HeroSection.jsx
export default function HeroSection({ title, description, imageUrl }) {
  return (
    <div
      className="relative top-4 z-10 mx-auto mb-16 h-[400px] md:h-[450px] w-[95%] md:w-[90%] lg:w-[95%] overflow-hidden rounded-t-4xl rounded-b-4xl shadow-2xl bg-center bg-cover bg-fixed"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-black/40 rounded-t-4xl rounded-b-4xl"></div>

      {/* Floating Pulse Orbs */}
      <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-orange-500/40 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-8 right-16 w-24 h-24 rounded-full bg-yellow-400/30 blur-3xl animate-pulse"></div>

      {/* Konten Teks */}
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-xl bg-clip-text text-transparent bg-gradient-to-r from-[#e46505] to-white">
          {title}
        </h1>

        <p className="mt-4 text-white text-lg md:text-xl max-w-2xl drop-shadow-md">
          {description}
        </p>
      </div>
    </div>
  );
}
