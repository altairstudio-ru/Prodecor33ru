# TODO

## ✅ Выполнено

### Отправка форм
- [x] **Доделать отправку сообщений с форм на email info@prodecor33.ru**
  - [x] `RESEND_API_KEY` добавлен в Vercel (Production)
  - [x] Протестирована отправка — успешно (id: `b5d3a22a-0a66-461e-95ee-5fd885e30721`)
  - [x] Почищены старые SMTP-переменные из Vercel
  - [x] Почищен `.env`
  - [x] Каналы переключены: `VITE_TELEGRAM_ENABLED=true`, `VITE_EMAIL_ENABLED=true`

### SEO
- [x] Убрать `noindex, nofollow` из `index.html`
- [x] Обновить `<meta name="description">`
- [x] Сменить `lang="en"` на `lang="ru"` в `index.html`
- [x] Добавить JSON-LD (Organization, LocalBusiness)
- [x] Добавить подтверждение Яндекс.Вебмастер (`<meta name="yandex-verification">`)
- [x] Добавить счётчик Яндекс.Метрики (ID `111010795`)
- [x] Версионирование: `1.0.1` (patch)

## ❌ Осталось

### Навигация и контент
- [ ] Реализовать секцию `#about` или убрать из навигации
- [ ] Реализовать секцию `#blog` или убрать из навигации
- [ ] Подключить `FAQ.tsx` в `App.tsx`
- [ ] Заменить Unsplash-заглушки на реальные фото проектов
- [ ] Доделать ссылки на соцсети (Instagram, Max — сейчас `href: '#'`)
- [ ] Яндекс.Вебмастер — нажать «Подтвердить» в интерфейсе

### Рефакторинг
- [ ] Удалить неиспользуемый `Portfolio.tsx`
- [ ] Аудит зависимостей (MUI, Recharts, react-router — не используется)
