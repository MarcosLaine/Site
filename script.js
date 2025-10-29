// Tradução i18n
(function i18n() {
  const translations = {
    pt: {
      'nav.about': 'Sobre',
      'nav.projects': 'Projetos',
      'nav.skills': 'Skills',
      'nav.contact': 'Contato',
      'hero.greeting': 'Olá, me chamo Marcos Laine',
      'hero.subtitle': 'Estudante de Ciência da Computação • Quality Assurance (QA)',
      'hero.description': 'Atualmente sou QA Lead atuando na <b>DTI Digital</b>, alocado na <b>ADI Global</b>, aplicando testes manuais implementando automações de front-end mobile.',
      'hero.viewProjects': 'Ver projetos',
      'hero.contact': 'Fale comigo',
      'about.title': 'Sobre mim',
      'about.text1': 'Me chamo <b>Marcos Paulo Laine</b> e estou no 6º período de Ciência da Computação. Busco desenvolver minha carreira em tecnologia com curiosidade, responsabilidade e vontade de aprender.',
      'about.text2': 'Na <a class="link" href="https://dtidigital.com.br" target="_blank" rel="noopener">DTI Digital</a> atuo como QA Lead para a empresa norte-americana <a class="link" href="https://www.adiglobal.com" target="_blank" rel="noopener">ADI Global</a>, consolidando práticas de testes manuais, exploração, API e pipelines.',
      'projects.title': 'Projetos',
      'projects.lead': 'Alguns projetos acadêmicos e pessoais — páginas web, jogos simples, ferramentas de investimento e automações.',
      'projects.carousel1.title': 'Front-end / Jogos / Utilitários',
      'projects.carousel2.title': 'Mercado / Relatórios',
      'projects.lembretes.title': 'Lembretes',
      'projects.lembretes.description': 'Aplicativo simples para organização de tarefas e lembretes.',
      'projects.poker.title': 'Prob. Poker',
      'projects.poker.description': 'Ferramenta didática para análise probabilística de mãos.',
      'projects.financiart.description': 'Página auxiliar de investimentos (front, back e BD básicos).',
      'projects.memoria.title': 'Memória',
      'projects.memoria.description': 'Jogo clássico implementado para estudos de JS/DOM.',
      'projects.tictactoe.description': 'Implementação do jogo da velha em JavaScript.',
      'projects.backtesting.description': 'Protótipos de backtest para estudos de estratégia.',
      'projects.market.title': 'Relatório de Mercado',
      'projects.market.description': 'Geração de relatórios com indicadores selecionados.',
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
      'contact.title': 'Contato',
      'contact.lead': 'Vamos conversar? Me encontre nas redes ou envie um e-mail.',
      'footer.copyright': '© 2025 Marcos Laine. Todos os direitos reservados.'
    },
    en: {
      'nav.about': 'About',
      'nav.projects': 'Projects',
      'nav.skills': 'Skills',
      'nav.contact': 'Contact',
      'hero.greeting': 'Hello, my name is Marcos Laine',
      'hero.subtitle': 'Computer Science Student • Quality Assurance (QA)',
      'hero.description': 'Currently I\'m QA Lead at <b>DTI Digital</b>, assigned to <b>ADI Global</b>, applying manual testing implementing automation of front-end mobile.',
      'hero.viewProjects': 'View projects',
      'hero.contact': 'Contact me',
      'about.title': 'About me',
      'about.text1': 'My name is <b>Marcos Paulo Laine</b> and I am in the 6th semester of Computer Science. I seek to develop my career in technology with curiosity, responsibility and willingness to learn.',
      'about.text2': 'At <a class="link" href="https://dtidigital.com.br" target="_blank" rel="noopener">DTI Digital</a> I\'m QA Lead for the North American company <a class="link" href="https://www.adiglobal.com" target="_blank" rel="noopener">ADI Global</a>, consolidating practices of manual testing, exploration, automation and pipelines.',
      'projects.title': 'Projects',
      'projects.lead': 'Some academic and personal projects — web pages, simple games, investment tools and automations.',
      'projects.carousel1.title': 'Front-end / Games / Utilities',
      'projects.carousel2.title': 'Market / Reports',
      'projects.lembretes.title': 'Reminders',
      'projects.lembretes.description': 'Simple application for task organization and reminders.',
      'projects.poker.title': 'Prob. Poker',
      'projects.poker.description': 'Educational tool for probabilistic hand analysis.',
      'projects.financiart.description': 'Auxiliary investment page (front, back and basic DB).',
      'projects.memoria.title': 'Memory',
      'projects.memoria.description': 'Classic game implemented for JS/DOM studies.',
      'projects.tictactoe.description': 'Tic-tac-toe game implementation in JavaScript.',
      'projects.backtesting.description': 'Backtest prototypes for strategy studies.',
      'projects.market.title': 'Market Report',
      'projects.market.description': 'Report generation with selected indicators.',
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
      'contact.title': 'Contact',
      'contact.lead': 'Let\'s talk? Find me on social media or send an email.',
      'footer.copyright': '© 2025 Marcos Laine. All rights reserved.'
    }
  };

  let currentLang = localStorage.getItem('lang') || 'pt';
  const html = document.documentElement;

  function translate(lang) {
    const texts = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (texts[key]) {
        const translation = texts[key];
        // Check if translation contains HTML tags
        if (translation.includes('<')) {
          el.innerHTML = translation;
        } else {
          el.textContent = translation;
        }
      }
    });
    
    // Update html lang attribute
    html.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
    html.setAttribute('data-lang', lang);
    document.title = lang === 'pt' ? 'Marcos Laine • Portfólio' : 'Marcos Laine • Portfolio';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = lang === 'pt' 
        ? 'Portfólio de Marcos Laine, estudante de Ciência da Computação e QA.'
        : 'Portfolio of Marcos Laine, Computer Science student and QA.';
    }
    currentLang = lang;
    localStorage.setItem('lang', lang);
  }

  // Apply saved language on load
  translate(currentLang);

  // Toggle language button
  const langBtn = document.getElementById('langToggle');
  langBtn?.addEventListener('click', () => {
    const newLang = currentLang === 'pt' ? 'en' : 'pt';
    translate(newLang);
  });
})();

