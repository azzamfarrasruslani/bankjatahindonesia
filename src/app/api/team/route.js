import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function DELETE(req) {
  try {
    const { id, foto_url } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: "ID anggota tidak ada" }),
        { status: 400 }
      );
    }

    if (foto_url) {
      try {
        const url = new URL(foto_url);
        const filePath = url.pathname.split("/team-images/")[1];

        if (filePath) {
          const { error } = await supabase.storage
            .from("team-images")
            .remove([filePath]);
          if (error) throw error;
        }
      } catch {
        // Abaikan kesalahan hapus file
      }
    }

    const { error: dbError } = await supabase
      .from("tim")
      .delete()
      .eq("id", id);

    if (dbError) throw dbError;

    return new Response(
      JSON.stringify({ message: "Berhasil hapus anggota dan gambar" }),
      { status: 200 }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Gagal hapus anggota" }),
      { status: 500 }
    );
  }
}
