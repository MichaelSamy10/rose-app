import {
  Home,
  Gift,
  LayoutGrid,
  PartyPopper,
  Phone,
  Info,
  LucideIcon,
} from 'lucide-react';

export interface NavLink {
  href: string;
  labelKey: string;
  icon: LucideIcon;
  active?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/', labelKey: 'home', icon: Home, active: true },
  { href: '/products', labelKey: 'products', icon: Gift },
  {
    href: '/',
    labelKey: 'categories',
    icon: LayoutGrid,
  },
  {
    href: '/',
    labelKey: 'occasions',
    icon: PartyPopper,
  },
  { href: '/', labelKey: 'contact', icon: Phone },
  { href: '/', labelKey: 'about', icon: Info },
];

export interface FooterLink {
  labelKey: string;
  href: string;
}

export const FOOTER_LINKS: FooterLink[] = [
  { labelKey: 'home', href: '/' },
  { labelKey: 'products', href: '/products' },
  { labelKey: 'categories', href: '/' },
  { labelKey: 'occasions', href: '/' },
  { labelKey: 'contact', href: '/' },
  { labelKey: 'about', href: '/' },
  { labelKey: 'terms', href: '/' },
  { labelKey: 'privacy', href: '/' },
  { labelKey: 'faqs', href: '/' },
];
