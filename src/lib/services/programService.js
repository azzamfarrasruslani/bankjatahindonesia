import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";

export async function fetchProgram() {
  const res = await fetch("/api/program", {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal mengambil data program");
  }

  return data;
}

export async function uploadImage(file, existingUrl = "") {
  if (!file) return existingUrl;

  try {
    const options = {
      maxSizeMB: 0.25,
      maxWidthOrHeight: 1000,
      initialQuality: 0.85,
      useWebWorker: true,
      fileType: "image/webp",
    };

    const compressedFile = await imageCompression(file, options);
    const fileName = `program/${Date.now()}.webp`;

    const { error: uploadError } = await supabase.storage
      .from("program-images")
      .upload(fileName, compressedFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("program-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  } catch (err) {
    console.error("Upload gagal:", err);
    throw new Error("Gagal upload ikon program.");
  }
}

export async function insertProgram(payload) {
  const res = await fetch("/api/program", {
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

export async function updateProgram(payload) {
  const res = await fetch(`/api/program`, {
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

export async function deleteProgram(id, icon_url) {
  const res = await fetch(`/api/program`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, icon_url }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal menghapus program.");
  }

  return data;
}
