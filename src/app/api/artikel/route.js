import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // SERVICE ROLE KEY hanya untuk server
);

export async function DELETE(req) {
  try {
    const { id, gambar_url } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: "ID artikel tidak ditemukan" }),
        { status: 400 }
      );
    }

    // Hapus file gambar jika ada
    if (gambar_url) {
      try {
        const url = new URL(gambar_url);
        // Ambil path relatif dari bucket
        const relativePath = url.pathname.split("/artikel-images/")[1]; // misal: "artikel/1762339143301.webp"

        if (relativePath) {
          const { error } = await supabase.storage
            .from("artikel-images")
            .remove([relativePath]);
          if (error) throw error;
        }
      } catch (err) {
        console.error("[ERROR] Gagal hapus file gambar:", err);
        // tetap lanjut hapus DB meski gagal hapus file
      }
    }

    // Hapus record artikel
    const { error: dbError } = await supabase
      .from("artikel")
      .delete()
      .eq("id", id);
    if (dbError) throw dbError;

    return new Response(
      JSON.stringify({ message: "Berhasil hapus artikel dan gambar" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("[ERROR] Hapus artikel gagal:", err);
    return new Response(JSON.stringify({ error: "Gagal menghapus artikel" }), {
      status: 500,
    });
  }
}
