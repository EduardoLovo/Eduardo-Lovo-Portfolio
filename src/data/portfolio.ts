// ============================================================
//  DADOS DO PORTFÓLIO — edite tudo por aqui.
//  Este é o único arquivo que você precisa mexer para atualizar
//  seu nome, textos, projetos, skills e links.
// ============================================================

export const personal = {
  name: "Eduardo Lovo",
  role: "Desenvolvedor Full-Stack",
  // Frase curta que aparece no topo (hero)
  tagline:
    "Transformo ideias em aplicações web rápidas, acessíveis e bonitas. Do banco de dados à interface.",
  location: "Jandaia do Sul, PR",
  phone: "(43) 99956-7684",
  // Link do WhatsApp (formato: 55 + DDD + número), com mensagem pronta
  whatsapp:
    "https://wa.me/5543999567684?text=Ol%C3%A1%20Eduardo%2C%20vi%20o%20seu%20portf%C3%B3lio!",
  email: "eduardo.llovo@gmail.com",
  // Caminho do seu currículo em PDF (coloque o arquivo em /public)
  cvUrl: "/cv-eduardo-lovo.pdf",
  // Sua foto (arquivo em /public)
  photo: "/eduardo.jpg",
  // Anos de experiência / status
  available: true, // mostra o selo "Disponível para novas vagas"
};

export const socials = [
  { name: "GitHub", url: "https://github.com/EduardoLovo", icon: "github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/eduardo-felipe-lovo-475019214/", icon: "linkedin" },
  { name: "WhatsApp", url: "https://wa.me/5543999567684?text=Ol%C3%A1%20Eduardo%2C%20vi%20o%20seu%20portf%C3%B3lio!", icon: "whatsapp" },
  { name: "Email", url: "mailto:eduardo.llovo@gmail.com", icon: "email" },
];

// Texto da seção "Sobre mim"
export const about = {
  paragraphs: [
    "Sou desenvolvedor full-stack",
    "Já construí dois e-commerces que estão em produção (React + NestJS + PostgreSQL) e um sistema interno em Next.js que a equipe de vendas usa no dia a dia. Também entreguei sites e sistemas para outros clientes com Next.js, Supabase e Sanity CMS.",
    "Na prática, já trabalhei com pagamentos (Pix e cartão parcelado), frete dos Correios, autenticação (JWT, OAuth e 2FA) e painéis administrativos.",
    "Também venho me aprofundando em Docker e CI/CD. No Task API — Express × Flask, montei o pipeline completo no GitHub Actions: lint, testes em várias versões de Node e Python, build e teste da imagem Docker e um teste de contrato que sobe as duas APIs e compara as respostas. Com a branch main protegida, o deploy no Render só acontece depois que o CI passa. Esse e outros estudos, como o Fullstack Starter, estão em Projetos em destaque.",
  ],
  // Números de destaque (edite ou remova)
  stats: [
    { label: "E-commerces no ar", value: "2" },
    { label: "Tecnologias", value: "20+" },
    { label: "Vontade de aprender", value: "∞" },
  ],
};

// Habilidades técnicas agrupadas por categoria
export const skills: { category: string; items: string[] }[] = [
  {
    category: "Frontend",
    items: [
      "React",
      "TypeScript",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
      "GSAP",
    ],
  },
  {
    category: "Backend",
    items: [
      "NestJS",
      "Node.js",
      "REST APIs",
      "JWT & Passport",
      "Auth.js",
      "Zod",
      "Nodemailer",
    ],
  },
  {
    category: "Banco de Dados",
    items: ["PostgreSQL", "Prisma ORM", "Supabase", "Sanity CMS"],
  },
  {
    category: "Ferramentas & DevOps",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "AWS S3",
      "Cloudflare R2",
      "Jest",
      "Swagger",
      "Vercel",
    ],
  },
];

