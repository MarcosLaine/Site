-- Use este script se a tabela NÃO tiver order_index (só adiciona a coluna index)

ALTER TABLE projects
  ADD COLUMN `index` INT NOT NULL DEFAULT 0
  COMMENT 'Número da posição de exibição no site (1 = primeiro)'
  AFTER technologies;

CREATE INDEX idx_project_index ON projects (`index`);
