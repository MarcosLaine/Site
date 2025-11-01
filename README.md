# Portfólio - Marcos Laine

Projeto de portfólio desenvolvido com React, TypeScript, Vite e backend Node.js/Express.

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- MySQL ou banco de dados compatível (ex: Aiven)

## 🚀 Como rodar localmente

### 1. Instalar dependências do frontend

```bash
npm install
```

### 2. Instalar dependências do backend

```bash
cd backend
npm install
cd ..
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `backend/` com as seguintes variáveis:

```env
# Porta do servidor
PORT=3001

# Configurações do banco de dados
DB_HOST=seu-host-mysql
DB_PORT=3306
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
DB_NAME=nome-do-banco
DB_SSL=false

# API Key (para operações de escrita)
API_KEY=sua-chave-api-secreta

# URLs
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**Nota:** Se estiver usando Aiven, configure `DB_SSL=true`.

### 4. Criar o banco de dados

Execute o script SQL para criar as tabelas:

```bash
# Se tiver MySQL instalado localmente
mysql -u seu-usuario -p nome-do-banco < backend/database/schema.sql

# Ou execute manualmente no seu cliente MySQL (ex: MySQL Workbench, phpMyAdmin)
```

O arquivo `backend/database/schema.sql` contém a estrutura das tabelas e alguns dados de exemplo.

### 5. Iniciar o backend

```bash
cd backend
npm run dev
# ou para produção
npm start
```

O backend estará rodando em `http://localhost:3001`

### 6. Configurar variáveis de ambiente do frontend (opcional)

Crie um arquivo `.env` na raiz do projeto (se necessário):

```env
VITE_API_URL=http://localhost:3001/api
```

Por padrão, o frontend usa `http://localhost:3001/api` se a variável não estiver definida.

### 7. Iniciar o frontend

Em um novo terminal, na raiz do projeto:

```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## 📝 Scripts Disponíveis

### Frontend
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção

### Backend
- `npm start` - Inicia o servidor em modo produção
- `npm run dev` - Inicia o servidor com nodemon (auto-reload)

## 🗄️ Estrutura do Banco de Dados

A tabela `projects` contém os seguintes campos:
- `id` - ID único
- `name` - Nome do projeto
- `description` - Descrição do projeto
- `media_url` - URL(s) da mídia (pode ser string única ou JSON array)
- `media_type` - Tipo de mídia ('image' ou 'video')
- `test_link` - Link para testar o projeto
- `github_link` - Link do repositório GitHub
- `is_github_private` - Se o repositório é privado
- `category` - Categoria do projeto
- `technologies` - JSON array de tecnologias usadas
- `order_index` - Ordem de exibição
- `is_active` - Se o projeto está ativo
- `created_at` - Data de criação
- `updated_at` - Data de atualização

## 🔧 Migrações

Se a tabela já existe e você precisa adicionar o campo `technologies`, execute:

```sql
ALTER TABLE projects 
ADD COLUMN technologies TEXT COMMENT 'JSON array de tecnologias ["React", "Node.js", "MySQL"]' 
AFTER category;
```

## 🐛 Troubleshooting

### Erro de conexão com o banco
- Verifique se as credenciais no `.env` estão corretas
- Confirme que o banco de dados está rodando
- Se usar Aiven, verifique se `DB_SSL=true`

### CORS errors
- Certifique-se de que `FRONTEND_URL` no backend aponta para `http://localhost:5173`
- Verifique se o backend está rodando na porta 3001

### Porta já em uso
- Altere a porta no `.env` do backend (ex: `PORT=3002`)
- Ajuste `VITE_API_URL` no frontend se necessário

