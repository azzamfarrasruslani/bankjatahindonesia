-- ==============================================================================
-- STRUKTUR TABEL DATABASE - BANK JATAH INDONESIA
-- Terakhir diperbarui: 2026-04-01 (sync dengan eksekusi ALTER TABLE)
-- ==============================================================================

-- 1. TABEL ARTIKEL
-- Digunakan untuk menyimpan tulisan blog / literasi edukasi (Halaman Artikel)
CREATE TABLE public.artikel (
    id SERIAL PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    kategori VARCHAR(100),
    isi TEXT NOT NULL,
    gambar_url TEXT,
    penulis VARCHAR(255) DEFAULT 'Admin',            -- Ditambahkan: nama penulis artikel
    is_top BOOLEAN DEFAULT false,                    -- Ditambahkan: flag artikel unggulan
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
    penulis VARCHAR(255) DEFAULT 'Admin',            -- Ditambahkan: nama penulis berita
    is_top BOOLEAN DEFAULT false,                    -- Ditambahkan: flag berita headline
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
-- Menyimpan titik peta, unit bisnis, dan lokasi operasional penjemputan jelantah
CREATE TABLE public.lokasi (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    jenis VARCHAR(50) DEFAULT 'mitra',               -- 'utama' atau 'mitra'
    alamat TEXT,
    deskripsi TEXT,                                  -- Ditambahkan: deskripsi singkat lokasi
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    jam_operasional VARCHAR(255),
    kontak VARCHAR(100),
    gambar_url TEXT,
    gambar_kegiatan TEXT,
    link_video_youtube TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. TABEL PROGRAM
-- Menyimpan daftar layanan / program inisiatif BJI (Halaman Program Kami)
-- CATATAN: Kolom direstrukturisasi dari schema awal agar cocok dengan frontend
CREATE TABLE public.program (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,                     -- Sebelumnya: nama_program
    description TEXT,                                -- Sebelumnya: deskripsi
    details TEXT[],                                  -- Sebelumnya: syarat_ketentuan
    icon_url TEXT,                                   -- Ditambahkan: URL ikon/gambar program
    gambar_url TEXT,
    button_label VARCHAR(255) DEFAULT 'Ikuti Program Ini', -- Ditambahkan: label CTA tombol
    status VARCHAR(50) DEFAULT 'Program Aktif',
    kategori VARCHAR(100),
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
    kategori VARCHAR(100) DEFAULT 'Tim Utama',       -- Ditambahkan: kategori tim
    status BOOLEAN DEFAULT true,                     -- Ditambahkan: status tampil/tidak
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. TABEL GALERI
-- Menyimpan daftar foto-foto dokumentasi operasional/kegiatan BJI (Halaman Galeri)
CREATE TABLE public.galeri (
    id SERIAL PRIMARY KEY,
    judul VARCHAR(255),
    deskripsi TEXT,
    tanggal DATE DEFAULT CURRENT_DATE,
    gambar_url TEXT,
    tipe VARCHAR(20) DEFAULT 'foto',                 -- 'foto' atau 'video'
    video_url TEXT,
    kategori VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. TABEL TESTIMONI
-- Menyimpan daftar cerita/testimoni pelanggan/mitra (Halaman Utama / Landing Page)
-- CATATAN: Kolom direstrukturisasi dari schema awal
CREATE TABLE public.testimoni (
    id SERIAL PRIMARY KEY,
    nama_pengguna VARCHAR(255) NOT NULL,             -- Sebelumnya: nama
    profesi VARCHAR(150),
    isi_testimoni TEXT NOT NULL,                     -- Sebelumnya: isi
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
    foto_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. TABEL USERS (AUTH/DASHBOARD ACCESS)
-- Sistem Manajemen Pengguna Admin BJI
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    nama_lengkap VARCHAR(255) NOT NULL,              -- Sebelumnya: nama
    no_telepon VARCHAR(20),                          -- Ditambahkan
    alamat TEXT,                                     -- Ditambahkan
    status_aktif BOOLEAN DEFAULT true,               -- Ditambahkan
    role VARCHAR(50) DEFAULT 'admin',
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

-- ==============================================================================
-- MIGRATION LOG - Perubahan dari schema awal ke schema saat ini
-- ==============================================================================
/*
2026-04-01 - Sesi sinkronisasi frontend ↔ database:

ALTER TABLE public.tim ADD COLUMN IF NOT EXISTS kategori VARCHAR(100) DEFAULT 'Tim Utama';
ALTER TABLE public.tim ADD COLUMN IF NOT EXISTS status BOOLEAN DEFAULT true;

ALTER TABLE public.berita ADD COLUMN IF NOT EXISTS penulis VARCHAR(255) DEFAULT 'Admin';
ALTER TABLE public.berita ADD COLUMN IF NOT EXISTS is_top BOOLEAN DEFAULT false;

ALTER TABLE public.artikel ADD COLUMN IF NOT EXISTS penulis VARCHAR(255) DEFAULT 'Admin';
ALTER TABLE public.artikel ADD COLUMN IF NOT EXISTS is_top BOOLEAN DEFAULT false;

ALTER TABLE public.lokasi ADD COLUMN IF NOT EXISTS deskripsi TEXT;

ALTER TABLE public.program RENAME COLUMN nama_program TO title;
ALTER TABLE public.program RENAME COLUMN deskripsi TO description;
ALTER TABLE public.program RENAME COLUMN syarat_ketentuan TO details;
ALTER TABLE public.program ADD COLUMN IF NOT EXISTS icon_url TEXT;
ALTER TABLE public.program ADD COLUMN IF NOT EXISTS button_label VARCHAR(255) DEFAULT 'Ikuti Program Ini';

ALTER TABLE public.users RENAME COLUMN nama TO nama_lengkap;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS no_telepon VARCHAR(20);
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS alamat TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS status_aktif BOOLEAN DEFAULT true;

-- Testimoni: kolom lama (nama, isi) → kolom baru (nama_pengguna, isi_testimoni)
-- Kolom tanggal dihapus karena tidak digunakan
*/
