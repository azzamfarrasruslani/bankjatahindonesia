import { supabase } from "@/lib/supabaseClient";
import type { Kontak, KontakPayload } from "@/types";

export async function fetchKontak(): Promise<Kontak | null> {
  const { data, error } = await supabase
    .from("kontak")
    .select("*")
    .single();

  if (error && error.code !== "PGRST116") throw new Error(error.message);
  return data as Kontak | null;
}

export async function updateKontak(id: string, payload: KontakPayload): Promise<Kontak> {
  const { data, error } = await supabase
    .from("kontak")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return (data as Kontak[])[0];
}

export async function insertKontak(payload: KontakPayload): Promise<Kontak> {
  const { data, error } = await supabase
    .from("kontak")
    .insert([payload])
    .select();

  if (error) throw new Error(error.message);
  return (data as Kontak[])[0];
}
