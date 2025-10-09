import { Poppins } from "next/font/google";
import "../lib/i18n";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Bank Jatah Indonesia",
  description: "Website resmi Bank Jatah Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
