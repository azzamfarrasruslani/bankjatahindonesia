import BeritaPage from "./BeritaPage";

export const metadata = {
  title: "Berita | Bank Jatah Indonesia",
  description: "Berita terbaru dan informasi penting dari Bank Jatah Indonesia.",
};

export default function BeritaMainPage() {
  return (
    <main className="min-h-screen bg-white">
      <BeritaPage />
    </main>
  );
}
