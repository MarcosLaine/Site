-- Migração: atualiza experiências e projetos com o currículo de Product Owner (10/2026).
-- Fonte: Marcos_Laine_PO_PT.pdf / Marcos_Laine_PO_EN.pdf
-- Reaproveita as 4 linhas existentes (ids 1–4), na mesma ordem de exibição.

UPDATE experiences SET
  role = 'Product Owner — Projeto SURA',
  role_en = 'Product Owner — SURA Project',
  period = '10/2026 – Atualmente',
  bullets = '["PO em projeto de sustentação para a SURA (seguradora), com o produto já em produção.", "Priorização, junto ao cliente, de um backlog de incidentes, correções e melhorias que competem pela mesma sprint.", "Garantia de que toda história que entra na sprint tenha critérios de aceite claros e possa ser efetivamente testada."]',
  bullets_en = '["PO on a sustainment project for SURA (insurance), with the product already live.", "Prioritizing with the client a backlog of incidents, fixes and improvements competing for the same sprint.", "Making sure every story that enters the sprint has clear acceptance criteria and can actually be tested."]',
  `index` = 1,
  is_active = true
WHERE id = 1;

UPDATE experiences SET
  role = 'Lead QA Engineer — Projetos ADI Global e ISN',
  role_en = 'Lead QA Engineer — ADI Global and ISN Projects',
  period = '09/2025 – 10/2026',
  bullets = '["Liderança de qualidade em 8 aplicações globais da ADI Global Distribution, incluindo o app mobile da ADI, com liderança de Engenheiros de Qualidade e contato direto com o cliente.", "Implementação de Shift Left no processo de desenvolvimento: 75% menos bugs gerados durante o desenvolvimento e 95% menos bugs encontrados pelo cliente.", "Testes de back-end, front-end e performance; automação integrada a pipelines CI/CD; OKRs, métricas de QA e melhoria de processos.", "No projeto ISN, liderança de uma iniciativa de QA assistida por IA (piloto AI-first da dti), estruturando e orquestrando agentes de IA para testar, priorizar defeitos e apoiar decisões de qualidade."]',
  bullets_en = '["Led quality across 8 global applications for ADI Global Distribution, including the ADI mobile app, leading Quality Engineers and working directly with the client.", "Implemented Shift Left in the development process: 75% fewer bugs created during development and 95% fewer bugs found by the client.", "Back-end, front-end and performance testing; test automation integrated with CI/CD pipelines; OKR definition, QA metrics analysis and process improvement.", "On the ISN project, led an AI-assisted QA initiative (dti’s AI-first pilot), structuring and orchestrating AI agents to test, prioritize defects and support quality decisions."]',
  `index` = 2,
  is_active = true
WHERE id = 2;

UPDATE experiences SET
  role = 'Junior QA Engineer',
  role_en = 'Junior QA Engineer',
  period = '07/2024 – 09/2025',
  bullets = '["Escrita de casos de teste e implementação de fluxos de automação.", "Testes de API — Swagger, Postman, ReadyAPI.", "Testes front-end mobile — Maestro, Appium; testes front-end web — Selenium, Cypress, Playwright."]',
  bullets_en = '["Test case writing and implementation of automation flows.", "API testing — Swagger, Postman, ReadyAPI.", "Mobile front-end testing — Maestro, Appium; web front-end testing — Selenium, Cypress, Playwright."]',
  `index` = 3,
  is_active = true
WHERE id = 3;

UPDATE experiences SET
  role = 'Software Developer Intern — Backend',
  role_en = 'Software Developer Intern — Backend',
  period = '05/2024 – 07/2024',
  bullets = '["Estruturação e implementação de APIs, conexão com banco de dados e otimização de desempenho."]',
  bullets_en = '["API structuring and implementation, database integration and performance optimization."]',
  `index` = 4,
  is_active = true
WHERE id = 4;

-- AdvoFind: descrição alinhada ao CV (projeto próprio, iniciado por discovery)
UPDATE projects SET
  description = 'App de serviços jurídicos (Web, Android e iOS) que conecta quem precisa de orientação a advogados e escritórios qualificados. Projeto próprio, do conceito ao lançamento: começou com discovery — entrevistas com advogados e clientes sobre as barreiras de acesso à justiça — e virou um produto com busca por especialidade e localização, perfis, avaliações, área administrativa e notificações.',
  description_en = 'Legal-services app (Web, Android and iOS) connecting people who need legal guidance with qualified lawyers and law firms. A personal project from concept to launch: it started with discovery — interviews with lawyers and clients about the barriers to accessing legal services — and became a product with search by specialty and location, profiles, reviews, an admin area and notifications.'
WHERE id = 9;

-- Quanto Deu A Conta?: o link salvo ("https:/github.com/marcoslaine/uanto-deu-a-conta") está quebrado e retorna 404
UPDATE projects SET github_link = NULL WHERE id = 11;
