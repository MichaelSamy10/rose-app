import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { FOOTER_LINKS } from '@/lib/constants/navigation';
import { getTranslations } from 'next-intl/server';

export async function Footer() {
  const t = await getTranslations(
    'pages.components.footer',
  );

  return (
    <footer className="w-full bg-zinc-800 py-16 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-12 px-6 md:flex-row md:px-10">
        {/* Left Section: Logo & Copyright */}
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-6 rtl:md:items-end">
          <Link href="/">
            <Image
              src="/assets/images/logo/logo.png"
              alt="Rose Logo"
              width={160}
              height={160}
              className="h-auto w-40 object-contain"
            />
          </Link>
          <div className="text-center md:text-start">
            <h3 className="text-lg font-bold capitalize tracking-tight text-white/90">
              {t('appName')}
            </h3>
            <p className="mt-1 text-xs capitalize text-zinc-500">
              {t('copyright')}
            </p>
          </div>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="flex flex-col gap-6">
          <h4 className="text-start text-lg font-bold capitalize text-softPink-300">
            {t('discoverTitle')}
          </h4>
          <nav className="grid grid-cols-1 gap-x-12 gap-y-2 text-start text-sm text-zinc-300 sm:grid-cols-2">
            {FOOTER_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="capitalize transition-colors hover:text-softPink-200"
              >
                {t(`nav.${link.labelKey}`)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section: Newsletter */}
        <div className="flex w-full flex-col gap-6 md:w-auto md:max-w-md">
          <div className="space-y-2 text-center md:text-start">
            <h4 className="text-lg font-bold capitalize text-softPink-300">
              {t('newsletterTitle')}{' '}
              <span className="text-white">
                {t('newsletterDiscount')}
              </span>{' '}
              {t('newsletterSuffix')}
            </h4>
            <p className="text-xs capitalize text-zinc-500">
              {t('newsletterDescription')}
            </p>
          </div>

          <div className="relative flex w-full items-center">
            <Input
              type="email"
              placeholder={t('emailPlaceholder')}
              className="h-12 w-full rounded-full border-none bg-zinc-700/50 pe-32 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-softPink-500/20"
            />
            <button className="absolute end-1 top-1 flex h-10 items-center gap-2 rounded-full bg-softPink-100 px-5 text-sm font-bold capitalize text-maroon-900 transition-all hover:bg-softPink-200 active:scale-95">
              {t('subscribeButton')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
