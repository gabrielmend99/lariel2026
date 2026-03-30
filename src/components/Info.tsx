'use client';

import { RSVPModal } from '@/components/RSVPModal';
import Image from 'next/image';
import larielLogo from '/assets/larielLogo.svg';
import bgInfo from '/assets/bgInfo.svg';
import { Button } from './ui/Button';
import { H1 } from './ui/H1';


export function Info() {
    return(
        <section className="py-12 px-12 w-full bg-purple flex justify-center gap-12 items-center">
            <div className="w-[40%] gap-12 flex flex-col items-center justify-center">
                <Image src={larielLogo} alt="Logo Lariel" className="width-full rotate-10"/>
                <H1>25/07 às 15h30</H1>
                <div className="flex flex-col items-center justify-center gap-4">
                <RSVPModal variant="secondary"></RSVPModal> 
                <Button variant='secondary'>Lista de presentes</Button>
                </div>
            </div>
            <div className="relative">
                <Image src={bgInfo} alt="Fundo das informações" className="w-full h-full object-cover"/>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-12 px-12 flex flex-col gap-12 text-xl items-center w-full">
                    <div className="flex flex-col gap-2">
                        <p className="text-orange">
                            Vamos iniciar nossa celebração com a cerimônia na Comunidade São José.
                        </p>
                        <a href="google.com" className="text-blue underline transition-all hover:scale-105 active:scale-95">
                            Na rua Fernando Casagrande, 205. Jardim Novo II
                        </a>
                    </div>
                        <div className="flex flex-col gap-2">
                        <p className="text-orange">
                            Depois iremos curtir o jantar e a festa na chácara Encanto das Fadas.
                        </p>
                        <a href="google.com" className="text-blue underline transition-all hover:scale-105 active:scale-95">
                            Na Rodovia Vereador Alm I - Av. Lourenço Gerbi, 45. Jardim Ipê Pinheiro
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

