import { createContext, useContext, useState, ReactNode } from 'react'

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
    'about.text1': 'Me chamo Marcos Paulo Laine e estou no 5º período de Ciência da Computação. Busco desenvolver minha carreira em tecnologia com curiosidade, responsabilidade e vontade de aprender.',
    'about.text2': 'Na DTI Digital atuo como QA para a empresa norte-americana ADI Global, consolidando práticas de testes manuais, exploração, API e pipelines.',
    
    // Projects
    'projects.title': 'Projetos',
    'projects.lead': 'Alguns projetos acadêmicos e pessoais — páginas web, jogos simples, ferramentas de investimento e automações.',
    'projects.carousel1.title': 'Front-end / Jogos / Utilitários',
    'projects.carousel2.title': 'Mercado / Relatórios',
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
    'knowledge.systems': 'Curioso por Sistemas',
    
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
    'about.text1': 'My name is Marcos Paulo Laine and I am in the 5th semester of Computer Science. I seek to develop my career in technology with curiosity, responsibility and willingness to learn.',
    'about.text2': 'At DTI Digital I work as QA for the North American company ADI Global, consolidating practices of manual testing, exploration, API and pipelines.',
    
    // Projects
    'projects.title': 'Projects',
    'projects.lead': 'Some academic and personal projects — web pages, simple games, investment tools and automations.',
    'projects.carousel1.title': 'Front-end / Games / Utilities',
    'projects.carousel2.title': 'Market / Reports',
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
    'knowledge.systems': 'Systems Enthusiast',
    
    // Contact
    'contact.title': 'Contact',
    'contact.lead': "Let's talk? Find me on social media or send an email.",
    
    // Footer
    'footer.copyright': '© 2025 Marcos Laine. All rights reserved.'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language')
    return (saved as Language) || 'pt'
  })

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.pt] || key
  }

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

