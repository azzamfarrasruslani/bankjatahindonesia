"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import UserForm from "../form";

export default function TambahUserPage() {
  const router = useRouter();

  async function handleSubmit(form) {
    const { error } = await supabase.from("users").insert([form]);
    if (error) console.error(error);
    else router.push("/dashboard/users");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Tambah Pengguna</h1>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}
