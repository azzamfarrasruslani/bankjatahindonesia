import KontakPage from "./KontakPage";

export const metadata = {
  title: "Kontak | Bank Jatah Indonesia",
  description: "Hubungi kami untuk informasi lebih lanjut tentang layanan Bank Jatah Indonesia.",
};

export default function KontakMainPage() {
  return (
    <main className="min-h-screen bg-white">
      <KontakPage />
    </main>
  );
}
