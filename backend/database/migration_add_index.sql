-- Migração: coluna de posição de exibição como `index` (1 = primeiro no grid)
-- Execute se a tabela já existir com order_index

-- Renomeia order_index -> index (mantém valores atuais)
ALTER TABLE projects
  CHANGE COLUMN order_index `index` INT NOT NULL DEFAULT 0
  COMMENT 'Número da posição de exibição no site (1 = primeiro)';

DROP INDEX idx_order ON projects;
CREATE INDEX idx_project_index ON projects (`index`);
