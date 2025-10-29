-- Tabela de Projetos
CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  media_url VARCHAR(500) NOT NULL,
  media_type ENUM('image', 'video') DEFAULT 'image',
  test_link VARCHAR(500),
  github_link VARCHAR(500),
  is_github_private BOOLEAN DEFAULT false,
  category VARCHAR(100) DEFAULT 'geral',
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_active (is_active),
  INDEX idx_order (order_index)
);

-- Dados de exemplo (você pode adaptar com seus projetos reais)
INSERT INTO projects (name, description, media_url, media_type, test_link, github_link, is_github_private, category, order_index) VALUES
('Lembretes', 'Aplicativo simples para organização de tarefas e lembretes.', '/img/carousel1/Lembretes.png', 'image', NULL, 'https://github.com/marcoslaine/lembretes', false, 'frontend', 1),
('Prob. Poker', 'Ferramenta didática para análise probabilística de mãos.', '/img/carousel1/Poker.png', 'image', NULL, 'https://github.com/marcoslaine/poker', false, 'frontend', 2),
('Financiart', 'Página auxiliar de investimentos (front, back e BD básicos).', '/img/carousel1/financiart.png', 'image', NULL, 'https://github.com/marcoslaine/financiart', false, 'frontend', 3),
('Memória', 'Jogo clássico implementado para estudos de JS/DOM.', '/img/carousel1/memoria.png', 'image', NULL, 'https://github.com/marcoslaine/memoria', false, 'frontend', 4),
('Tic-Tac-Toe', 'Implementação do jogo da velha em JavaScript.', '/img/carousel1/tictactoe.png', 'image', NULL, 'https://github.com/marcoslaine/tictactoe', false, 'frontend', 5),
('Backtesting', 'Protótipos de backtest para estudos de estratégia.', '/img/carousel2/Backtesting.png', 'image', NULL, NULL, true, 'mercado', 6),
('Relatório de Mercado', 'Geração de relatórios com indicadores selecionados.', '/img/carousel2/Relatório_mercado.png', 'image', NULL, NULL, true, 'mercado', 7);


