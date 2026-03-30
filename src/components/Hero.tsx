'use client';

import Image from 'next/image';
import heroImage from 'assets/heroImage.jpg';
import { H1 } from './ui/H1';

export function Hero() {
  return (
    <section
      className="bg-orange flex flex-col items-center px-4 md:px-12 py-8 md:py-12 w-full h-[60dvh] md:h-[75dvh]"
      data-name="hero"
    >
      <div className="overflow-hidden rounded-xl relative w-full h-full" data-name="heroImage">
        <Image
          src={heroImage}
          alt="Por do sol"
          fill
          className="object-cover"
          priority
        />

        {/* Texto sobreposto */}
        <div className="absolute inset-0 flex flex-col md:flex-row items-left md:items-center justify-center justify-between gap-4 md:gap-4 px-4 py-8 md:px-12 z-10">
          <H1 className="w-full max-w-[465px] uppercase text-cream text-left text-2xl md:text-4xl">
            Celebramos o agora com tudo o que já fomos
          </H1>
          <H1 className="w-full max-w-[272px] uppercase text-cream text-left text-2xl md:text-4xl">
            e tudo o que ainda seremos
          </H1>
        </div>
      </div>
    </section>
  );
}