// Projetos em destaque
export type Project = {
  title: string;
  subtitle?: string; // 1 linha explicando o que é
  description: string;
  highlights?: string[]; // bullets de destaque (o que você construiu)
  tags: string[]; // badges de tecnologia
  featured?: boolean; // card grande em destaque
  image?: string; // screenshot em /public (opcional)
  links?: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    title: "Plataforma E-commerce — Inphantil",
    subtitle: "Loja de móveis e produtos infantis, em produção",
    description:
      "Plataforma de e-commerce completa que desenvolvi e mantenho no ar para a Inphantil Móveis. Front-end em React + Vite consumindo uma API NestJS, com PostgreSQL via Prisma e imagens no AWS S3.",
    highlights: [
      "Pagamentos reais: Pix e cartão de crédito com parcelamento e juros via gateway e.Rede (com migração para OAuth 2.0).",
      "Cálculo de frete integrado aos Correios, com regras próprias de entrega.",
      "Painel administrativo: produtos com variações (cor × tamanho), pedidos, orçamentos e relatórios de vendas em PDF.",
      "Autenticação robusta: JWT, login com Google (OAuth), bcrypt, rate limiting e reCAPTCHA.",
      "Infra: e-mails transacionais (Nodemailer), tarefas agendadas (retentativa de pagamento) e SEO + Analytics.",
    ],
    tags: [
      "React 19",
      "TypeScript",
      "Vite",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Zustand",
      "AWS S3",
      "JWT / OAuth",
      "Tailwind",
    ],
    featured: true,
    image: "/projeto-inphantil.png",
    links: [{ label: "Ver site", url: "https://www.inphantil.com.br/" }],
  },
  {
    title: "E-commerce — Conceitual Pet",
    description:
      "Loja virtual completa de produtos para pets, em produção. Mesma base full-stack (React + NestJS + PostgreSQL) com pagamentos, cálculo de frete dos Correios e painel administrativo.",
    tags: ["React", "TypeScript", "NestJS", "Prisma", "PostgreSQL", "Tailwind"],
    image: "/projeto-conceitualpet.png",
    links: [{ label: "Ver site", url: "https://www.conceitualpet.com.br/" }],
  },
  {
    title: "Ana Cordeiro — Arquitetura",
    description:
      "Site institucional para uma arquiteta, com painel administrativo próprio (CMS): a cliente edita todo o conteúdo — projetos, textos e imagens — sem tocar no código. Design minimalista P&B, formulário de contato e SEO.",
    tags: ["Next.js", "TypeScript", "Sanity CMS", "Tailwind", "Vercel"],
    image: "/projeto-anacordeiro.png",
    links: [
      { label: "Ver site", url: "https://www.anacordeiroarq.com.br/" },
      { label: "Código", url: "https://github.com/EduardoLovo/Ana-Cordeiro" },
    ],
  },
  {
    title: "Inphantil Cloud — Painel Interno",
    description:
      "Sistema interno da Inphantil: mostruário público e área fechada para a equipe, com calculadoras de venda, orçamentos, cotação de frete e catálogo. Controle de acesso por papéis (DEV, ADMIN, vendedor) validado no servidor e upload de imagens para o Cloudflare R2 com limpeza automática de arquivos órfãos.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Auth.js", "Tailwind"],
    image: "/projeto-inphantil-adm.png",
    links: [
      { label: "Ver site", url: "https://inphantil-moveis.vercel.app" },
      { label: "Código", url: "https://github.com/EduardoLovo/Inphantil-Moveis-Adm" },
    ],
  },
  {
    title: "Pokédex Dive",
    description:
      "Pokédex dos 151 Pokémon de Kanto consumindo a PokéAPI, com navegação em profundidade: ao rolar, os cards \"mergulham\" em direção à câmera. Busca por nome ou número, navegação por teclado, tema claro/escuro e suporte a movimento reduzido.",
    tags: ["React", "TypeScript", "Vite", "GSAP", "PokéAPI"],
    image: "/projeto-pokemon2.png",
    links: [
      { label: "Ver site", url: "https://api-pokemon-ten.vercel.app" },
      { label: "Código", url: "https://github.com/EduardoLovo/Api-Pokemon" },
    ],
  },
  {
    title: "Confeitaria da Re — Cardápio Digital",
    description:
      "Cardápio digital próprio (sem comissão de marketplace) para uma confeitaria: catálogo de pronta entrega com carrinho, checkout e acompanhamento do pedido, além de encomendas para festas via WhatsApp. Painel administrativo com pedidos em tempo real e alerta sonoro, protegido por verificação em duas etapas (2FA) e RLS no banco.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind", "Zod"],
    image: "/confeitaria-da-re.png",
    links: [
      { label: "Ver site", url: "https://confeitaria-da-re.vercel.app/" },
      { label: "Código", url: "https://github.com/EduardoLovo/Confeitaria-da-Re" },
    ],
  },
  {
    title: "Fullstack Starter",
    description:
      "Base reutilizável para projetos full-stack, 100% em containers: frontend Next.js, API Fastify, worker com fila de e-mails (BullMQ) e Nginx como proxy reverso. Autenticação com refresh token rotativo, cache no Redis, 27 testes de integração contra Postgres e Redis reais, CI/CD com scan de vulnerabilidades (Trivy) e monitoramento com Prometheus + Grafana e 10 regras de alerta.",
    tags: ["Next.js", "Fastify", "Prisma", "PostgreSQL", "Redis", "BullMQ", "Docker", "Nginx"],
    image: "/projeto-fullstack-starter.png",
    links: [{ label: "Código", url: "https://github.com/EduardoLovo/fullstack-starter" }],
  },
  {
    title: "Analisador de Vagas",
    description:
      "Ferramenta com IA que compara o currículo (em PDF ou texto) com a descrição de uma vaga e devolve nota de compatibilidade, pontos fortes, lacunas, palavras-chave faltando, sugestões de ajuste e um rascunho de carta de apresentação. Usa o Google Gemini com resposta em JSON estruturado (JSON Schema) e troca automática de modelo quando a cota gratuita acaba ou a API fica sobrecarregada.",
    tags: ["Next.js", "TypeScript", "Google Gemini", "IA", "Tailwind"],
    image: "/projeto-analisador-de-vagas.png",
    links: [
      { label: "Ver site", url: "https://analisador-de-vagas-five.vercel.app/" },
      { label: "Código", url: "https://github.com/EduardoLovo/Analisador-de-Vagas" },
    ],
  },
  {
    title: "Task API — Express × Flask",
    description:
      "A mesma API REST de tarefas (com JWT) escrita duas vezes, em Express 5 e em Flask 3, com contrato e tratamento de erros idênticos: todo erro volta no mesmo formato JSON, com code estável e requestId, e um teste de contrato no Docker Compose compara as respostas das duas. Um front em Angular 22 alterna entre as APIs, mostra cada requisição e a resposta crua (inclusive o rate limit) e dispara 14 requisições inválidas nas duas ao mesmo tempo para compará-las lado a lado. As APIs ficam no plano gratuito do Render: a primeira requisição pode levar até 1 minuto (o app avisa).",
    tags: ["Angular", "TypeScript", "Node.js", "Express", "Python", "Flask", "Docker", "GitHub Actions"],
    image: "/projeto-task-api.png",
    links: [
      { label: "Ver site", url: "https://task-app-angular-taupe.vercel.app" },
      { label: "Código", url: "https://github.com/EduardoLovo/task-app--angular" },
    ],
  },
  {
    title: "Mais projetos no GitHub",
    description:
      "Estudos, projetos das formações e experimentos com novas tecnologias ficam no meu GitHub.",
    tags: ["Open source", "Estudos"],
    links: [{ label: "GitHub", url: "https://github.com/EduardoLovo" }],
  },
];

