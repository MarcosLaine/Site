import { createContext, ReactNode, useContext, useState } from 'react'

type Language = 'pt' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  pt: {
    // Nav
    'nav.about': 'Sobre',
    'nav.projects': 'Projetos',
    'nav.skills': 'Skills',
    'nav.contact': 'Contato',
    'nav.downloadCV': 'CV',
    
    // Hero
    'hero.greeting': 'Olá, me chamo',
    'hero.name': 'Marcos Laine',
    'hero.subtitle': 'Estudante de Engenharia de Software • Quality Assurance (QA)',
    'hero.description': 'Atualmente QA Lead na DTI Digital, alocado no projeto da ISN, liderando a iniciativa de IA do projeto piloto AI-first da DTI, com foco em automação, qualidade e orquestração de agentes de IA.',
    'hero.viewProjects': 'Ver Projetos',
    'hero.contact': 'Fale Comigo',

    // Showcase scroll
    'showcase.lead': 'Conheça alguns dos meus',
    'showcase.highlight': 'Projetos',
    'showcase.subtitle': 'Aplicativos, páginas web, automações e ferramentas que desenvolvi.',
    'showcase.viewAll': 'Ver todos os projetos',
    
    // About
    'about.title': 'Sobre Mim',
    'about.text1': 'Me chamo Marcos Paulo Laine e atualmente atuo como QA Lead na DTI Digital, alocado no projeto da ISN, onde lidero a iniciativa de IA do projeto piloto AI-first da DTI. Aplico conhecimentos em testes automatizados, criação de casos de teste, testes de performance, análise de cobertura e implementação de pipelines CI/CD para validações funcionais.',
    'about.text2': 'Lidero a estruturação e orquestração de agentes de IA voltados para testes, automação e qualidade. Anteriormente, no projeto ADI Global, implementei práticas de shift-left que reduziram em 75% a taxa de bugs gerados por história nas fases iniciais do desenvolvimento e em 96% o número de bugs identificados pelo cliente.',
    'about.experience': 'Experiência Profissional',
    'exp.isn.role': 'QA Lead — Projeto ISN',
    'exp.isn.period': '06/2026 – Atualmente',
    'exp.isn.b1': 'Atualmente alocado pela DTI Digital no projeto da empresa ISN, liderando a iniciação e execução da iniciativa de IA do projeto piloto AI-first da DTI.',
    'exp.isn.b2': 'Estruturação e orquestração de agentes de IA voltados para testes, automação e qualidade.',
    'exp.adi.role': 'QA Lead — Projeto ADI Global',
    'exp.adi.period': '09/2025 – 06/2026',
    'exp.adi.b1': 'Liderança de Engenheiros de Qualidade em projetos internacionais.',
    'exp.adi.b2': 'Criação de casos de teste; definição de OKRs; análise de métricas e estatísticas de progresso de QA.',
    'exp.adi.b3': 'Implementação de automações; integração de fluxos automatizados com pipelines (CI/CD); contato direto com o cliente.',
    'exp.adi.b4': 'Implementação do shift-left no processo de desenvolvimento, reduzindo em 75% a taxa de bugs gerados por história já nas fases iniciais do desenvolvimento e em 96% o número de bugs identificados pelo cliente.',
    'exp.qae.role': 'QA Engineer',
    'exp.qae.period': '07/2024 – 09/2025',
    'exp.qae.b1': 'Escrita de casos de teste.',
    'exp.qae.b2': 'Implementação de fluxos de automação.',
    'exp.qae.b3': 'Testes de API — Swagger; Postman; ReadyAPI.',
    'exp.qae.b4': 'Testes front-end mobile — Maestro; Appium.',
    'exp.qae.b5': 'Testes front-end — Selenium; Cypress; Playwright.',
    'exp.be.role': 'Software Engineer — Backend',
    'exp.be.period': '05/2024 – 07/2024',
    'exp.be.b1': 'Estruturação e implementação de APIs.',
    'exp.be.b2': 'Conexão e otimização de APIs com banco de dados.',
    'exp.be.b3': 'Otimização de APIs.',

    // Projects
    'projects.title': 'Projetos',
    'projects.lead': 'Alguns projetos acadêmicos e pessoais — aplicativos mobile, páginas web, sistemas e automações.',
    'projects.carousel1.title': 'Web / Front-end',
    'projects.carousel2.title': 'Mercado / Relatórios',
    'projects.imageClickHint': 'Clique na imagem para visualizá-la em tamanho maior',
    'projects.testButton': 'Teste',
    'projects.lembretes.title': 'Lembretes',
    'projects.lembretes.description': 'Aplicativo simples para organização de tarefas e lembretes.',
    'projects.poker.title': 'Prob. Poker',
    'projects.poker.description': 'Ferramenta didática para análise probabilística de mãos.',
    'projects.financiart.title': 'Financiart',
    'projects.financiart.description': 'Página auxiliar de investimentos (front, back e BD básicos).',
    'projects.memoria.title': 'Memória',
    'projects.memoria.description': 'Jogo clássico implementado para estudos de JS/DOM.',
    'projects.tictactoe.title': 'Tic-Tac-Toe',
    'projects.tictactoe.description': 'Implementação do jogo da velha em JavaScript.',
    'projects.backtesting.title': 'Backtesting',
    'projects.backtesting.description': 'Protótipos de backtest para estudos de estratégia.',
    'projects.market.title': 'Relatório de Mercado',
    'projects.market.description': 'Geração de relatórios com indicadores selecionados.',
    
    // Skills
    'skills.title': 'Skills & Ferramentas',
    'skills.knowledge': 'Conhecimentos',
    'knowledge.api': 'Testes de API',
    'knowledge.manual': 'Testes Manuais',
    'knowledge.automation': 'Automação',
    'knowledge.database': 'Banco de Dados',
    'knowledge.frontend': 'Testes Front-end',
    'knowledge.agile': 'Metodologias Ágeis',
    'knowledge.engineering': 'Eng. de Software',
    'knowledge.cyber': 'Cybersegurança',
    'knowledge.mobileTest': 'Teste Mobile',
    'knowledge.systems': 'Hacking Ético',
    'knowledge.ai': 'IA',

    // Contact
    'contact.title': 'Contato',
    'contact.lead': 'Vamos conversar? Me encontre nas redes ou envie um e-mail.',
    
    // Footer
    'footer.copyright': '© 2025 Marcos Laine. Todos os direitos reservados.'
  },
  en: {
    // Nav
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.downloadCV': 'CV',
    
    // Hero
    'hero.greeting': 'Hello, my name is',
    'hero.name': 'Marcos Laine',
    'hero.subtitle': 'Software Engineering Student • Quality Assurance (QA)',
    'hero.description': 'Currently QA Lead at DTI Digital, assigned to the ISN project, leading the AI initiative of DTI’s AI-first pilot, focused on automation, quality and AI agent orchestration.',
    'hero.viewProjects': 'View Projects',
    'hero.contact': 'Contact Me',

    // Showcase scroll
    'showcase.lead': 'Explore some of my',
    'showcase.highlight': 'Projects',
    'showcase.subtitle': 'Apps, web pages, automations and tools I have built.',
    'showcase.viewAll': 'View all projects',

    
    // About
    'about.title': 'About Me',
    'about.text1': 'My name is Marcos Paulo Laine and I currently work as QA Lead at DTI Digital, assigned to the ISN project, where I lead the AI initiative of DTI’s AI-first pilot. I apply expertise in automated testing, test case creation, performance testing, coverage analysis and the implementation of CI/CD pipelines for functional validations.',
    'about.text2': 'I lead the structuring and orchestration of AI agents focused on testing, automation and quality. Previously, on the ADI Global project, I implemented shift-left practices that reduced the rate of bugs generated per story by 75% in the early stages of development and reduced bugs found by the client by 96%.',
    'about.experience': 'Professional Experience',
    'exp.isn.role': 'QA Lead — ISN Project',
    'exp.isn.period': '06/2026 – Present',
    'exp.isn.b1': 'Currently allocated by DTI Digital to the ISN project, leading the rollout and execution of DTI’s AI initiative for its AI-first pilot project.',
    'exp.isn.b2': 'Structuring and orchestration of AI agents focused on testing, automation and quality.',
    'exp.adi.role': 'QA Lead — ADI Global Project',
    'exp.adi.period': '09/2025 – 06/2026',
    'exp.adi.b1': 'Leadership of Quality Engineers on international projects.',
    'exp.adi.b2': 'Test case creation; OKR definition; analysis of QA progress metrics and statistics.',
    'exp.adi.b3': 'Implementation of automations; integration of automated flows with pipelines (CI/CD); direct client contact.',
    'exp.adi.b4': 'Implementation of shift-left testing in the development process, reducing the rate of bugs generated per story by 75% from the early stages of development onward, and reducing the number of bugs found by the client by 96%.',
    'exp.qae.role': 'QA Engineer',
    'exp.qae.period': '07/2024 – 09/2025',
    'exp.qae.b1': 'Test case writing.',
    'exp.qae.b2': 'Implementation of automation flows.',
    'exp.qae.b3': 'API testing — Swagger; Postman; ReadyAPI.',
    'exp.qae.b4': 'Mobile front-end testing — Maestro; Appium.',
    'exp.qae.b5': 'Front-end testing — Selenium; Cypress; Playwright.',
    'exp.be.role': 'Software Engineer — Backend',
    'exp.be.period': '05/2024 – 07/2024',
    'exp.be.b1': 'API structuring and implementation.',
    'exp.be.b2': 'Database connection and optimization of APIs.',
    'exp.be.b3': 'API optimization.',

    // Projects
    'projects.title': 'Projects',
    'projects.lead': 'Some academic and personal projects — mobile apps, web pages, systems and automations.',
    'projects.carousel1.title': 'Web / Front-end',
    'projects.carousel2.title': 'Market / Reports',
    'projects.imageClickHint': 'Click on the image to view it in full size',
    'projects.testButton': 'Test',
    'projects.lembretes.title': 'Reminders',
    'projects.lembretes.description': 'Simple application for task organization and reminders.',
    'projects.poker.title': 'Prob. Poker',
    'projects.poker.description': 'Educational tool for probabilistic hand analysis.',
    'projects.financiart.title': 'Financiart',
    'projects.financiart.description': 'Auxiliary investment page (front, back and basic DB).',
    'projects.memoria.title': 'Memory',
    'projects.memoria.description': 'Classic game implemented for JS/DOM studies.',
    'projects.tictactoe.title': 'Tic-Tac-Toe',
    'projects.tictactoe.description': 'Tic-tac-toe game implementation in JavaScript.',
    'projects.backtesting.title': 'Backtesting',
    'projects.backtesting.description': 'Backtest prototypes for strategy studies.',
    'projects.market.title': 'Market Report',
    'projects.market.description': 'Report generation with selected indicators.',
    
    // Skills
    'skills.title': 'Skills & Tools',
    'skills.knowledge': 'Knowledge',
    'knowledge.api': 'API Testing',
    'knowledge.manual': 'Manual Testing',
    'knowledge.automation': 'Automation',
    'knowledge.database': 'Database',
    'knowledge.frontend': 'Front-end Testing',
    'knowledge.agile': 'Agile Methodologies',
    'knowledge.engineering': 'Software Engineering',
    'knowledge.cyber': 'Cybersecurity',
    'knowledge.mobileTest': 'Mobile Testing',
    'knowledge.systems': 'Ethical Hacking',
    'knowledge.ai': 'AI',

    // Contact
    'contact.title': 'Contact',
    'contact.lead': "Let's talk? Find me on social media or send an email.",
    
    // Footer
    'footer.copyright': '© 2025 Marcos Laine. All rights reserved.'
  }
}

// Valor padrão para o contexto
const defaultContextValue: LanguageContextType = {
  language: 'pt',
  setLanguage: () => {},
  t: (key: string) => key
}

const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Verificar se está no ambiente do navegador antes de acessar localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language')
      return (saved === 'pt' || saved === 'en') ? saved : 'pt'
    }
    return 'pt'
  })

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.pt] || key
  }

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }

  const value: LanguageContextType = {
    language,
    setLanguage: handleSetLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  return useContext(LanguageContext)
}

