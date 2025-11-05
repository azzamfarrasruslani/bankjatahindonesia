import { Poppins } from "next/font/google";
import "../lib/i18n";
import "./globals.css";
import Script from "next/script"; // <- import Script

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
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-9YFCH1ZNGE"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9YFCH1ZNGE', { page_path: window.location.pathname });
            `,
          }}
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
