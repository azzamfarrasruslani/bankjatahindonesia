-- ==============================================================================
-- STRUKTUR SUPABASE STORAGE BUCKETS - BANK JATAH INDONESIA
-- Query pembuatan bucket penyimpanan file / media statis
-- ==============================================================================

-- Buket-buket penyimpanan ini bisa digabung ke dalam 1 bucket besar bernama 'bji-media' 
-- Atau dibelah menjadi spesifik bucket per-kategori seperti di bawah ini untuk kerapian

---------------------------------------------------------------------------------
-- 1. BUCKET: BJI_ARTIKEL
-- Fungsi: Menyimpan aset cover blog/pendidikan edukatif artikel
---------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) 
VALUES ('bji_artikel', 'bji_artikel', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Semua orang (anon) bisa melihat/mendownload gambar artikel
CREATE POLICY "Public Access (Download) - Artikel" 
ON storage.objects FOR SELECT USING ( bucket_id = 'bji_artikel' );
-- Policy: Hanya user login yang bisa insert/update/delete gambar
CREATE POLICY "Admin Upload - Artikel" 
ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'bji_artikel' AND auth.role() = 'authenticated' );
CREATE POLICY "Admin Update - Artikel" 
ON storage.objects FOR UPDATE USING ( bucket_id = 'bji_artikel' AND auth.role() = 'authenticated' );
CREATE POLICY "Admin Delete - Artikel" 
ON storage.objects FOR DELETE USING ( bucket_id = 'bji_artikel' AND auth.role() = 'authenticated' );


---------------------------------------------------------------------------------
-- 2. BUCKET: BJI_BERITA
-- Fungsi: Menyimpan gambar-gambar liputan/kegiatan terbaru di Berita Page
---------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) 
VALUES ('bji_berita', 'bji_berita', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access (Download) - Berita" ON storage.objects FOR SELECT USING ( bucket_id = 'bji_berita' );
CREATE POLICY "Admin Write - Berita" ON storage.objects FOR ALL USING ( bucket_id = 'bji_berita' AND auth.role() = 'authenticated' );


---------------------------------------------------------------------------------
-- 3. BUCKET: BJI_LOKASI
-- Fungsi: Menyimpan foto bangunan titik Lokasi (Mitra/Utama) & Gambar Kegiatannya
---------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) 
VALUES ('bji_lokasi', 'bji_lokasi', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access (Download) - Lokasi" ON storage.objects FOR SELECT USING ( bucket_id = 'bji_lokasi' );
CREATE POLICY "Admin Write - Lokasi" ON storage.objects FOR ALL USING ( bucket_id = 'bji_lokasi' AND auth.role() = 'authenticated' );


---------------------------------------------------------------------------------
-- 4. BUCKET: BJI_PROFIL
-- Fungsi: Menyimpan pas foto/gambar tim struktural (Karyawan/CEO di Halaman Profil)
-- Serta testimoni avatar profil.
---------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) 
VALUES ('bji_profil', 'bji_profil', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access (Download) - Profil" ON storage.objects FOR SELECT USING ( bucket_id = 'bji_profil' );
CREATE POLICY "Admin Write - Profil" ON storage.objects FOR ALL USING ( bucket_id = 'bji_profil' AND auth.role() = 'authenticated' );


---------------------------------------------------------------------------------
-- 5. BUCKET: BJI_GALERI
-- Fungsi: Menyimpan foto-foto raw untuk dokumentasi Galeri Landing Page.
---------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) 
VALUES ('bji_galeri', 'bji_galeri', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access (Download) - Galeri" ON storage.objects FOR SELECT USING ( bucket_id = 'bji_galeri' );
CREATE POLICY "Admin Write - Galeri" ON storage.objects FOR ALL USING ( bucket_id = 'bji_galeri' AND auth.role() = 'authenticated' );
