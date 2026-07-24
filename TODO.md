# TODO

## ✅ Выполнено

- [x] **Доделать отправку сообщений с форм на email info@prodecor33.ru**
  - [x] `RESEND_API_KEY` добавлен в Vercel (Production)
  - [x] Протестирована отправка — успешно (id: `b5d3a22a-0a66-461e-95ee-5fd885e30721`)
  - [x] Почищены старые SMTP-переменные из Vercel
  - [x] Почищен `.env`
  - [x] Каналы переключены: `VITE_TELEGRAM_ENABLED=true`, `VITE_EMAIL_ENABLED=true`

## Приоритет 2 — Навигация и контент

- [ ] Реализовать секцию `#about` или убрать из навигации
- [ ] Реализовать секцию `#blog` или убрать из навигации
- [ ] Подключить `FAQ.tsx` в `App.tsx`
- [ ] Заменить Unsplash-заглушки на реальные фото проектов

## Приоритет 3 — SEO

- [ ] Убрать `noindex, nofollow` из `index.html`
- [ ] Обновить `<meta name="description">`
- [ ] Сменить `lang="en"` на `lang="ru"` в `index.html`
- [ ] Добавить JSON-LD (Organization, LocalBusiness)

## Приоритет 4 — Рефакторинг

- [ ] Удалить неиспользуемый `Portfolio.tsx`
- [ ] Аудит зависимостей (MUI, Recharts, react-router — не используется)
