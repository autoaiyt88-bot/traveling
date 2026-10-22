/**
 * ====================================================================
 * KOLEKSI IKON APLIKASI (Powered by Lucide React)
 * ====================================================================
 * Sesuai arsitektur stack: Menggunakan Lucide React untuk seluruh icon set.
 * Setiap icon mendukung prop `size`, `color`, dan `className` standar.
 */

import {
  Compass,
  Plane,
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  ShieldCheck,
  Award,
  CreditCard,
  Lock,
  Phone,
  Mail,
  Check,
  CheckCircle2,
  X,
  ChevronDown,
  ChevronRight,
  LogOut,
  Search,
  Database,
  User,
  Building2,
  Camera,
  Eye,
  EyeOff,
  QrCode,
  Scan,
} from "lucide-react";

export function IconCompass({ size = 20, color = "currentColor", className = "" }) {
  return <Compass size={size} color={color} className={className} />;
}

export function IconPlane({ size = 20, color = "currentColor", className = "" }) {
  return <Plane size={size} color={color} className={className} />;
}

export function IconMapPin({ size = 20, color = "currentColor", className = "" }) {
  return <MapPin size={size} color={color} className={className} />;
}

export function IconCalendar({ size = 20, color = "currentColor", className = "" }) {
  return <Calendar size={size} color={color} className={className} />;
}

export function IconClock({ size = 20, color = "currentColor", className = "" }) {
  return <Clock size={size} color={color} className={className} />;
}

export function IconUsers({ size = 20, color = "currentColor", className = "" }) {
  return <Users size={size} color={color} className={className} />;
}

export function IconStar({ size = 20, color = "#f59e0b", className = "" }) {
  return <Star size={size} color={color} fill={color} className={className} />;
}

export function IconShield({ size = 20, color = "currentColor", className = "" }) {
  return <ShieldCheck size={size} color={color} className={className} />;
}

export function IconAward({ size = 20, color = "currentColor", className = "" }) {
  return <Award size={size} color={color} className={className} />;
}

export function IconCreditCard({ size = 20, color = "currentColor", className = "" }) {
  return <CreditCard size={size} color={color} className={className} />;
}

export function IconLock({ size = 20, color = "currentColor", className = "" }) {
  return <Lock size={size} color={color} className={className} />;
}

export function IconPhone({ size = 20, color = "currentColor", className = "" }) {
  return <Phone size={size} color={color} className={className} />;
}

export function IconMail({ size = 20, color = "currentColor", className = "" }) {
  return <Mail size={size} color={color} className={className} />;
}

export function IconCheck({ size = 20, color = "currentColor", className = "" }) {
  return <Check size={size} color={color} className={className} />;
}

export function IconCheckCircle({ size = 20, color = "#10b981", className = "" }) {
  return <CheckCircle2 size={size} color={color} className={className} />;
}

export function IconX({ size = 20, color = "currentColor", className = "" }) {
  return <X size={size} color={color} className={className} />;
}

export function IconChevronDown({ size = 20, color = "currentColor", className = "" }) {
  return <ChevronDown size={size} color={color} className={className} />;
}

export function IconChevronRight({ size = 20, color = "currentColor", className = "" }) {
  return <ChevronRight size={size} color={color} className={className} />;
}

export function IconLogOut({ size = 20, color = "currentColor", className = "" }) {
  return <LogOut size={size} color={color} className={className} />;
}

export function IconSearch({ size = 20, color = "currentColor", className = "" }) {
  return <Search size={size} color={color} className={className} />;
}

export function IconDatabase({ size = 20, color = "currentColor", className = "" }) {
  return <Database size={size} color={color} className={className} />;
}

export function IconUser({ size = 20, color = "currentColor", className = "" }) {
  return <User size={size} color={color} className={className} />;
}

export function IconHotel({ size = 20, color = "currentColor", className = "" }) {
  return <Building2 size={size} color={color} className={className} />;
}

export function IconCamera({ size = 20, color = "currentColor", className = "" }) {
  return <Camera size={size} color={color} className={className} />;
}

export function IconEye({ size = 20, color = "currentColor", className = "" }) {
  return <Eye size={size} color={color} className={className} />;
}

export function IconEyeOff({ size = 20, color = "currentColor", className = "" }) {
  return <EyeOff size={size} color={color} className={className} />;
}

export function IconQrCode({ size = 20, color = "currentColor", className = "" }) {
  return <QrCode size={size} color={color} className={className} />;
}

export function IconScan({ size = 20, color = "currentColor", className = "" }) {
  return <Scan size={size} color={color} className={className} />;
}

export function IconWhatsApp({ size = 20, color = "#25D366", className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M20.52 3.48A11.93 11.93 0 0 0 12.06 0C5.46 0 .09 5.37.09 11.97c0 2.11.55 4.16 1.6 5.98L0 24l6.23-1.63a11.9 11.9 0 0 0 5.83 1.5h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.21-3.52-8.42Z"
        fill={color}
      />
      <path
        d="M17.84 14.73c-.28-.14-1.67-.82-1.93-.92-.26-.1-.45-.14-.64.14-.19.28-.73.92-.9 1.11-.17.19-.34.21-.62.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49-.17-.01-.36-.01-.55-.01-.19 0-.49.07-.75.35-.26.28-.99.97-.99 2.37 0 1.4 1.02 2.76 1.16 2.95.14.19 2.01 3.07 4.87 4.31.68.29 1.21.47 1.63.6.69.22 1.31.19 1.8.12.55-.08 1.67-.68 1.9-1.34.24-.66.24-1.22.17-1.34-.07-.12-.26-.19-.54-.33Z"
        fill="#ffffff"
      />
    </svg>
  );
}
