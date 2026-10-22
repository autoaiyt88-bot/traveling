/**
 * ====================================================================
 * DATA KONFIGURASI PERUSAHAAN & KONTEN TRAVELING (NusaVoyage)
 * ====================================================================
 * Seluruh data di file ini dapat dengan mudah diubah sesuai kebutuhan
 * nama perusahaan, nomor WhatsApp, paket, harga, dan destinasi klien.
 */

// 1. Informasi Utama Perusahaan
export const companyProfile = {
  name: "NusaVoyage International Travel",
  shortName: "NusaVoyage",
  tagline: "Menemani Setiap Langkah Petualangan Terbaik Anda",
  description:
    "Agen perjalanan berlisensi resmi internasional dengan pengalaman lebih dari 10 tahun melayani ribuan wisatawan menjelajahi keajaiban dunia dengan kenyamanan kelas wahid dan harga transparan.",
  establishedYear: 2014,
  licenseNumber: "KEMENPAREKRAF NO. 418/TDUP/2018",
  
  // Kontak WhatsApp (Ganti dengan nomor telepon sebenarnya, format internasional 62...)
  whatsapp: {
    number: "6281234567890",
    displayNumber: "+62 812-3456-7890",
    defaultMessage: "Halo NusaVoyage, saya ingin konsultasi paket perjalanan wisata luar negeri.",
  },

  // Kontak Email & Kantor
  contact: {
    email: "info@nusavoyage.com",
    supportEmail: "booking@nusavoyage.com",
    phone: "+62 21 5567 8900",
    address: "NusaVoyage Tower Lantai 18, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan, Indonesia",
    operatingHours: "Senin - Sabtu: 08:30 - 18:00 WIB",
  },

  // Statistik & Kepercayaan
  stats: [
    { value: "15.000+", label: "Wisatawan Bahagia" },
    { value: "48+", label: "Destinasi Dunia" },
    { value: "99.4%", label: "Tingkat Kepuasan" },
    { value: "10+", label: "Tahun Pengalaman" },
  ],
};

// 2. Destinasi Populer (Luar Negeri & Domestik Premium)
export const popularDestinations = [
  {
    id: "dest-1",
    name: "Kyoto & Tokyo",
    country: "Jepang",
    category: "asia",
    rating: 4.9,
    reviewsCount: 380,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80&auto=format&fit=crop",
    shortDesc: "Nikmati pesona kuil bersejarah, keindahan bunga Sakura, dan gemerlap kota metropolitan modern.",
    highlight: "Tiket Shinkansen & Tour Pemandu Bahasa Indonesia",
  },
  {
    id: "dest-2",
    name: "Zermatt & Swiss Alps",
    country: "Swiss",
    category: "eropa",
    rating: 5.0,
    reviewsCount: 420,
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200&q=80&auto=format&fit=crop",
    shortDesc: "Panorama puncak salju Matterhorn abadi dengan kereta panorama Glacier Express yang spektakuler.",
    highlight: "Swiss Travel Pass & Hotel Resort Bintang 5",
  },
  {
    id: "dest-3",
    name: "Paris & Menara Eiffel",
    country: "Prancis",
    category: "eropa",
    rating: 4.8,
    reviewsCount: 512,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80&auto=format&fit=crop",
    shortDesc: "Jelajahi ibu kota mode dunia, museum legendaris Louvre, dan pesiar romantis di Sungai Seine.",
    highlight: "Skip-the-line Louvre & Dinner Cruise Seine",
  },
  {
    id: "dest-4",
    name: "Cappadocia & Istanbul",
    country: "Turki",
    category: "asia",
    rating: 4.9,
    reviewsCount: 298,
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80&auto=format&fit=crop",
    shortDesc: "Sensasi terbang dengan balon udara di atas lembah batu magis dan kemegahan Hagia Sophia.",
    highlight: "Hot Air Balloon Flight & Cave Hotel Luxury",
  },
  {
    id: "dest-5",
    name: "Baa Atoll Private Villa",
    country: "Maladewa (Maldives)",
    category: "bahari",
    rating: 4.9,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80&auto=format&fit=crop",
    shortDesc: "Resor vila terapung di atas air kristal toska dengan terumbu karang tropis yang eksotis.",
    highlight: "All-Inclusive Dining & Transfer Seaplane",
  },
  {
    id: "dest-6",
    name: "Kepulauan Raja Ampat",
    country: "Indonesia",
    category: "bahari",
    rating: 5.0,
    reviewsCount: 265,
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=1200&q=80&auto=format&fit=crop",
    shortDesc: "Surga bawah laut nomor satu dunia dengan gugusan pulau karang karst yang memesona.",
    highlight: "Private Speedboat & Lisensi Snorkeling Guide",
  },
];

