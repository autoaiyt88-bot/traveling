-- ====================================================================
-- NUSA VOYAGE TRAVEL - SUPABASE DATABASE SCHEMA
-- ====================================================================
-- Jalankan skrip SQL ini langsung di Supabase Dashboard:
-- Masuk ke Project Anda -> SQL Editor -> Tempel & Klik 'RUN'

-- 1. Buat Tabel Pengguna (Users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'customer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Buat Tabel Pemesanan Tiket & Paket Wisata (Bookings)
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY,
    package_id TEXT NOT NULL,
    package_title TEXT NOT NULL,
    destination TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    participants INTEGER NOT NULL DEFAULT 1,
    travel_date DATE NOT NULL,
    notes TEXT,
    base_price NUMERIC NOT NULL,
    tax_fee NUMERIC NOT NULL DEFAULT 25000,
    total_price NUMERIC NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'QRIS E-Wallet',
    status TEXT NOT NULL DEFAULT 'Menunggu Verifikasi QRIS',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Indeks Performa untuk Pencarian Cepat
CREATE INDEX IF NOT EXISTS idx_bookings_email ON public.bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 5. Kebijakan Keamanan (Public & Authenticated Access)
-- Izinkan siapapun membaca data booking mereka sendiri atau memasukkan booking baru
CREATE POLICY "Allow public insert bookings" 
    ON public.bookings FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow public select bookings" 
    ON public.bookings FOR SELECT 
    USING (true);

CREATE POLICY "Allow public select users" 
    ON public.users FOR SELECT 
    USING (true);

CREATE POLICY "Allow public insert users" 
    ON public.users FOR INSERT 
    WITH CHECK (true);

-- 6. Data Awal Admin (Optional)
INSERT INTO public.users (email, password_hash, full_name, role)
VALUES ('admin@nusavoyage.com', 'admin123', 'NusaVoyage Administrator', 'admin')
ON CONFLICT (email) DO NOTHING;
