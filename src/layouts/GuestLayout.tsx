// src/layouts/GuestLayout.jsx
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import FloatingWAButton from "@/components/common/FloatingWAButton";

export default function GuestLayout({ children }: any) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <FloatingWAButton />
    </>
  );
}