// 3. Paket Traveling Lengkap beserta Harga & Fasilitas
export const travelPackages = [
  {
    id: "pkg-1",
    title: "Golden Route Japan Autumn & Winter",
    destination: "Tokyo - Kyoto - Osaka - Mt. Fuji",
    country: "Jepang",
    duration: "7 Hari 6 Malam",
    price: 1850000,
    formattedPrice: "Rp 1.850.000",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80&auto=format&fit=crop",
    badge: "Flash Sale",
    departure: "Setiap Hari Sabtu",
    seatsLeft: 4,
    facilities: [
      "Tiket Pesawat PP Promo Spesial",
      "Hotel Bintang 4 Pusat Kota",
      "Shinkansen Bullet Train Experience",
      "Makan 3x Sehari (Halal / Friendly)",
      "Tiket Masuk Semua Objek Wisata",
      "Pemandu Wisata Bahasa Indonesia",
    ],
  },
  {
    id: "pkg-2",
    title: "Magnificent Western Europe Panorama",
    destination: "Paris - Brussels - Amsterdam - Swiss",
    country: "Eropa Barat",
    duration: "10 Hari 9 Malam",
    price: 1950000,
    formattedPrice: "Rp 1.950.000",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80&auto=format&fit=crop",
    badge: "Promo Heboh",
    departure: "2x Per Bulan",
    seatsLeft: 6,
    facilities: [
      "Tiket Pesawat PP Internasional",
      "Hotel Bintang 4 & 5 Rekomendasi",
      "Glacier Express Train di Swiss",
      "Bantuan Pengurusan Dokumen Wisata",
      "Asuransi Perjalanan Internasional",
      "Private Bus AC & Wi-Fi Selama Tour",
    ],
  },
  {
    id: "pkg-3",
    title: "Exotic Turkey Discovery & Cappadocia",
    destination: "Istanbul - Bursa - Pamukkale - Cappadocia",
    country: "Turki",
    duration: "9 Hari 8 Malam",
    price: 1450000,
    formattedPrice: "Rp 1.450.000",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80&auto=format&fit=crop",
    badge: "Super Hemat",
    departure: "Tiap Pekan",
    seatsLeft: 8,
    facilities: [
      "Tiket Pesawat PP Direct Flight",
      "Menginap di Cave Hotel Eksotis",
      "Gratis Bosphorus Cruise di Istanbul",
      "Makan Penuh Sarapan & Makan Malam",
      "Tour Leader Profesional dari Jakarta",
      "Bebas Visa Masuk ke Turki",
    ],
  },
  {
    id: "pkg-4",
    title: "Luxury Honeymoon Maldives Overwater",
    destination: "Male - Baa Atoll Private Island",
    country: "Maladewa",
    duration: "5 Hari 4 Malam",
    price: 1650000,
    formattedPrice: "Rp 1.650.000",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80&auto=format&fit=crop",
    badge: "Promo Pasangan",
    departure: "Fleksibel Sesuai Permintaan",
    seatsLeft: 2,
    facilities: [
      "Vila Terapung Privat (Water Villa)",
      "Sarapan & Makan Malam Romantis",
      "Penerbangan Speedboat / Seaplane PP",
      "Sunset Dolphin Cruise Romantis",
      "Romantic Dinner di Tepi Pantai",
      "Dokumentasi Foto Liburan Profesional",
    ],
  },
];


// 4. Keunggulan Kami (Why Choose Us)
export const whyChooseUsFeatures = [
  {
    id: "feat-1",
    icon: "shield",
    title: "100% Berlisensi & Terjamin",
    description: "Perusahaan terdaftar resmi di Kemenparekraf dan IATA. Keberangkatan tur dijamin pasti berangkat tanpa risiko pembatalan sepihak.",
  },
  {
    id: "feat-2",
    icon: "award",
    title: "Akomodasi Bintang 4 & 5",
    description: "Kami hanya bekerja sama dengan jaringan hotel ternama yang berlokasi strategis di pusat kota dengan fasilitas kenyamanan terbaik.",
  },
  {
    id: "feat-3",
    icon: "users",
    title: "Tour Leader Bersertifikasi",
    description: "Didampingi pemandu wisata lokal dan tour leader asal Indonesia yang ramah, berpengalaman puluhan tahun, dan fasih bahasa setempat.",
  },
  {
    id: "feat-4",
    icon: "dollar",
    title: "Harga Transparan Tanpa Biaya Tersembunyi",
    description: "Semua biaya sudah termasuk tiket, hotel, makan, dan asuransi. Anda tidak akan dibebankan tipping paksa atau biaya terselubung.",
  },
  {
    id: "feat-5",
    icon: "phone",
    title: "Bantuan Darurat 24/7",
    description: "Tim operasional siaga 24 jam penuh di WhatsApp untuk membantu kelancaran dokumen, paspor, kebutuhan medis, atau perubahan jadwal.",
  },
  {
    id: "feat-6",
    icon: "plane",
    title: "Bantuan Visa & Paspor Cepat",
    description: "Layanan konsultasi dan pendampingan pembuatan Visa Schengen, Jepang, Amerika, dan Inggris dengan tingkat kelulusan 98%.",
  },
];

