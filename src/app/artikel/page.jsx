// Server component (boleh export metadata)
import ArtikelPage from "./Artikel";

export const metadata = {
  title: "Artikel | Bank Jatah Indonesia",
  description: "Kumpulan artikel dan informasi seputar minyak jelantah.",
};

export default function ArtikelMainPage() {
  return (
    <main className="min-h-screen">
      <ArtikelPage />
    </main>
  );
}
