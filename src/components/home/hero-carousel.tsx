'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { useTranslations } from 'next-intl';

// Carousel images data
const slides = [
  { src: '/images/heroBg1.png', alt: 'Slide 1' },
  { src: '/images/Carousal1.png', alt: 'Slide 2' },
  { src: '/images/Carousal2.png', alt: 'Slide 3' },
  { src: '/images/Carousal3.png', alt: 'Slide 4' },
];

export default function CarouselDemo() {
  // Translation
  const t = useTranslations(
    'pages.home.hero-card.carousel-content',
  );

  // Carousel API instance
  const [api, setApi] = useState<CarouselApi | null>(null);

  // Current active slide index
  const [current, setCurrent] = useState(0);

  // Sync active slide index and attach listener
  useEffect(() => {
    if (!api) return;

    // Function to update current index
    const onSelect = () =>
      setCurrent(api.selectedScrollSnap());

    // Sync initially
    setCurrent(api.selectedScrollSnap());

    // Attach listener
    api.on('select', onSelect);

    // Cleanup listener on unmount or api change
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    // Carousel
    <Carousel
      setApi={setApi}
      className="relative h-[440px] w-full overflow-x-hidden rounded-2xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {/* Carousel content container */}
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <Card className="h-full overflow-hidden">
              <CardContent className="relative h-[440px] p-0">
                {/* Slide image */}
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

                {/* Slide text content */}
                <div className="absolute inset-0 flex items-end p-6 text-white">
                  <div className="flex flex-col gap-3">
                    <h3 className="max-w-[320px] text-4xl font-semibold">
                      {t('header')}
                    </h3>
                    <p>{t('sub-header')}</p>

                    {/* Button linking to products page */}
                    <Button
                      variant={'secondary'}
                      className="w-fit bg-white text-maroon-600"
                    >
                      <Link href="/products">
                        {t('button')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation buttons */}
      <div className="absolute bottom-4 right-4 z-10 flex gap-2 rounded-full bg-white/80 p-2 rtl:left-4 rtl:right-auto">
        <button onClick={() => api?.scrollPrev()}>
          <ChevronLeft
            size={30}
            className="rtl:rotate-180"
          />
        </button>

        <button onClick={() => api?.scrollNext()}>
          <ChevronRight
            size={30}
            className="rtl:rotate-180"
          />
        </button>
      </div>

      {/* Pagination dots */}
      <div className="absolute right-4 top-4 z-10 flex gap-3 rtl:left-4 rtl:right-auto">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-3 cursor-pointer rounded-full transition-all ${
              current === index
                ? 'w-8 bg-red-600'
                : 'w-3 bg-white/70'
            }`}
          />
        ))}
      </div>
    </Carousel>
  );
}
