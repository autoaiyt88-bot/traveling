# ✈️ NusaVoyage - Modern International Travel & Tour Platform

Website profil perusahaan biro perjalanan wisata internasional (*International Travel Agency & Tour Operator*) modern berstandar industri dengan integrasi ekosistem teknologi terlengkap.

---

## 🛠️ Arsitektur & Teknologi Stack

| Komponen | Teknologi | Keterangan & Implementasi |
| :--- | :--- | :--- |
| **DESIGN** | **Google Stitch Philosophy** | Estetika visual premium, glassmorphism, tipografi modern, animasi mikro scanner laser real-time. |
| **CODING** | **VS Code + Codex / Antigravity** | Arsitektur modular berbasis komponen, *clean code*, dual-mode database service, full type safety. |
| **FRONTEND** | **React 19 + Vite 8** | Single Page Application (SPA) berkecepatan tinggi, Hot Module Replacement (HMR) instan. |
| **STYLING** | **Tailwind CSS v3 + PostCSS** | Desain responsif berbasis token warna HSL semantik, dark-mode ready, class utility ringkas. |
| **COMPONENTS** | **shadcn/ui Primitives** | `Button`, `Card`, `Badge`, `Tabs`, `Avatar`, `Input`, `Label`, `Separator` dengan `cn()` helper. |
| **ICONS** | **Lucide React** | Ikon vektor modern (`lucide-react`) terstandarisasi di seluruh halaman dan navigasi. |
| **DATABASE** | **Supabase (PostgreSQL Cloud)** | Dual-mode: Berjalan offline dengan *local fallback* atau tersambung langsung ke cloud database Supabase. |
| **VERSIONING** | **Git & GitHub** | CI/CD automated pipeline via GitHub Actions (`.github/workflows/ci.yml`). |
| **TESTING** | **Chrome DevTools + Playwright** | E2E multi-device testing (`playwright.config.js` & `tests/website.spec.js`). |
| **DEPLOYMENT** | **Vercel & Netlify** | SPA routing rewrite manifest siap pakai (`vercel.json` & `netlify.toml`). |

---

## 🚀 Fitur Unggulan

1. **Harga Paket Wisata Di Bawah Rp 2.000.000**:
   - 🌸 **Tokyo & Kyoto Cherry Blossom**: Rp 1.850.000
   - 🏔️ **Swiss Alps & Zermatt Express**: Rp 1.950.000
   - 🎈 **Cappadocia Magical Hot Balloon**: Rp 1.450.000
   - 🏝️ **Maldives Private Water Villa**: Rp 1.650.000
2. **Interactive QRIS Real-Time Scanner**:
   - Pemindai laser beranimasi vertikal menembus kode QR resmi.
   - Dilengkapi countdown timer 15 menit, validasi instan, dan e-tiket otomatis.
3. **Dual-Mode Database (Supabase + Local PostgreSQL Simulation)**:
   - Tanpa setup backend, aplikasi langsung bekerja dengan local storage storage engine.
   - Cukup masukkan kredensial Supabase di `.env` untuk sinkronisasi cloud instan.
4. **Shadcn UI Design System**:
   - Komponen UI terstruktur rapi di `src/components/ui/` dengan varian `class-variance-authority`.

---

## 📦 Panduan Instalasi & Menjalankan Proyek

### 1. Menjalankan Server Lokal (Development)
```bash
# Masuk ke folder proyek
cd belajar-react

# Install dependensi (jika baru di-clone)
npm install

# Jalankan Vite dev server
npm run dev
```
Akses di browser: `http://localhost:5173/`

### 2. Validasi & Build Produksi
```bash
npm run build
```
Hasil build siap rilis akan dihasilkan di folder `dist/`.

### 3. Menjalankan Automated Testing (Playwright)
```bash
# Menjalankan seluruh skenario pengujian E2E
npx playwright test

# Menjalankan test dengan mode visual UI
npx playwright test --ui
```

---

## 🗄️ Menghubungkan ke Supabase (Opsional)

1. Buat proyek baru di [Supabase Dashboard](https://supabase.com).
2. Salin isi skrip SQL dari file `supabase/schema.sql` dan jalankan di **SQL Editor** Supabase.
3. Salin file `.env.example` menjadi `.env` di root proyek:
   ```env
   VITE_SUPABASE_URL=https://proyek-anda.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Restart server dev (`npm run dev`), sistem akan otomatis mendeteksi koneksi Supabase Cloud!

---

## 🌐 Panduan Deployment

### Opsi A: Deploy ke Vercel
1. Pastikan kode Anda sudah di-push ke GitHub.
2. Buka [Vercel](https://vercel.com) -> **Add New Project**.
3. Hubungkan repositori GitHub Anda.
4. Vercel akan otomatis mendeteksi `vercel.json` dan Vite. Klik **Deploy**!

### Opsi B: Deploy ke Netlify
1. Buka [Netlify](https://netlify.com) -> **Add new site** -> **Import an existing project**.
2. Pilih repositori GitHub Anda.
3. Netlify otomatis membaca konfigurasi `netlify.toml` (Build command: `npm run build`, Publish directory: `dist`).
4. Klik **Deploy site**.
