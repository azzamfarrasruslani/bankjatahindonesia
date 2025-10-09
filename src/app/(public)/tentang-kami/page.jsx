// Server component (boleh export metadata)
import TentangPage from "./TentangKamiPage";

export const metadata = {
  title: "Tentang Kami | Bank Jatah Indonesia",
  description: "Informasi tentang Bank Jatah Indonesia dan tujuan program ini.",
};

export default function TentangKamiPage() {
  return (
    <main className="min-h-screen">
      <TentangPage />
    </main>
  );
}
