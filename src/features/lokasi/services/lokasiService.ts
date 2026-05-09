import { supabase } from "@/lib/supabaseClient";
import type { Lokasi, LokasiPayload } from "@/types";

export async function fetchLokasi(): Promise<Lokasi[]> {
  const { data, error } = await supabase.from("lokasi").select("*").order("id", { ascending: false });
  if (error) throw new Error(error.message);
  return data as Lokasi[];
}

export async function fetchLokasiById(id: string): Promise<Lokasi> {
  const { data, error } = await supabase.from("lokasi").select("*").eq("id", id).single();
  if (error) throw new Error(error.message);
  return data as Lokasi;
}

export async function uploadImage(
  file: File,
  existingUrl = "",
  bucket = "lokasi-images",
  pathPrefix = "lokasi"
): Promise<string> {
  if (!file) return existingUrl;
  
  const imageCompression = (await import("browser-image-compression")).default;
  const options = {
    maxSizeMB: 0.25,
    maxWidthOrHeight: 1000,
    initialQuality: 0.85,
    useWebWorker: true,
    fileType: "image/webp",
  };

  try {
    const compressedFile = await imageCompression(file, options);
    const fileName = pathPrefix + '/' + Date.now() + '.webp';

    const { error } = await supabase.storage.from(bucket).upload(fileName, compressedFile, { upsert: true });
    if (error) throw error;

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  } catch (err) {
    console.error("Gagal mengunggah gambar:", err);
    throw err;
  }
}

export async function insertLokasi(payload: LokasiPayload): Promise<Lokasi> {
  const { data, error } = await supabase.from("lokasi").insert(payload).select().single();
  if (error) throw new Error(error.message);
  return data as Lokasi;
}

export async function updateLokasi(id: string, payload: LokasiPayload): Promise<Lokasi> {
  const { data, error } = await supabase.from("lokasi").update(payload).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data as Lokasi;
}

export async function deleteLokasi(id: string): Promise<void> {
  const { error } = await supabase.from("lokasi").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
