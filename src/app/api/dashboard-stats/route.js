import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function GET() {
  try {
    // Fetch counts in parallel from Supabase
    const [
      { count: artikelCount },
      { count: beritaCount },
      { count: programCount },
      { count: lokasiCount },
      { count: usersCount },
    ] = await Promise.all([
      supabase.from("artikel").select("*", { count: "exact", head: true }),
      supabase.from("berita").select("*", { count: "exact", head: true }),
      supabase.from("program").select("*", { count: "exact", head: true }),
      supabase.from("lokasi").select("*", { count: "exact", head: true }),
      supabase.from("users").select("*", { count: "exact", head: true }),
    ]);

    return NextResponse.json({
      artikel: artikelCount || 0,
      berita: beritaCount || 0,
      program: programCount || 0,
      lokasi: lokasiCount || 0,
      users: usersCount || 0,
    });
  } catch (err) {
    console.error("Failed to fetch dashboard stats:", err);
    return NextResponse.json(
      { error: "Fetch failed", message: err.message },
      { status: 500 },
    );
  }
}
