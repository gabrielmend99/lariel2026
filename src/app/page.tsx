import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { AboutUs } from '@/components/AboutUs';
import { RSVPModal } from '@/components/RSVPModal';
import { MiniManifesto } from '@/components/MiniManifesto';
import { Info } from '@/components/Info';
import { FAQ } from '@/components/FAQ';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutUs />
      <MiniManifesto />
      <Info />
      <FAQ items={[
        {
          question: "O que vestir?",
          answer: (
            <>
              O traje é social e pra gente isso significa: se sinta elegante, mas principalmente confortável!<br/><br/>
              
              Iremos nos casar no inverno e o clima anda cheio de surpresas, escolha roupas que possam combinar com uma camada extra, pra se manter aquecido caso precise.<br/><br/>
              Lembre-se, branco e off white, são reservados para a noiva ok?
            </>)
        },
        {
          question: "Preciso confirmar presença?",
          answer: (
            <>
              Nosso casamento foi pensado com muito carinho para ser vivido ao lado de quem faz parte da nossa história. Cada um de vocês foi escolhido a dedo.<br/><br/>

              Pedimos que não incluam convidados extras sem falar com a gente antes. Sua presença foi cuidadosamente planejada e ela é muito importante pra nós! Por isso pedimos que você confirme sua presença o quanto antes. Isso nos ajuda a organizar tudo para que o dia seja leve, bonito e especial para todos.
            </>)
        },
        {
          question: "Como posso presentear os noivos?",
          answer: (
            <>
              Como já temos nossa casa equipada, nossa lista de presentes funciona de um jeito um pouquinho diferente: em vez de itens físicos, as opções são contribuições em dinheiro que serão transformadas em experiências inesquecíveis, como nossa lua de mel e os próximos planos da nossa família.<br/><br/>
              
              É bem simples! Acesse nossa lista <a href='/gifts' className="text-blue text-xl underline transition-all hover:scale-105 active:scale-95">neste link</a>, escolha uma das opções com valores sugeridos (como uma diária na pousada, um jantar romântico ou um passeio especial) e contribua via PIX ou cartão pelo Mercado Pago, com total segurança.<br/><br/>

              Se preferir, também é possível contribuir livremente com o valor que quiser, sem escolher uma opção específica, é só clicar em "Contribuir via PIX" diretamente na lista.<br/><br/>
  
              O que importa de verdade é a sua presença e o seu carinho. Qualquer contribuição, grande ou pequena, vai fazer parte da nossa história. 💛
            </>)
        },
        {
          question: "Sobre a cerimônia",
          answer: (
            <>
          Chegue com um tempinho de antecedência para não perder nenhum momento!<br/><br/>

          Se quiser fotografar ou gravar, fique à vontade. Pedimos apenas que coloque o celular no silencioso ou no modo avião e principalmente: aproveite o momento com a gente, esteja presente, sinta e celebre.<br/><br/>

          Também teremos profissionais registrando tudo e, depois, vamos compartilhar esses momentos com vocês.
            </>)
        },
      ]} />
    </main>
  );
}