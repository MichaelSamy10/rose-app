import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import CarouselDemo from './hero-carousel';

export function CardDemo() {
  return (
    <section className="mx-auto mt-10">
      <div className="flex items-center justify-center gap-6">
        <div className="relative h-[440px] w-80 shrink-0 overflow-hidden rounded-2xl">
          <Image
            src="/images/heroImage.png"
            alt="Special gifts"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
          {/* card content */}
          <div className="absolute inset-0 flex items-end p-6 text-white">
            <div className="flex flex-col gap-3">
              <span className="w-fit rounded-full bg-white/90 px-3 py-1 text-xs text-maroon-600">
                Starting from 10.99 EGP
              </span>
              <h3 className="text-2xl font-semibold leading-snug">
                Special Gifts For The People You Love
              </h3>
              <Button
                asChild
                className="w-fit rounded-xl bg-white text-maroon-600 hover:bg-white"
              >
                <Link href="/products">
                  Shop Now <ArrowRight strokeWidth={3} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <CarouselDemo />
      </div>
    </section>
  );
}
