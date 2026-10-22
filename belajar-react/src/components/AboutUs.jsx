import {
  IconShield,
  IconAward,
  IconUsers,
  IconCheckCircle,
  IconWhatsApp,
} from "./Icons";
import { companyProfile } from "../data/travelData";

/**
 * ====================================================================
 * KOMPONEN ABOUT US (Profil Perusahaan, Visi, Misi & Legalitas)
 * ====================================================================
 */
export default function AboutUs() {
  const whatsappUrl = `https://wa.me/${companyProfile.whatsapp.number}?text=${encodeURIComponent(
    "Halo NusaVoyage, saya ingin mengetahui lebih banyak tentang profil dan legalitas perusahaan Anda."
  )}`;

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="about-grid">
          {/* Kolom Kiri: Galeri Gambar & Badge Pengalaman */}
          <div className="about-media-col">
            <div className="about-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1000&q=80&auto=format&fit=crop"
                alt="Cappadocia Hot Air Balloon"
                className="about-main-img"
              />
              {/* Floating Experience Badge */}
              <div className="exp-floating-badge">
                <span className="exp-years">10+</span>
                <div className="exp-text">
                  <strong>Tahun Berpengalaman</strong>
                  <span>Melayani Tur Dunia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Teks Profil & Poin Keunggulan */}
          <div className="about-text-col">
            <div className="section-subtitle-badge">
              <IconShield size={16} color="#0284c7" />
              <span>TENTANG KAMI</span>
            </div>

            <h2 className="section-title">
              Sahabat Terpercaya Perjalanan Wisata Impian Anda Sejak 2014
            </h2>

            <p className="about-desc">
              <strong>{companyProfile.name}</strong> didirikan dengan satu komitmen utama:
              menghadirkan perjalanan wisata internasional yang bebas repot, aman, dan
              berkesan seumur hidup. Kami memahami bahwa setiap liburan adalah momen
              berharga yang layak dirayakan dengan standar kenyamanan tertinggi.
            </p>

            <p className="about-subdesc">
              Dengan jaringan kemitraan langsung bersama maskapai terkemuka dunia (Garuda
              Indonesia, ANA, Turkish Airlines, Emirates) dan hotel bintang 5 global,
              kami menjamin harga yang transparan tanpa biaya tersembunyi.
            </p>

            {/* Checklist Legalitas & Keunggulan */}
            <div className="about-features-list">
              <div className="about-feat-item">
                <div className="feat-icon-round">
                  <IconCheckCircle size={18} color="#0284c7" />
                </div>
                <div>
                  <strong>Izin Resmi Kemenparekraf & IATA</strong>
                  <p>Legalitas nomor {companyProfile.licenseNumber} dengan perlindungan konsumen terjamin.</p>
                </div>
              </div>

              <div className="about-feat-item">
                <div className="feat-icon-round">
                  <IconAward size={18} color="#0284c7" />
                </div>
                <div>
                  <strong>Hotel Bintang 4 & 5 Pilihan</strong>
                  <p>Akomodasi berstandar internasional dengan lokasi strategis di pusat kota.</p>
                </div>
              </div>

              <div className="about-feat-item">
                <div className="feat-icon-round">
                  <IconUsers size={18} color="#0284c7" />
                </div>
                <div>
                  <strong>Tour Leader & Pemandu Berpengalaman</strong>
                  <p>Didampingi pemandu wisata fasih bahasa Indonesia dan bersertifikasi BNSP.</p>
                </div>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="about-actions">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-about-wa"
              >
                <IconWhatsApp size={18} color="#ffffff" />
                <span>Konsultasi Legalitas & Paket</span>
              </a>
              <a href="#destinations" className="btn-about-dest">
                Jelajahi Destinasi
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
