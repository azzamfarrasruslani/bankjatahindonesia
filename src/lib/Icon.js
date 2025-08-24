import {
  Home,
  User,
  ChevronLeft,
  ChevronRight,
  LogIn,
  Receipt,
  Languages,
  Search,
  Filter,
  List,
  LayoutGrid,
  MapPin,
  XCircle,
  Car,
  Shield,
  Handshake,
  CheckSquare,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

/**
 * Komponen Ikon Universal
 * @param {string} name - Nama ikon (contoh: "home", "user", "car")
 * @param {string} className - Tambahan class untuk styling
 */
const Icon = ({ name, className }) => {
  const icons = {
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
    login: LogIn,
    language: Languages,
    promo: Receipt,
    home: Home,
    user: User,
    list: List,
    close: XCircle,
    card: LayoutGrid,
    location: MapPin,
    search: Search,
    filter: Filter,
    arrowLeft: ChevronLeft,
    arrowRight: ChevronRight,
    car: Car,
    shield: Shield,
    handshake: Handshake,
    checklist: CheckSquare,
  };

  const LucideIcon = icons[name];
  return LucideIcon ? <LucideIcon className={className} /> : null;
};

export default Icon;
