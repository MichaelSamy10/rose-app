import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import {
  MapPin,
  Search as SearchIcon,
  ChevronDown,
  Heart,
  ShoppingCart,
  Bell,
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { AccountDropdown } from '@/components/shared/account-dropdown';
import { ThemeToggle } from './theme-toggle';
import { NAV_LINKS } from '@/lib/constants/navigation';
import { cn } from '@/lib/utils/tailwind-merge';
import { Separator } from '@/components/ui/separator';
import { getTranslations } from 'next-intl/server';
import ToggleLang from './toggle-lang';
import { LocationButton } from './location-button';

export async function Header() {
  const t = await getTranslations(
    'pages.components.header',
  );

  return (
    <header className="w-full bg-white shadow-sm dark:bg-zinc-800">
      {/* Top Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/assets/images/logo/logo.png"
            alt="Rose Logo"
            width={70}
            height={70}
            className="h-auto object-contain"
          />
        </Link>

        {/* Deliver To */}
        <div className="ms-8 hidden items-center gap-2 lg:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 text-maroon-600 dark:bg-zinc-800 dark:text-softPink-300">
            <MapPin className="h-5 w-5" />
          </div>
          <LocationButton
            deliverToText={t('deliverTo')}
            locationText={t('location')}
          />
        </div>

        {/* Search Bar */}
        <div className="mx-8 hidden max-w-2xl flex-1 md:block">
          <div className="group relative">
            <SearchIcon className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-maroon-500 dark:text-zinc-500 dark:group-focus-within:text-softPink-300" />
            <Input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="h-12 w-full border-zinc-200 bg-white ps-11 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-maroon-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus-visible:ring-softPink-500/20"
            />
          </div>
        </div>

        {/* Right Section: Account, Wishlist, Cart, Bell, Language */}
        <div className="flex items-center gap-6">
          {/* Account Dropdown */}
          <AccountDropdown
            trigger={
              <button className="flex items-center gap-1 transition-opacity hover:opacity-80">
                <div className="flex flex-col items-start leading-none rtl:items-end">
                  <span className="text-sm capitalize text-zinc-400 dark:text-zinc-500">
                    {t('greeting')}
                  </span>
                  <span className="text-sm font-bold capitalize text-maroon-800 dark:text-zinc-100">
                    {t('userName')}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
              </button>
            }
          />

          <Separator
            orientation="vertical"
            className="h-8"
          />

          {/* Social/Utility Icons */}
          <div className="flex items-center gap-4">
            {/* wishlist button */}
            <button className="text-zinc-500 transition-colors hover:text-maroon-600 dark:text-zinc-400 dark:hover:text-softPink-300">
              <Heart className="h-6 w-6 font-light" />
            </button>

            {/* cart button */}
            <Link
              href={'/cart'}
              className="relative text-zinc-500 transition-colors hover:text-maroon-600 dark:text-zinc-400 dark:hover:text-softPink-300"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -end-2.5 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white ring-2 ring-white">
                8
              </span>
            </Link>

            {/* notification button */}
            <button className="relative text-zinc-500 transition-colors hover:text-maroon-600 dark:text-zinc-400 dark:hover:text-softPink-300">
              <Bell className="h-6 w-6" />
              <span className="absolute -end-2.5 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white ring-2 ring-white">
                8
              </span>
            </button>
            <ThemeToggle />
          </div>

          <Separator
            orientation="vertical"
            className="h-8"
          />

          {/* Language Toggle */}
          <ToggleLang />
        </div>
      </div>

      {/* Navigation Bar (Maroon) */}
      <div className="w-full bg-maroon-700 text-white dark:bg-softPink-200 dark:text-maroon-900">
        <nav className="mx-auto flex max-w-7xl items-center justify-center gap-12 px-4 py-3">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-2 text-sm capitalize transition-colors hover:text-softPink-200 dark:hover:text-maroon-700',
                link.active
                  ? 'font-bold'
                  : 'font-medium opacity-90',
              )}
            >
              <link.icon className="h-5 w-5" />
              <span>{t(`nav.${link.labelKey}`)}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
