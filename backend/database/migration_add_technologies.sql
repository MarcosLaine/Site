-- Migração: Adicionar campo technologies à tabela projects
-- Execute este script se sua tabela já existir e não tiver o campo technologies

ALTER TABLE projects 
ADD COLUMN technologies TEXT COMMENT 'JSON array de tecnologias ["React", "Node.js", "MySQL"]' 
AFTER category;

