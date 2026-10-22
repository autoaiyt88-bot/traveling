import { useState, useEffect } from "react";
import {
  IconX,
  IconCalendar,
  IconUsers,
  IconCreditCard,
  IconCheckCircle,
  IconShield,
  IconPlane,
  IconWhatsApp,
  IconQrCode,
  IconScan,
  IconClock,
  IconCheck,
} from "./Icons";
import { dbService } from "../services/db";
import { unifiedDb } from "../services/supabase";
import { companyProfile } from "../data/travelData";
import qrisImg from "../assets/qris-code.png";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";


/**
 * ====================================================================
 * KOMPONEN MODAL BOOKING & PAYMENT (Simulasi Transaksi Real-time)
 * ====================================================================
 * Dilengkapi dengan modul QRIS Interaktif & Scanner Laser Animasi:
 * - Tampilan visual resmi QRIS (Standar Pembayaran Nasional)
 * - Viewfinder sudut pemindai (scanner corners)
 * - Laser scanning beam yang bergerak vertikal menembus kode QR
 * - Countdown waktu bayar aktif
 * - Fitur "Simulasikan Pindai QR" untuk validasi instan
 */
export default function BookingModal({
  selectedPackage,
  currentUser,
  onClose,
  onBookingSuccess,
  initialStep = 1,
  initialPaymentMethod = "QRIS E-Wallet",
}) {
  const [step, setStep] = useState(initialStep); // 1: Form Booking, 2: Pembayaran, 3: Tiket Sukses

  // Form State
  const [customerName, setCustomerName] = useState(
    currentUser ? currentUser.full_name : "Wisatawan NusaVoyage"
  );
  const [customerEmail, setCustomerEmail] = useState(
    currentUser ? currentUser.email : "traveler@nusavoyage.com"
  );
  const [customerPhone, setCustomerPhone] = useState(
    currentUser ? currentUser.phone : "081234567890"
  );
  const [travelDate, setTravelDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split("T")[0];
  });
  const [totalGuests, setTotalGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod);

  // Status Transaksi
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // QRIS Scan & Timer States
  const [qrisTimeLeft, setQrisTimeLeft] = useState(15 * 60); // 15 Menit Countdown
  const [isScanning, setIsScanning] = useState(false);
  const [scanVerified, setScanVerified] = useState(false);

  // Perhitungan Biaya
  const unitPrice = selectedPackage.price;
  const subtotal = unitPrice * totalGuests;
  const taxInsuranceFee = 25000 * totalGuests; // Asuransi & pajak Rp 25rb / pax
  const grandTotal = subtotal + taxInsuranceFee;



  function formatIDR(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // Countdown timer untuk QRIS
  useEffect(() => {
    if (step === 2 && paymentMethod === "QRIS E-Wallet") {
      const timer = setInterval(() => {
        setQrisTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, paymentMethod]);

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  // Handle Lanjut ke Pembayaran
  function handleProceedToPayment(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!customerName.trim()) {
      setErrorMsg("Harap masukkan nama lengkap Anda!");
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes("@")) {
      setErrorMsg("Harap masukkan alamat email yang valid!");
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMsg("Harap masukkan nomor WhatsApp yang dapat dihubungi!");
      return;
    }
    if (!travelDate) {
      setErrorMsg("Harap tentukan tanggal keberangkatan yang diinginkan!");
      return;
    }

    setStep(2); // Masuk ke tahap pembayaran
  }

  // Handle Simulasi Pemindaian QRIS oleh Pengguna
  function handleSimulateScan() {
    if (isScanning || isProcessing) return;
    setIsScanning(true);
    setScanVerified(false);

    // Animasi pemindaian selama 1.6 detik
    setTimeout(() => {
      setIsScanning(false);
      setScanVerified(true);

      // Setelah terverifikasi, langsung selesaikan booking
      setTimeout(() => {
        handleConfirmPayment();
      }, 700);
    }, 1600);
  }

  // Handle Konfirmasi Pembayaran & Simpan ke PostgreSQL
  async function handleConfirmPayment() {
    setIsProcessing(true);
    setErrorMsg("");

    try {
      const res = await unifiedDb.createBooking({
        packageId: selectedPackage.id,
        packageTitle: selectedPackage.title,
        destination: selectedPackage.destination,
        customerName,
        customerEmail,
        customerPhone,
        travelDate,
        totalGuests,
        unitPrice,
        taxFee: taxInsuranceFee,
        totalAmount: grandTotal,
        paymentMethod,
        specialRequests,
      });

      setConfirmedBooking(res.booking);
      setStep(3); // Menampilkan e-tiket
      if (onBookingSuccess) {
        onBookingSuccess(res.booking);
      }
    } catch (err) {
      setErrorMsg(err.message || "Gagal memproses transaksi!");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card booking-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-box">
            <span className="step-tag">
              {step === 1 && "Langkah 1 dari 2: Data Pemesanan"}
              {step === 2 && "Langkah 2 dari 2: Pembayaran QRIS & Gateway"}
              {step === 3 && "Transaksi Berhasil: E-Tiket Resmi"}
            </span>
            <h3>{selectedPackage.title}</h3>
          </div>
          <button type="button" className="btn-close-modal" onClick={onClose} aria-label="Tutup">
            <IconX size={20} color="#0f172a" />
          </button>
        </div>

        {/* Notifikasi Error */}
        {errorMsg && (
          <div className="booking-alert-error">
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="modal-body-content">
          {/* ==========================================================
              LANGKAH 1: FORMULIR DATA PEMESAN & TANGGAL
             ========================================================== */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="booking-form-grid">
              {/* Ringkasan Paket Terpilih */}
              <div className="package-summary-strip">
                <img
                  src={selectedPackage.image}
                  alt={selectedPackage.title}
                  className="strip-img"
                />
                <div className="strip-info">
                  <span className="strip-country">{selectedPackage.country}</span>
                  <strong>{selectedPackage.duration}</strong>
                  <span className="strip-price">{selectedPackage.formattedPrice} / pax</span>
                </div>
              </div>

              {/* Data Pemesan */}
              <div className="form-group-duo">
                <div className="form-input-col">
                  <label htmlFor="bk-name">Nama Lengkap (Sesuai Paspor / KTP)*</label>
                  <input
                    id="bk-name"
                    type="text"
                    placeholder="Nama Lengkap Pemesan"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-input-col">
                  <label htmlFor="bk-email">Alamat Email Konfirmasi*</label>
                  <input
                    id="bk-email"
                    type="email"
                    placeholder="email@domain.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group-duo">
                <div className="form-input-col">
                  <label htmlFor="bk-phone">Nomor WhatsApp Aktif*</label>
                  <input
                    id="bk-phone"
                    type="tel"
                    placeholder="081234567890"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-input-col">
                  <label htmlFor="bk-date">Pilih Tanggal Berangkat*</label>
                  <input
                    id="bk-date"
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Jumlah Peserta */}
              <div className="form-input-col">
                <label htmlFor="bk-guests">Jumlah Peserta Tour (Orang)*</label>
                <div className="guest-selector-box">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`guest-pill-btn ${totalGuests === num ? "active" : ""}`}
                      onClick={() => setTotalGuests(num)}
                    >
                      <IconUsers size={14} />
                      <span>{num} Pax</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Catatan Khusus */}
              <div className="form-input-col">
                <label htmlFor="bk-notes">Permintaan Khusus (Opsional)</label>
                <input
                  id="bk-notes"
                  type="text"
                  placeholder="Contoh: Menu makanan vegetarian, kamar twin-bed, atau kursi roda"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />
              </div>

              {/* Live Price Calculator */}
              <div className="cost-breakdown-card">
                <div className="cost-line">
                  <span>Harga Paket ({totalGuests} Orang)</span>
                  <span>{formatIDR(subtotal)}</span>
                </div>
                <div className="cost-line">
                  <span>Asuransi Wisata & Biaya Pajak</span>
                  <span>{formatIDR(taxInsuranceFee)}</span>
                </div>
                <div className="cost-line total">
                  <strong>Total Pembayaran</strong>
                  <strong className="grand-price">{formatIDR(grandTotal)}</strong>
                </div>
              </div>

              {/* Tombol Lanjut */}
              <div className="modal-actions-bar">
                <button type="button" className="btn-modal-cancel" onClick={onClose}>
                  Batal
                </button>
                <button type="submit" className="btn-modal-proceed">
                  <span>Lanjut ke Pembayaran</span>
                </button>
              </div>
            </form>
          )}

          {/* ==========================================================
              LANGKAH 2: PILIHAN METODE PEMBAYARAN (QRIS DENGAN PINDAI LASER)
             ========================================================== */}
          {step === 2 && (
            <div className="payment-step-view">
              <div className="payment-total-banner">
                <span>Total yang Harus Dibayar:</span>
                <h2>{formatIDR(grandTotal)}</h2>
                <small>Termasuk Tiket PP, Hotel, dan Asuransi {totalGuests} Peserta</small>
              </div>

              {/* Pilihan Metode Pembayaran Tab / Pills */}
              <div className="payment-methods-list">
                <label
                  className={`payment-method-item ${paymentMethod === "QRIS E-Wallet" ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="pay_method"
                    value="QRIS E-Wallet"
                    checked={paymentMethod === "QRIS E-Wallet"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="method-info">
                    <strong>QRIS Semua Bank & E-Wallet (Rekomendasi Instan)</strong>
                    <span>Scan QR dengan GoPay, OVO, DANA, BCA, Livin', ShopeePay</span>
                  </div>
                  <span className="pay-badge highlight">Scan QR</span>
                </label>

                <label
                  className={`payment-method-item ${paymentMethod === "BCA Virtual Account" ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="pay_method"
                    value="BCA Virtual Account"
                    checked={paymentMethod === "BCA Virtual Account"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="method-info">
                    <strong>BCA Virtual Account</strong>
                    <span>Nomor VA terbit otomatis 24/7</span>
                  </div>
                  <span className="pay-badge">Instant</span>
                </label>

                <label
                  className={`payment-method-item ${paymentMethod === "Mandiri Virtual Account" ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="pay_method"
                    value="Mandiri Virtual Account"
                    checked={paymentMethod === "Mandiri Virtual Account"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="method-info">
                    <strong>Mandiri Livin' Virtual Account</strong>
                    <span>Transfer via ATM atau Mobile Banking Livin'</span>
                  </div>
                  <span className="pay-badge">Instant</span>
                </label>

                <label
                  className={`payment-method-item ${paymentMethod === "Kartu Kredit / Debit Online" ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="pay_method"
                    value="Kartu Kredit / Debit Online"
                    checked={paymentMethod === "Kartu Kredit / Debit Online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="method-info">
                    <strong>Kartu Kredit Visa / MasterCard</strong>
                    <span>Fasilitas cicilan 0% hingga 12 bulan</span>
                  </div>
                  <span className="pay-badge">Visa / MC</span>
                </label>
              </div>

              {/* ==========================================================
                  MODUL QRIS RESMI DENGAN ANIMASI PINDAI (LASER SCANNER)
                 ========================================================== */}
              {paymentMethod === "QRIS E-Wallet" && (
                <div className="qris-interactive-card">
                  {/* Header Resmi QRIS */}
                  <div className="qris-header-band">
                    <div className="qris-badge-col">
                      <span className="qris-nat-title">STANDAR PEMBAYARAN NASIONAL</span>
                      <div className="qris-brand-row">
                        <span className="qris-brand-text">QRIS</span>
                        <span className="qris-bi-sub">GPN • ASPI • Bank Indonesia</span>
                      </div>
                    </div>
                    <div className="qris-timer-col">
                      <IconClock size={13} color="#dc2626" />
                      <span className="timer-label">Sisa Waktu:</span>
                      <span className="timer-clock">{formatTime(qrisTimeLeft)}</span>
                    </div>
                  </div>

                  {/* Merchant Info */}
                  <div className="qris-merchant-details">
                    <h4 className="merchant-name">{companyProfile.fullName}</h4>
                    <div className="merchant-meta">
                      <span>NMID: <strong>ID1020304958319</strong></span>
                      <span>• Cetak: A01</span>
                    </div>
                  </div>

                  {/* VIEWPORT SCANNER DENGAN SINAR LASER (ADA PINDAI NYA) */}
                  <div className="qris-scanner-container">
                    {/* 4 Sudut Viewfinder Khas Scanner */}
                    <div className="scanner-corner corner-top-left"></div>
                    <div className="scanner-corner corner-top-right"></div>
                    <div className="scanner-corner corner-bottom-left"></div>
                    <div className="scanner-corner corner-bottom-right"></div>

                    {/* Gambar QRIS Asli yang Diunggah Pengguna */}
                    <img
                      src={qrisImg}
                      alt="QRIS NusaVoyage Scan to Pay"
                      className={`qris-image-target ${scanVerified ? "verified" : ""}`}
                    />

                    {/* Sinar Pemindai Laser Animasi (Bergerak Naik Turun) */}
                    <div className={`scanner-laser-bar ${isScanning ? "laser-fast" : ""}`}>
                      <div className="laser-beam-line"></div>
                      <div className="laser-beam-glow"></div>
                    </div>

                    {/* Overlay Status Pindai */}
                    {scanVerified ? (
                      <div className="scanner-success-overlay">
                        <IconCheckCircle size={46} color="#10b981" />
                        <span className="verified-text">QR Berhasil Dipindai!</span>
                        <small className="verified-sub">Memverifikasi ke Database...</small>
                      </div>
                    ) : (
                      <div className="scanner-live-pill">
                        <span className={`live-dot ${isScanning ? "scanning" : ""}`}></span>
                        <span>{isScanning ? "Memindai Kode QR..." : "Siap Dipindai (Scan to Pay)"}</span>
                      </div>
                    )}
                  </div>

                  {/* Total Tagihan QRIS */}
                  <div className="qris-bill-amount-box">
                    <span className="bill-label">Nominal Pembayaran Resmi:</span>
                    <strong className="bill-val">{formatIDR(grandTotal)}</strong>
                  </div>

                  {/* Tombol Interaktif Pindai Sekarang */}
                  <div className="qris-actions-wrapper">
                    <button
                      type="button"
                      className={`btn-trigger-scan ${isScanning ? "scanning-active" : ""}`}
                      onClick={handleSimulateScan}
                      disabled={isScanning || isProcessing || scanVerified}
                    >
                      <IconScan size={18} color="#ffffff" />
                      <span>{isScanning ? "Sedang Memindai Kode QR..." : "Pindai / Selesaikan Pembayaran QRIS"}</span>
                    </button>
                  </div>

                  {/* Petunjuk Aplikasi yang Didukung */}
                  <div className="qris-instructions-box">
                    <p className="instruction-lead">
                      Buka aplikasi <strong>BCA Mobile, Livin' Mandiri, GoPay, OVO, DANA, ShopeePay, atau LinkAja</strong> di ponsel Anda, lalu arahkan kamera pemindai ke kode QR di atas.
                    </p>
                    <div className="supported-apps-row">
                      <span className="app-badge">BCA Mobile</span>
                      <span className="app-badge">GoPay</span>
                      <span className="app-badge">OVO</span>
                      <span className="app-badge">DANA</span>
                      <span className="app-badge">ShopeePay</span>
                      <span className="app-badge">Livin'</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="security-guarantee-note">
                <IconShield size={18} color="#10b981" />
                <span>Transaksi dienkripsi 256-bit SSL & tersimpan aman di Database PostgreSQL.</span>
              </div>

              {/* Tombol Pembayaran Reguler */}
              <div className="modal-actions-bar">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setStep(1)}
                  disabled={isProcessing || isScanning}
                >
                  Kembali
                </button>
                <button
                  type="button"
                  className="btn-modal-proceed pay-now-btn"
                  onClick={handleConfirmPayment}
                  disabled={isProcessing || isScanning}
                >
                  <IconCreditCard size={18} color="#ffffff" />
                  <span>{isProcessing ? "Memproses Transaksi..." : `Konfirmasi Pembayaran (${formatIDR(grandTotal)})`}</span>
                </button>
              </div>
            </div>
          )}

          {/* ==========================================================
              LANGKAH 3: E-TIKET DIGITAL & KONFIRMASI SUKSES
             ========================================================== */}
          {step === 3 && confirmedBooking && (
            <div className="booking-success-view">
              <div className="success-icon-banner">
                <IconCheckCircle size={56} color="#10b981" />
                <h3>Pembayaran Berhasil Dikonfirmasi!</h3>
                <p>Data pemesanan Anda telah resmi dicatat ke Database PostgreSQL.</p>
              </div>

              {/* Tampilan E-Tiket Digital */}
              <div className="digital-ticket-card">
                <div className="ticket-header">
                  <div>
                    <span className="ticket-brand">{companyProfile.shortName} VOYAGE PASS</span>
                    <h4 className="ticket-pkg-title">{confirmedBooking.package_title}</h4>
                  </div>
                  <div className="ticket-code-box">
                    <span className="code-lbl">KODE BOOKING</span>
                    <strong className="code-val">{confirmedBooking.booking_code}</strong>
                  </div>
                </div>

                <div className="ticket-body-grid">
                  <div className="ticket-info-unit">
                    <span>Nama Peserta Utama</span>
                    <strong>{confirmedBooking.customer_name}</strong>
                  </div>
                  <div className="ticket-info-unit">
                    <span>Tanggal Keberangkatan</span>
                    <strong>{confirmedBooking.travel_date}</strong>
                  </div>
                  <div className="ticket-info-unit">
                    <span>Jumlah Wisatawan</span>
                    <strong>{confirmedBooking.total_guests} Orang</strong>
                  </div>
                  <div className="ticket-info-unit">
                    <span>Metode Pembayaran</span>
                    <strong>{confirmedBooking.payment_method}</strong>
                  </div>
                  <div className="ticket-info-unit">
                    <span>No. Referensi Transaksi</span>
                    <code>{confirmedBooking.transaction_ref}</code>
                  </div>
                  <div className="ticket-info-unit">
                    <span>Status Transaksi</span>
                    <span className="status-paid-pill">LUNAS (PAID)</span>
                  </div>
                </div>

                {/* Validasi QR Pass pada Tiket */}
                <div className="ticket-qr-verification">
                  <div className="ticket-qr-box">
                    <img src={qrisImg} alt="QR Validasi Tiket" className="ticket-qr-thumb" />
                    <div className="ticket-qr-text">
                      <strong>QR Validasi Tiket & Boarding</strong>
                      <span>Tunjukkan kode QR ini saat check-in bandara & hotel</span>
                    </div>
                  </div>
                </div>

                <div className="ticket-footer-strip">
                  <span>Total Biaya Terbayar:</span>
                  <strong>{formatIDR(confirmedBooking.total_amount)}</strong>
                </div>
              </div>

              {/* WhatsApp Notification Share */}
              <div className="ticket-actions-row">
                <a
                  href={`https://wa.me/${companyProfile.whatsapp.number}?text=${encodeURIComponent(
                    `Halo NusaVoyage, saya telah menyelesaikan booking tur ${confirmedBooking.package_title} dengan Kode Booking: ${confirmedBooking.booking_code}. Mohon konfirmasi jadwal briefingnya.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ticket-wa"
                >
                  <IconWhatsApp size={18} color="#ffffff" />
                  <span>Kirim Konfirmasi Tiket ke WhatsApp</span>
                </a>
                <button
                  type="button"
                  className="btn-ticket-done"
                  onClick={onClose}
                >
                  Selesai & Tutup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
