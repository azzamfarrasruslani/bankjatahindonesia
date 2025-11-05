import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // pakai role key agar bisa delete storage
);

// ✅ Tambah berita
export async function POST(req) {
  try {
    const body = await req.json();
    const { judul, penulis, isi, is_top, gambar_url } = body;

    const { error } = await supabase
      .from("berita")
      .insert([{ judul, penulis, isi, is_top, gambar_url }]);

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "Berita berhasil ditambahkan" }),
      {
        status: 201,
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

// ✅ Edit berita
export async function PUT(req) {
  try {
    const { id, judul, penulis, isi, is_top, gambar_url, old_image } =
      await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: "ID berita tidak ditemukan" }),
        { status: 400 }
      );
    }

    // Jika gambar baru diunggah, hapus gambar lama dari bucket
    if (old_image && gambar_url && old_image !== gambar_url) {
      try {
        const url = new URL(old_image);
        const relativePath = url.pathname.split("/berita-images/")[1];
        if (relativePath) {
          const { error } = await supabase.storage
            .from("berita-images")
            .remove([relativePath]);
          if (error) console.warn("⚠️ Gagal hapus gambar lama:", error.message);
        }
      } catch (err) {
        console.error("[ERROR] Gagal hapus gambar lama:", err);
      }
    }

    // Update data berita
    const { error } = await supabase
      .from("berita")
      .update({ judul, penulis, isi, is_top, gambar_url })
      .eq("id", id);

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "✅ Berita berhasil diperbarui" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("[ERROR] Update berita gagal:", err);
    return new Response(JSON.stringify({ error: "Gagal memperbarui berita" }), {
      status: 500,
    });
  }
}

// ✅ Hapus berita + gambar
export async function DELETE(req) {
  try {
    const { id, gambar_url } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "ID berita tidak ada" }), {
        status: 400,
      });
    }

    // Hapus gambar di storage jika ada
    if (gambar_url) {
      try {
        const url = new URL(gambar_url);
        const filePath = url.pathname.split("/berita-images/")[1];
        if (filePath) {
          await supabase.storage.from("berita-images").remove([filePath]);
        }
      } catch {
        // abaikan error penghapusan gambar
      }
    }

    // Hapus berita di tabel
    const { error } = await supabase.from("berita").delete().eq("id", id);
    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "Berita berhasil dihapus" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
