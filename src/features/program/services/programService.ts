import { supabase } from "@/lib/supabaseClient";
import type { Program, ProgramPayload } from "@/types";

export async function fetchProgram(): Promise<Program[]> {
  const { data, error } = await supabase.from("program").select("*").order("id", { ascending: false });
  if (error) throw new Error(error.message);
  return data as Program[];
}

export async function fetchProgramById(id: string): Promise<Program> {
  const { data, error } = await supabase.from("program").select("*").eq("id", id).single();
  if (error) throw new Error(error.message);
  return data as Program;
}

export async function uploadImage(
  file: File,
  existingUrl = "",
  bucket = "program-images",
  pathPrefix = "program"
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

export async function insertProgram(payload: ProgramPayload): Promise<Program> {
  const { data, error } = await supabase.from("program").insert(payload).select().single();
  if (error) throw new Error(error.message);
  return data as Program;
}

export async function updateProgram(id: string, payload: ProgramPayload): Promise<Program> {
  const { data, error } = await supabase.from("program").update(payload).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data as Program;
}

export async function deleteProgram(id: string): Promise<void> {
  const { error } = await supabase.from("program").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
