// ============================================================
//  DADOS DO CURRÍCULO (/cv e PDF) — edite por aqui.
//  O contato, foto, skills e nome vêm de portfolio.ts.
// ============================================================

export const cv = {
  // Resumo profissional (topo do currículo)
  summary:
    "Desenvolvedor full-stack júnior que já construiu e mantém em produção uma plataforma de e-commerce completa (React + NestJS + PostgreSQL) servindo duas lojas do Grupo Inphantil. Experiência real com integrações de pagamento (Pix e cartão com parcelamento), cálculo de frete dos Correios, autenticação JWT/OAuth e painel administrativo. Busco minha primeira oportunidade dedicada como desenvolvedor.",

  // Experiência profissional (mais recente primeiro)
  experience: [
    {
      role: "Auxiliar de Escritório & Desenvolvedor Web",
      company: "Inphantil Móveis",
      period: "2022 — Presente",
      location: "Jandaia do Sul, PR",
      bullets: [
        "Desenvolvi e mantenho em produção a plataforma de e-commerce do grupo (lojas Inphantil e Conceitual Pet): front-end React + Vite e API NestJS com PostgreSQL/Prisma.",
        "Implementei pagamentos com Pix e cartão de crédito (parcelamento e juros) via gateway e.Rede, com migração para OAuth 2.0.",
        "Integrei o cálculo de frete dos Correios e construí o painel administrativo: produtos com variações, pedidos, orçamentos e relatórios de vendas em PDF.",
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
