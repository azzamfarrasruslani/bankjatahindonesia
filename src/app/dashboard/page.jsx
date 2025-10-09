"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    };
    getUser();
  }, [router]);

  if (!user) {
    return <p className="text-center py-10">Memuat dashboard...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#FB6B00] mb-4">Selamat Datang!</h1>
      <p className="text-gray-700">Email: {user.email}</p>

      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/login");
        }}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
