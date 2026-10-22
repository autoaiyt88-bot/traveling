import {
  IconCalendar,
  IconClock,
  IconCheck,
  IconUsers,
  IconCreditCard,
  IconPlane,
  IconQrCode,
  IconScan,
} from "./Icons";
import { travelPackages } from "../data/travelData";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

/**
 * ====================================================================
 * KOMPONEN PAKET TRAVELING (Katalog Paket Wisata & Tombol Pemesanan)
 * ====================================================================
 * Menggunakan shadcn/ui (Button, Badge), Tailwind CSS, dan Lucide Icons.
 */
export default function TravelPackages({ onBookPackage }) {
  return (
    <section id="packages" className="packages-section py-16 md:py-24 bg-white">
      <div className="section-container">
        {/* Header Section */}
        <div className="section-header-center text-center max-w-2xl mx-auto mb-12">
          <div className="section-subtitle-badge inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            <IconCreditCard size={15} color="#0284c7" />
            <span>PILIHAN PAKET TERBAIK</span>
          </div>
          <h2 className="section-title text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
            Paket Perjalanan Internasional Eksklusif
          </h2>
          <p className="section-desc text-sm md:text-base text-slate-500 leading-relaxed">
            Semua paket telah mencakup tiket penerbangan PP, hotel berbintang, itinerary lengkap,
            dan asuransi perjalanan internasional.
          </p>
        </div>

        {/* Grid Paket */}
        <div className="packages-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="pkg-card bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Media Card */}
              <div className="pkg-media relative h-52 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="pkg-img w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                {pkg.badge && (
                  <Badge
                    variant="amber"
                    className="absolute top-3 left-3 font-bold shadow-sm"
                  >
                    {pkg.badge}
                  </Badge>
                )}
                <div className="pkg-seats-warning absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[11px] flex items-center gap-1.5">
                  <IconUsers size={13} color="#ffffff" />
                  <span>Sisa {pkg.seatsLeft} Kursi Tersedia</span>
                </div>
              </div>

              {/* Konten Card */}
              <div className="pkg-body p-5 flex flex-col flex-1">
                <div className="pkg-meta-row flex justify-between items-center mb-1.5">
                  <span className="pkg-country text-xs font-bold text-sky-600 uppercase tracking-wider">
                    {pkg.country}
                  </span>
                  <div className="pkg-duration flex items-center gap-1 text-xs text-slate-500">
                    <IconClock size={14} color="#0284c7" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                <h3 className="pkg-title text-base font-bold text-slate-900 mb-1.5 line-clamp-1">
                  {pkg.title}
                </h3>
                <p className="pkg-rute text-xs text-slate-500 mb-2.5">
                  <strong className="text-slate-700">Rute:</strong> {pkg.destination}
                </p>

                <div className="pkg-departure flex items-center gap-1.5 text-xs text-sky-700 bg-sky-50 px-2.5 py-1.5 rounded-md mb-3.5">
                  <IconCalendar size={14} color="#64748b" />
                  <span>Jadwal: {pkg.departure}</span>
                </div>

                {/* Fasilitas Termasuk */}
                <div className="pkg-facilities mb-4 flex-1">
                  <span className="fac-title block text-xs font-bold text-slate-800 uppercase mb-2">
                    Fasilitas Termasuk:
                  </span>
                  <ul className="fac-list space-y-1.5">
                    {pkg.facilities.map((fac, idx) => (
                      <li key={idx} className="fac-item flex items-center gap-2 text-xs text-slate-600">
                        <IconCheck size={14} color="#10b981" />
                        <span>{fac}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Badge Pembayaran QRIS */}
                <div className="pkg-qris-strip flex items-center gap-1.5 text-xs text-sky-700 bg-sky-50 border border-dashed border-sky-200 px-2.5 py-1.5 rounded-md mb-3.5 font-medium">
                  <IconQrCode size={14} color="#0284c7" />
                  <span>Mendukung Pembayaran Instan QRIS & E-Wallet</span>
                </div>

                {/* Footer Card: Harga & Tombol Booking */}
                <div className="pkg-footer pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2.5 flex-wrap">
                  <div className="pkg-price-box flex flex-col">
                    <span className="price-label text-[10px] text-slate-400 uppercase font-semibold">Mulai Dari</span>
                    <span className="price-val text-base md:text-lg font-extrabold text-sky-700">{pkg.formattedPrice}</span>
                    <span className="price-unit text-[10px] text-slate-400">/ orang (All-In)</span>
                  </div>

                  <div className="pkg-action-btns flex items-center gap-2">
                    <Button
                      variant="gradient"
                      size="sm"
                      className="gap-1.5 shadow-sm"
                      onClick={() => onBookPackage(pkg, { initialStep: 1, paymentMethod: "QRIS E-Wallet" })}
                    >
                      <IconPlane size={14} color="#ffffff" />
                      <span>Booking</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="btn-pindai-qris gap-1.5 border-sky-300 text-sky-700 hover:bg-sky-50 hover:text-sky-800 shadow-sm"
                      onClick={() => onBookPackage(pkg, { initialStep: 2, paymentMethod: "QRIS E-Wallet" })}
                      title="Pindai QRIS Langsung"
                    >
                      <IconScan size={14} color="#0284c7" />
                      <span>Pindai QRIS</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
