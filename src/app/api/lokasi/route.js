import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

/* ============================================================
   🔹 READ (GET) - Ambil semua lokasi
============================================================ */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    let query = supabase
      .from("lokasi")
      .select("*")
      .order("id", { ascending: true });

    if (id) {
      query = query.eq("id", id).single();
    }

    const { data: lokasi, error } = await query;

    if (error) throw error;

    return new Response(JSON.stringify(lokasi || []), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[ERROR] Ambil lokasi gagal:", err);
    return new Response(JSON.stringify({ error: "Gagal mengambil lokasi" }), {
      status: 500,
    });
  }
}

/* ============================================================
   🔹 CREATE (POST) - Tambah lokasi baru
============================================================ */
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      nama,
      jenis = "mitra",
      alamat,
      latitude,
      longitude,
      jam_operasional,
      kontak,
      gambar_url,
      gambar_kegiatan,
      link_video_youtube,
    } = body;

    const { data, error } = await supabase
      .from("lokasi")
      .insert([
        {
          nama,
          jenis,
          alamat,
          latitude,
          longitude,
          jam_operasional,
          kontak,
          gambar_url,
          gambar_kegiatan,
          link_video_youtube,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "Lokasi berhasil ditambahkan", data }),
      { status: 201 },
    );
  } catch (err) {
    console.error("[ERROR] Tambah lokasi gagal:", err);
    return new Response(JSON.stringify({ error: "Gagal menambah lokasi" }), {
      status: 500,
    });
  }
}

/* ============================================================
   🔹 UPDATE (PUT) - Edit lokasi
============================================================ */
export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    const body = await req.json();
    if (body.id) id = body.id; // Fallback jika ID dikirim dari body

    if (!id) {
      return new Response(
        JSON.stringify({ error: "ID lokasi tidak ditemukan" }),
        { status: 400 },
      );
    }

    const {
      nama,
      jenis,
      alamat,
      latitude,
      longitude,
      jam_operasional,
      kontak,
      gambar_url,
      gambar_kegiatan,
      link_video_youtube,
    } = body;

    const { data, error } = await supabase
      .from("lokasi")
      .update({
        nama,
        jenis,
        alamat,
        latitude,
        longitude,
        jam_operasional,
        kontak,
        gambar_url,
        gambar_kegiatan,
        link_video_youtube,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "Lokasi berhasil diperbarui", data }),
      { status: 200 },
    );
  } catch (err) {
    console.error("[ERROR] Update lokasi gagal:", err);
    return new Response(JSON.stringify({ error: "Gagal memperbarui lokasi" }), {
      status: 500,
    });
  }
}

/* ============================================================
   🔹 DELETE - Hapus lokasi
============================================================ */
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    // Jika body dikirimkan (karena standard delete fetch tdk semua terima params)
    if (!id) {
      const body = await req.json().catch(() => ({}));
      id = body.id;
    }

    if (!id)
      return new Response(
        JSON.stringify({ error: "ID lokasi tidak ditemukan" }),
        { status: 400 },
      );

    // Hapus data dari tabel
    const { error: dbError } = await supabase
      .from("lokasi")
      .delete()
      .eq("id", id);

    if (dbError) throw dbError;

    return new Response(
      JSON.stringify({ message: "Lokasi berhasil dihapus" }),
      { status: 200 },
    );
  } catch (err) {
    console.error("[ERROR] Hapus lokasi gagal:", err);
    return new Response(JSON.stringify({ error: "Gagal menghapus lokasi" }), {
      status: 500,
    });
  }
}
