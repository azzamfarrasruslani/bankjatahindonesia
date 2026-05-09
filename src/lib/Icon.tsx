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
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types";

interface IconProps {
  name: IconName;
  className?: string;
}

const iconMap: Record<IconName, LucideIcon> = {
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

/**
 * Komponen Ikon Universal
 * @param name - Nama ikon (contoh: "home", "user", "car")
 * @param className - Tambahan class untuk styling
 */
const Icon = ({ name, className }: IconProps) => {
  const LucideIcon = iconMap[name];
  return LucideIcon ? <LucideIcon className={className} /> : null;
};

export default Icon;
