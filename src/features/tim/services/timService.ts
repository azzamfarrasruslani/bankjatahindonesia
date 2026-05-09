import { supabase } from "@/lib/supabaseClient";
import type { Tim, TimPayload } from "@/types";

export async function fetchTim(): Promise<Tim[]> {
  const { data, error } = await supabase.from("tim").select("*").order("id", { ascending: false });
  if (error) throw new Error(error.message);
  return data as Tim[];
}

export async function fetchTimById(id: string): Promise<Tim> {
  const { data, error } = await supabase.from("tim").select("*").eq("id", id).single();
  if (error) throw new Error(error.message);
  return data as Tim;
}

export async function uploadImage(
  file: File,
  existingUrl = "",
  bucket = "tim-images",
  pathPrefix = "tim"
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

export async function insertTim(payload: TimPayload): Promise<Tim> {
  const { data, error } = await supabase.from("tim").insert(payload).select().single();
  if (error) throw new Error(error.message);
  return data as Tim;
}

export async function updateTim(id: string, payload: TimPayload): Promise<Tim> {
  const { data, error } = await supabase.from("tim").update(payload).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data as Tim;
}

export async function deleteTim(id: string): Promise<void> {
  const { error } = await supabase.from("tim").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
