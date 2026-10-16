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
    'nav.experience': 'Experiência',
    'nav.projects': 'Projetos',
    'nav.highlights': 'Destaques',
    'nav.skills': 'Skills',
    'nav.contact': 'Contato',
    'nav.downloadCV': 'CV',

    // Hero
    'hero.badge': 'Product Owner na dti digital',
    'hero.greeting': 'Olá, me chamo',
    'hero.name': 'Marcos Laine',
    'hero.subtitle': 'Product Owner · Gestão de Produto · Qualidade de Software · IA aplicada',
    'hero.description': 'Hoje sou PO no projeto de sustentação da SURA. Antes disso, passei 2 anos liderando qualidade em produtos globais — por isso trato qualidade como parte da priorização, não como uma fase no final.',
    'hero.viewProjects': 'Ver Projetos',
    'hero.contact': 'Fale Comigo',
    'hero.downloadCV': 'Baixar CV',

    // About
    'about.eyebrow': 'Sobre',
    'about.title': 'De QA a Product Owner',
    'about.text1': 'Sou Product Owner na dti digital, atualmente alocado em um projeto de sustentação da SURA, seguradora com produto já em produção. Antes de produto, passei 2 anos em qualidade na dti: QA Engineer e, depois, Lead QA Engineer em 8 aplicações globais da ADI Global Distribution e na iniciativa de QA assistida por IA do projeto ISN.',
    'about.text2': 'Essa trajetória define como atuo como PO: já vi onde os produtos quebram. Na maioria das vezes não é no código, mas em uma história que ninguém conseguia verificar ou em um critério de aceite lido de três formas diferentes.',
    'about.quote': 'Qualidade faz parte da priorização — não é uma fase no final.',
    'about.text3': 'Atuo com clientes dos EUA e curso Engenharia de Software na PUC Minas.',

    // Experience
    'experience.eyebrow': 'Trajetória',
    'experience.title': 'Experiência Profissional',
    'experience.company': 'dti digital',
    'experience.companyMeta': 'Belo Horizonte, Brasil · 05/2024 – Atualmente',
    'experience.current': 'Atual',

    // Projects
    'projects.title': 'Projetos',
    'projects.lead': 'Produtos que concebi, construí e coloquei no ar — do discovery ao deploy. Clique em um projeto para ver os detalhes.',
    'projects.live': 'No ar',
    'projects.tech': 'Tecnologias',
    'projects.carousel1.title': 'Web / Front-end',
    'projects.carousel2.title': 'Mercado / Relatórios',
    'projects.other': 'Outros Projetos',
    'projects.imageClickHint': 'Clique na imagem para visualizá-la em tamanho maior',
    'projects.testButton': 'Acessar projeto',
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

    // Highlights
    'highlights.eyebrow': 'Além do dia a dia',
    'highlights.title': 'Destaques',
    'highlights.recommendations': 'O que dizem sobre mim',
    'highlights.recommendationSource': 'Recomendação no LinkedIn',

    // Skills
    'skills.eyebrow': 'Caixa de ferramentas',
    'skills.title': 'Skills & Ferramentas',
    'skills.tools': 'Ferramentas & Tecnologias',

    // Contact
    'contact.title': 'Vamos conversar?',
    'contact.lead': 'Aberto a conversas sobre produto, qualidade e IA aplicada. Me chame no LinkedIn ou envie um e-mail.',

    // Footer
    'footer.rights': 'Todos os direitos reservados.'
  },
  en: {
    // Nav
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.highlights': 'Highlights',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.downloadCV': 'CV',

    // Hero
    'hero.badge': 'Product Owner at dti digital',
    'hero.greeting': 'Hello, my name is',
    'hero.name': 'Marcos Laine',
    'hero.subtitle': 'Product Owner · Product Management · Software Quality · Applied AI',
    'hero.description': "I'm currently the PO on SURA's sustainment project. Before that, I spent 2 years leading quality on global products — which is why quality is part of how I prioritize, not a phase at the end.",
    'hero.viewProjects': 'View Projects',
    'hero.contact': 'Contact Me',
    'hero.downloadCV': 'Download CV',

    // About
    'about.eyebrow': 'About',
    'about.title': 'From QA to Product Owner',
    'about.text1': "I'm a Product Owner at dti digital, currently on a sustainment project for SURA, an insurance company whose product is already live. Before product, I spent 2 years in quality at dti: QA Engineer, then Lead QA Engineer on 8 global applications for ADI Global Distribution and on the AI-assisted QA initiative of the ISN project.",
    'about.text2': "That shapes how I work as a PO: I've seen where products break. Most of the time it isn't in the code — it's in a story nobody could verify or an acceptance criterion three people read three different ways.",
    'about.quote': 'Quality is part of how I prioritize — not a phase at the end.',
    'about.text3': 'I work with US clients and study Software Engineering at PUC Minas.',

    // Experience
    'experience.eyebrow': 'Career',
    'experience.title': 'Professional Experience',
    'experience.company': 'dti digital',
    'experience.companyMeta': 'Belo Horizonte, Brazil · 05/2024 – Present',
    'experience.current': 'Current',

    // Projects
    'projects.title': 'Projects',
    'projects.lead': 'Products I conceived, built and shipped — from discovery to deploy. Click a project to see the details.',
    'projects.live': 'Live',
    'projects.tech': 'Technologies',
    'projects.carousel1.title': 'Web / Front-end',
    'projects.carousel2.title': 'Market / Reports',
    'projects.other': 'Other Projects',
    'projects.imageClickHint': 'Click on the image to view it in full size',
    'projects.testButton': 'Open project',
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

    // Highlights
    'highlights.eyebrow': 'Beyond the day job',
    'highlights.title': 'Highlights',
    'highlights.recommendations': 'What people say',
    'highlights.recommendationSource': 'LinkedIn recommendation',

    // Skills
    'skills.eyebrow': 'Toolbox',
    'skills.title': 'Skills & Tools',
    'skills.tools': 'Tools & Technologies',

    // Contact
    'contact.title': "Let's talk?",
    'contact.lead': 'Open to conversations about product, quality and applied AI. Reach out on LinkedIn or send me an email.',

    // Footer
    'footer.rights': 'All rights reserved.'
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

