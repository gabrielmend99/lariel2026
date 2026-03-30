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

              Nossa festa será inteiramente ao ar livre, com pista de dança na grama, então vale trocar saltos muito finos e altos por opções mais amigas da festa.<br/><br/>

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
              Se quiser contribuir com esse novo capitulo das nossas vidas, seu presente será carinhosamente transformado em momentos inesqueciveis na nossa lua de mel e nos próximos planos da nossa família.<br/><br/>
              
              No nosso site, você pode escolher um presente da lista ou contribuir via Pix.
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
      ]}> </FAQ>
    </main>
  );
}