// 5. Testimoni Pelanggan
export const customerTestimonials = [
  {
    id: "testi-1",
    name: "Dr. Hendra Wijaya & Keluarga",
    role: "Wisatawan Tour Jepang 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop",
    rating: 5,
    text: "Perjalanan pertama kali ke Jepang bersama orang tua dan anak-anak jadi sangat menyenangkan berkat NusaVoyage. Pemandunya sangat sabar, busnya bersih, dan makanan halal selalu disediakan. Pasti langganan lagi!",
  },
  {
    id: "testi-2",
    name: "Clarissa Putri, S.E.",
    role: "Honeymoon di Maladewa",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop",
    rating: 5,
    text: "Bulan madu kami di Maldives benar-benar impian yang jadi kenyataan. Overwater villa-nya luar biasa dan servicenya bintang 5. Tim NusaVoyage mengurus tiket pesawat dan seaplane tanpa repot sama sekali.",
  },
  {
    id: "testi-3",
    name: "Bambang Sudiro, M.M.",
    role: "Tour Eropa Barat",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop",
    rating: 5,
    text: "Visa Schengen saya dipandu sampai tuntas dan tembus tepat waktu. Itinerary di Swiss dan Paris sangat pas, tidak terburu-buru seperti tur lain. Pengalaman naik Glacier Express tak terlupakan!",
  },
];

// 6. Galeri Perjalanan
export const galleryPhotos = [
  {
    id: "gal-1",
    title: "Puncak Salju Matterhorn, Swiss",
    url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80&auto=format&fit=crop",
    location: "Zermatt, Swiss",
  },
  {
    id: "gal-2",
    title: "Keindahan Bunga Sakura & Kuil",
    url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80&auto=format&fit=crop",
    location: "Kyoto, Jepang",
  },
  {
    id: "gal-3",
    title: "Penerbangan Balon Udara Magis",
    url: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80&auto=format&fit=crop",
    location: "Cappadocia, Turki",
  },
  {
    id: "gal-4",
    title: "Suasana Senja Menara Eiffel",
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80&auto=format&fit=crop",
    location: "Paris, Prancis",
  },
  {
    id: "gal-5",
    title: "Kejernihan Air Laut Maladewa",
    url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80&auto=format&fit=crop",
    location: "Baa Atoll, Maldives",
  },
  {
    id: "gal-6",
    title: "Kanal Romantis Kota Venice",
    url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80&auto=format&fit=crop",
    location: "Venesia, Italia",
  },
];

// 7. Pertanyaan yang Sering Diajukan (FAQ)
export const faqList = [
  {
    id: "faq-1",
    question: "Bagaimana cara melakukan pemesanan paket wisata?",
    answer:
      "Anda dapat memilih paket wisata yang diinginkan di halaman ini, lalu klik tombol 'Booking Sekarang' untuk mengisi data formulir dan memilih metode pembayaran. Anda juga bisa langsung menekan tombol WhatsApp kami untuk konsultasi khusus secara gratis.",
  },
  {
    id: "faq-2",
    question: "Apakah NusaVoyage membantu pengurusan Visa luar negeri?",
    answer:
      "Tentu saja! Untuk paket negara yang membutuhkan visa (seperti Visa Schengen Eropa, Jepang, Inggris, dll.), tim konsultan visa kami akan mendampingi Anda mulai dari penyiapan dokumen, penerjemahan resmi, hingga jadwal janji temu biometrik.",
  },
  {
    id: "faq-3",
    question: "Apakah pembayaran bisa dicicil / installment?",
    answer:
      "Bisa. Anda cukup membayar uang muka (DP) sebesar 30% pada saat pemesanan, dan pelunasan dapat dicicil hingga 25 hari sebelum tanggal keberangkatan tur.",
  },
  {
    id: "faq-4",
    question: "Apakah makanan selama perjalanan terjamin kehalalannya?",
    answer:
      "Ya, untuk seluruh paket internasional, kami memprioritaskan restoran bersertifikasi Halal atau restoran Muslim-friendly tanpa daging babi dan alkohol. Menu vegetarian juga dapat dipesan sebelumnya.",
  },
  {
    id: "faq-5",
    question: "Bagaimana kebijakan pembatalan dan asuransi perjalanan?",
    answer:
      "Setiap peserta tur dilindungi asuransi perjalanan internasional. Apabila pembatalan terjadi karena visa ditolak oleh kedutaan, biaya tur akan dikembalikan sesuai syarat & ketentuan polis proteksi visa kami.",
  },
];
