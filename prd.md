# PRD: Wedding Digital Experience 2026
## Visão Geral
Um site de casamento de alta performance, focado em storytelling visual e funcionalidade de confirmação de presença (RSVP) e lista de presentes personalizada. O objetivo é oferecer uma experiência exclusiva onde o convidado se sinta reconhecido pelo sistema.

## Stack Tecnológica (Recomendada)
Framework: Next.js 14/15 (App Router)
Estilização: Tailwind CSS + Framer Motion (para animações)
Componentes: shadcn/ui (Radix UI)
Banco de Dados/Backend: Supabase (PostgreSQL + Auth + Storage)
Pagamentos: Mercado Pago API / SDK

## Requisitos de Interface (UI/UX)
### Home Page
Navbar: Fixa (sticky) com efeito glassmorphism. Itens: Nossa História, Local, FAQ. Botões de destaque: "Confirmar Presença" (Primary) e "Lista de Presentes" (Outline).

Hero Section: Imagem object-cover ocupando 100vh. Overlay escurecido para legibilidade. Texto centralizado com tipografia serifada elegante.

Story Section: Layout alternado. Imagem à esquerda com bordas arredondadas/suaves e texto narrativo à direita.

Info Section: Cards com ícones para Data, Horário, Local (com link para Waze/Maps) e Dress Code.

FAQ Section: Accordion interativo para dúvidas (Estacionamento, Crianças, Hotel, etc.).



## Requisitos Funcionais (Lógica de Negócio)
### Fluxo de RSVP Inteligente
O sistema deve consultar uma tabela convidados no Supabase para validar a entrada.

Entrada: Campo de texto único para o nome (Busca por ilike para evitar erros de maiúsculas).

Validação: * Se o nome existe na coluna nome_principal: Retornar os nomes associados na coluna grupo_familia (JSON ou Array).

Se não existe: Exibir mensagem "Nome não encontrado. Por favor, verifique a grafia ou entre em contato com os noivos."

Seleção: Checkbox para cada integrante da família ("Confirmado" / "Não poderá ir").

Finalização: Input de Telefone (com máscara) e botão de enviar que atualiza o status no banco de dados.

### Lista de Presentes Dinâmica
Sistema de "Cotas de Lua de Mel" ou produtos físicos fictícios.

Grid de Produtos: Cards contendo imagem, título, valor e status.

Integração de Pagamento: Ao clicar em "Comprar", gerar um link de checkout do Mercado Pago via API.

Webhook de Confirmação: O site deve ouvir o retorno do Mercado Pago (IPN/Webhook). Assim que o pagamento for aprovado, o item na tabela presentes deve ter o campo esgotado alterado para true.

UI de Esgotado: O card deve ganhar um overlay "Comprado" e o botão deve ser desabilitado.

## Estrutura de Dados (Banco de Dados)
Tabela: convidados
id (uuid)

nome_principal (string)

grupo_familia (jsonb) -> Ex: ["Noiva", "Noivo", "Filho"]

confirmados (jsonb) -> Ex: {"Noiva": true, "Noivo": false}

telefone (string)

data_confirmacao (timestamp)

Tabela: presentes
id (uuid)

nome (string)

valor (decimal)

imagem_url (string)

esgotado (boolean)

link_mercado_pago (string)

## Requisitos Não-Funcionais
Performance: Imagens otimizadas (Next/Image) para carregamento rápido em 4G.

Segurança: Proteção contra SQL Injection na busca de nomes.

Responsividade: Mobile-first (90% dos convidados acessarão pelo celular).