// Seção do jogo (logo depois de Projetos)
export const game = {
  // Texto logo abaixo do título da seção, em primeira pessoa
  intro: [
    "Estou estudando inglês e pensei em juntar programação e inglês, criando um mini jogo que simula conversas do dia a dia, como pedir um café, pagar a conta e puxar papo com alguém na mesa ao lado.",
    "A ideia é praticar o inglês de um jeito leve: cada resposta mostra se soou natural, entendível ou errada, sempre com uma dica em português para aprender com o erro.",
  ],
  title: "Bean There Café",
  subtitle: "Mini jogo em pixel art para praticar inglês",
  description:
    "Você entra numa cafeteria nos Estados Unidos e precisa conversar, pedir um café, pagar e retirar o pedido — tudo em inglês. Cada resposta recebe um retorno: natural, entendível ou errada, com uma dica em português.",
  highlights: [
    "Phaser 4 dentro do Next.js, carregado só quando o visitante clica em Jogar",
    "Mapa feito no Tiled, com colisão e áreas de conversa definidas no próprio editor",
    "Diálogos em JSON com motor próprio em TypeScript puro, testado com Vitest",
    "Estado do jogo em um reducer compartilhado entre o Phaser e o React",
    "Controles de toque no celular, voz da fala em inglês e efeitos sonoros gerados por código",
  ],
  tags: ["Phaser", "Next.js", "TypeScript", "React", "Tiled", "Vitest"],
  image: "/projeto-bean-there-cafe.png",
  playUrl: "/cafe",
  codeUrl: "https://github.com/EduardoLovo/Eduardo-Lovo-Portfolio/tree/main/src/game",
};

// Experiência / formação (linha do tempo)
export type TimelineItem = {
  period: string;
  title: string;
  place: string;
  description: string;
};

export const experience: TimelineItem[] = [
  {
    period: "2022 — 2026",
    title: "Auxiliar de Escritório & Desenvolvedor Web",
    place: "Inphantil Móveis · Jandaia do Sul, PR",
    description:
      "Desenvolvi e mantenho a plataforma de e-commerce do grupo (React + NestJS + PostgreSQL), com pagamentos (Pix e cartão), cálculo de frete dos Correios, autenticação JWT/OAuth e painel administrativo com relatórios. Também produzo desenhos vetoriais de produtos e arquivos de corte para as máquinas.",
  },
  {
    period: "",
    title: "Expedição / Atendente — Trocas e Devoluções",
    place: "Printloja",
    description:
      "Atuei na expedição e, depois, no atendimento ao cliente do setor de trocas e devoluções.",
  },
  {
    period: "",
    title: "Office Boy & Auxiliar de Escritório",
    place: "Casa São Paulo",
    description:
      "Suporte às rotinas administrativas e atividades externas do escritório.",
  },
  {
    period: "2023",
    title: "Formação Full-Stack",
    place: "Alura",
    description:
      "Aprofundamento em desenvolvimento web full-stack e novas tecnologias.",
  },
  {
    period: "2022",
    title: "Formação Full-Stack",
    place: "BlueEdTech",
    description:
      "Fundamentos de programação, lógica e desenvolvimento web.",
  },
];
