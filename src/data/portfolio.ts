// ============================================================
//  DADOS DO PORTFÓLIO — edite tudo por aqui.
//  Este é o único arquivo que você precisa mexer para atualizar
//  seu nome, textos, projetos, skills e links.
// ============================================================

export const personal = {
  name: "Eduardo Lovo",
  role: "Desenvolvedor Full-Stack Júnior",
  // Frase curta que aparece no topo (hero)
  tagline:
    "Transformo ideias em aplicações web rápidas, acessíveis e bonitas — do banco de dados à interface.",
  location: "Jandaia do Sul, PR",
  phone: "(43) 99956-7684",
  // Link do WhatsApp (formato: 55 + DDD + número), com mensagem pronta
  whatsapp:
    "https://wa.me/5543999567684?text=Ol%C3%A1%20Eduardo%2C%20vi%20o%20seu%20portf%C3%B3lio!",
  email: "eduardo.llovo@gmail.com",
  // Caminho do seu currículo em PDF (coloque o arquivo em /public)
  cvUrl: "/curriculo-eduardo.pdf",
  // Sua foto (arquivo em /public)
  photo: "/eduardo.jpeg",
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
    "Sou desenvolvedor full-stack júnior de Jandaia do Sul (PR). Comecei na área em 2022 e desde então venho construindo aplicações web com foco em código limpo e boa experiência de uso.",
    "Na Inphantil, construí e mantenho uma plataforma de e-commerce completa (React + NestJS + PostgreSQL) que serve duas lojas no ar, com integrações reais de pagamento, cálculo de frete dos Correios e painel administrativo.",
    "Estou em busca da minha primeira oportunidade dedicada como desenvolvedor para crescer em um time e entregar valor de verdade.",
  ],
  // Números de destaque (edite ou remova)
  stats: [
    { label: "E-commerces no ar", value: "2" },
    { label: "Tecnologias", value: "12+" },
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
    ],
  },
  {
    category: "Backend",
    items: ["NestJS", "Node.js", "REST APIs", "JWT & Passport", "Nodemailer"],
  },
  {
    category: "Banco de Dados",
    items: ["PostgreSQL", "Prisma ORM"],
  },
  {
    category: "Ferramentas & DevOps",
    items: ["Git", "GitHub", "AWS S3", "Jest", "Swagger", "Vercel"],
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
      { label: "Código", url: "https://github.com/EduardoLovo/Ana-Cordeiro" },
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

// Experiência / formação (linha do tempo)
export type TimelineItem = {
  period: string;
  title: string;
  place: string;
  description: string;
};

export const experience: TimelineItem[] = [
  {
    period: "2022 — Presente",
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
