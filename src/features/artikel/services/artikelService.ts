import { supabase } from "@/lib/supabaseClient";
import type { Artikel, ArtikelPayload } from "@/types";

export async function fetchArtikel(): Promise<Artikel[]> {
  const { data, error } = await supabase.from("artikel").select("*").order("id", { ascending: false });
  if (error) throw new Error(error.message);
  return data as Artikel[];
}

export async function fetchArtikelById(id: string): Promise<Artikel> {
  const { data, error } = await supabase.from("artikel").select("*").eq("id", id).single();
  if (error) throw new Error(error.message);
  return data as Artikel;
}

export async function uploadImage(
  file: File,
  existingUrl = "",
  bucket = "artikel-images",
  pathPrefix = "artikel"
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

export async function insertArtikel(payload: ArtikelPayload): Promise<Artikel> {
  const { data, error } = await supabase.from("artikel").insert(payload).select().single();
  if (error) throw new Error(error.message);
  return data as Artikel;
}

export async function updateArtikel(id: string, payload: ArtikelPayload): Promise<Artikel> {
  const { data, error } = await supabase.from("artikel").update(payload).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data as Artikel;
}

export async function deleteArtikel(id: string): Promise<void> {
  const { error } = await supabase.from("artikel").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
