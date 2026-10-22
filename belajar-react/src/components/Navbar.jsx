import { useState, useEffect, useRef } from "react";
import {
  IconCompass,
  IconWhatsApp,
  IconUser,
  IconLogOut,
  IconDatabase,
  IconChevronDown,
  IconX,
} from "./Icons";
import { companyProfile } from "../data/travelData";
import logoImg from "../assets/logo.png";

/**
 * ====================================================================
 * KOMPONEN NAVBAR (Navigasi Utama, Oval Settings Menu & WhatsApp CTA)
 * ====================================================================
 * Update:
 * - Tombol database di navbar utama dihapus agar navbar tidak penuh.
 * - Tombol user & logout diubah menjadi tombol OVAL minimalis yang membuka
 *   dropdown menu pengaturan (Settings Menu).
 */
export default function Navbar({
  currentUser,
  onLogout,
  onOpenLogin,
  onOpenDatabase,
  bookingCount = 0,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  // Deteksi scroll untuk efek background blur navbar
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup dropdown settings saat klik di luar menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const whatsappUrl = `https://wa.me/${companyProfile.whatsapp.number}?text=${encodeURIComponent(
    companyProfile.whatsapp.defaultMessage
  )}`;

  return (
    <header className={`main-navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* 1. Brand Logo */}
        <a href="#hero" className="navbar-brand">
          <div className="brand-icon-box">
            <img src={logoImg} alt="NusaVoyage Logo" className="navbar-logo-img" />
          </div>
          <div className="brand-text-box">
            <span className="brand-name">{companyProfile.shortName}</span>
            <span className="brand-sub">TRAVEL & TOURS</span>
          </div>
        </a>

        {/* 2. Menu Navigasi Desktop */}
        <nav className="desktop-nav">
          <a href="#hero" className="nav-link">Beranda</a>
          <a href="#about" className="nav-link">Tentang Kami</a>
          <a href="#destinations" className="nav-link">Destinasi</a>
          <a href="#packages" className="nav-link">Paket Tour</a>
          <a href="#why-us" className="nav-link">Keunggulan</a>
          <a href="#testimonials" className="nav-link">Testimoni</a>
          <a href="#gallery" className="nav-link">Galeri</a>
          <a href="#faq" className="nav-link">FAQ</a>
          <a href="#contact" className="nav-link">Kontak</a>
        </nav>

        {/* 3. Aksi Kanan: Oval Settings Menu & Tombol WhatsApp */}
        <div className="navbar-actions">
          {/* User Session: OVAL SETTINGS BUTTON dengan Dropdown Menu */}
          {currentUser ? (
            <div className="user-settings-wrapper" ref={settingsRef}>
              <button
                type="button"
                className={`user-oval-btn ${isSettingsOpen ? "active" : ""}`}
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                title="Menu Pengaturan & Profil"
                aria-expanded={isSettingsOpen}
              >
                <div className="user-oval-avatar">
                  <IconUser size={15} color="#0284c7" />
                </div>
                <span className="user-oval-name">
                  {currentUser.full_name ? currentUser.full_name.split(" ")[0] : "Profil"}
                </span>
                <IconChevronDown
                  size={13}
                  color="#64748b"
                  className={`oval-arrow ${isSettingsOpen ? "rotated" : ""}`}
                />
              </button>

              {/* Dropdown Menu Pengaturan */}
              {isSettingsOpen && (
                <div className="settings-dropdown-menu">
                  <div className="dropdown-user-header">
                    <div className="dropdown-avatar-circle">
                      <IconUser size={18} color="#0369a1" />
                    </div>
                    <div className="dropdown-user-details">
                      <strong className="user-full-name">{currentUser.full_name}</strong>
                      <span className="user-email-text">{currentUser.email}</span>
                      <span className="user-role-badge">{currentUser.role || "Traveler"}</span>
                    </div>
                  </div>

                  <div className="dropdown-menu-divider"></div>

                  <div className="dropdown-menu-list">
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setIsSettingsOpen(false);
                        onOpenDatabase();
                      }}
                    >
                      <IconDatabase size={16} color="#0284c7" />
                      <span>Database & Riwayat</span>
                      {bookingCount > 0 && (
                        <span className="dropdown-item-badge">{bookingCount}</span>
                      )}
                    </button>

                    <button
                      type="button"
                      className="dropdown-item logout-danger"
                      onClick={() => {
                        setIsSettingsOpen(false);
                        onLogout();
                      }}
                    >
                      <IconLogOut size={16} color="#ef4444" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              className="btn-nav-login"
              onClick={onOpenLogin}
            >
              Masuk
            </button>
          )}

          {/* Tombol WhatsApp Utama */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-nav-whatsapp"
            title="Chat Langsung via WhatsApp"
          >
            <IconWhatsApp size={18} color="#ffffff" />
            <span className="wa-text">Konsultasi WA</span>
          </a>

          {/* Tombol Hamburger Mobile */}
          <button
            type="button"
            className="btn-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <IconX size={24} color="#0f172a" />
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 4. Menu Navigasi Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav-links">
            <a href="#hero" onClick={() => setIsMobileMenuOpen(false)}>Beranda</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>Tentang Kami</a>
            <a href="#destinations" onClick={() => setIsMobileMenuOpen(false)}>Destinasi</a>
            <a href="#packages" onClick={() => setIsMobileMenuOpen(false)}>Paket Tour</a>
            <a href="#why-us" onClick={() => setIsMobileMenuOpen(false)}>Keunggulan</a>
            <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)}>Testimoni</a>
            <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)}>Galeri</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Kontak</a>
          </nav>

          <div className="mobile-drawer-footer">
            {currentUser && (
              <div className="mobile-drawer-user-info">
                <span>Login sebagai: <strong>{currentUser.full_name}</strong></span>
                <button
                  type="button"
                  className="btn-drawer-logout"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout();
                  }}
                >
                  <IconLogOut size={15} color="#ef4444" />
                  <span>Keluar Akun</span>
                </button>
              </div>
            )}

            <button
              type="button"
              className="btn-drawer-db"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenDatabase();
              }}
            >
              <IconDatabase size={18} />
              <span>Inspeksi Database ({bookingCount})</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-drawer-wa"
            >
              <IconWhatsApp size={20} color="#ffffff" />
              <span>Hubungi Kami di WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
