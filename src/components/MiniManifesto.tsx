'use client';

import { H2 } from '@/components/ui/H2';
import Image from 'next/image';
import bgPaper from 'assets/bgPaper.png';

export function MiniManifesto() {
    return (
<section className="relative flex flex-col items-center justify-center py-12 px-12 w-full bg-cream">
    <div className="relative rotate-2 flex items-center justify-center">
        <Image src={bgPaper} alt="Fundo de papel" className="w-full h-full rounded-md"/>
        <H2 className="absolute text-blue text-4xl text-center max-w-[90%]">
          Nosso casamento, depois de tanto tempo, é um convite para celebrar, com quem amamos, o sentimento que atravessou o tempo e nos trouxe até aqui.
        </H2>
    </div>
      </section>
    );
}