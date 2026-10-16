-- Migração: adiciona o Jumie como primeiro projeto e desloca os demais uma posição.
-- Fonte: repositório MarcosLaine/jumie (README, textos das lojas e capturas em store/screenshots/ios-6.5/pt-BR).

UPDATE projects SET `index` = `index` + 1
WHERE is_active = true
  AND NOT EXISTS (SELECT 1 FROM (SELECT id FROM projects WHERE name = 'Jumie') AS jumie);

INSERT INTO projects (name, description, description_en, media_url, media_type, test_link, github_link, is_github_private, category, technologies, `index`)
SELECT
  'Jumie',
  'Assistente pessoal com IA para iOS e Android: agenda de várias contas Google, controle de gastos e orçamentos, e-mails importantes, lembretes, listas e memória, tudo numa conversa por voz ou texto. Projeto próprio, do conceito ao produto: app em Flutter, backend em Cloud Functions (TypeScript) e conversa por voz em tempo real com a API Live do Gemini, com o servidor como dono do prompt e das ferramentas. Tem assinatura freemium (Jumie Pro via RevenueCat), resumos da manhã e da semana por notificação, widget na tela inicial e privacidade em primeiro lugar: áudios e fotos são apagados logo após o processamento. Disponível em português, inglês e espanhol.',
  'AI personal assistant for iOS and Android: calendars from multiple Google accounts, expense and budget tracking, important emails, reminders, lists and memory, all in one voice or text conversation. A personal project from concept to product: Flutter app, Cloud Functions (TypeScript) backend and real-time voice conversation with the Gemini Live API, with the server owning the prompt and the tools. It has a freemium subscription (Jumie Pro via RevenueCat), morning and weekly summaries via notifications, a home-screen widget and a privacy-first design: audio and photos are deleted right after processing. Available in Portuguese, English and Spanish.',
  '["/img/carousel1/Jumie1.jpeg", "/img/carousel1/Jumie2.jpeg", "/img/carousel1/Jumie3.jpeg", "/img/carousel1/Jumie4.jpeg", "/img/carousel1/Jumie5.jpeg", "/img/carousel1/Jumie6.jpeg"]',
  'image',
  'https://assessor-3f985.web.app',
  NULL,
  true,
  'Mobile',
  '["Flutter", "Dart", "Firebase", "Cloud Functions", "TypeScript", "Node.js", "Gemini Live API", "Vertex AI", "Cloud Firestore", "Firebase Auth", "Google Calendar API", "Gmail API", "RevenueCat", "Firebase Cloud Messaging", "App Check", "Google Analytics"]',
  1
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE name = 'Jumie');
