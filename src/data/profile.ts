/**
 * Conteúdo do perfil (fonte: currículo Marcos_Laine_PO_PT/EN + LinkedIn).
 * Textos longos e listas ficam aqui; strings curtas de UI ficam no LanguageContext.
 */

type Lang = 'pt' | 'en'
type Localized<T> = Record<Lang, T>

export interface ExperienceItem {
  role: string
  period: string
  bullets: string[]
}

export interface Stat {
  value: string
  label: string
}

export interface Fact {
  label: string
  value: string
}

export interface Highlight {
  kind: string
  title: string
  meta: string
  description: string
  link?: { href: string; label: string }
}

export interface Recommendation {
  author: string
  quote: string
}

export const heroStats: Localized<Stat[]> = {
  pt: [
    { value: '75%', label: 'menos bugs gerados no desenvolvimento com Shift Left' },
    { value: '95%', label: 'menos bugs encontrados pelo cliente' },
    { value: '8', label: 'aplicações globais sob liderança de qualidade' },
    { value: '2+', label: 'anos na dti digital, com clientes dos EUA' },
  ],
  en: [
    { value: '75%', label: 'fewer bugs created during development with Shift Left' },
    { value: '95%', label: 'fewer bugs found by the client' },
    { value: '8', label: 'global applications under my quality leadership' },
    { value: '2+', label: 'years at dti digital, working with US clients' },
  ],
}

export const aboutFacts: Localized<Fact[]> = {
  pt: [
    { label: 'Hoje', value: 'Product Owner · dti digital (SURA)' },
    { label: 'Base', value: 'Belo Horizonte – MG, Brasil' },
    { label: 'Formação', value: 'Engenharia de Software · PUC Minas (prev. 12/2027)' },
    { label: 'Idiomas', value: 'Português (nativo) · Inglês (avançado) · Espanhol e Francês (iniciante)' },
  ],
  en: [
    { label: 'Now', value: 'Product Owner · dti digital (SURA)' },
    { label: 'Based in', value: 'Belo Horizonte – MG, Brazil' },
    { label: 'Education', value: 'Software Engineering · PUC Minas (exp. 12/2027)' },
    { label: 'Languages', value: 'Portuguese (native) · English (advanced) · Spanish & French (beginner)' },
  ],
}

