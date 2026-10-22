import {
  IconShield,
  IconAward,
  IconUsers,
  IconCreditCard,
  IconPhone,
  IconPlane,
} from "./Icons";
import { whyChooseUsFeatures } from "../data/travelData";

/**
 * ====================================================================
 * KOMPONEN WHY CHOOSE US (Keunggulan Layanan Perusahaan)
 * ====================================================================
 */
export default function WhyChooseUs() {
  // Mapping nama icon ke komponen SVG
  function renderIcon(iconName) {
    switch (iconName) {
      case "shield":
        return <IconShield size={24} color="#0284c7" />;
      case "award":
        return <IconAward size={24} color="#0284c7" />;
      case "users":
        return <IconUsers size={24} color="#0284c7" />;
      case "dollar":
        return <IconCreditCard size={24} color="#0284c7" />;
      case "phone":
        return <IconPhone size={24} color="#0284c7" />;
      case "plane":
      default:
        return <IconPlane size={24} color="#0284c7" />;
    }
  }

  return (
    <section id="why-us" className="why-us-section">
      <div className="section-container">
        {/* Header Section */}
        <div className="section-header-center">
          <div className="section-subtitle-badge">
            <IconShield size={16} color="#0284c7" />
            <span>STANDAR LAYANAN BINTANG LIMA</span>
          </div>
          <h2 className="section-title">Mengapa Memilih NusaVoyage?</h2>
          <p className="section-desc">
            Kami mengutamakan keselamatan, kenyamanan, dan kepuasan Anda dalam setiap
            detil petualangan internasional dengan standar operasional bersertifikasi.
          </p>
        </div>

        {/* Grid 6 Keunggulan */}
        <div className="why-us-grid">
          {whyChooseUsFeatures.map((feat) => (
            <div key={feat.id} className="why-card">
              <div className="why-icon-bubble">{renderIcon(feat.icon)}</div>
              <h3 className="why-title">{feat.title}</h3>
              <p className="why-desc">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
