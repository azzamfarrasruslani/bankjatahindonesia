import { Poppins } from "next/font/google";
import "../../lib/i18n";
import "../globals.css";

import DashboardLayout from "@/layouts/DashboardLayout";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Dashboard | Bank Jatah Indonesia",
  description: "Halaman dashboard internal",
};

export default function DashboardRootLayout({ children }) {
  return (
    <div className={`${poppins.variable} antialiased`}>
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
}
