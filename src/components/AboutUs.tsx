'use client';

import Image from 'next/image';
import aboutUsImage from 'assets/about-usImage.png';
import sealImage from 'assets/sealImage.png';

export function AboutUs() {
  return (
    <section className="relative flex gap-12 items-center justify-center p-12 w-full bg-cream" data-name="about-us" data-node-id="1:291">
      {/* Imagem principal à esquerda */}
      <div className="relative" data-name="sectionImage" data-node-id="1:242">
        <Image
          src={aboutUsImage}
          alt="Nossa história"
          width={392}
          height={551}
          className="object-contain"
        />
      </div>

      {/* Texto à direita */}
      <div className=" flex flex-col gap-12 items-start font-syne" data-name="section Text" data-node-id="1:293">
        <p className="text-orange text-2xl max-w-[486px]">
          Mais de 10 anos separam quem somos hoje de quem éramos quando tudo começou.
        </p>
        <div className="flex gap-12 text-xl text-orange font-syne">
          <p className="max-w-[310px]">
            Juntos nós amadurecemos, nos formamos, trabalhamos, curtimos, viajamos. Vimos o Antônio chegar e mudar tudo.
          </p>
          <p className="max-w-[310px] font-syne">
            Criamos um lar, com histórias, planos e uma boa baguncinha. Muita coisa mudou, é verdade. Mas entre tantas fases, uma coisa nunca faltou: amor.
          </p>
        </div>
      </div>

      {/* Selo flutuante do lado direito */}
      <div
        className="absolute"
        style={{
          right: '-48px', // Aumentado para ficar mais "para fora"
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