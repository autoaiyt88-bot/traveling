import { useState } from "react";
import {
  IconMapPin,
  IconStar,
  IconCheck,
  IconPlane,
} from "./Icons";
import { popularDestinations } from "../data/travelData";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

/**
 * ====================================================================
 * KOMPONEN DESTINASI POPULER (Katalog Destinasi dengan Filter Kategori)
 * ====================================================================
 */
export default function Destinations({ onSelectDestination }) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredDestinations =
    activeTab === "all"
      ? popularDestinations
      : popularDestinations.filter((d) => d.category === activeTab);

  return (
    <section id="destinations" className="destinations-section">
      <div className="section-container">
        {/* Header Section */}
        <div className="section-header-center">
          <Badge variant="sky" className="mb-3 py-1 px-3 text-xs tracking-wider font-semibold uppercase">
            <IconPlane size={14} className="mr-1.5" />
            DESTINASI FAVORIT DUNIA
          </Badge>
          <h2 className="section-title">Eksplorasi Keajaiban Destinasi Terpopuler</h2>
          <p className="section-desc">
            Pilihlah tujuan wisata internasional impian Anda. Dari romantisme kota bersejarah Eropa
            hingga surga bahari tropis tersembunyi.
          </p>

          {/* Filter Tab Kategori shadcn */}
          <div className="flex justify-center mt-6 mb-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-slate-100/90 p-1.5 rounded-full shadow-inner border border-slate-200">
                <TabsTrigger value="all" className="rounded-full px-5 py-2 text-xs sm:text-sm">Semua Destinasi</TabsTrigger>
                <TabsTrigger value="asia" className="rounded-full px-5 py-2 text-xs sm:text-sm">Asia (Jepang & Turki)</TabsTrigger>
                <TabsTrigger value="eropa" className="rounded-full px-5 py-2 text-xs sm:text-sm">Eropa (Swiss & Prancis)</TabsTrigger>
                <TabsTrigger value="bahari" className="rounded-full px-5 py-2 text-xs sm:text-sm">Bahari & Kepulauan</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Grid Kartu Destinasi */}
        <div className="destinations-grid">
          {filteredDestinations.map((dest) => (
            <div key={dest.id} className="dest-card">
              <div className="dest-media-box">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="dest-image"
                  loading="lazy"
                />
                <div className="dest-country-tag">
                  <IconMapPin size={14} color="#ffffff" />
                  <span>{dest.country}</span>
                </div>
                <div className="dest-rating-tag">
                  <IconStar size={14} color="#f59e0b" />
                  <span>{dest.rating.toFixed(1)}</span>
                  <small>({dest.reviewsCount})</small>
                </div>
              </div>

              <div className="dest-content-box">
                <h3 className="dest-name">{dest.name}</h3>
                <p className="dest-desc">{dest.shortDesc}</p>

                <div className="dest-highlight-box">
                  <IconCheck size={16} color="#0284c7" />
                  <span>{dest.highlight}</span>
                </div>

                <div className="dest-card-footer">
                  <a
                    href="#packages"
                    className="btn-dest-explore"
                    onClick={() => {
                      if (onSelectDestination) onSelectDestination(dest.country);
                    }}
                  >
                    Lihat Paket Tur
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
