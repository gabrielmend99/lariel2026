import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { H1 } from '@/components/ui/H1';
import { Button } from '@/components/ui/Button';
import { PixCopyButton } from '@/components/PixCopyButton';
import PixIcon from '@/components/PixIcon';
import { supabase } from '@/lib/supabase';
import QRCode from 'assets/qr-code.png';
import Link from 'next/link';

interface Presente {
  id: string;
  nome: string;
  valor: number;
  imagem_url: string | null;
  esgotado: boolean;
  link_mercado_pago: string | null;
}

async function getPresentes(): Promise<Presente[]> {
  console.log('[DEBUG] getPresentes chamado em:', new Date().toISOString());

  const { data, error } = await supabase
    .from('presentes')
    .select('*')
    .order('valor', { ascending: true });

  if (error) {
    console.error('[DEBUG] Erro ao buscar presentes:', error);
    return [];
  }

  console.log('[DEBUG] Presentes encontrados:', data?.length);
  console.log('[DEBUG] Dados completos:', data);

  // Ordenar: com foto primeiro, depois sem foto
  const sorted = (data || []).sort((a, b) => {
    if (a.imagem_url && !b.imagem_url) return -1;
    if (!a.imagem_url && b.imagem_url) return 1;
    return 0;
  });

  console.log('[DEBUG] Presentes retornados após sort:', sorted.length);
  return sorted;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Gifts() {
  const presentes = await getPresentes();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="bg-orange w-full flex flex-col gap-8 items-center py-12">
        <H1 className="uppercase w-full max-w-[1060px] text-center">Lista de presentes</H1>
        <p className="text-cream text-xl text-center w-full max-w-[1060px] px-4">Nossa lista de presentes reúne itens e experiências que vão nos fazer muito felizes.</p>
      </section>

      <section className="bg-cream w-full px-4 md:px-12 py-12">
        <div className="w-full bg-white rounded-xl p-6 md:p-12 flex flex-col md:flex-row justify-center justify-between gap-8 md:gap-12">
          <div className="flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-4">
          <h2 className="text-orange text-2xl uppercase">No PIX é mais fácil</h2>
          <p className="text-orange text-xl">Tá na dúvida? Manda um PIX!
          <br/>Vamos receber sua contribuição com muito amor e transformar em momentos especiais.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-1">
              <PixIcon className="w-6 text-orange"/>
              <p className="text-orange text-xl">(19) 97140-8063</p>
            </div>
            <PixCopyButton />
          </div>
          </div>
          <div className="w-full flex md:max-w-[240px] h-auto justify-end">
            <Image src={QRCode} alt="QR Code para pagamento" className="w-full rounded-lg"/>
          </div>
        </div>
      </section>

      <section className="bg-cream flex flex-col gap-12 w-full px-4 py-12 md:p-12">
        <div className="w-full grid gap-4 md:gap-12 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {presentes.map((presente) => {
            const cardContent = (
              <>
                <div className="aspect-square relative overflow-hidden mix-blend-multiply">
                  {presente.imagem_url ? (
                    <Image
                      src={presente.imagem_url}
                      alt={presente.nome}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 px-4">
                      <span className="text-4xl">🎁</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col p-2 md:p-4 gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-orange text-xl">{presente.nome}</h3>
                    <p className="text-orange text-lg">{formatPrice(presente.valor)}</p>
                  </div>
                  {presente.esgotado ? (
                    <div className="bg-orange/20 text-orange/60 px-4 py-3 rounded-full text-center uppercase">
                      Esse já foi
                    </div>
                  ) : presente.link_mercado_pago ? (
                    <div className="bg-orange text-cream px-4 py-3 rounded-full text-center font-medium uppercase">
                      Presentear
                    </div>
                  ) : (
                    <div className="bg-orange/20 text-orange/60 px-4 py-3 rounded-full text-center font-medium uppercase">
                      Indisponível
                    </div>
                  )}
                </div>
              </>
            );

            if (!presente.esgotado && presente.link_mercado_pago) {
              return (
                <Link
                  key={presente.id}
                  href={presente.link_mercado_pago}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col"
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={presente.id} className="flex flex-col">
                {cardContent}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}