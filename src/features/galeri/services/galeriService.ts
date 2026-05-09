import { supabase } from "@/lib/supabaseClient";
import type { Galeri, GaleriPayload } from "@/types";

export async function fetchGaleri(): Promise<Galeri[]> {
  const { data, error } = await supabase.from("galeri").select("*").order("id", { ascending: false });
  if (error) throw new Error(error.message);
  return data as Galeri[];
}

export async function fetchGaleriById(id: string): Promise<Galeri> {
  const { data, error } = await supabase.from("galeri").select("*").eq("id", id).single();
  if (error) throw new Error(error.message);
  return data as Galeri;
}

export async function uploadImage(
  file: File,
  existingUrl = "",
  bucket = "galeri-images",
  pathPrefix = "galeri"
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

export async function insertGaleri(payload: GaleriPayload): Promise<Galeri> {
  const { data, error } = await supabase.from("galeri").insert(payload).select().single();
  if (error) throw new Error(error.message);
  return data as Galeri;
}

export async function updateGaleri(id: string, payload: GaleriPayload): Promise<Galeri> {
  const { data, error } = await supabase.from("galeri").update(payload).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data as Galeri;
}

export async function deleteGaleri(id: string): Promise<void> {
  const { error } = await supabase.from("galeri").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
