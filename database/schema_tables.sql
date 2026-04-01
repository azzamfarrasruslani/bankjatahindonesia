-- ==============================================================================
-- STRUKTUR TABEL DATABASE - BANK JATAH INDONESIA
-- Documented automatically from frontend integration models
-- ==============================================================================

-- 1. TABEL ARTIKEL
-- Digunakan untuk menyimpan tulisan blog / literasi edukasi (Halaman Artikel)
CREATE TABLE public.artikel (
    id SERIAL PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    kategori VARCHAR(100),
    isi TEXT NOT NULL,
    gambar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABEL BERITA
-- Digunakan untuk menyimpan berita terbaru & liputan kegiatan BJI (Halaman Berita)
CREATE TABLE public.berita (
    id SERIAL PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    kategori VARCHAR(100),
    slug VARCHAR(255) UNIQUE,
    deskripsi_singkat TEXT,
    isi TEXT NOT NULL,
    gambar_url TEXT,
    tanggal DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABEL FAQ
-- Menyimpan daftar pertanyaan umum dan jawabannya (Halaman PPU/FAQ)
CREATE TABLE public.faq (
    id SERIAL PRIMARY KEY,
    kategori VARCHAR(100) DEFAULT 'Lainnya',
    pertanyaan TEXT NOT NULL,
    jawaban TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABEL KONTAK
-- Menyimpan informasi kontak utama perusahaan (digunakan di Halaman Kontak & Footer)
-- Hanya butuh 1 baris record
CREATE TABLE public.kontak (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    telepon VARCHAR(50),
    whatsapp VARCHAR(50),
    whatsapp_link TEXT,
    facebook TEXT,
    instagram TEXT,
    alamat TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TABEL LOKASI & MITRA
-- Menyimpan titik peta, unit bisnis, dan lokasi operasional penjemputan jelantah (Halaman Jaringan Lokasi)
CREATE TABLE public.lokasi (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    jenis VARCHAR(50) DEFAULT 'mitra', -- 'utama' atau 'mitra'
    alamat TEXT NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    jam_operasional VARCHAR(255),
    kontak VARCHAR(100),
    gambar_url TEXT, -- Gambar thumbnail identitas
    gambar_kegiatan TEXT, -- Foto kegiatan dokumentasi
    link_video_youtube TEXT, -- Iframe Video url Embed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. TABEL PROGRAM
-- Menyimpan daftar layanan / program inisiatif BJI (Halaman Program Kami)
CREATE TABLE public.program (
    id SERIAL PRIMARY KEY,
    nama_program VARCHAR(255) NOT NULL,
    kategori VARCHAR(100),
    deskripsi TEXT,
    ikon VARCHAR(50), -- nama ikon lucide/feather
    gambar_url TEXT,
    syarat_ketentuan TEXT[], -- Array strings
    status VARCHAR(50) DEFAULT 'aktif',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. TABEL TIM (PROFIL/ABOUT US)
-- Menyimpan profil pimpinan/tim struktural BJI (Halaman Tentang Kami)
CREATE TABLE public.tim (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    jabatan VARCHAR(150),
    biografi TEXT,
    foto_url TEXT,
    linkedin_url TEXT,
    urutan INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. TABEL GALERI
-- Menyimpan daftar foto-foto dokumentasi operasional/kegiatan BJI (Halaman Galeri / Landing Page)
CREATE TABLE public.galeri (
    id SERIAL PRIMARY KEY,
    judul VARCHAR(255),
    deskripsi TEXT,
    url_gambar TEXT NOT NULL,
    kategori VARCHAR(100), -- Contoh: 'Kunjungan', 'Produksi'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. TABEL TESTIMONI
-- Menyimpan daftar cerita/testimoni pelanggan/mitra (Halaman Utama / Landing Page)
CREATE TABLE public.testimoni (
    id SERIAL PRIMARY KEY,
    nama_pengguna VARCHAR(255) NOT NULL,
    profesi VARCHAR(150),
    isi_testimoni TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
    foto_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. TABEL USERS (AUTH/DASHBOARD ACCESS)
-- Sistem Manajemen Pengguna Admin BJI
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Linked to auth.users if needed
    email VARCHAR(255) UNIQUE NOT NULL,
    nama VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin', -- 'admin', 'editor', 'mitra'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- SECURITY (ROW LEVEL SECURITY POLICIES) - DRAFT TEMPLATE
-- Jalankan ini agar tabel public bisa dibaca bebas oleh aplikasi NextJS 
-- dan dibatasi hanya bisa diedit oleh Authenticated Admin Panel
-- ==============================================================================

/*
-- Contoh RLS Standard: Read All Public, Write Auth Only
ALTER TABLE public.artikel ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access for artikel"
ON public.artikel FOR SELECT USING (true);

CREATE POLICY "Allow authenticated full access for artikel"
ON public.artikel FOR ALL USING (auth.role() = 'authenticated');
*/
