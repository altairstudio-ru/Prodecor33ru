# TODO

## Приоритет 1 — Критично

- [ ] **Доделать отправку сообщений с форм на email info@prodecor33.ru**
  - Добавить `RESEND_API_KEY` в Vercel Environment Variables (Production)
  - Убедиться, что отправитель `info@prodecor33.ru` подтверждён в Resend
  - Протестировать отправку на `info@prodecor33.ru`
  - Почистить `.env` от старых SMTP-настроек (они не используются, код на Resend)
  - После настройки Resend переключить каналы: `VITE_TELEGRAM_ENABLED=true`, `VITE_EMAIL_ENABLED=true`
