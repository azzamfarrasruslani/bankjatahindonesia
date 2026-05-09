import FaqPage from "./FaqPage";

export const metadata = {
  title: "FAQ | Bank Jatah Indonesia",
  description: "Pertanyaan yang sering diajukan seputar program dan layanan Bank Jatah Indonesia.",
};

export default function FaqMainPage() {
  return (
    <main className="min-h-screen bg-white">
      <FaqPage />
    </main>
  );
}
