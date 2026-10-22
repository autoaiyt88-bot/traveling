import {
  IconCompass,
  IconMapPin,
  IconPhone,
  IconMail,
  IconWhatsApp,
  IconShield,
} from "./Icons";
import { companyProfile } from "../data/travelData";
import logoImg from "../assets/logo.png";

/**
 * ====================================================================
 * KOMPONEN FOOTER (Informasi Perusahaan, Tautan Cepat & Hak Cipta)
 * ====================================================================
 */
export default function Footer() {
  const whatsappUrl = `https://wa.me/${companyProfile.whatsapp.number}?text=${encodeURIComponent(
    companyProfile.whatsapp.defaultMessage
  )}`;

  return (
    <footer className="main-footer">
      <div className="section-container">
        <div className="footer-top-grid">
          {/* Kolom 1: Profil Brand */}
          <div className="footer-col-brand">
            <div className="footer-brand-header">
              <div className="footer-brand-icon">
                <img src={logoImg} alt="NusaVoyage Logo" className="footer-logo-img" />
              </div>
              <span className="footer-brand-title">{companyProfile.name}</span>
            </div>
            <p className="footer-brand-desc">
              {companyProfile.description}
            </p>
            <div className="footer-license-badge">
              <IconShield size={16} color="#38bdf8" />
              <span>{companyProfile.licenseNumber}</span>
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div className="footer-col">
            <h4 className="footer-title">Navigasi Cepat</h4>
            <ul className="footer-links-list">
              <li><a href="#hero">Beranda</a></li>
              <li><a href="#about">Tentang Kami</a></li>
              <li><a href="#destinations">Destinasi Wisata</a></li>
              <li><a href="#packages">Paket Perjalanan</a></li>
              <li><a href="#why-us">Keunggulan Layanan</a></li>
              <li><a href="#testimonials">Testimoni Pelanggan</a></li>
              <li><a href="#faq">Tanya Jawab (FAQ)</a></li>
            </ul>
          </div>

          {/* Kolom 3: Destinasi Populer */}
          <div className="footer-col">
            <h4 className="footer-title">Destinasi Dunia</h4>
            <ul className="footer-links-list">
              <li><a href="#destinations">Jepang (Tokyo & Kyoto)</a></li>
              <li><a href="#destinations">Swiss (Matterhorn Alps)</a></li>
              <li><a href="#destinations">Prancis (Paris & Louvre)</a></li>
              <li><a href="#destinations">Turki (Cappadocia Balloon)</a></li>
              <li><a href="#destinations">Maladewa (Overwater Villa)</a></li>
              <li><a href="#destinations">Raja Ampat (Papua Barat)</a></li>
            </ul>
          </div>

          {/* Kolom 4: Hubungi Kami & WhatsApp */}
          <div className="footer-col">
            <h4 className="footer-title">Layanan Pelanggan</h4>
            <div className="footer-contact-items">
              <div className="f-contact-item">
                <IconPhone size={16} color="#38bdf8" />
                <span>{companyProfile.contact.phone}</span>
              </div>
              <div className="f-contact-item">
                <IconMail size={16} color="#38bdf8" />
                <span>{companyProfile.contact.email}</span>
              </div>
              <div className="f-contact-item">
                <IconMapPin size={16} color="#38bdf8" />
                <span>{companyProfile.contact.address}</span>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-btn-wa"
            >
              <IconWhatsApp size={16} color="#ffffff" />
              <span>Chat WhatsApp 24/7</span>
            </a>
          </div>
        </div>

        {/* Garis Pembatas */}
        <div className="footer-divider"></div>

        {/* Bagian Bawah: Hak Cipta & Mitra Pembayaran */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} <strong>{companyProfile.name}</strong>. Seluruh Hak Cipta Dilindungi.
          </p>

          <div className="footer-partners-row">
            <span>Metode Pembayaran Resmi:</span>
            <span className="partner-pill">BCA VA</span>
            <span className="partner-pill">Mandiri</span>
            <span className="partner-pill">QRIS</span>
            <span className="partner-pill">Visa / Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
