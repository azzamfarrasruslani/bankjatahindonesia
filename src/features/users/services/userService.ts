import { supabase } from "@/lib/supabaseClient";
import type { User, UserPayload } from "@/types";

export async function fetchUsers(): Promise<User[]> {
  const { data, error } = await supabase.from("users").select("*").order("id", { ascending: false });
  if (error) throw new Error(error.message);
  return data as User[];
}

export async function fetchUserById(id: string): Promise<User> {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
  if (error) throw new Error(error.message);
  return data as User;
}


export async function insertUser(payload: UserPayload): Promise<User> {
  const { data, error } = await supabase.from("users").insert(payload).select().single();
  if (error) throw new Error(error.message);
  return data as User;
}

export async function updateUser(id: string, payload: UserPayload): Promise<User> {
  const { data, error } = await supabase.from("users").update(payload).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data as User;
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase.from("users").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
