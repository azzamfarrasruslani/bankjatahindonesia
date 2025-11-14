import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("artikel")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}


// Insert artikel baru
export async function POST(req) {
  try {
    const body = await req.json();

    const { error } = await supabase.from("artikel").insert([body]);
    if (error) throw error;

    return NextResponse.json({ message: "Artikel berhasil dibuat" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Update artikel
export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID artikel wajib disertakan" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { error } = await supabase.from("artikel").update(body).eq("id", id);

    if (error) throw error;
    return NextResponse.json({ message: "Artikel berhasil diperbarui" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID artikel wajib disertakan" },
        { status: 400 }
      );
    }

    // Ambil data artikel
    const { data: artikel, error: fetchError } = await supabase
      .from("artikel")
      .select("gambar_url")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // Jika ada gambar ⇒ hapus dari storage
    if (artikel?.gambar_url) {
      const publicBase = "/storage/v1/object/public/artikel-images/";

      // Ambil: artikel/<namafile.webp>
      const filePath = artikel.gambar_url.split(publicBase)[1];

      if (filePath) {
        await supabase.storage.from("artikel-images").remove([filePath]);
      }
    }

    // Hapus dari tabel
    const { error: deleteError } = await supabase
      .from("artikel")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    return NextResponse.json({ message: "Artikel berhasil dihapus" });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
