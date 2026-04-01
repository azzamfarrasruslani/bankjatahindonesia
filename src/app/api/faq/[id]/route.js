import { supabaseServer } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { data, error } = await supabaseServer
      .from("faq")
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
      .from("faq")
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
    const { error } = await supabaseServer
      .from("faq")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ message: "FAQ berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
