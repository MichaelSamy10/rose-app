import { MessageSquareHeart, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NoTestimonials() {
  // Translations
  const t = useTranslations('pages.home.testimonials');

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-10 text-center">
      {/* Decorative floating stars */}
      <div className="relative flex items-center justify-center">
        <div className="absolute -left-8 -top-4 animate-pulse">
          <Star
            size={16}
            className="fill-pink-300 text-pink-300 opacity-60"
          />
        </div>
        <div className="absolute -right-6 -top-2 animate-pulse delay-300">
          <Star
            size={12}
            className="fill-maroon-300 text-maroon-300 opacity-50"
          />
        </div>
        <div className="absolute -bottom-3 left-4 animate-pulse delay-700">
          <Star
            size={14}
            className="fill-pink-400 text-pink-400 opacity-40"
          />
        </div>

        {/* Icon bubble */}
        <div className="flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-maroon-100 shadow-inner dark:from-zinc-600 dark:to-zinc-800">
          <MessageSquareHeart
            size={44}
            className="text-pink-400 dark:text-pink-300"
          />
        </div>
      </div>

      {/* Text */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-maroon-700 dark:text-pink-200">
          {t('no-testimonials')}
        </h3>
      </div>

      {/* Decorative dots row */}
      <div className="flex items-center gap-1.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className="fill-maroon-200 text-maroon-200 dark:fill-zinc-600 dark:text-zinc-600"
          />
        ))}
      </div>
    </div>
  );
}
