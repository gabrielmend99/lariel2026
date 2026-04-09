'use client';

import { H2 } from '@/components/ui/H2';
import Image from 'next/image';
import bgPaper from 'assets/bgPaper.png';
import bgPaper_Mobile from 'assets/bgPaper_Mobile.png';

export function MiniManifesto() {
    return (
<section className="relative flex flex-col items-center justify-center py-12 md:py-12 px-4 md:px-12 w-full bg-cream">
    <div className="relative rotate-2 flex items-center justify-center">
        <Image src={bgPaper} alt="Fundo de papel" className="hidden md:block w-full max-w-[1500px] h-full rounded-md"/>
        <Image src={bgPaper_Mobile} alt="Fundo de papel mobile" className="block md:hidden w-full h-full rounded-md"/>
        <H2 className="absolute text-blue text-4xl text-center max-w-[90%] leading-[1.2] md:leading-[1.5]">
          Nosso casamento, depois de tanto tempo, é um convite para celebrar, com quem amamos, o sentimento que atravessou o tempo e nos trouxe até aqui.
        </H2>
    </div>
      </section>
    );
}