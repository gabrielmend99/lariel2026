'use client';

import { RSVPModal } from '@/components/RSVPModal';
import Image from 'next/image';
import larielLogo from '/assets/larielLogo.svg';
import bgInfo from '/assets/bgInfo.svg';
import { Button } from './ui/Button';
import { H1 } from './ui/H1';
import { SquareArrowOutUpRight } from 'lucide-react';


export function Info() {
    return(
        <section className="px-4 py-12 md:p-12 w-full bg-purple flex flex-col md:flex-row justify-center gap-12 items-center">
            <div className="md:w-[40%] gap-8 md:gap-12 flex flex-col items-center justify-center">
                <Image src={larielLogo} alt="Logo Lariel" className="w-full max-w-[200px] md:max-w-[300px] rotate-10"/>
                <H1>25/07 às 15h30</H1>
                <div className="flex flex-col items-center justify-center gap-4">
                <RSVPModal variant="secondary"></RSVPModal> 
                <Button variant='secondary'>Lista de presentes</Button>
                </div>
            </div>
            <div className="relative">
                <Image src={bgInfo} alt="Fundo das informações" className="w-full h-full"/>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 gap-6 md:gap-12 md:py-12 md:px-12 flex flex-col text-xl items-center w-full">
                    <div className="flex flex-col gap-2">
                        <p className="text-orange">
                            Começamos com a cerimônia na Comunidade São José.
                        </p>
                        <a href="https://maps.app.goo.gl/8Yj4fYkQdE3XyZ3A9" target="_blank" rel="noopener noreferrer" className="text-blue text-lg underline transition-all hover:scale-105 active:scale-95 inline-flex gap-2">
                            <SquareArrowOutUpRight className="mt-1 w-4 h-4 flex-shrink-0" />
                            Na rua Fernando Casagrande, 205. Jardim Novo II
                        </a>
                    </div>
                        <div className="flex flex-col gap-2">
                        <p className="text-orange">
                            Depois vamos jantar e curtir na chácara Encanto das Fadas.
                        </p>
                        <a href="https://maps.app.goo.gl/abc123def456ghi789" target="_blank" rel="noopener noreferrer" className="text-blue text-lg underline transition-all hover:scale-105 active:scale-95 inline-flex gap-2">
                            <SquareArrowOutUpRight className="mt-1 w-4 h-4 flex-shrink-0" />
                            Na Rodovia Vereador Alm I - Av. Lourenço Gerbi, 45. Jardim Ipê Pinheiro
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

