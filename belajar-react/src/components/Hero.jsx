import { useState, useEffect } from "react";
import {
  IconSearch,
  IconMapPin,
  IconCalendar,
  IconPlane,
  IconWhatsApp,
  IconCheckCircle,
} from "./Icons";
import { companyProfile } from "../data/travelData";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

/**
 * Daftar Latar Belakang Wisata Internasional Beresolusi Tinggi
 * Dilengkapi dengan Efek Ken Burns Sinematik Bergerak
 */
const heroScenes = [
  {
    id: 1,
    title: "Paris, Prancis",
    landmark: "Menara Eiffel & Sungai Seine",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=85&auto=format&fit=crop",
    kenBurnsClass: "kenburns-1",
  },
  {
    id: 2,
    title: "Tokyo & Fuji, Jepang",
    landmark: "Puncak Salju & Sakura",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=85&auto=format&fit=crop",
    kenBurnsClass: "kenburns-2",
  },
  {
    id: 3,
    title: "Zermatt, Swiss",
    landmark: "Puncak Alpen & Danau Glasial",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1920&q=85&auto=format&fit=crop",
    kenBurnsClass: "kenburns-3",
  },
  {
    id: 4,
    title: "Maladewa (Maldives)",
    landmark: "Resort Vila Air Laut Pirus",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1920&q=85&auto=format&fit=crop",
    kenBurnsClass: "kenburns-4",
  },
];

/**
 * ====================================================================
 * KOMPONEN HERO SECTION (Banner Dinamis Bergerak & Filter Pencarian)
 * ====================================================================
 */
