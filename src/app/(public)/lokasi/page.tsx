import LokasiPage from "./LokasiPage";

export const metadata = {
  title: "Lokasi Mitra | Bank Jatah Indonesia",
  description: "Temukan lokasi mitra atau agen penampungan minyak jelantah terdekat.",
};

export default function LokasiMainPage() {
  return (
    <main className="min-h-screen bg-white">
      <LokasiPage />
    </main>
  );
}
