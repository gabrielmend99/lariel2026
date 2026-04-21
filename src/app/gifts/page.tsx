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

// Seeded shuffle - Fisher-Yates com seed determinística
function seededShuffle<T>(array: T[], seed: number): T[] {
  const arr = [...array];
  
  // Generator pseudo-aleatório com seed
  function mulberry32(a: number) {
    return function() {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
  }

  const rng = mulberry32(seed);

  // Fisher-Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

// Gerar seed baseado no dia atual (muda a cada dia)
function getDailySeed(): number {
  const today = new Date();
  const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD
  return parseInt(dateString.replace(/-/g, ''), 10);
}

async function getPresentes(): Promise<Presente[]> {
  console.log('[DEBUG] getPresentes chamado em:', new Date().toISOString());

  const { data, error } = await supabase
    .from('presentes')
    .select('*');

  if (error) {
    console.error('[DEBUG] Erro ao buscar presentes:', error);
    return [];
  }

  console.log('[DEBUG] Presentes encontrados:', data?.length);

  // Valores dos vales que devem aparecer fixamente no início
  const valesValores = [50, 100, 250, 500];
  
  // Separar vales especiais do resto
  const valesPresentes: Presente[] = [];
  const outrosPresentes: Presente[] = [];
  
  (data || []).forEach(presente => {
    if (valesValores.includes(presente.valor)) {
      valesPresentes.push(presente);
    } else {
      outrosPresentes.push(presente);
    }
  });

  // Ordenar vales na ordem desejada
  const valesOrdenados = valesValores
    .map(valor => valesPresentes.find(p => p.valor === valor))
    .filter((p): p is Presente => p !== undefined);

  // Separar outros presentes por presença de imagem
  const comImagem = outrosPresentes.filter(p => p.imagem_url);
  const semImagem = outrosPresentes.filter(p => !p.imagem_url);

  // Embaralhar cada grupo com a mesma seed
  const seed = getDailySeed();
  const comImagemEmbaralhados = seededShuffle(comImagem, seed);
  const semImagemEmbaralhados = seededShuffle(semImagem, seed + 1); // Seed diferente para o segundo grupo

  // Combinar: vales primeiro, depois com imagem, depois sem imagem
  const sorted = [...valesOrdenados, ...comImagemEmbaralhados, ...semImagemEmbaralhados];

  console.log('[DEBUG] Presentes retornados após shuffle:', sorted.length);
  console.log('[DEBUG] Vales encontrados:', valesOrdenados.length);
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
        <p className="text-cream text-xl text-center w-full max-w-[1060px] px-4">Para nos presentear, você pode escolher um produto ou experiência da nossa lista, clicar em "Presentear" e fazer o pagamento como preferir: parcelado no cartão ou via PIX. O valor chega direto em nossas mãos e você não precisa se preocupar com mais nada.</p>
      </section>

      <section className="bg-cream w-full px-4 md:px-12 py-12">
        <div className="w-full border border-orange rounded-xl p-6 md:p-12 flex flex-col md:flex-row justify-center justify-between gap-8 md:gap-12">
          <div className="flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-4">
          <h2 className="text-orange text-2xl uppercase">No PIX é mais fácil</h2>
          <p className="text-orange text-xl">Tá na dúvida? Manda um PIX!
          <br/>Vamos receber sua contribuição com muito amor.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-1">
              <PixIcon className="w-6 text-orange"/>
              <p className="text-orange text-xl">Chave PIX: (19) 97140-8063</p>
            </div>
            <PixCopyButton/>
          </div>
          </div>
          <div className="w-full flex md:max-w-[240px] h-auto justify-end">
            <Image src={QRCode} alt="QR Code para pagamento" className="w-full rounded-lg aspect-square"/>
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