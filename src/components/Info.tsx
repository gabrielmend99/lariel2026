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
                <Image src={larielLogo} alt="Logo Lariel" className="w-full max-w-[200px] md:max-w-[300px]" style={{ transform: 'rotate(-10deg)' }}/>
                <H1>25/07 às 15h</H1>
                <div className="flex flex-col items-center justify-center gap-4">
                <RSVPModal variant="secondary" className="-rotate-2"></RSVPModal> 
                <Button variant='secondary' className="rotate-1" href="/gifts">Lista de presentes</Button>
                </div>
            </div>
            <div className="relative">
                <Image src={bgInfo} alt="Fundo das informações" className="w-full h-full"/>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 gap-6 md:gap-12 md:p-20 flex flex-col text-xl items-center w-full">
                    <div className="flex flex-col gap-2">
                        <p className="text-orange">
                            Começamos com a cerimônia na Comunidade São José.
                        </p>
                        <a href="https://maps.app.goo.gl/dvdRqL8U64cPh6J6A" target="_blank" rel="noopener noreferrer" className="text-blue text-lg underline transition-all hover:scale-105 active:scale-95 inline-flex gap-2">
                            <SquareArrowOutUpRight className="mt-1 w-4 h-4 flex-shrink-0" />
                            Na avenida Vítor Bueno, 239. Jardim Novo II
                        </a>
                    </div>
                        <div className="flex flex-col gap-2">
                        <p className="text-orange">
                            Depois vamos jantar e curtir na chácara Encanto das Fadas.
                        </p>
                        <a href="https://maps.app.goo.gl/YZi94TpPBE9HcoV2A" target="_blank" rel="noopener noreferrer" className="text-blue text-lg underline transition-all hover:scale-105 active:scale-95 inline-flex gap-2">
                            <SquareArrowOutUpRight className="mt-1 w-4 h-4 flex-shrink-0" />
                            Na avenida Lourenço Gerbi, 45. Jardim Ipê Pinheiro
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

