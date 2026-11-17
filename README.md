# Portfólio - Marcos Laine

Site estático em React, TypeScript e Vite, publicado no GitHub Pages (marcoslaine.com). Não tem backend nem banco:
os projetos e as experiências ficam em arquivos JSON dentro do repositório.

## 🚀 Como rodar localmente

Requer Node.js 18 ou superior.

```bash
npm install
npm run dev
```

O site abre em `http://localhost:5173`.

## ✏️ Como editar o conteúdo

| Arquivo | O que tem |
|---|---|
| `src/data/projects.json` | Projetos (grid e modal de detalhes) |
| `src/data/experiences.json` | Experiência profissional (seção "Sobre Mim") |
| `src/data/profile.ts` | Textos fixos do perfil |

Edite o arquivo (no editor ou direto no github.com) e faça commit na `main`. O workflow
`.github/workflows/deploy.yml` gera o build e publica no GitHub Pages em 1 a 2 minutos.

### Campos de um projeto

- `id` — número único (não reutilize)
- `index` — posição no grid (1 = primeiro)
- `is_active` — `false` esconde o projeto sem apagar
- `name`, `category`
- `description` (PT) e `description_en` (EN); `description_key` (opcional) usa uma chave de tradução do `LanguageContext`
- `media_type` — `"image"` ou `"video"`
- `media_url` — lista de imagens, ex.: `["/img/carousel1/App1.png"]` (arquivos em `public/img/`)
- `technologies` — lista, ex.: `["React", "TypeScript"]`
- `test_link`, `github_link` (opcionais); `is_github_private` — `true` mostra o GitHub como privado

### Campos de uma experiência

- `id`, `index` (1 = mais recente), `is_active`
- `role` (PT) e `role_en` (EN), `period` (ex.: `"10/2026 – Atualmente"`)
- `bullets` (PT) e `bullets_en` (EN) — listas de frases

## 📝 Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run preview` — preview do build
