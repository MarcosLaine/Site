-- Tabela de Projetos
CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  description_key VARCHAR(255) COMMENT 'Chave para tradução da descrição (ex: projects.lembretes.description)',
  description_en TEXT COMMENT 'Descrição em inglês (alternativa ao description_key)',
  media_url TEXT NOT NULL COMMENT 'Pode ser URL única ou JSON array ["url1", "url2"]',
  media_type ENUM('image', 'video') DEFAULT 'image',
  test_link VARCHAR(500),
  github_link VARCHAR(500),
  is_github_private BOOLEAN DEFAULT false,
  category VARCHAR(100) DEFAULT 'geral',
  technologies TEXT COMMENT 'JSON array de tecnologias ["React", "Node.js", "MySQL"]',
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_active (is_active),
  INDEX idx_order (order_index)
);

-- Dados de exemplo (você pode adaptar com seus projetos reais)
-- Note: O campo technologies pode ser NULL ou um JSON array como: '["React", "Node.js", "MySQL"]'
-- Use description_key para usar o sistema de tradução ou description_en para tradução direta
INSERT INTO projects (name, description, description_key, description_en, media_url, media_type, test_link, github_link, is_github_private, category, technologies, order_index) VALUES
('Lembretes', 'Aplicativo simples para organização de tarefas e lembretes.', 'projects.lembretes.description', 'Simple application for task organization and reminders.', '/img/carousel1/Lembretes.png', 'image', NULL, 'https://github.com/marcoslaine/lembretes', false, 'frontend', '["React", "TypeScript", "Tailwind CSS"]', 1)