/** Fallback caso a API de experiências esteja indisponível. Mantém em sincronia com o CV. */
export const fallbackExperiences: Localized<ExperienceItem[]> = {
  pt: [
    {
      role: 'Product Owner — Projeto SURA',
      period: '10/2026 – Atualmente',
      bullets: [
        'PO em projeto de sustentação para a SURA (seguradora), com o produto já em produção.',
        'Priorização, junto ao cliente, de um backlog de incidentes, correções e melhorias que competem pela mesma sprint.',
        'Garantia de que toda história que entra na sprint tenha critérios de aceite claros e possa ser efetivamente testada.',
      ],
    },
    {
      role: 'Lead QA Engineer — Projetos ADI Global e ISN',
      period: '09/2025 – 10/2026',
      bullets: [
        'Liderança de qualidade em 8 aplicações globais da ADI Global Distribution, incluindo o app mobile da ADI, com liderança de Engenheiros de Qualidade e contato direto com o cliente.',
        'Implementação de Shift Left no processo de desenvolvimento: 75% menos bugs gerados durante o desenvolvimento e 95% menos bugs encontrados pelo cliente.',
        'Testes de back-end, front-end e performance; automação integrada a pipelines CI/CD; OKRs, métricas de QA e melhoria de processos.',
        'No projeto ISN, liderança de uma iniciativa de QA assistida por IA (piloto AI-first da dti), estruturando e orquestrando agentes de IA para testar, priorizar defeitos e apoiar decisões de qualidade.',
      ],
    },
    {
      role: 'Junior QA Engineer',
      period: '07/2024 – 09/2025',
      bullets: [
        'Escrita de casos de teste e implementação de fluxos de automação.',
        'Testes de API — Swagger, Postman, ReadyAPI.',
        'Testes front-end mobile — Maestro, Appium; testes front-end web — Selenium, Cypress, Playwright.',
      ],
    },
    {
      role: 'Software Developer Intern — Backend',
      period: '05/2024 – 07/2024',
      bullets: ['Estruturação e implementação de APIs, conexão com banco de dados e otimização de desempenho.'],
    },
  ],
  en: [
    {
      role: 'Product Owner — SURA Project',
      period: '10/2026 – Present',
      bullets: [
        'PO on a sustainment project for SURA (insurance), with the product already live.',
        'Prioritizing with the client a backlog of incidents, fixes and improvements competing for the same sprint.',
        'Making sure every story that enters the sprint has clear acceptance criteria and can actually be tested.',
      ],
    },
    {
      role: 'Lead QA Engineer — ADI Global and ISN Projects',
      period: '09/2025 – 10/2026',
      bullets: [
        'Led quality across 8 global applications for ADI Global Distribution, including the ADI mobile app, leading Quality Engineers and working directly with the client.',
        'Implemented Shift Left in the development process: 75% fewer bugs created during development and 95% fewer bugs found by the client.',
        'Back-end, front-end and performance testing; test automation integrated with CI/CD pipelines; OKR definition, QA metrics analysis and process improvement.',
        'On the ISN project, led an AI-assisted QA initiative (dti’s AI-first pilot), structuring and orchestrating AI agents to test, prioritize defects and support quality decisions.',
      ],
    },
    {
      role: 'Junior QA Engineer',
      period: '07/2024 – 09/2025',
      bullets: [
        'Test case writing and implementation of automation flows.',
        'API testing — Swagger, Postman, ReadyAPI.',
        'Mobile front-end testing — Maestro, Appium; web front-end testing — Selenium, Cypress, Playwright.',
      ],
    },
    {
      role: 'Software Developer Intern — Backend',
      period: '05/2024 – 07/2024',
      bullets: ['API structuring and implementation, database integration and performance optimization.'],
    },
  ],
}

export const highlights: Localized<Highlight[]> = {
  pt: [
    {
      kind: 'Publicação científica',
      title: 'Dispositivo Vestível de Emergência com Comunicação Autônoma GSM e Canal Redundante via Bluetooth',
      meta: 'SBCUP 2026 · CSBC 2026 · Coautor',
      description:
        'Dispositivo vestível que dispara alertas de emergência sozinho via GSM, com um canal redundante via Bluetooth para não depender do smartphone em situações críticas. Pesquisa desenvolvida na PUC Minas.',
      link: { href: 'https://sol.sbc.org.br/index.php/sbcup/article/view/43297', label: 'Ler o artigo' },
    },
    {
      kind: 'Podcast',
      title: 'Entre Chaves · Snippet #18 — Pirâmide de testes',
      meta: 'dti digital · Spotify e YouTube',
      description:
        'Convidado para explicar por que uma suíte com excesso de testes ponta a ponta deixa o feedback lento e caro, e como estruturar os testes para encontrar falhas mais cedo.',
      link: { href: 'https://lnkd.in/dRPRZTa7', label: 'Ouvir o episódio' },
    },
    {
      kind: 'Reconhecimento',
      title: 'Pessoa mais reconhecida na Rackers pela dti digital',
      meta: 'Rackers · 2026',
      description:
        'Reconhecimento que vem da galera que trabalha comigo no dia a dia — por isso é o que mais vale.',
    },
  ],
  en: [
    {
      kind: 'Scientific publication',
      title: 'Wearable Emergency Device with Autonomous GSM Communication and Redundant Bluetooth Channel',
      meta: 'SBCUP 2026 · CSBC 2026 · Co-author',
      description:
        'A wearable that triggers emergency alerts on its own over GSM, with a redundant Bluetooth channel so it does not depend on a smartphone in critical moments. Research developed at PUC Minas.',
      link: { href: 'https://sol.sbc.org.br/index.php/sbcup/article/view/43297', label: 'Read the paper' },
    },
    {
      kind: 'Podcast',
      title: 'Entre Chaves · Snippet #18 — The test pyramid',
      meta: 'dti digital · Spotify & YouTube',
      description:
        'Invited to explain why a suite overloaded with end-to-end tests makes feedback slow and expensive, and how to structure tests to catch failures earlier.',
      link: { href: 'https://lnkd.in/dRPRZTa7', label: 'Listen to the episode' },
    },
    {
      kind: 'Recognition',
      title: 'Most recognized dti digital person on Rackers',
      meta: 'Rackers · 2026',
      description:
        'Recognition that comes from the people I work with every day — which is why it means the most.',
    },
  ],
}

