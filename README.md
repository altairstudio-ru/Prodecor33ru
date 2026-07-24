# prodecor33.ru

Лендинг дизайн-студии **проДЕКОР** — дизайн интерьера и ремонт под ключ во Владимире и области.

Исходный макет: [Figma — prodecor33.ru](https://www.figma.com/design/lEIA09jSULNAbEPCFWO0U2/prodecor33.ru)

**Продакшн (Vercel):** https://prodecor33.ru  
**GitHub Pages:** https://altairstudio-ru.github.io/Prodecor33ru/ (автодеплой при push в `main`)

---

## Содержание

- [Стек](#стек)
- [Архитектура](#архитектура)
- [Структура проекта](#структура-проекта)
- [Секции страницы](#секции-страницы)
- [Дизайн-система](#дизайн-система)
- [Компонент Logo](#компонент-logo)
- [UI-библиотека](#ui-библиотека)
- [Локальная разработка](#локальная-разработка)
- [Деплой](#деплой)
- [Что доделать](#что-доделать)
- [Важные ограничения](#важные-ограничения)

---

## Стек

| Слой | Технология |
|------|------------|
| Сборка | [Vite 6](https://vitejs.dev/) |
| UI | [React 18](https://react.dev/) |
| Стили | [Tailwind CSS 4](https://tailwindcss.com/) |
| Иконки | [Lucide React](https://lucide.dev/) |
| UI-примитивы | [Radix UI](https://www.radix-ui.com/) + shadcn-подобные компоненты |
| Пакетный менеджер | pnpm |

Проект экспортирован из **Figma Make** — часть зависимостей (MUI, Recharts, react-router и др.) подключена, но в текущем лендинге почти не используется.

---

## Архитектура

Одностраничное приложение (SPA) **без роутинга**: все секции рендерятся в одном `App.tsx` сверху вниз.

```
index.html
    └── src/main.tsx          # Точка входа, монтирование React
            └── src/app/App.tsx   # Композиция секций лендинга
                    ├── Header              (фиксированная шапка)
                    ├── Hero                (первый экран)
                    ├── Services
                    ├── Process
                    ├── ContactForm
                    ├── Trust
                    ├── PortfolioNew
                    ├── Testimonials
                    ├── FinalCTA
                    ├── Footer
                    ├── ConsultationModal   (портальное модальное окно)
                    ├── Toaster             (sonner-уведомления)
                    ├── Analytics           (Vercel Analytics)
                    └── SpeedInsights       (Vercel Speed Insights)
```

**Принципы:**

- Каждая секция — отдельный компонент в `src/app/components/`.
- Данные (услуги, шаги, кейсы, отзывы) хранятся **внутри компонентов** как константы — отдельного API или CMS нет.
- Навигация — якорные ссылки (`#services`, `#portfolio` и т.д.).
- Состояние локальное (`useState`): мобильное меню, раскрытие кейсов портфолио, форма заявки.

---

## Структура проекта

```
Prodecor33ru/
├── index.html                  # HTML-оболочка
├── vite.config.ts              # Vite, alias @, base path, Figma asset resolver
├── vercel.json                 # Настройки сборки для Vercel
├── package.json
├── .github/workflows/
│   └── deploy.yml              # CI/CD → GitHub Pages
├── src/
│   ├── main.tsx
│       ├── app/
│       │   ├── App.tsx             # Корневой layout
│       │   ├── components/
│       │   │   ├── Header.tsx
│       │   │   ├── Hero.tsx
│       │   │   ├── Services.tsx
│       │   │   ├── Process.tsx
│       │   │   ├── ContactForm.tsx
│       │   │   ├── Trust.tsx
│       │   │   ├── PortfolioNew.tsx   # Актуальный портфолио-блок
│       │   │   ├── Portfolio.tsx      # Старая версия, не используется в App
│       │   │   ├── Testimonials.tsx
│       │   │   ├── FinalCTA.tsx
│       │   │   ├── Footer.tsx
│       │   │   ├── Logo.tsx           # SVG-логотип (inline)
│       │   │   ├── FAQ.tsx            # Готов, но не подключён в App
│       │   │   ├── ConsultationModal.tsx  # Модальное окно с формой
│       │   │   ├── figma/
│       │   │   │   └── ImageWithFallback.tsx
│       │   │   └── ui/                # Переиспользуемые UI-компоненты (shadcn)
│       │   ├── hooks/
│       │   │   └── useConsultationModal.ts
│       │   └── utils/
│       │       ├── telegram.ts        # Клиент отправки в Telegram + email
│       │       └── phoneMask.ts       # Маска и валидация телефона
│       └── styles/
│       ├── index.css              # Импорты стилей
│       ├── tailwind.css
│       ├── theme.css              # CSS-переменные, цвета бренда
│       └── fonts.css
└── dist/                          # Результат `pnpm run build` (не коммитить)
```

**Alias:** `@/` → `src/` (настроен в `vite.config.ts`).

**Figma assets:** импорты вида `figma:asset/filename.png` резолвятся в `src/assets/` через кастомный Vite-плагин `figmaAssetResolver`.

---

## Секции страницы

Порядок рендеринга задаётся в `src/app/App.tsx`.

| # | Компонент | Заголовок / назначение | Anchor `id` | Файл |
|---|-----------|------------------------|-------------|------|
| 1 | `Header` | Шапка: логотип, навигация, телефон, CTA, мобильное меню | — | `Header.tsx` |
| 2 | `Hero` | Первый экран: заголовок, описание, CTA | — | `Hero.tsx` |
| 3 | `Services` | 4 услуги (дизайн, ремонт, комплектация, надзор) | `#services` | `Services.tsx` |
| 4 | `Process` | 4 шага работы с клиентом | `#process` | `Process.tsx` |
| 5 | `ContactForm` | Форма заявки (имя, телефон, тип проекта) | — | `ContactForm.tsx` |
| 6 | `Trust` | Блок доверия: опыт, договор, сметы, сроки | — | `Trust.tsx` |
| 7 | `PortfolioNew` | Кейсы с раскрывающимися карточками | `#portfolio` | `PortfolioNew.tsx` |
| 8 | `Testimonials` | 3 отзыва клиентов | — | `Testimonials.tsx` |
| 9 | `FinalCTA` | Финальный призыв к действию | — | `FinalCTA.tsx` |
| 10 | `Footer` | Контакты, соцсети, навигация, копирайт; мини-форма обратного звонка | — | `Footer.tsx` |
| — | `ConsultationModal` | Портальное модальное окно с формой (Telegram-бот) | — | `ConsultationModal.tsx` |
| — | `Toaster` | Sonner-уведомления об успехе/ошибке отправки | — | `App.tsx` |

### Навигация в шапке

Пункты меню в `Header.tsx`:

| Пункт | Ссылка | Статус |
|-------|--------|--------|
| О нас | `#about` | Секция **не реализована** |
| Услуги | `#services` | Работает |
| Кейсы | `#portfolio` | Работает |
| Блог | `#blog` | Секция **не реализована** |

### Контакты (зашиты в код)

- Телефон: `+7 (900) 483-20-50` (`tel:+79004832050`)
- ВКонтакте: https://vk.ru/prodecor_33
- Telegram: https://t.me/ProDecor_33
- Instagram, Max — заглушки (`href: '#'`, помечены «скоро»)
- Email: info@prodecor33.ru
- Адрес: г. Владимир, ул. Луначарского, 23

### Неиспользуемые компоненты

- `Portfolio.tsx` — предыдущая версия портфолио, заменена на `PortfolioNew.tsx`.
- `FAQ.tsx` — готовый блок FAQ с `id="faq"`, но не подключён в `App.tsx`.

### Vercel Serverless Functions

```
api/
├── telegram.ts      # Отправка заявки в Telegram-бот
└── send-email.ts    # Отправка заявки на email через Resend
```

Клиентская часть вызывает эти API через `src/app/utils/telegram.ts`.
Форма отправляет данные на email (канал включён, `VITE_EMAIL_ENABLED=true`) и опционально в Telegram (`VITE_TELEGRAM_ENABLED=false`).

### Модальное окно консультации

`ConsultationModal.tsx` — портальное модальное окно, вызываемое из CTA-кнопок в Header, Hero и FinalCTA.
Управляется через хук `useConsultationModal.ts`. Содержит форму с полями имя, телефон, тип проекта.
Отправка — через тот же Telegram-бот. При успехе тост и закрытие модалки.

---

## Дизайн-система

Основные цвета (Tailwind + CSS-переменные в `src/styles/theme.css`):

| Название | HEX | Использование |
|----------|-----|---------------|
| Фон тёмный | `#1F1F1F` | Hero, Header, Footer |
| Акцент / золото | `#C6A96B` | CTA, слоган, кнопки |
| Текст основной | `#1F1F1F` | Заголовки на светлом фоне |
| Текст вторичный | `#8A8A8A` | Подзаголовки |
| Фон светлый | `#F5F3EF` | Карточки, фон формы |
| Телефон (ссылка) | `#5BA3F5` | Кликабельный номер в шапке |

Типографика: кастомные шрифты подключаются в `src/styles/fonts.css`. Размеры — через Tailwind (`text-4xl`, `text-sm` и т.д.).

Адаптивность: mobile-first, брейкпоинты Tailwind (`sm:`, `md:`, `lg:`, `xl:`). Мобильное меню — slide-in панель слева (`Header.tsx`, `lg:hidden`).

---

## Компонент Logo

`src/app/components/Logo.tsx` — **inline SVG**, не файл-картинка.

Ключевые параметры:

```ts
const LOGO_VIEWBOX = '0 195 1299 300';
// Includes wordmark + decorative flourish below «про».
```

- `viewBox` обрезан вручную под wordmark + декоративный элемент под буквами «про».
- `preserveAspectRatio="xMidYMid meet"` — сохраняет пропорции при фиксированной высоте.
- Цвет задаётся через `text-white` / `currentColor` в className.

**Размеры в шапке и футере:**

```
w-[180px] sm:w-[220px] lg:w-[260px] h-11 sm:h-12 lg:h-14
```

При изменении `viewBox` обязательно проверяйте отображение в **Header** и **Footer** — раньше из-за неверного `viewBox` логотип обрезался и «уезжал» слоган.

---

## UI-библиотека

`src/app/components/ui/` — набор компонентов в стиле [shadcn/ui](https://ui.shadcn.com/) на базе Radix UI (Button, Dialog, Form, Tabs и др.).

В текущем лендинге **почти не используются** — секции сверстаны кастомно на Tailwind. Библиотека оставлена для будущих страниц (блог, личный кабинет, админка).

Утилиты: `ui/utils.ts` (`cn()` — merge классов через `clsx` + `tailwind-merge`).

---

## Локальная разработка

```bash
pnpm install
pnpm run dev        # http://localhost:5173/
```

Превью продакшн-сборки (с base path GitHub Pages):

```bash
pnpm run serve      # build + preview → http://127.0.0.1:8000/Prodecor33ru/
```

Сборка:

```bash
pnpm run build      # результат в dist/
```

---

## Деплой

### Vercel (основной хостинг)

Конфиг: `vercel.json`

```json
{
  "buildCommand": "vite build --base /",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

На Vercel `base` должен быть `/` (корень домена). Деплой:

```bash
npx vercel deploy --prod
```

Домен `prodecor33.ru` подключается в [настройках проекта Vercel](https://vercel.com) → Domains.

### GitHub Pages

Конфиг: `.github/workflows/deploy.yml` — автодеплой при push в `main`.

В `vite.config.ts` для production задан base path:

```ts
base: mode === 'development' ? '/' : '/Prodecor33ru/',
```

URL: `https://altairstudio-ru.github.io/Prodecor33ru/`

> **Важно:** base path на Vercel (`/`) и GitHub Pages (`/Prodecor33ru/`) **различаются**. Не меняйте `vite.config.ts` без учёта целевого хостинга, либо используйте отдельные build-команды (как в `vercel.json`).

---

## Что доделать

### ✅ Сделано
- [x] Подключить отправку формы — Telegram (+ опционально email через Resend), тосты, валидация
- [x] Привязать кнопки CTA к форме — `ConsultationModal` (Header, Hero, FinalCTA)
- [x] Убрать `noindex, nofollow` из `index.html` перед публичным SEO-запуском
- [x] Обновить `<meta name="description">` — реальный текст вместо шаблона из Figma
- [x] Добавить подтверждение Яндекс.Вебмастер (`<meta name="yandex-verification">`)
- [x] Добавить счётчик Яндекс.Метрики (ID `111010795`)

### ❌ Осталось
- [ ] Реализовать секции `#about` и `#blog` или убрать из навигации
- [ ] Подключить `FAQ.tsx` в `App.tsx` или удалить
- [ ] Заменить Unsplash-заглушки на реальные фото проектов
- [ ] Удалить неиспользуемый `Portfolio.tsx` при рефакторинге
- [ ] Доделать ссылки на соцсети (Instagram, Max — сейчас `href: '#'` помечены «скоро»)
- [ ] Яндекс.Вебмастер — нажать «Подтвердить» в интерфейсе, когда DNS/мета-тег готов

---

## Важные ограничения

### Большие файлы в Git

GitHub отклоняет файлы **> 100 МБ**. Не коммитьте архивы и бинарники:

```
# .gitignore
.vercel
Архив.zip
*.zip
```

Если большой файл уже попал в историю:

```bash
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch "Архив.zip"' \
  --prune-empty --tag-name-filter cat -- --all
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force-with-lease origin main
```

### dist/

Папка `dist/` — артефакт сборки. В репозитории может присутствовать исторически, но для CI/CD GitHub Actions собирает заново. Предпочтительно не коммитить `dist/` в новых изменениях.

---

## Репозиторий

- GitHub: https://github.com/altairstudio-ru/Prodecor33ru
- Ветка продакшна: `main`
- CI: GitHub Actions → GitHub Pages

---

*Документ подготовлен для будущих разработчиков проекта. При существенных изменениях архитектуры обновляйте этот README.*
