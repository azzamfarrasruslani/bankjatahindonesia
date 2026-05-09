import { supabase } from "@/lib/supabaseClient";
import type { FAQ, FAQPayload } from "@/types";

export async function fetchFAQ(): Promise<FAQ[]> {
  const { data, error } = await supabase.from("faq").select("*").order("id", { ascending: false });
  if (error) throw new Error(error.message);
  return data as FAQ[];
}

export async function fetchFAQById(id: string): Promise<FAQ> {
  const { data, error } = await supabase.from("faq").select("*").eq("id", id).single();
  if (error) throw new Error(error.message);
  return data as FAQ;
}


export async function insertFAQ(payload: FAQPayload): Promise<FAQ> {
  const { data, error } = await supabase.from("faq").insert(payload).select().single();
  if (error) throw new Error(error.message);
  return data as FAQ;
}

export async function updateFAQ(id: string, payload: FAQPayload): Promise<FAQ> {
  const { data, error } = await supabase.from("faq").update(payload).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data as FAQ;
}

export async function deleteFAQ(id: string): Promise<void> {
  const { error } = await supabase.from("faq").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
