import { supabase } from "@/lib/supabaseClient";
import type { Testimoni, TestimoniPayload } from "@/types";

export async function fetchTestimoni(): Promise<Testimoni[]> {
  const { data, error } = await supabase.from("testimoni").select("*").order("id", { ascending: false });
  if (error) throw new Error(error.message);
  return data as Testimoni[];
}

export async function fetchTestimoniById(id: string): Promise<Testimoni> {
  const { data, error } = await supabase.from("testimoni").select("*").eq("id", id).single();
  if (error) throw new Error(error.message);
  return data as Testimoni;
}

export async function uploadImage(
  file: File,
  existingUrl = "",
  bucket = "testimoni-images",
  pathPrefix = "testimoni"
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

export async function insertTestimoni(payload: TestimoniPayload): Promise<Testimoni> {
  const { data, error } = await supabase.from("testimoni").insert(payload).select().single();
  if (error) throw new Error(error.message);
  return data as Testimoni;
}

export async function updateTestimoni(id: string, payload: TestimoniPayload): Promise<Testimoni> {
  const { data, error } = await supabase.from("testimoni").update(payload).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data as Testimoni;
}

export async function deleteTestimoni(id: string): Promise<void> {
  const { error } = await supabase.from("testimoni").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
