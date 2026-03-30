'use client';

import Image from 'next/image';
import heroImage from 'assets/heroImage.jpg';
import { H1 } from './ui/H1';

export function Hero() {
  return (
    <section
      className="bg-orange flex flex-col items-center px-12 py-12 w-full h-[75dvh]"
      data-name="hero"
      data-node-id="10:4"
    >
      <div className="overflow-hidden rounded-xl relative w-full h-full" data-name="heroImage">
        <Image
          src={heroImage}
          alt="Casal"
          fill
          className="object-cover"
          priority
        />

        {/* Texto sobreposto */}
        <div className="absolute inset-0 flex items-center justify-between px-12 z-10">
          <H1 className="max-w-[465px] uppercase text-cream">
            Celebramos o agora com tudo o que já fomos
          </H1>
          <H1 className="max-w-[272px] uppercase text-cream">
            e tudo o que ainda seremos
          </H1>
        </div>
      </div>
    </section>
  );
}