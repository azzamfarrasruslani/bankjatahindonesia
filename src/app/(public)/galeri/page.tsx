import GaleriPage from "./GaleriPage";

export const metadata = {
  title: "Galeri | Bank Jatah Indonesia",
  description: "Lihat koleksi foto kegiatan dan program Bank Jatah Indonesia dalam mengelola minyak jelantah, edukasi lingkungan, dan pemberdayaan masyarakat.",
};


export default function GaleriMainPage() {
  return (
    <main className="min-h-screen bg-white">
      <GaleriPage />
    </main>
  );
}
