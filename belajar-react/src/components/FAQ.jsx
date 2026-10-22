import { useState } from "react";
import { IconChevronDown, IconShield } from "./Icons";
import { faqList } from "../data/travelData";

/**
 * ====================================================================
 * KOMPONEN FAQ (Pertanyaan yang Sering Diajukan - Interaktif Accordion)
 * ====================================================================
 */
export default function FAQ() {
  // Simpan ID FAQ yang sedang dibuka (default: faq-1)
  const [openId, setOpenId] = useState("faq-1");

  function toggleFaq(id) {
    setOpenId(openId === id ? null : id);
  }

  return (
    <section id="faq" className="faq-section">
      <div className="section-container">
        {/* Header Section */}
        <div className="section-header-center">
          <div className="section-subtitle-badge">
            <IconShield size={16} color="#0284c7" />
            <span>PERTANYAAN UMUM</span>
          </div>
          <h2 className="section-title">Semua yang Perlu Anda Ketahui</h2>
          <p className="section-desc">
            Temukan jawaban lengkap seputar pengurusan visa, jadwal tur, kebijakan
            pembayaran cicilan, dan asuransi wisata.
          </p>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-container">
          {faqList.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`faq-item-card ${isOpen ? "open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{item.question}</span>
                  <div className={`faq-icon-arrow ${isOpen ? "rotated" : ""}`}>
                    <IconChevronDown size={18} color="#0284c7" />
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-answer-content">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
