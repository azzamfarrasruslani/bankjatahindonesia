import { supabaseServer } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { data, error } = await supabaseServer
      .from("artikel")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { data, error } = await supabaseServer
      .from("artikel")
      .update(body)
      .eq("id", id)
      .select();

    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // 1. Fetch record first to get image URL for deletion
    const { data: artikel, error: fetchError } = await supabaseServer
      .from("artikel")
      .select("gambar_url")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // 2. Delete item from database
    const { error: deleteError } = await supabaseServer
      .from("artikel")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    // 3. Cleanup storage if image exists
    if (artikel?.gambar_url && artikel.gambar_url.includes("artikel-images")) {
      const fileName = artikel.gambar_url.split("/").pop();
      await supabaseServer.storage.from("artikel-images").remove([`artikel/${fileName}`]);
    }

    return NextResponse.json({ message: "Artikel berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