export default function Hero({ onSearchDestination }) {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [category, setCategory] = useState("all");

  // State untuk Kontrol Latar Belakang Bergerak
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isMotionPlaying, setIsMotionPlaying] = useState(true);

  // Otomatis transisi antar pemandangan dunia setiap 7 detik
  useEffect(() => {
    if (!isMotionPlaying) return;
    const interval = setInterval(() => {
      setCurrentSceneIdx((prev) => (prev + 1) % heroScenes.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isMotionPlaying]);

  function handleFilterSubmit(e) {
    e.preventDefault();
    if (onSearchDestination) {
      onSearchDestination({
        destination: selectedDestination,
        date: travelDate,
        category,
      });
    }
    // Scroll mulus ke bagian paket tour
    const pkgSection = document.getElementById("packages");
    if (pkgSection) {
      pkgSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  const whatsappUrl = `https://wa.me/${companyProfile.whatsapp.number}?text=${encodeURIComponent(
    "Halo NusaVoyage, saya ingin konsultasi promo tiket & paket tur internasional."
  )}`;

  return (
    <section id="hero" className="hero-section">
      {/* Background Sinematik Bergerak Real-Time (Ken Burns + Awan + Pesawat) */}
      <div className="hero-bg-container">
        {heroScenes.map((scene, idx) => (
          <div
            key={scene.id}
            className={`hero-scene-slide ${idx === currentSceneIdx ? "active" : ""} ${
              isMotionPlaying ? "motion-playing" : ""
            } ${scene.kenBurnsClass}`}
          >
            <img
              src={scene.image}
              alt={scene.title}
              className="hero-bg-image"
              loading={idx === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Lapisan Kabut Awan Mengalir Bergerak */}
        <div className="hero-clouds-layer"></div>

        {/* Animasi Pesawat Terbang Melintasi Langit */}
        <div className="hero-airplane-track">
          <div className="airplane-contrail"></div>
          <div className="airplane-svg-wrapper">
            <IconPlane size={24} color="#ffffff" />
          </div>
        </div>

        {/* Gradient Overlay Sinematik */}
        <div className="hero-gradient-overlay"></div>
      </div>

      <div className="hero-content-wrapper">
        {/* Badge Pengumuman / Lisensi shadcn */}
        <div className="flex justify-center mb-5">
          <Badge variant="sky" className="py-1.5 px-4 text-xs font-semibold tracking-wider rounded-full backdrop-blur-md bg-sky-950/40 border border-sky-400/30 text-sky-200 shadow-lg">
            <IconCheckCircle size={15} className="mr-2 text-sky-400" />
            <span>RESMI TERDAFTAR KEMENPAREKRAF • 100% PASTI BERANGKAT</span>
          </Badge>
        </div>

        {/* Judul Utama Promosi */}
        <h1 className="hero-main-title">
          Wujudkan Liburan Impian <br />
          <span className="text-highlight">Ke Berbagai Sudut Dunia</span>
        </h1>

        {/* Deskripsi Promosi */}
        <p className="hero-description">
          Dapatkan pengalaman traveling internasional berkelas bintang lima dengan
          paket tur komprehensif ke Jepang, Eropa, Turki, dan Maladewa. Termasuk
          tiket pesawat, hotel mewah, pemandu bahasa Indonesia, dan asuransi penuh.
        </p>

        {/* Tombol Call To Action (CTA) shadcn */}
        <div className="hero-cta-group flex flex-wrap gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-400 hover:to-sky-600 shadow-xl shadow-sky-600/30 text-white font-semibold px-8"
          >
            <a href="#packages">
              <IconPlane size={18} className="mr-2" />
              <span>Lihat Paket Perjalanan</span>
            </a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="whatsapp"
            className="rounded-full font-semibold px-8"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWhatsApp size={18} className="mr-2" />
              <span>Konsultasi Gratis via WhatsApp</span>
            </a>
          </Button>
        </div>

        {/* Live Location Pill & Kontrol Latar Belakang Bergerak */}
        <div className="hero-motion-control-bar mb-6">
          <span className="live-beacon-dot" title="Latar Belakang Bergerak Real-Time"></span>
          <span className="font-semibold text-sky-300">
            📍 {heroScenes[currentSceneIdx].title}
          </span>
          <span className="text-slate-300 text-[11px] hidden sm:inline">
            • {heroScenes[currentSceneIdx].landmark}
          </span>

          <div className="flex items-center gap-1.5 ml-2">
            {heroScenes.map((scene, idx) => (
              <button
                key={scene.id}
                type="button"
                className={`scene-dot-btn ${idx === currentSceneIdx ? "active" : ""}`}
                onClick={() => setCurrentSceneIdx(idx)}
                title={`Pindah ke pemandangan ${scene.title}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="motion-toggle-btn ml-1"
            onClick={() => setIsMotionPlaying((prev) => !prev)}
            title={isMotionPlaying ? "Jeda Gerakan" : "Putar Gerakan Latar Belakang"}
          >
            {isMotionPlaying ? "⏸ Jeda" : "▶ Gerak"}
          </button>
        </div>

        {/* Search & Booking Filter Bar */}
        <div className="hero-search-card">
          <form onSubmit={handleFilterSubmit} className="search-filter-grid">
            {/* Input 1: Pilihan Destinasi */}
            <div className="filter-item">
              <label htmlFor="filter-dest">
                <IconMapPin size={16} color="#0284c7" />
                <span>Destinasi Impian</span>
              </label>
              <select
                id="filter-dest"
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
              >
                <option value="">Semua Destinasi Populer</option>
                <option value="Jepang">Jepang (Tokyo & Kyoto)</option>
                <option value="Swiss">Swiss (Alpen & Zermatt)</option>
                <option value="Prancis">Prancis (Paris & Seine)</option>
                <option value="Turki">Turki (Cappadocia)</option>
                <option value="Maladewa">Maladewa (Maldives)</option>
                <option value="Indonesia">Raja Ampat (Papua)</option>
              </select>
            </div>

            {/* Input 2: Perkiraan Tanggal */}
            <div className="filter-item">
              <label htmlFor="filter-date">
                <IconCalendar size={16} color="#0284c7" />
                <span>Rencana Keberangkatan</span>
              </label>
              <input
                id="filter-date"
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </div>

            {/* Input 3: Kategori Wilayah */}
            <div className="filter-item">
              <label htmlFor="filter-cat">
                <IconPlane size={16} color="#0284c7" />
                <span>Kategori Tur</span>
              </label>
              <select
                id="filter-cat"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">Semua Kategori</option>
                <option value="asia">Asia Spesial</option>
                <option value="eropa">Eropa Barat & Alpen</option>
                <option value="bahari">Wisata Bahari & Island</option>
              </select>
            </div>

            {/* Tombol Cari */}
            <div className="filter-action">
              <button type="submit" className="btn-search-submit">
                <IconSearch size={18} color="#ffffff" />
                <span>Cari Paket</span>
              </button>
            </div>
          </form>
        </div>

        {/* Statistik Kepercayaan (Stat Counter) */}
        <div className="hero-stats-row">
          {companyProfile.stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-number">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
