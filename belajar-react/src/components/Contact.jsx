import { useState } from "react";
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconClock,
  IconWhatsApp,
  IconCheckCircle,
} from "./Icons";
import { companyProfile } from "../data/travelData";

/**
 * ====================================================================
 * KOMPONEN KONTAK & KONSULTASI (Informasi Kantor, WhatsApp & Formulir)
 * ====================================================================
 */
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  function handleSubmitMessage(e) {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simulasi pengiriman pesan
    setIsSent(true);
    setName("");
    setEmail("");
    setDestination("");
    setMessage("");

    setTimeout(() => {
      setIsSent(false);
    }, 4500);
  }

  const whatsappUrl = `https://wa.me/${companyProfile.whatsapp.number}?text=${encodeURIComponent(
    "Halo NusaVoyage, saya ingin membuat janji temu dan konsultasi paket wisata."
  )}`;

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        {/* Header Section */}
        <div className="section-header-center">
          <div className="section-subtitle-badge">
            <IconPhone size={16} color="#0284c7" />
            <span>KONSULTASI & HUBUNGI KAMI</span>
          </div>
          <h2 className="section-title">Rencanakan Perjalanan Anda Hari Ini</h2>
          <p className="section-desc">
            Konsultan perjalanan kami siap membantu Anda menyusun rencana itinerary terbaik,
            pengurusan visa, hingga paket liburan privat keluarga.
          </p>
        </div>

        <div className="contact-grid">
          {/* Kolom Kiri: Info Kantor, Jam Kerja & WhatsApp */}
          <div className="contact-info-col">
            <div className="contact-info-card">
              <h3>Kantor Operasional</h3>
              <p className="info-lead">
                Kunjungi kantor pusat kami di Jakarta atau hubungi tim konsultan via
                WhatsApp untuk respon cepat.
              </p>

              <div className="contact-details-list">
                {/* Alamat */}
                <div className="contact-detail-item">
                  <div className="detail-icon-round">
                    <IconMapPin size={20} color="#0284c7" />
                  </div>
                  <div>
                    <strong>Alamat Kantor</strong>
                    <p>{companyProfile.contact.address}</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="contact-detail-item">
                  <div className="detail-icon-round">
                    <IconWhatsApp size={20} color="#25D366" />
                  </div>
                  <div>
                    <strong>WhatsApp Resmi (Respon Cepat)</strong>
                    <p>{companyProfile.whatsapp.displayNumber}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-detail-item">
                  <div className="detail-icon-round">
                    <IconMail size={20} color="#0284c7" />
                  </div>
                  <div>
                    <strong>Email Bantuan</strong>
                    <p>{companyProfile.contact.email}</p>
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="contact-detail-item">
                  <div className="detail-icon-round">
                    <IconClock size={20} color="#0284c7" />
                  </div>
                  <div>
                    <strong>Jam Operasional Kantor</strong>
                    <p>{companyProfile.contact.operatingHours}</p>
                  </div>
                </div>
              </div>

              {/* Tombol WhatsApp Besar */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-contact-wa-large"
              >
                <IconWhatsApp size={20} color="#ffffff" />
                <span>Mulai Chat WhatsApp Sekarang</span>
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Formulir Kirim Pesan */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <h3>Kirim Pesan atau Pertanyaan</h3>
              <p>Isi formulir di bawah ini dan kami akan membalas melalui email dalam kurun waktu 1x24 jam.</p>

              {isSent && (
                <div className="contact-alert-success">
                  <IconCheckCircle size={18} color="#10b981" />
                  <span>Pesan Anda berhasil dikirim! Tim konsultan kami akan segera menghubungi Anda.</span>
                </div>
              )}

              <form onSubmit={handleSubmitMessage} className="contact-form">
                <div className="form-group-duo">
                  <div className="contact-field">
                    <label htmlFor="ct-name">Nama Lengkap*</label>
                    <input
                      id="ct-name"
                      type="text"
                      placeholder="Nama Anda"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="ct-email">Alamat Email*</label>
                    <input
                      id="ct-email"
                      type="email"
                      placeholder="email@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="ct-dest">Destinasi yang Diminati (Opsional)</label>
                  <input
                    id="ct-dest"
                    type="text"
                    placeholder="Contoh: Jepang Sakura 2026 atau Swiss Alps"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="ct-msg">Pesan / Rencana Liburan Anda*</label>
                  <textarea
                    id="ct-msg"
                    rows="4"
                    placeholder="Ceritakan rencana perjalanan, perkiraan jumlah peserta, atau tanggal liburan yang diinginkan..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-contact-submit">
                  <span>Kirim Pesan Sekarang</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
