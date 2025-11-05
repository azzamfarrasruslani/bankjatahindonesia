// src/app/api/users/route.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();
    const { nama_lengkap, email, password, no_telepon, alamat, status_aktif } = body;

    // Validasi input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email dan password wajib diisi" }),
        { status: 400 }
      );
    }

    // 1️⃣ Buat akun auth Supabase
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      console.error("Auth Error:", authError.message);
      return new Response(JSON.stringify({ error: authError.message }), {
        status: 400,
      });
    }

    // 2️⃣ Simpan ke tabel `users`
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: authData.user.id,
        nama_lengkap,
        email,
        no_telepon,
        alamat,
        status_aktif,
      },
    ]);

    if (insertError) {
      console.error("Insert Error:", insertError.message);
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 400,
      });
    }

    // ✅ Berhasil
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("API /api/users Error:", err);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan di server: " + err.message }),
      { status: 500 }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({ message: "Gunakan metode POST untuk menambah user." }),
    { status: 405 }
  );
}
