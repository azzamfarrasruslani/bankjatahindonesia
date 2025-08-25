// Server component (boleh export metadata)
import TentangPageClient from "./TentangPageClient";

export const metadata = {
  title: "Tentang Kami | Bank Jatah Indonesia",
  description: "Informasi tentang Bank Jatah Indonesia dan tujuan program ini.",
};

export default function TentangPage() {
  return (
    <main className="min-h-screen pt-20">
      <TentangPageClient />
    </main>
  );
}