// Modo claro/escuro com persistência
(function theme() {
    const root = document.documentElement;
    const btn = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme');
    if (saved === 'light') root.classList.add('light');
  
    btn?.addEventListener('click', () => {
      root.classList.toggle('light');
      localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
    });
  })();
  
  // Carrosséis (suporte a múltiplos carrosséis na página)
  (function carousels(){
    document.querySelectorAll('[data-carousel]').forEach(carousel => {
      const track = carousel.querySelector('[data-track]');
      const prev = carousel.querySelector('[data-prev]');
      const next = carousel.querySelector('[data-next]');
  
      // rola exatamente uma "coluna" por vez
      const getStep = () => {
        const firstCard = track.querySelector('.card');
        if (!firstCard) return 300;
        const style = getComputedStyle(firstCard);
        const width = firstCard.getBoundingClientRect().width
                    + parseFloat(style.marginLeft || 0)
                    + parseFloat(style.marginRight || 0);
        return Math.max(260, width);
      };
  
      prev?.addEventListener('click', () => {
        track.scrollBy({ left: -getStep(), behavior: 'smooth' });
      });
      next?.addEventListener('click', () => {
        track.scrollBy({ left: getStep(), behavior: 'smooth' });
      });
  
      // arraste com mouse / toque
      let isDown = false, startX = 0, scrollLeft = 0;
      track.addEventListener('pointerdown', e => {
        isDown = true;
        startX = e.pageX;
        scrollLeft = track.scrollLeft;
        track.setPointerCapture(e.pointerId);
        track.classList.add('dragging');
      });
      track.addEventListener('pointermove', e => {
        if(!isDown) return;
        const walk = (e.pageX - startX);
        track.scrollLeft = scrollLeft - walk;
      });
      ['pointerup','pointercancel','pointerleave'].forEach(evt =>
        track.addEventListener(evt, () => {
          isDown = false;
          track.classList.remove('dragging');
        })
      );
    });
  })();
  