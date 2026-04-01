import { supabaseServer } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const bucket = formData.get("bucket") || "artikel-images";
    const path = formData.get("path") || `artikel/${Date.now()}.webp`;

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    // Convert file to Buffer for upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabaseServer.storage
      .from(bucket)
      .upload(path, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) throw error;

    // Get Public URL
    const { data: publicUrlData } = supabaseServer.storage
      .from(bucket)
      .getPublicUrl(path);

    return NextResponse.json({ publicUrl: publicUrlData.publicUrl });
  } catch (error) {
    console.error("Storage Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
