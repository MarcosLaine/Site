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
    'hero.subtitle': 'Estudante de Ciência da Computação • Quality Assurance (QA)',
    'hero.description': 'Atualmente QA Lead atuando na DTI Digital, alocado na ADI Global, aplicando testes manuais implementando automações de front-end mobile.',
    'hero.viewProjects': 'Ver Projetos',
    'hero.contact': 'Fale Comigo',
    
    // About
    'about.title': 'Sobre Mim',
    'about.text1': 'Me chamo Marcos Paulo Laine e atualmente atuo como QA Lead na DTI Digital, alocado na ADI Global. Dedico-me ao desenvolvimento de soluções de qualidade em tecnologia, aplicando testes manuais e implementando automações de front-end mobile com foco em excelência e inovação.',
    'about.text2': 'Na DTI Digital, lidero iniciativas de qualidade para a empresa norte-americana ADI Global, consolidando práticas de testes manuais, automações de front-end mobile, exploração, API e pipelines, garantindo a excelência e confiabilidade das soluções desenvolvidas.',
    
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
    'hero.subtitle': 'Computer Science Student • Quality Assurance (QA)',
    'hero.description': 'Currently QA Lead at DTI Digital, assigned to ADI Global, applying manual testing implementing automation of front-end mobile.',
    'hero.viewProjects': 'View Projects',
    'hero.contact': 'Contact Me',
    
    // About
    'about.title': 'About Me',
    'about.text1': 'My name is Marcos Paulo Laine and I currently work as QA Lead at DTI Digital, assigned to ADI Global. I dedicate myself to developing quality technology solutions, applying manual testing and implementing front-end mobile automation with focus on excellence and innovation.',
    'about.text2': 'At DTI Digital, I lead quality initiatives for the North American company ADI Global, consolidating practices of manual testing, front-end mobile automation, exploration, API and pipelines, ensuring excellence and reliability of developed solutions.',
    
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

