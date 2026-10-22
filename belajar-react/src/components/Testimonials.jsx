import { IconStar, IconCheckCircle, IconUsers } from "./Icons";
import { customerTestimonials } from "../data/travelData";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

/**
 * ====================================================================
 * KOMPONEN TESTIMONI PELANGGAN (Ulasan Wisatawan Nyata)
 * ====================================================================
 */
export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="section-container">
        {/* Header Section */}
        <div className="section-header-center">
          <Badge variant="sky" className="mb-3 py-1 px-3 text-xs tracking-wider font-semibold uppercase">
            <IconUsers size={14} className="mr-1.5" />
            ULASAN WISATAWAN KAMI
          </Badge>
          <h2 className="section-title">Cerita Bahagia dari Seluruh Dunia</h2>
          <p className="section-desc">
            Lebih dari 15.000 wisatawan telah mempercayakan liburan keluarga, perjalanan
            bulan madu, hingga tour korporat mereka bersama NusaVoyage.
          </p>
        </div>

        {/* Grid Kartu Testimoni dengan shadcn Card */}
        <div className="testimonials-grid">
          {customerTestimonials.map((t) => (
            <Card key={t.id} className="testimonial-card hover:shadow-xl transition-all duration-300 border-slate-200/80 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                {/* Bintang Rating */}
                <div className="testi-stars-row flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <IconStar key={i} size={16} color="#f59e0b" />
                  ))}
                </div>

                <blockquote className="testi-quote text-slate-700 italic text-sm leading-relaxed mb-6">
                  "{t.text}"
                </blockquote>

                <div className="testi-author-box flex items-center gap-3 pt-3 border-t border-slate-100">
                  <Avatar className="h-11 w-11 ring-2 ring-sky-500/20">
                    <AvatarImage src={t.avatar} alt={t.name} />
                    <AvatarFallback>{t.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="author-info">
                    <div className="author-name-row flex items-center gap-1.5 font-semibold text-slate-900 text-sm">
                      <strong>{t.name}</strong>
                      <IconCheckCircle size={14} color="#10b981" title="Wisatawan Terverifikasi" />
                    </div>
                    <span className="author-role text-xs text-slate-500">{t.role}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

