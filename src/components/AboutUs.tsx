'use client';

import Image from 'next/image';
import aboutUsImage from 'assets/about-usImage.png';
import sealImage from 'assets/sealImage.svg';

export function AboutUs() {
  return (
    <section className="relative flex flex-col md:flex-row gap-12 items-center justify-center px-4 py-12 md:p-12 w-full bg-cream" data-name="about-us">
      {/* Imagem principal à esquerda */}
      <div className="relative w-full max-w-[392px] h-auto order-1 md:order-1" data-name="sectionImage">
        <Image
          src={aboutUsImage}
          alt="Nossa história"
          className="object-contain"
        />
      </div>

      {/* Texto à direita */}
      <div className="flex flex-col gap-8 md:gap-12 items-start font-syne order-2 md:order-2" data-name="section Text">
        <p className="font-syne uppercase text-orange text-2xl w-full max-w-[486px]">
          Mais de 10 anos nos separam de quem éramos quando tudo começou.
        </p>
        <div className="flex flex-col md:flex-row gap-4 md:gap-12 text-xl text-orange font-syne">
          <p className="w-full md:max-w-[310px]">
            Juntos nós amadurecemos, nos formamos, trabalhamos, curtimos, viajamos. Vimos o Antônio chegar e mudar tudo.
          </p>
          <p className="w-full md:max-w-[310px]">
            Criamos um lar, com histórias, planos e uma boa baguncinha. Muita coisa mudou, é verdade. Mas entre tantas fases, uma coisa nunca faltou: amor.
          </p>
        </div>
      </div>

      {/* Selo flutuante do lado direito - oculto no mobile */}
      <div
        className="absolute hidden md:block"
        style={{
          right: '-48px',
          top: '-92px',
          transform: 'rotate(17deg)',
        }}
      >
        <Image
          src={sealImage}
          alt=""
          width={180}
          className="object-contain"
        />
      </div>
    </section>
  );
}