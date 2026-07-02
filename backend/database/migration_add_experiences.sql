-- Migração: Tabela de Experiência Profissional (seção "Sobre Mim")
-- Cada linha = um cargo/projeto, com bullets em PT e EN (JSON arrays).

CREATE TABLE IF NOT EXISTS experiences (
  id INT PRIMARY KEY AUTO_INCREMENT,
  role VARCHAR(255) NOT NULL COMMENT 'Cargo/título em português (ex: QA Lead — Projeto ISN)',
  role_en VARCHAR(255) COMMENT 'Cargo/título em inglês',
  period VARCHAR(100) NOT NULL COMMENT 'Período (ex: 06/2026 – Atualmente)',
  bullets TEXT NOT NULL COMMENT 'JSON array de bullets em português',
  bullets_en TEXT COMMENT 'JSON array de bullets em inglês',
  `index` INT NOT NULL DEFAULT 0 COMMENT 'Ordem de exibição (1 = primeiro/mais recente)',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_exp_active (is_active),
  INDEX idx_exp_index (`index`)
);

INSERT INTO experiences (role, role_en, period, bullets, bullets_en, `index`) VALUES
(
  'QA Lead — Projeto ISN', 'QA Lead — ISN Project', '06/2026 – Atualmente',
  '["Atualmente alocado pela DTI Digital no projeto da empresa ISN, liderando a iniciação e execução da iniciativa de IA do projeto piloto AI-first da DTI.", "Estruturação e orquestração de agentes de IA voltados para testes, automação e qualidade."]',
  '["Currently allocated by DTI Digital to the ISN project, leading the rollout and execution of DTI\\u2019s AI initiative for its AI-first pilot project.", "Structuring and orchestration of AI agents focused on testing, automation and quality."]',
  1
),
(
  'QA Lead — Projeto ADI Global', 'QA Lead — ADI Global Project', '09/2025 – 06/2026',
  '["Liderança de Engenheiros de Qualidade em projetos internacionais.", "Criação de casos de teste; definição de OKRs; análise de métricas e estatísticas de progresso de QA.", "Implementação de automações; integração de fluxos automatizados com pipelines (CI/CD); contato direto com o cliente.", "Implementação do shift-left no processo de desenvolvimento, reduzindo em 75% a taxa de bugs gerados por história já nas fases iniciais do desenvolvimento e em 96% o número de bugs identificados pelo cliente."]',
  '["Leadership of Quality Engineers on international projects.", "Test case creation; OKR definition; analysis of QA progress metrics and statistics.", "Implementation of automations; integration of automated flows with pipelines (CI/CD); direct client contact.", "Implementation of shift-left testing in the development process, reducing the rate of bugs generated per story by 75% from the early stages of development onward, and reducing the number of bugs found by the client by 96%."]',
  2
),
(
  'QA Engineer', 'QA Engineer', '07/2024 – 09/2025',
  '["Escrita de casos de teste.", "Implementação de fluxos de automação.", "Testes de API — Swagger; Postman; ReadyAPI.", "Testes front-end mobile — Maestro; Appium.", "Testes front-end — Selenium; Cypress; Playwright."]',
  '["Test case writing.", "Implementation of automation flows.", "API testing — Swagger; Postman; ReadyAPI.", "Mobile front-end testing — Maestro; Appium.", "Front-end testing — Selenium; Cypress; Playwright."]',
  3
),
(
  'Software Engineer — Backend', 'Software Engineer — Backend', '05/2024 – 07/2024',
  '["Estruturação e implementação de APIs.", "Conexão e otimização de APIs com banco de dados.", "Otimização de APIs."]',
  '["API structuring and implementation.", "Database connection and optimization of APIs.", "API optimization."]',
  4
);
