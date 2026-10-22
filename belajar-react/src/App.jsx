import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Destinations from "./components/Destinations";
import TravelPackages from "./components/TravelPackages";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import BookingModal from "./components/BookingModal";
import DatabaseModal from "./components/DatabaseModal";
import { IconWhatsApp } from "./components/Icons";
import { companyProfile } from "./data/travelData";
import { dbService } from "./services/db";
import "./App.css";

/**
 * ====================================================================
 * APLIKASI UTAMA (NusaVoyage International Travel Company Profile)
 * ====================================================================
 * Mengatur alur:
 * 1. Halaman Login / Registrasi dengan Autentikasi PostgreSQL
 * 2. Landing Page Company Profile Lengkap (11 Section)
 * 3. Alur Booking & Payment Interaktif
 * 4. Inspektor Database Relasional PostgreSQL
 */
function App() {
  // Sesi Pengguna Aktif (Diambil dari LocalStorage PostgreSQL)
  const [currentUser, setCurrentUser] = useState(() => dbService.getCurrentSession());
  
  // Status apakah pengguna memilih menjelajah sebagai tamu
  const [isGuestMode, setIsGuestMode] = useState(false);

  // Status Modal Pemesanan (Menyimpan paket yang dipilih beserta opsi)
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState(null);
  const [bookingOptions, setBookingOptions] = useState({ initialStep: 1, paymentMethod: "QRIS E-Wallet" });

  // Status Modal Database Inspector
  const [isDbInspectorOpen, setIsDbInspectorOpen] = useState(false);

  // Status Total Transaksi Pemesanan (untuk badge navbar)
  const [bookingCount, setBookingCount] = useState(() => dbService.getBookings().length);

  // Sinkronisasi jumlah booking setiap kali ada perubahan
  function handleBookingSuccess() {
    setBookingCount(dbService.getBookings().length);
  }

  // Handle Login Sukses
  function handleLoginSuccess(userSession) {
    setCurrentUser(userSession);
    setIsGuestMode(false);
  }

  // Handle Logout
  function handleLogout() {
    dbService.logout();
    setCurrentUser(null);
    setIsGuestMode(false);
  }

  // Tautan Langsung WhatsApp Floating Action Button
  const waFloatingUrl = `https://wa.me/${companyProfile.whatsapp.number}?text=${encodeURIComponent(
    "Halo NusaVoyage, saya ingin konsultasi paket wisata luar negeri."
  )}`;

  // ==================================================================
  // JIKA BELUM LOGIN & BUKAN MODE TAMU -> TAMPILKAN HALAMAN LOGIN
  // (Sesuai Permintaan: "Halaman pertama ada halaman login nya beserta gambar luar negeri & backend validasi")
  // ==================================================================
  if (!currentUser && !isGuestMode) {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onGuestEnter={() => setIsGuestMode(true)}
      />
    );
  }

  // ==================================================================
  // HALAMAN UTAMA / BERANDA COMPANY PROFILE & BOOKING
  // ==================================================================
  return (
    <div className="travel-app-root">
      {/* 1. Navbar Utama */}
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenLogin={() => {
          setIsGuestMode(false);
          setCurrentUser(null);
        }}
        onOpenDatabase={() => setIsDbInspectorOpen(true)}
        bookingCount={bookingCount}
      />

      {/* Konten Utama Section */}
      <main>
        {/* 2. Hero Section dengan Filter Pencarian */}
        <Hero
          onSearchDestination={({ destination }) => {
            const pkgSection = document.getElementById("packages");
            if (pkgSection) pkgSection.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 3. About Us (Profil & Keunggulan) */}
        <AboutUs />

        {/* 4. Destinasi Wisata Populer */}
        <Destinations
          onSelectDestination={() => {
            const pkgSection = document.getElementById("packages");
            if (pkgSection) pkgSection.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 5. Paket Traveling & Tombol Pemesanan */}
        <TravelPackages
          onBookPackage={(pkg, options = { initialStep: 1, paymentMethod: "QRIS E-Wallet" }) => {
            setSelectedPackageForBooking(pkg);
            setBookingOptions(options);
          }}
        />

        {/* 6. Why Choose Us (Keunggulan Layanan) */}
        <WhyChooseUs />

        {/* 7. Testimoni Pelanggan */}
        <Testimonials />

        {/* 8. Galeri Perjalanan */}
        <Gallery />

        {/* 9. FAQ (Tanya Jawab Accordion) */}
        <FAQ />

        {/* 10. Contact Section (WhatsApp, Email & Alamat) */}
        <Contact />
      </main>

      {/* 11. Footer Resmi Perusahaan */}
      <Footer />

      {/* MODAL BOOKING & PEMBAYARAN */}
      {selectedPackageForBooking && (
        <BookingModal
          selectedPackage={selectedPackageForBooking}
          currentUser={currentUser}
          onClose={() => setSelectedPackageForBooking(null)}
          onBookingSuccess={handleBookingSuccess}
          initialStep={bookingOptions?.initialStep || 1}
          initialPaymentMethod={bookingOptions?.paymentMethod || "QRIS E-Wallet"}
        />
      )}


      {/* MODAL INSPEKTOR DATABASE POSTGRESQL */}
      {isDbInspectorOpen && (
        <DatabaseModal
          onClose={() => setIsDbInspectorOpen(false)}
          onDatabaseChanged={handleBookingSuccess}
        />
      )}

      {/* Floating Action Button (FAB) WhatsApp Resmi */}
      <a
        href={waFloatingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fab-whatsapp"
        title="Chat WhatsApp dengan Tim Konsultan Kami"
        aria-label="Chat WhatsApp"
      >
        <IconWhatsApp size={30} color="#ffffff" />
        <span className="fab-tooltip">Chat WhatsApp</span>
      </a>
    </div>
  );
}

export default App;