# prodecor33.ru

Лендинг дизайн-студии **проДЕКОР** — дизайн интерьера и ремонт под ключ во Владимире и области.

Исходный макет: [Figma — prodecor33.ru](https://www.figma.com/design/lEIA09jSULNAbEPCFWO0U2/prodecor33.ru)

**Продакшн (Vercel):** https://prodecor33.ru  
**SEO-отчёты:** https://prodecor33.ru/seo-reports/

---

## Содержание

- [Стек](#стек)
- [Архитектура](#архитектура)
- [Структура проекта](#структура-проекта)
- [Секции страницы](#секции-страницы)
- [Отправка заявок](#отправка-заявок)
- [Дизайн-система](#дизайн-система)
- [Локальная разработка](#локальная-разработка)
- [Деплой](#деплой)
- [Что доделать](#что-доделать)
- [Важные ограничения](#важные-ограничения)

---

## Стек

| Слой | Технология |
|------|------------|
| Фреймворк | [Astro](https://astro.build/) (актуальная версия — `package.json`) |
| Стили | [Tailwind CSS 4](https://tailwindcss.com/) через `@tailwindcss/vite` |
| Иконки | Inline SVG (path'ы из Lucide) — компонент `Icon.astro` |
| Клиентский JS | Vanilla TypeScript (`src/scripts/main.ts`), без React |
| Хостинг | Vercel (`@astrojs/vercel`, адаптер serverless для API) |
| Отправка заявок | Telegram Bot API + Resend (email), каналы настраиваются env-переменными |
| Пакетный менеджер | pnpm |

Проект исторически экспортирован из **Figma Make** на React/Vite — старый код (`src/app/`, `src/main.tsx`)
остался в репозитории как реликт и **не используется**. Миграция на Astro завершена (Session 1 и 2).

---

## Архитектура

Статический сайт, серверный рендеринг всех секций выполняется Astro на этапе сборки.
Единственный интерактив — прогрессивный `src/scripts/main.ts` (деградирует при выключенном JS).

```
src/
├── pages/
│   ├── index.astro        # Композиция всех секций сверху вниз
│   └── api/lead.ts        # Serverless-эндпоинт обработки заявок (POST)
├── layouts/
│   └── Layout.astro       # <head>: SEO-мета, Open Graph, JSON-LD, Яндекс.Метрика
├── components/            # Секции + переиспользуемые компоненты (.astro)
├── scripts/
│   └── main.ts            # Весь клиентский JS (подключён в index.astro)
├── styles/                # tailwind.css, theme.css, fonts.css, globals.css
└── assets/                # hero.jpg, project-newbuilding.jpg (локальные оптимизации)
```

**Принципы:**

- Каждая секция — отдельный компонент в `src/components/`.
- Данные (услуги, шаги, кейсы, отзывы) хранятся **внутри компонентов** как константы — CMS нет.
- Навигация — якорные ссылки (`#services`, `#portfolio`, `#faq` и т.д.).
- Интерактив декларативно привязан к компонентам через `data-*` атрибуты, читаемые `main.ts`.
- Вся логика каналов отправки заявок живёт **на сервере** в `/api/lead` (env-переменные не попадают к клиенту).

---

## Структура проекта

```
Prodecor33ru/
├── src/
│   ├── pages/
│   │   ├── index.astro           # Лендинг (все секции)
│   │   └── api/lead.ts           # POST /api/lead — Telegram + email (Resend)
│   ├── layouts/
│   │   └── Layout.astro          # SEO-обвязка, метрика, шрифты
│   ├── components/
│   │   ├── Header.astro          # Шапка + мобильное меню
│   │   ├── Hero.astro
│   │   ├── Services.astro
│   │   ├── Process.astro
│   │   ├── ContactForm.astro
│   │   ├── Trust.astro
│   │   ├── PortfolioNew.astro    # Актуальный портфолио-блок
│   │   ├── Testimonials.astro
│   │   ├── FAQ.astro             # Подключён в index.astro
│   │   ├── FinalCTA.astro
│   │   ├── Footer.astro
│   │   ├── ConsultationModal.astro  # Модальное окно с формой
│   │   ├── Toaster.astro         # Контейнер toast-уведомлений
│   │   ├── Icon.astro            # Инлайн-SVG иконки (Lucide-пути)
│   │   ├── Logo.astro            # SVG-логотип (inline)
│   │   └── icons/                # Паттерны иконок (ИИ-сгенерированные)
│   ├── scripts/
│   │   └── main.ts               # Единственный клиентский скрипт
│   ├── styles/
│   │   ├── index.css             # Точка входа: fonts + tailwind + theme + globals
│   │   ├── tailwind.css          # @import 'tailwindcss' + tw-animate-css
│   │   ├── theme.css             # CSS-переменные бренда
│   │   ├── fonts.css             # Подключение Inter (Google Fonts)
│   │   └── globals.css           # scroll-behavior, общие правила
│   ├── assets/                   # hero.jpg, project-newbuilding.jpg
│   ├── app/                      # ⚠ РЕЛИКТ React/Vite (не используется, кандидат на удаление)
│   │   └── ...  (App.tsx, components/, hooks/...)
│   ├── imports/                  # ⚠ Временные импорты из Figma (не используются)
│   └── main.tsx                  # ⚠ Точка входа старого React-приложения
├── astro.config.mjs              # site, output 'static', vercel adapter, tailwind
├── vercel.json                   # Build command, framework astro, redirects
├── package.json
├── public/
└── dist/                         # Результат `pnpm build` (не коммитить)
```

### Устаревший React-код

`src/app/`, `src/main.tsx`, `src/imports/` — артефакты Figma Make / React-версии лендинга.
Код не используется после миграции на Astro; удаление запланировано (см. [Что доделать](#что-доделать)).

---

## Секции страницы

Порядок рендеринга в `src/pages/index.astro`.

| # | Компонент | Заголовок / назначение | Anchor `id` | Файл |
|---|-----------|------------------------|-------------|------|
| 1 | `Header` | Шапка: логотип, навигация, телефон, CTA, мобильное меню | — | `Header.astro` |
| 2 | `Hero` | Первый экран: заголовок, описание, CTA | — | `Hero.astro` |
| 3 | `Services` | 4 услуги (дизайн, ремонт, комплектация, надзор) | `#services` | `Services.astro` |
| 4 | `Process` | 4 шага работы с клиентом | `#process` | `Process.astro` |
| 5 | `ContactForm` | Форма заявки (имя, телефон, тип проекта) | `#contact` | `ContactForm.astro` |
| 6 | `Trust` | Блок доверия: опыт, договор, сметы, сроки | — | `Trust.astro` |
| 7 | `FAQ` | Частые вопросы с аккордеоном | `#faq` | `FAQ.astro` |
| 8 | `PortfolioNew` | Кейсы с раскрывающимися карточками | `#portfolio` | `PortfolioNew.astro` |
| 9 | `Testimonials` | 3 отзыва клиентов | — | `Testimonials.astro` |
| 10 | `FinalCTA` | Финальный призыв к действию | — | `FinalCTA.astro` |
| 11 | `Footer` | Контакты, соцсети, навигация, копирайт | — | `Footer.astro` |
| — | `ConsultationModal` | Модальное окно с формой (CTA-кнопки) | — | `ConsultationModal.astro` |
| — | `Toaster` | Toast-уведомления об успехе/ошибке отправки | — | `Toaster.astro` |

### Навигация в шапке

Пункты меню в `Header.astro`:

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

---

## Отправка заявок

Единый серверный эндпоинт `POST /api/lead` (`src/pages/api/lead.ts`) принимает JSON:

```json
{ "name": "Имя", "phone": "+7 (900) 123-45-67", "projectType": "full", "source": "Форма на странице" }
```

Каналы отправки (включение + токены) задаются через env-переменные **на сервере** (Vercel):

| Переменная | Назначение |
|------------|------------|
| `VITE_TELEGRAM_ENABLED` | `"true"` — включить Telegram-канал |
| `VITE_TELEGRAM_BOT_TOKEN` | Токен Telegram-бота |
| `VITE_TELEGRAM_CHAT_IDS` | Чат-ID получателей (через запятую) |
| `VITE_EMAIL_ENABLED` | `"true"` — включить email-канал |
| `RESEND_API_KEY` | Ключ Resend для отправки email |
| `EMAIL_FROM` / `EMAIL_TO` | Отправитель/получатель (fallback — `info@prodecor33.ru`) |

Поддерживается и запись без префикса `VITE_` (`TELEGRAM_BOT_TOKEN`, `EMAIL_ENABLED` и т.д.)
для обратной совместимости; `env()` читает и `import.meta.env`, и `process.env`.

**Текущая конфигурация:** `VITE_EMAIL_ENABLED=true` (основной канал — email/Resend),
`VITE_TELEGRAM_ENABLED=false`. Если оба канала выключены — эндпоинт возвращает demo-ответ.

Клиентская часть (`main.ts`) отправляет формы по адресу `/api/lead`; на клиент env-переменные **не попадают**.

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

Типографика: Inter подключается в `src/styles/fonts.css` (Google Fonts).
Размеры — через Tailwind (`text-4xl`, `text-sm` и т.д.).

Адаптивность: mobile-first, брейкпоинты Tailwind (`sm:`, `md:`, `lg:`, `xl:`).
Мобильное меню — slide-in панель слева (`Header.astro`, `lg:hidden`).

---

## Локальная разработка

```bash
pnpm install
pnpm dev            # http://localhost:4321/
```

Проверка типов и сборка:

```bash
pnpm check           # astro check (0 ошибок/предупреждений)
pnpm build           # astro build → dist/
pnpm preview         # astro preview
```

> ⚠ `pnpm preview` не работает с адаптером `@astrojs/vercel` при наличии API-роута (serverless).
> Для локального прогона полной сборки используйте любой статический сервер на `.vercel/output/static`
> либо временный harness (в репозитории не хранится).

---

## Деплой

**Хостинг: Vercel** (Git-интеграция, продакшн-ветка `main`). PR в `main` даёт превью-деплой
(за Vercel SSO — чтобы открыть, нужен вход в аккаунт).

Конфиг: `vercel.json`

```json
{
  "buildCommand": "astro build && mkdir -p .vercel/output/static/seo-reports && cp -r seo-reports/reports/* .vercel/output/static/seo-reports/",
  "outputDirectory": "dist",
  "framework": "astro",
  "redirects": [
    { "source": "/", "has": [{ "type": "host", "value": "prodecor33ru.vercel.app" }], "destination": "https://prodecor33.ru/", "permanent": true }
  ]
}
```

Особенности:
- Build command дополнительно собирает статику SEO-отчётов (`seo-reports/reports/`) в `.vercel/output/static/seo-reports/`.
- Редиректы `prodecor33ru.vercel.app` → `prodecor33.ru` сохранены.

Ветка продакшна: `main`. GitHub Actions / GitHub Pages больше не используются.

---

## Что доделать

### ✅ Сделано (миграция на Astro)
- [x] Session 1 — статичные секции перенесены на Astro (Header, Hero, Services, Process, Trust, Testimonials, FinalCTA, Footer, Logo, Layout с SEO)
- [x] Session 2 — интерактив: мобильное меню, дерево услуг, модалка консультации, маска телефона, типы проекта, FAQ и Portfolio-аккордеоны, toast-уведомления
- [x] Единый серверный эндпоинт `POST /api/lead` (Telegram + Resend), старые Vercel-функции `api/*` удалены
- [x] SEO-мета + JSON-LD + Яндекс.Метрика перенесены в `Layout.astro`
- [x] `astro check` и production-сборка проходят; заявки с прода проверены (email)

### ❌ Осталось
- [ ] Реализовать секции `#about` и `#blog` или убрать из навигации
- [ ] Удалить устаревший React-код: `src/app/`, `src/main.tsx`, `src/imports/`
- [ ] Подключить `@astrojs/sitemap` в `astro.config.mjs` (установлен, но не активен)
- [ ] Заменить Unsplash-заглушки на реальные фото проектов (в `PortfolioNew.astro` — 2 внешних изображения)
- [ ] Доделать ссылки на соцсети (Instagram, Max — сейчас `href: '#'`, «скоро»)
- [ ] Яндекс.Вебмастер — подтвердить сайт в интерфейсе

---

## Важные ограничения

### Большие файлы в Git

GitHub отклоняет файлы **> 100 МБ**. Не коммитьте архивы и бинарники:

```
# .gitignore
.vercel
.astro
*.zip
dist/
.env*
```

### dist/, .vercel, .astro

`dist/`, `.vercel/`, `.astro/` — артефакты сборки, в `.gitignore` и не коммитятся.

### Env-переменные

Клиенту (браузеру) доступны только переменные с префиксом `PUBLIC_*`.
`VITE_*` и остальные читаются исключительно на сервере (frontmatter/API) — это нормально для Astro.
Не выносите токены в клиентский код.

---

## Репозиторий

- GitHub: https://github.com/altairstudio-ru/Prodecor33ru
- Ветка продакшна: `main`
- Деплой: Vercel (Git-интеграция)

---

*Документ подготовлен для будущих разработчиков проекта. При существенных изменениях архитектуры обновляйте этот README.*