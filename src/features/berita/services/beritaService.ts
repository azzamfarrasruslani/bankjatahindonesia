import { supabase } from "@/lib/supabaseClient";
import type { Berita, BeritaPayload } from "@/types";

export async function fetchBerita(): Promise<Berita[]> {
  const { data, error } = await supabase.from("berita").select("*").order("id", { ascending: false });
  if (error) throw new Error(error.message);
  return data as Berita[];
}

export async function fetchBeritaById(id: string): Promise<Berita> {
  const { data, error } = await supabase.from("berita").select("*").eq("id", id).single();
  if (error) throw new Error(error.message);
  return data as Berita;
}

export async function uploadImage(
  file: File,
  existingUrl = "",
  bucket = "berita-images",
  pathPrefix = "berita"
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

export async function insertBerita(payload: BeritaPayload): Promise<Berita> {
  const { data, error } = await supabase.from("berita").insert(payload).select().single();
  if (error) throw new Error(error.message);
  return data as Berita;
}

export async function updateBerita(id: string, payload: BeritaPayload): Promise<Berita> {
  const { data, error } = await supabase.from("berita").update(payload).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data as Berita;
}

export async function deleteBerita(id: string): Promise<void> {
  const { error } = await supabase.from("berita").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