/** Recomendações públicas do LinkedIn (mantidas no idioma original). */
export const recommendations: Recommendation[] = [
  {
    author: 'David Siejka',
    quote:
      "Marcos was our QA lead for client where we developed and supported 8 global applications. Since the time we both onboarded on this project, Marcos' attention to details, leadership, and communication allowed us to improve greatly the release quality, and overall client satisfaction! I'd take him to another project anytime!",
  },
  {
    author: 'Cameron Gall',
    quote:
      'Marcos is always eager to help the team succeed. He has no hesitation taking on new, challenging work. Marcos was able to complete test automation tasks when the team fell behind. He’s a valuable asset to any organization!',
  },
]

export const skillGroups: Localized<{ title: string; items: string[] }[]> = {
  pt: [
    {
      title: 'Produto & Gestão',
      items: ['Gestão de Produtos', 'Gestão de Backlog', 'Critérios de Aceite', 'Discovery', 'Agile / Scrum', 'Modelagem de Processos', 'Gestão de Projetos', 'Liderança'],
    },
    {
      title: 'Qualidade',
      items: ['Shift Left', 'Automação de Testes', 'Testes de API REST', 'Testes Mobile', 'Testes de Performance', 'CI/CD', 'IA aplicada a QA', 'OKRs e Métricas de QA'],
    },
  ],
  en: [
    {
      title: 'Product & Management',
      items: ['Product Management', 'Backlog Management', 'Acceptance Criteria', 'Discovery', 'Agile / Scrum', 'Process Modelling', 'Project Management', 'Leadership'],
    },
    {
      title: 'Quality',
      items: ['Shift Left', 'Test Automation', 'REST API Testing', 'Mobile Testing', 'Performance Testing', 'CI/CD', 'AI applied to QA', 'QA OKRs & Metrics'],
    },
  ],
}

export const tools: { name: string; icon?: string }[] = [
  { name: 'Jira', icon: '/img/skills/Jira.png' },
  { name: 'Azure DevOps', icon: '/img/skills/Azure-Devops.png' },
  { name: 'Cypress' },
  { name: 'Playwright', icon: '/img/skills/Playwright.svg' },
  { name: 'Selenium', icon: '/img/skills/Selenium.svg' },
  { name: 'Appium', icon: '/img/skills/Appium.svg' },
  { name: 'Maestro', icon: '/img/skills/maestro.png' },
  { name: 'ReadyAPI', icon: '/img/skills/readyapi.png' },
  { name: 'Postman', icon: '/img/skills/Postman.png' },
  { name: 'BrowserStack' },
  { name: 'Git', icon: '/img/skills/Git.png' },
  { name: 'GitHub', icon: '/img/skills/GitHub.png' },
  { name: 'Java', icon: '/img/skills/Java.png' },
  { name: 'Python', icon: '/img/skills/Python.png' },
  { name: 'C#', icon: '/img/skills/CSharp.png' },
  { name: 'JavaScript', icon: '/img/skills/JavaScript.png' },
  { name: 'React', icon: '/img/skills/React.png' },
  { name: 'Flutter', icon: '/img/skills/Flutter.png' },
  { name: 'Firebase', icon: '/img/skills/Firebase.png' },
  { name: 'SQL', icon: '/img/skills/SQL.png' },
]
