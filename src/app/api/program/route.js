import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

/* ============================================================
   🔹 READ (GET) - Ambil semua program
============================================================ */
export async function GET(req) {
  try {
    const { data: programs, error } = await supabase
      .from("program")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    return new Response(JSON.stringify(programs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[ERROR] Ambil program gagal:", err);
    return new Response(JSON.stringify({ error: "Gagal mengambil program" }), {
      status: 500,
    });
  }
}

/* ============================================================
   🔹 CREATE (POST) - Tambah program baru
============================================================ */
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      title,
      status = "Program Aktif",
      icon_url,
      description,
      details,
      button_label = "Ikuti Program Ini",
    } = body;

    const { error } = await supabase.from("program").insert([
      {
        title,
        status,
        icon_url,
        description,
        details,
        button_label,
      },
    ]);

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "Program berhasil ditambahkan" }),
      { status: 201 },
    );
  } catch (err) {
    console.error("[ERROR] Tambah program gagal:", err);
    return new Response(JSON.stringify({ error: "Gagal menambah program" }), {
      status: 500,
    });
  }
}

/* ============================================================
   🔹 DELETE - Hapus program + gambar/icon jika ada
============================================================ */
export async function DELETE(req) {
  try {
    const { id, icon_url } = await req.json();

    if (!id)
      return new Response(
        JSON.stringify({ error: "ID program tidak ditemukan" }),
        { status: 400 },
      );

    // Hapus file icon jika ada
    if (icon_url) {
      try {
        const url = new URL(icon_url);
        const relativePath = url.pathname.split("/program-images/")[1];
        if (relativePath) {
          const { error } = await supabase.storage
            .from("program-images")
            .remove([relativePath]);
          if (error) console.warn("⚠️ Gagal hapus icon:", error.message);
        }
      } catch (err) {
        console.error("[ERROR] Parsing URL gagal:", err);
      }
    }

    // Hapus data program dari tabel
    const { error: dbError } = await supabase
      .from("program")
      .delete()
      .eq("id", id);

    if (dbError) throw dbError;

    return new Response(
      JSON.stringify({ message: "Program dan icon berhasil dihapus" }),
      { status: 200 },
    );
  } catch (err) {
    console.error("[ERROR] Hapus program gagal:", err);
    return new Response(JSON.stringify({ error: "Gagal menghapus program" }), {
      status: 500,
    });
  }
}

/* ============================================================
   🔹 UPDATE (PUT) - Edit program + hapus icon lama jika diganti
============================================================ */
export async function PUT(req) {
  try {
    const {
      id,
      title,
      status,
      icon_url,
      description,
      details,
      button_label,
      old_icon,
    } = await req.json();

    if (!id)
      return new Response(
        JSON.stringify({ error: "ID program tidak ditemukan" }),
        { status: 400 },
      );

    // Jika icon baru diunggah, hapus icon lama
    if (old_icon && icon_url && old_icon !== icon_url) {
      try {
        const url = new URL(old_icon);
        const relativePath = url.pathname.split("/program-images/")[1];
        if (relativePath) {
          const { error } = await supabase.storage
            .from("program-images")
            .remove([relativePath]);
          if (error) console.warn("⚠️ Gagal hapus icon lama:", error.message);
        }
      } catch (err) {
        console.error("[ERROR] Gagal hapus icon lama:", err);
      }
    }

    const { error } = await supabase
      .from("program")
      .update({
        title,
        status,
        icon_url,
        description,
        details,
        button_label,
      })
      .eq("id", id);

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "Program berhasil diperbarui" }),
      { status: 200 },
    );
  } catch (err) {
    console.error("[ERROR] Update program gagal:", err);
    return new Response(
      JSON.stringify({ error: "Gagal memperbarui program" }),
      {
        status: 500,
      },
    );
  }
}
