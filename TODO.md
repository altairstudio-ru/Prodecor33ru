# TODO

## ✅ Выполнено

### Миграция на Astro
- [x] **Session 1 — статика**: перенос Header, Hero, Services, Process, Trust, Testimonials, FinalCTA, Footer, Logo на Astro; SEO-обвязка в `Layout.astro`; деплой в прод (PR #3)
- [x] **Session 2 — интерактив**: ContactForm, FAQ, PortfolioNew, ConsultationModal, Toaster; единый клиентский скрипт `src/scripts/main.ts` (меню, дерево услуг, модалка, маска телефона, аккордеоны, тосты); деплой в прод (PR #4)
- [x] **API заявок**: единый серверный эндпоинт `POST /api/lead` (`src/pages/api/lead.ts`) — Telegram + Resend, env на сервере
- [x] Удалены старые Vercel-функции `api/telegram.ts`, `api/send-email.ts`
- [x] `astro check` → 0 ошибок; сборка и деплой Vercel успешны
- [x] Заявка с прода проверена (email получен)

### Отправка форм (после миграции)
- [x] Каналы: `VITE_EMAIL_ENABLED=true`, `VITE_TELEGRAM_ENABLED=false` (Vercel Production)
- [x] `RESEND_API_KEY` в Vercel (Production)
- [x] Почищены старые SMTP-переменные из Vercel
- [x] Почищен `.env`

### SEO (на React, затем перенесено на Astro)
- [x] Убрать `noindex, nofollow` из `index.html`
- [x] Обновить `<meta name="description">`
- [x] `lang="ru"`
- [x] JSON-LD (Organization, LocalBusiness)
- [x] Подтверждение Яндекс.Вебмастер (`<meta name="yandex-verification">`)
- [x] Счётчик Яндекс.Метрики (ID `111010795`)
- [x] Версионирование: `1.0.1` → `1.1.0` (Astro)

## ❌ Осталось

### Навигация и контент
- [ ] Реализовать секцию `#about` или убрать из навигации
- [ ] Реализовать секцию `#blog` (уже убран из навигации по SEO-решению)
- [ ] Заменить 2 Unsplash-заглушки на реальные фото проектов (в `PortfolioNew.astro`)
- [ ] Доделать ссылки на соцсети (Instagram, Max — `href: '#'`)
- [ ] Яндекс.Вебмастер / GSC — сайт добавлен, проверить статус подтверждения и индексацию

### Старый React-код (после миграции на Astro)
- [ ] Удалить `src/app/`, `src/main.tsx`, `src/imports/` (не используется)
- [ ] Аудит зависимостей: убрать ~40 неиспользуемых пакетов Figma Make (MUI, Recharts, react-router, radix-*, sonner, lucide-react и др.)

### Astro
- [ ] Подключить `@astrojs/sitemap` в `astro.config.mjs` (пакет установлен)
- [ ] Аудит доступности (a11y): заголовки, alt, фокус-статы, контраст
- [ ] Удалить лишние env `RESEND_FROM`/`RESEND_TO` из Vercel (не читаются кодом)