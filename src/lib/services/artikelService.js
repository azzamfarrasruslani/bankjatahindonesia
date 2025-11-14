import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";

export async function fetchArtikel() {
  const res = await fetch("/api/artikel", {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal mengambil data artikel");
  }

  return data;
}


export async function uploadImage(file, existingUrl = "") {
  if (!file) return existingUrl;

  const options = {
    maxSizeMB: 0.25,
    maxWidthOrHeight: 1000,
    initialQuality: 0.85,
    useWebWorker: true,
    fileType: "image/webp",
  };

  const compressedFile = await imageCompression(file, options);
  const fileName = `artikel/${Date.now()}.webp`;

  const { error } = await supabase.storage
    .from("artikel-images")
    .upload(fileName, compressedFile);

  if (error) throw error;

  const { data } = supabase.storage
    .from("artikel-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function insertArtikel(payload) {
  const res = await fetch("/api/artikel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error);
  }

  return res.json();
}

export async function updateArtikel(id, payload) {
  const res = await fetch(`/api/artikel?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error);
  }

  return res.json();
}

export async function deleteArtikel(id) {
  const res = await fetch(`/api/artikel?id=${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal menghapus artikel.");
  }

  return data;
}
