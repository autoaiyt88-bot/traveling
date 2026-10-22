/**
 * ====================================================================
 * LAYANAN DATABASE & BACKEND (Simulasi PostgreSQL Database Engine)
 * ====================================================================
 * File ini bertindak sebagai backend API & database PostgreSQL terstruktur.
 * Data disimpan secara persisten di LocalStorage dengan format relasional
 * (users, bookings, payments).
 * 
 * Dilengkapi juga dengan DDL SQL PostgreSQL murni jika di masa mendatang
 * ingin dihubungkan langsung ke server database PostgreSQL nyata (Supabase / Neon / RDS).
 */

const DB_STORAGE_KEY = "nusavoyage_pg_database";
const AUTH_SESSION_KEY = "nusavoyage_auth_session";

// Skrip Skema SQL PostgreSQL Resmi untuk referensi produksi
export const POSTGRESQL_DDL_SCHEMA = `
-- 1. TABEL PENGGUNA (USERS)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(25),
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'traveler',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABEL PEMESANAN (BOOKINGS)
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  booking_code VARCHAR(30) UNIQUE NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  package_id VARCHAR(50) NOT NULL,
  package_title VARCHAR(150) NOT NULL,
  travel_date DATE NOT NULL,
  total_guests INT NOT NULL DEFAULT 1,
  unit_price NUMERIC(14, 2) NOT NULL,
  tax_fee NUMERIC(14, 2) NOT NULL,
  total_amount NUMERIC(14, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_status VARCHAR(30) DEFAULT 'PAID',
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABEL PEMBAYARAN (PAYMENTS)
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  booking_id INT REFERENCES bookings(id) ON DELETE CASCADE,
  transaction_ref VARCHAR(50) UNIQUE NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  amount NUMERIC(14, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'SUCCESS',
  paid_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

// Helper untuk inisialisasi awal database
function getInitialDatabase() {
  const existing = localStorage.getItem(DB_STORAGE_KEY);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch (e) {
      console.error("Error parsing PostgreSQL storage:", e);
    }
  }

  // Database Seed Awal
  const seed = {
    users: [
      {
        id: 1,
        full_name: "Tirta Pratama",
        email: "traveler@nusavoyage.com",
        phone: "+62 812-3456-7890",
        password_hash: "traveler2026", // simulasi password
        role: "admin",
        created_at: new Date("2026-01-10T08:00:00Z").toISOString(),
      },
      {
        id: 2,
        full_name: "Budi Santoso",
        email: "budi@example.com",
        phone: "+62 813-9876-5432",
        password_hash: "rahasia123",
        role: "traveler",
        created_at: new Date("2026-02-15T10:30:00Z").toISOString(),
      },
    ],
    bookings: [
      {
        id: 101,
        booking_code: "NV-2026-8921",
        user_id: 1,
        customer_name: "Tirta Pratama",
        customer_email: "traveler@nusavoyage.com",
        customer_phone: "+62 812-3456-7890",
        package_id: "pkg-1",
        package_title: "Golden Route Japan Autumn & Winter",
        destination: "Tokyo - Kyoto - Osaka",
        travel_date: "2026-11-15",
        total_guests: 1,
        unit_price: 1850000,
        tax_fee: 25000,
        total_amount: 1875000,
        payment_method: "QRIS E-Wallet",
        payment_status: "LUNAS (PAID)",
        transaction_ref: "TRX-QRIS-8891238",
        created_at: "2026-10-20 14:30 WIB",


      },
    ],
  };

  localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

// Simpan ke storage
function saveDatabase(data) {
  localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(data));
}

// ====================================================================
// API SERVICE (Autentikasi & Booking)
// ====================================================================

export const dbService = {
  // 1. Ambil Sesi Login Pengguna Aktif
  getCurrentSession() {
    const sessionStr = localStorage.getItem(AUTH_SESSION_KEY);
    if (!sessionStr) return null;
    try {
      return JSON.parse(sessionStr);
    } catch {
      return null;
    }
  },

  // 2. Simpan Sesi Login
  setSession(user) {
    const sessionData = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: "pg_jwt_simulated_token_" + Date.now(),
      login_time: new Date().toISOString(),
    };
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(sessionData));
    return sessionData;
  },

  // 3. Logout / Hapus Sesi
  logout() {
    localStorage.removeItem(AUTH_SESSION_KEY);
  },

  // 4. Autentikasi Login (Simulasi Query SQL: SELECT * FROM users WHERE email = $1)
  async login(email, password) {
    // Simulasi delay latency jaringan server ~300ms
    await new Promise((resolve) => setTimeout(resolve, 350));

    const db = getInitialDatabase();
    const cleanEmail = email.trim().toLowerCase();

    const user = db.users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      throw new Error("Email tidak terdaftar di database! Periksa kembali atau buat akun baru.");
    }

    if (user.password_hash !== password) {
      throw new Error("Password yang Anda masukkan salah! Silakan coba lagi.");
    }

    // Login Sukses
    const session = this.setSession(user);
    return {
      success: true,
      message: `Login berhasil! Selamat datang kembali, ${user.full_name}.`,
      user: session,
    };
  },

  // 5. Registrasi Pengguna Baru (Simulasi SQL: INSERT INTO users ...)
  async register({ fullName, email, phone, password }) {
    await new Promise((resolve) => setTimeout(resolve, 350));

    const db = getInitialDatabase();
    const cleanEmail = email.trim().toLowerCase();

    // Validasi apakah email sudah dipakai
    const existing = db.users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error("Email ini sudah digunakan oleh akun lain! Silakan gunakan email lain.");
    }

    const newUser = {
      id: Date.now(),
      full_name: fullName.trim(),
      email: cleanEmail,
      phone: phone.trim() || "-",
      password_hash: password,
      role: "traveler",
      created_at: new Date().toISOString(),
    };

    db.users.push(newUser);
    saveDatabase(db);

    const session = this.setSession(newUser);
    return {
      success: true,
      message: "Registrasi berhasil! Akun Anda telah disimpan di database PostgreSQL.",
      user: session,
    };
  },

  // 6. Buat Pemesanan & Pembayaran Baru (Simulasi Transaksi SQL: INSERT INTO bookings, payments)
  async createBooking(bookingData) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const db = getInitialDatabase();
    const session = this.getCurrentSession();

    const bookingCode = "NV-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
    const transactionRef = "TRX-" + Math.random().toString(36).substring(2, 9).toUpperCase();

    const newBooking = {
      id: Date.now(),
      booking_code: bookingCode,
      user_id: session ? session.id : 0,
      customer_name: bookingData.customerName,
      customer_email: bookingData.customerEmail,
      customer_phone: bookingData.customerPhone,
      package_id: bookingData.packageId,
      package_title: bookingData.packageTitle,
      destination: bookingData.destination,
      travel_date: bookingData.travelDate,
      total_guests: Number(bookingData.totalGuests),
      unit_price: Number(bookingData.unitPrice),
      tax_fee: Number(bookingData.taxFee),
      total_amount: Number(bookingData.totalAmount),
      payment_method: bookingData.paymentMethod,
      payment_status: "LUNAS (PAID)",
      transaction_ref: transactionRef,
      special_requests: bookingData.specialRequests || "-",
      created_at: new Date().toLocaleString("id-ID"),
    };

    db.bookings.unshift(newBooking);
    saveDatabase(db);

    return {
      success: true,
      booking: newBooking,
      message: "Pembayaran berhasil dikonfirmasi! Tiket digital telah diterbitkan.",
    };
  },

  // 7. Ambil Riwayat Booking
  getBookings() {
    const db = getInitialDatabase();
    return db.bookings || [];
  },

  // 8. Ambil Semua Pengguna Terdaftar (untuk Modal Database Inspector)
  getAllUsers() {
    const db = getInitialDatabase();
    return db.users || [];
  },

  // 9. Reset / Kosongkan Database
  resetDatabase() {
    localStorage.removeItem(DB_STORAGE_KEY);
    return getInitialDatabase();
  },
};
