-- Migração: Adicionar campos de tradução para descrições dos projetos
-- Execute este script se já possui uma tabela projects existente
-- IMPORTANTE: Se as colunas já existirem, você receberá um erro. Isso é esperado e seguro ignorar.

-- Adicionar coluna description_key (opcional)
ALTER TABLE projects 
ADD COLUMN description_key VARCHAR(255) COMMENT 'Chave para tradução da descrição (ex: projects.lembretes.description)' AFTER description;

-- Adicionar coluna description_en (opcional)
ALTER TABLE projects 
ADD COLUMN description_en TEXT COMMENT 'Descrição em inglês (alternativa ao description_key)' AFTER description_key;

