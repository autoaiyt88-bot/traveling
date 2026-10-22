import { IconCamera, IconMapPin } from "./Icons";
import { galleryPhotos } from "../data/travelData";

/**
 * ====================================================================
 * KOMPONEN GALERI PERJALANAN (Foto Momen Indah Para Wisatawan)
 * ====================================================================
 */
export default function Gallery() {
  return (
    <section id="gallery" className="gallery-section">
      <div className="section-container">
        {/* Header Section */}
        <div className="section-header-center">
          <div className="section-subtitle-badge">
            <IconCamera size={16} color="#0284c7" />
            <span>MOMEN PERJALANAN</span>
          </div>
          <h2 className="section-title">Galeri Sudut Terindah Bumi</h2>
          <p className="section-desc">
            Abadikan kenangan tak terlupakan di setiap destinasi eksotis bersama keluarga
            dan sahabat tercinta.
          </p>
        </div>

        {/* Grid Galeri */}
        <div className="gallery-grid">
          {galleryPhotos.map((photo) => (
            <div key={photo.id} className="gallery-item-card">
              <img
                src={photo.url}
                alt={photo.title}
                className="gallery-img"
                loading="lazy"
              />
              <div className="gallery-overlay">
                <div className="gallery-info-box">
                  <div className="gallery-location">
                    <IconMapPin size={14} color="#38bdf8" />
                    <span>{photo.location}</span>
                  </div>
                  <h4 className="gallery-title">{photo.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
