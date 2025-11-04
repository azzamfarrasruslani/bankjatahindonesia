"use client";

import { useRouter } from "next/navigation";
import TestimoniForm from "../form";

export default function TambahTestimoniPage() {
  const router = useRouter();

  return (
    <section className="min-h-screen p-6 md:p-10 bg-orange-50">
      <h1 className="text-3xl font-bold text-[#FB6B00] mb-6">
        Tambah Testimoni Baru
      </h1>
      <TestimoniForm onSuccess={() => router.push("/dashboard/testimoni")} />
    </section>
  );
}
