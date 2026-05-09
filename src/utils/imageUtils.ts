/**
 * Mengambil nama file dari URL Supabase Storage
 * @param url - URL publik dari Supabase Storage
 * @returns Nama file tanpa path, atau null jika URL kosong
 */
export function getFileNameFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const parts = url.split("/");
  return parts[parts.length - 1] ?? null;
}
