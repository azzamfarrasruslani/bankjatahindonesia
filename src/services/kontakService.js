import { supabase } from "@/lib/supabaseClient";

export async function fetchKontak() {
  const { data, error } = await supabase
    .from("kontak")
    .select("*")
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 is 'not found'
  return data;
}

export async function updateKontak(id, payload) {
  const { data, error } = await supabase
    .from("kontak")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function insertKontak(payload) {
  const { data, error } = await supabase
    .from("kontak")
    .insert([payload])
    .select();

  if (error) throw error;
  return data[0];
}
