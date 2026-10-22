import { createClient } from "@supabase/supabase-js";
import { dbService } from "./db";

/**
 * ====================================================================
 * SUPABASE CLOUD DATABASE SERVICE (dengan Fallback PostgreSQL Lokal)
 * ====================================================================
 * Menyediakan integrasi Supabase resmi untuk NusaVoyage.
 * Jika URL & Anon Key tersedia di .env -> otomatis tersambung ke Cloud Supabase.
 * Jika belum diisi -> fallback mulus ke Persistent Local PostgreSQL Storage (localStorage).
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== "https://your-project.supabase.co" &&
  !supabaseUrl.includes("your-project")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isSupabaseConfigured) {
  console.info(
    "%c[Supabase]%c Mode Offline/Localhost aktif (Fallback PostgreSQL Storage). Untuk menyambungkan ke Supabase Cloud nyata, salin file .env.example menjadi .env lalu isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.",
    "color: #10b981; font-weight: bold;",
    "color: inherit;"
  );
}

/**
 * Layanan Database Terpadu (Unified Database Service)
 * Menggunakan Supabase jika terkonfigurasi, atau PostgreSQL Simulator lokal.
 */
export const unifiedDb = {
  isCloud: isSupabaseConfigured,

  // 1. Ambil seluruh data booking
  async getBookings() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        return data || [];
      } catch (err) {
        console.warn("[Supabase] Gagal mengambil bookings cloud, fallback ke lokal:", err.message);
      }
    }
    return dbService.getBookings();
  },

  // 2. Buat booking baru
  async createBooking(payload) {
    // Simpan ke local db terlebih dahulu
    const localRes = await dbService.createBooking(payload);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("bookings")
          .insert([
            {
              booking_code: localRes.booking.booking_code,
              package_id: payload.packageId,
              package_title: payload.packageTitle,
              destination: payload.destination,
              customer_name: payload.customerName,
              customer_email: payload.customerEmail,
              customer_phone: payload.customerPhone,
              travel_date: payload.travelDate,
              total_guests: payload.totalGuests,
              unit_price: payload.unitPrice,
              tax_fee: payload.taxFee,
              total_amount: payload.totalAmount,
              payment_method: payload.paymentMethod,
              payment_status: "LUNAS (PAID)",
              special_requests: payload.specialRequests || "",
              transaction_ref: localRes.booking.transaction_ref,
            },
          ])
          .select()
          .single();

        if (error) {
          console.warn("[Supabase Insert Error]:", error.message);
        } else {
          return { success: true, booking: data };
        }
      } catch (err) {
        console.warn("[Supabase Exception]:", err.message);
      }
    }

    return localRes;
  },

  // 3. Autentikasi Pengguna
  async login(email, password) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data?.user) {
          const session = {
            id: data.user.id,
            full_name: data.user.user_metadata?.full_name || email.split("@")[0],
            email: data.user.email,
            role: "traveler",
          };
          dbService.saveSession(session);
          return { success: true, user: session };
        }
      } catch (err) {
        console.warn("[Supabase Login] Fallback ke lokal auth:", err.message);
      }
    }
    return dbService.login(email, password);
  },

  // 4. Registrasi Pengguna
  async register(fullName, email, phone, password) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone: phone,
            },
          },
        });
        if (error) throw error;
        if (data?.user) {
          const session = {
            id: data.user.id,
            full_name: fullName,
            email,
            phone,
            role: "traveler",
          };
          dbService.saveSession(session);
          return { success: true, user: session };
        }
      } catch (err) {
        console.warn("[Supabase Register] Fallback ke lokal:", err.message);
      }
    }
    return dbService.register(fullName, email, phone, password);
  },

  // 5. Ambil Sesi Aktif
  getCurrentSession() {
    return dbService.getCurrentSession();
  },

  // 6. Logout
  async logout() {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        // ignore
      }
    }
    dbService.logout();
  },
};
