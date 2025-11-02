"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import UserForm from "../form";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  async function fetchUser() {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
    if (error) console.error(error);
    else setUser(data);
  }

  async function handleSubmit(form) {
    const { error } = await supabase.from("users").update(form).eq("id", id);
    if (error) console.error(error);
    else router.push("/dashboard/users");
  }

  if (!user) return <p className="p-6 text-gray-500">Memuat data pengguna...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Pengguna</h1>
      <UserForm initialData={user} onSubmit={handleSubmit} />
    </div>
  );
}
