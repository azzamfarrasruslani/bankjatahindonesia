import GuestLayout from "@/layouts/GuestLayout";

export const metadata = {
  title: "Bank Jatah Indonesia",
  description: "Website resmi Bank Jatah Indonesia",
};

export default function PublicLayout({ children }) {
  return <GuestLayout>{children}</GuestLayout>;
}
