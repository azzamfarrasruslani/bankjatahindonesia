// src/layouts/GuestLayout.jsx
import Navbar from "@/app/(public)/layout/navbar";
import Footer from "@/app/(public)/layout/footer";
import FloatingWAButton from "@/components/common/FloatingWAButton";

export default function GuestLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <FloatingWAButton />
    </>
  );
}
