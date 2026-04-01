import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";

export async function fetchArtikel() {
  const res = await fetch("/api/berita", {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal mengambil data berita");
  }

  return data;
}
