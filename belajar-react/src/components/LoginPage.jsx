import { useState } from "react";
import {
  IconCompass,
  IconMail,
  IconLock,
  IconUser,
  IconPhone,
  IconEye,
  IconEyeOff,
  IconShield,
  IconCheckCircle,
  IconDatabase,
} from "./Icons";
import { dbService } from "../services/db";
import { unifiedDb } from "../services/supabase";
import logoImg from "../assets/logo.png";


/**
 * ====================================================================
 * HALAMAN LOGIN & REGISTRASI (Dengan Backend Validasi PostgreSQL)
 * ====================================================================
 * Halaman awal autentikasi dengan latar belakang destinasi wisata dunia.
 * Terhubung langsung ke layanan PostgreSQL (dbService) untuk memvalidasi
 * kecocokan email dan password.
 */
export default function LoginPage({ onLoginSuccess, onGuestEnter }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  // Loading & Alert State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Quick autofill demo account
  function handleQuickFillDemo() {
    setEmail("traveler@nusavoyage.com");
    setPassword("traveler2026");
    setErrorMsg("");
  }

  // Handle Submit Form
  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      if (isRegisterMode) {
        // Registrasi Akun Baru ke Database PostgreSQL
        if (!fullName.trim()) throw new Error("Nama lengkap wajib diisi!");
        if (!email.trim() || !email.includes("@")) throw new Error("Alamat email tidak valid!");
        if (!password || password.length < 6) throw new Error("Password minimal 6 karakter!");

        const res = await dbService.register({
          fullName,
          email,
          phone,
          password,
        });

        setSuccessMsg(res.message);
        setTimeout(() => {
          onLoginSuccess(res.user);
        }, 800);
      } else {
        // Login & Verifikasi Kredensial ke Database
        if (!email.trim()) throw new Error("Masukkan email Anda!");
        if (!password) throw new Error("Masukkan password Anda!");

        const res = await dbService.login(email, password);
        setSuccessMsg(res.message);
        setTimeout(() => {
          onLoginSuccess(res.user);
        }, 700);
      }
    } catch (err) {
      setErrorMsg(err.message || "Terjadi kesalahan pada server!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-page-container">
      {/* Background Gambar Traveling Luar Negeri dengan Overlay Gelap Mewah */}
      <div className="login-bg-media">
        <img
          src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1920&q=85&auto=format&fit=crop"
          alt="Matterhorn Swiss Alps"
          className="login-bg-img"
        />
        <div className="login-bg-overlay"></div>
      </div>

      {/* Konten Kiri: Branding & Keindahan Traveling */}
      <div className="login-left-info">
        <div className="brand-header">
          <div className="brand-logo-circle">
            <img src={logoImg} alt="NusaVoyage Logo" className="login-logo-img" />
          </div>
          <span className="brand-title">NusaVoyage</span>
        </div>

        <div className="login-tagline-box">
          <span className="sub-tag">PORTAL WISATA INTERNASIONAL BERLISENSI</span>
          <h1>Jelajahi Sudut Terindah Dunia Tanpa Batas</h1>
          <p>
            Masuk ke akun Anda untuk mengakses paket wisata eksklusif ke Jepang,
            Swiss, Paris, Turki, dan Maladewa dengan konfirmasi booking instan
            serta perlindungan asuransi penuh.
          </p>
        </div>

        <div className="login-features-list">
          <div className="feat-item">
            <IconShield size={20} color="#38bdf8" />
            <span>Kemenparekraf & IATA Licensed Travel Agency</span>
          </div>
          <div className="feat-item">
            <IconCheckCircle size={20} color="#38bdf8" />
            <span>Garansi 100% Keberangkatan & Akomodasi Hotel Bintang 5</span>
          </div>
          <div className="feat-item">
            <IconDatabase size={20} color="#38bdf8" />
            <span>Terintegrasi Database Relasional PostgreSQL</span>
          </div>
        </div>

        <div className="login-footer-info">
          <span>© 2026 NusaVoyage International. Hak Cipta Dilindungi.</span>
        </div>
      </div>

      {/* Konten Kanan: Card Formulir Login / Registrasi */}
      <div className="login-card-wrapper">
        <div className="login-card">
          <div className="login-card-header">
            <h2>{isRegisterMode ? "Daftar Akun Baru" : "Masuk ke Akun Anda"}</h2>
            <p>
              {isRegisterMode
                ? "Lengkapi formulir di bawah untuk menyimpan profil ke database"
                : "Masukkan email dan password terdaftar Anda"}
            </p>
          </div>

          {/* Quick Demo Button */}
          {!isRegisterMode && (
            <div className="demo-account-banner">
              <div className="demo-text">
                <strong>Akun Pengujian Demo (PostgreSQL):</strong>
                <code>traveler@nusavoyage.com | traveler2026</code>
              </div>
              <button
                type="button"
                className="btn-demo-autofill"
                onClick={handleQuickFillDemo}
                title="Isi otomatis form dengan akun demo"
              >
                Autofill
              </button>
            </div>
          )}

          {/* Notifikasi Pesan Sukses / Error */}
          {errorMsg && (
            <div className="login-alert error">
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="login-alert success">
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {isRegisterMode && (
              <>
                {/* Nama Lengkap */}
                <div className="form-field">
                  <label htmlFor="reg-fullname">Nama Lengkap</label>
                  <div className="input-with-icon">
                    <IconUser size={18} color="#64748b" className="field-icon" />
                    <input
                      id="reg-fullname"
                      type="text"
                      placeholder="Contoh: Tirta Pratama"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Nomor HP / WhatsApp */}
                <div className="form-field">
                  <label htmlFor="reg-phone">Nomor Telepon / WhatsApp</label>
                  <div className="input-with-icon">
                    <IconPhone size={18} color="#64748b" className="field-icon" />
                    <input
                      id="reg-phone"
                      type="tel"
                      placeholder="Contoh: 081234567890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email Address */}
            <div className="form-field">
              <label htmlFor="auth-email">Alamat Email</label>
              <div className="input-with-icon">
                <IconMail size={18} color="#64748b" className="field-icon" />
                <input
                  id="auth-email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-field">
              <label htmlFor="auth-password">Password</label>
              <div className="input-with-icon">
                <IconLock size={18} color="#64748b" className="field-icon" />
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password Anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Tampilkan / Sembunyikan Password"
                >
                  {showPassword ? (
                    <IconEyeOff size={18} color="#64748b" />
                  ) : (
                    <IconEye size={18} color="#64748b" />
                  )}
                </button>
              </div>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              className="btn-auth-submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Memverifikasi Database..."
                : isRegisterMode
                ? "Daftar Akun Baru"
                : "Masuk ke Dashboard"}
            </button>
          </form>

          {/* Switch Mode: Sign In vs Register */}
          <div className="auth-switch-box">
            <span>
              {isRegisterMode
                ? "Sudah memiliki akun terdaftar?"
                : "Belum punya akun traveler?"}
            </span>
            <button
              type="button"
              className="btn-switch-mode"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setErrorMsg("");
                setSuccessMsg("");
              }}
            >
              {isRegisterMode ? "Masuk di sini" : "Daftar Sekarang"}
            </button>
          </div>

          {/* Opsi Akses Tamu Langsung */}
          <div className="guest-entry-box">
            <div className="divider-line">
              <span>atau</span>
            </div>
            <button
              type="button"
              className="btn-guest-enter"
              onClick={onGuestEnter}
            >
              Jelajahi Company Profile Langsung (Mode Tamu)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
