import { ArrowRight, Check } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function About() {
  // Translations
  const t = useTranslations('pages.home.about');

  const features = t.raw('features') as string[];

  return (
    <section className="container m-auto mt-36 flex h-[24.375rem] gap-20">
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="relative before:absolute before:-inset-2 before:z-0 before:w-64 before:-translate-x-4 before:-translate-y-1.5 before:rotate-[3.09deg] before:rounded-[7.5rem] before:rounded-tl-[3.125rem] before:border-4 before:border-maroon-600 dark:before:border-softPink-400">
          {/* About Images */}
          <Image
            src="/assets/images/about/about-img-1.png"
            alt="logo"
            width={302}
            height={344}
            className="relative z-10 max-h-[21.5rem] max-w-72 rounded-[7.5rem] rounded-tl-[3.125rem] object-cover"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            src="/assets/images/about/about-img-2.png"
            alt="logo"
            width={193}
            height={193}
            className="max-h-48 max-w-48 rounded-full object-cover"
          />
          <Image
            src="/assets/images/about/about-img-3.png"
            alt="logo"
            width={193}
            height={144}
            className="max-h-36 rounded-bl-[3.125rem] rounded-br-[6.25rem] rounded-tl-[3.125rem] rounded-tr-[6.25rem] object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-6">
        {/* Heading */}
        <p className="font-bold uppercase tracking-[0.25em] text-softPink-500 dark:text-maroon-400">
          {t('header')}
        </p>

        <div className="flex w-11/12 flex-col gap-2">
          <h3 className="text-3xl font-bold text-maroon-700 dark:text-softPink-200">
            {t.rich('title', {
              span: (chunk: string) => (
                <span className="text-softPink-500 dark:text-maroon-400">
                  {chunk}
                </span>
              ),
            })}
          </h3>

          {/* Description */}
          <p className="leading-none text-zinc-500">
            {t('description')}
          </p>
        </div>

        <Button
          asChild
          className="w-fit bg-maroon-600 px-5 py-4 text-base dark:bg-softPink-200"
        >
          <Link href={'/products'}>
            {t('button')}
            <ArrowRight className="rtl:rotate-180" />
          </Link>
        </Button>

        <ul className="grid w-fit grid-cols-2 gap-x-6">
          {features.map((feat, index) => (
            <li
              key={index}
              className="flex h-[2.625rem] items-center gap-5"
            >
              <Check className="size-5 text-maroon-700 dark:text-softPink-400" />
              {feat}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
