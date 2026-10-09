// ============================================================
//  DADOS DO CURRÍCULO (/cv e PDF) — edite por aqui.
//  O contato, foto, skills e nome vêm de portfolio.ts.
// ============================================================

export const cv = {
  // Resumo profissional (topo do currículo)
  summary:
    "Sou desenvolvedor full-stack. Já construí dois e-commerces que estão em produção (React + NestJS + PostgreSQL) e um sistema interno em Next.js que a equipe de vendas usa no dia a dia. Também entreguei sites e sistemas para outros clientes com Next.js, Supabase e Sanity CMS. Na prática, já trabalhei com pagamentos (Pix e cartão parcelado), frete dos Correios, autenticação (JWT, OAuth e 2FA) e painéis administrativos. Também venho me aprofundando em Docker e CI/CD: no projeto Task API, montei o pipeline completo no GitHub Actions (lint, testes em várias versões de Node e Python, build e teste da imagem Docker e teste de contrato), com deploy no Render só depois que o CI passa.",

  // Experiência profissional (mais recente primeiro)
  experience: [
    {
      role: "Auxiliar de Escritório & Desenvolvedor Web",
      company: "Inphantil Móveis",
      period: "2022 — 2026",
      location: "Jandaia do Sul, PR",
      bullets: [
        "Desenvolvi e mantenho em produção a plataforma de e-commerce do grupo (lojas Inphantil e Conceitual Pet): front-end React + Vite e API NestJS com PostgreSQL/Prisma.",
        "Implementei pagamentos com Pix e cartão de crédito (parcelamento e juros) via gateway e.Rede, com migração para OAuth 2.0.",
        "Integrei o cálculo de frete dos Correios e construí o painel administrativo: produtos com variações, pedidos, orçamentos e relatórios de vendas em PDF.",
        "Criei o Inphantil Cloud, sistema interno em Next.js com calculadoras de venda, orçamentos e catálogo, com controle de acesso por papéis.",
        "Configurei autenticação (JWT, Google OAuth, bcrypt), rate limiting e reCAPTCHA, além de imagens no AWS S3, e-mails transacionais e tarefas agendadas.",
        "Também produzo desenhos vetoriais de novos produtos e arquivos de corte para as máquinas.",
      ],
      links: [
        "https://www.inphantil.com.br/",
        "https://www.conceitualpet.com.br/",
      ],
    },
    {
      role: "Expedição / Atendente — Trocas e Devoluções",
      company: "Printloja",
      period: "",
      location: "",
      bullets: [
        "Atuei na expedição e, posteriormente, como atendente no setor de trocas e devoluções.",
        "Atendimento ao cliente e resolução de problemas do pós-venda.",
      ],
      links: [],
    },
    {
      role: "Office Boy & Auxiliar de Escritório",
      company: "Casa São Paulo",
      period: "",
      location: "",
      bullets: [
        "Suporte às rotinas administrativas e atividades externas do escritório.",
      ],
      links: [],
    },
  ],

  // Projetos Dev — página 2 do currículo (imagens em /public)
  projects: [
    {
      name: "E-commerce Inphantil & Conceitual Pet",
      stack: "React · NestJS · Prisma · PostgreSQL · AWS S3",
      description:
        "Duas lojas em produção sobre a mesma base: pagamentos Pix e cartão (e.Rede), frete dos Correios, login com Google e painel administrativo com relatórios.",
      links: ["https://www.inphantil.com.br/", "https://www.conceitualpet.com.br/"],
      image: "/projeto-inphantil.png",
    },
    {
      name: "Inphantil Cloud — Painel Interno",
      stack: "Next.js · Prisma · PostgreSQL · Auth.js · Cloudflare R2",
      description:
        "Mostruário público e área da equipe com calculadoras de venda, orçamentos e cotação de frete; acesso por papéis validado no servidor.",
      links: ["https://inphantil-moveis.vercel.app"],
      image: "/projeto-inphantil-adm.png",
    },
    {
      name: "Confeitaria da Re — Cardápio Digital",
      stack: "Next.js · Supabase · PostgreSQL · Zod",
      description:
        "Cardápio com carrinho, checkout e acompanhamento do pedido; painel com pedidos em tempo real, 2FA e RLS no banco.",
      links: ["https://confeitaria-da-re.vercel.app/"],
      image: "/confeitaria-da-re.png",
    },
    {
      name: "Fullstack Starter",
      stack: "Next.js · Fastify · PostgreSQL · Redis · BullMQ · Docker · Nginx",
      description:
        "Base full-stack 100% em containers, com fila de e-mails, cache no Redis, 27 testes de integração, CI/CD com scan de vulnerabilidades (Trivy) e monitoramento com Prometheus + Grafana.",
      links: ["https://github.com/EduardoLovo/fullstack-starter"],
      image: "/projeto-fullstack-starter.png",
    },
    {
      name: "Task API - Express × Flask",
      stack: "Angular · Node.js · Express · Python · Flask · Docker · GitHub Actions",
      description:
        "A mesma API REST com JWT em Express e em Flask, com erros padronizados e teste de contrato que compara as duas; front em Angular alterna entre elas. CI/CD no GitHub Actions com deploy no Render só após o CI verde.",
      links: ["https://task-app-angular-taupe.vercel.app"],
      image: "/projeto-task-api.png",
    },
    {
      name: "Ana Cordeiro — Arquitetura",
      stack: "Next.js · Sanity CMS · Vercel",
      description:
        "Site institucional com CMS próprio: a cliente edita projetos, textos e imagens sem tocar no código.",
      links: ["https://www.anacordeiroarq.com.br/"],
      image: "/projeto-anacordeiro.png",
    },
    {
      name: "Pokédex Dive",
      stack: "React · Vite · GSAP · PokéAPI",
      description:
        "Pokédex dos 151 Pokémon de Kanto com navegação em profundidade animada, busca, atalhos de teclado e tema claro/escuro.",
      links: ["https://api-pokemon-ten.vercel.app"],
      image: "/projeto-pokemon2.png",
    },
  ],

  // Formação
  education: [
    {
      course: "Formação Full-Stack",
      place: "BlueEdTech",
      year: "2022",
    },
    {
      course: "Formação Full-Stack",
      place: "Alura",
      year: "2023",
    },
  ],

  // Idiomas
  languages: [
    { name: "Português", level: "Nativo" },
    { name: "Inglês", level: "Básico" },
  ],
};
