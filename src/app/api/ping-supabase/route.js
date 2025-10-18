export async function GET() {
  const res = await fetch("https://xowfrryddgaikyhpmyfk.supabase.co/rest/v1/health", {
    headers: {
      apikey: "<ANON_KEY_SUPABASE>",
      Authorization: `Bearer <ANON_KEY_SUPABASE>`,
    },
  });
  return new Response("Supabase Pinged", { status: res.status });
}
