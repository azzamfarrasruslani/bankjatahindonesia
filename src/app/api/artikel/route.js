import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// 🔹 Tambah artikel baru
export async function POST(req) {
  try {
    const body = await req.json();
    const { judul, isi, penulis, kategori, gambar_url, is_top } = body;

    const { error } = await supabase.from("artikel").insert([
      { judul, isi, penulis, kategori, gambar_url, is_top },
    ]);

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "Artikel berhasil ditambahkan" }),
      { status: 201 }
    );
  } catch (err) {
    console.error("[ERROR] Tambah artikel gagal:", err);
    return new Response(JSON.stringify({ error: "Gagal menambah artikel" }), {
      status: 500,
    });
  }
}

// 🔹 Hapus artikel + gambar
export async function DELETE(req) {
  try {
    const { id, gambar_url } = await req.json();

    if (!id)
      return new Response(
        JSON.stringify({ error: "ID artikel tidak ditemukan" }),
        { status: 400 }
      );

    // Hapus file gambar jika ada
    if (gambar_url) {
      try {
        const url = new URL(gambar_url);
        const relativePath = url.pathname.split("/artikel-images/")[1];
        if (relativePath) {
          const { error } = await supabase.storage
            .from("artikel-images")
            .remove([relativePath]);
          if (error) console.warn("Gagal hapus gambar:", error.message);
        }
      } catch (err) {
        console.error("[ERROR] Parsing URL gagal:", err);
      }
    }

    // Hapus artikel dari tabel
    const { error: dbError } = await supabase
      .from("artikel")
      .delete()
      .eq("id", id);

    if (dbError) throw dbError;

    return new Response(
      JSON.stringify({ message: "Artikel dan gambar berhasil dihapus" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("[ERROR] Hapus artikel gagal:", err);
    return new Response(JSON.stringify({ error: "Gagal menghapus artikel" }), {
      status: 500,
    });
  }
}

// 🔹 Update artikel + hapus gambar lama jika diganti
export async function PUT(req) {
  try {
    const { id, judul, isi, penulis, kategori, gambar_url, is_top, old_image } =
      await req.json();

    if (!id)
      return new Response(
        JSON.stringify({ error: "ID artikel tidak ditemukan" }),
        { status: 400 }
      );

    // Jika gambar baru diunggah, hapus gambar lama
    if (old_image && gambar_url && old_image !== gambar_url) {
      try {
        const url = new URL(old_image);
        const relativePath = url.pathname.split("/artikel-images/")[1];
        if (relativePath) {
          const { error } = await supabase.storage
            .from("artikel-images")
            .remove([relativePath]);
          if (error) console.warn("Gagal hapus gambar lama:", error.message);
        }
      } catch (err) {
        console.error("[ERROR] Gagal hapus gambar lama:", err);
      }
    }

    const { error } = await supabase
      .from("artikel")
      .update({ judul, isi, penulis, kategori, gambar_url, is_top })
      .eq("id", id);

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "Artikel berhasil diperbarui" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("[ERROR] Update artikel gagal:", err);
    return new Response(JSON.stringify({ error: "Gagal memperbarui artikel" }), {
      status: 500,
    });
  }
}
