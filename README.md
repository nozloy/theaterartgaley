# Theater ARTGaley

Сайт и админ-панель театра АРТГалей для публикации спектаклей, отображения ближайших показов и управления контентом.

## Основное назначение проекта

- Публичная витрина театра: афиша, описание спектаклей, города выступлений, команда.
- Показ актуального (или последнего) события с переходом к покупке билетов.
- Админ-функции: создание/редактирование мероприятий, управление ролями пользователей.
- Интеграция с облачным S3-хранилищем для изображений мероприятий.

## Технологии

- `Next.js 16` (App Router, metadata routes, standalone build).
- `React 19` + `TypeScript 5`.
- `Tailwind CSS 4` + Radix/shadcn UI-компоненты.
- `better-auth` + Yandex OAuth для аутентификации.
- `PostgreSQL` через `pg` (ручные SQL-запросы).
- `AWS SDK v3` (`S3Client`) для загрузки и листинга изображений.
- `GSAP` для анимаций на главной странице.
- Docker (`Dockerfile`) и `docker-compose.yml` для деплоя, включая Coolify.

## Ключевые особенности

- SEO/AI-ready:
  - централизованные metadata (`OpenGraph`, `Twitter`, canonical),
  - `robots.txt`, `sitemap.xml`, `manifest.webmanifest`,
  - JSON-LD (`TheaterGroup`, `WebSite`, `Event`) на главной,
  - `llms.txt` endpoint (`/llms.txt`).
- RBAC для админ-функций:
  - роли `admin`/`user`,
  - защита приватных API и `/dashboard`,
  - защита от снятия последнего админа.
- События:
  - хранение в таблице `events`,
  - fallback на legacy-таблицу `next_event`,
  - форматирование времени для Москвы (UTC+3).
- Инфраструктурный bootstrap:
  - схема auth и таблицы событий создаются при необходимости на уровне приложения.

## Архитектура

Проект следует layered-подходу с разделением на UI, серверную логику и доступ к данным.

### 1) Presentation layer

- `app/*`: страницы и маршруты Next.js.
- `components/*`: UI-компоненты, клиентские секции, админ-интерфейс.
- `modules/home/*`: контент и pure-утилиты для представления главной страницы.

### 2) Application/API layer

- `app/api/*`: обработчики запросов (auth, admin events/users, images).
- В API-роутах:
  - проверка сессии и роли,
  - валидация входных данных,
  - вызов доменной логики (`lib/events`, `lib/s3`, `lib/auth`).

### 3) Domain and data layer

- `lib/events.ts`: доменная логика мероприятий (CRUD, сортировка, бизнес-валидации).
- `lib/server-event.tsx`: агрегатор данных для SSR (основной источник + fallback).
- `lib/db.ts`: единая точка подключения к PostgreSQL (`DATABASE_URL` или `POSTGRESQL_*`).
- `lib/ensure-auth-schema.ts`: создание auth-таблиц при первом обращении.
- `lib/s3.ts`: работа с S3 (upload/list), формирование публичных URL.

## Структура каталогов

```text
app/
  api/
    admin/events
    admin/events/images
    admin/users
    auth/[...all]
    event
    images/[filename]
  dashboard/
  llms.txt/
  privacy/
  sign-in/
components/
  shared/
  ui/
lib/
  auth.ts
  db.ts
  ensure-auth-schema.ts
  events.ts
  s3.ts
  server-event.tsx
modules/
  home/
  seo/
```

## Переменные окружения

Источник правды: `.env.example`.

Критично:

- `POSTGRESQL_HOST`, `POSTGRESQL_PORT`, `POSTGRESQL_USER`, `POSTGRESQL_PASSWORD`, `POSTGRESQL_DBNAME`
- `BETTER_AUTH_SECRET`, `BASE_URL`
- `YANDEX_CLIENT_ID`, `YANDEX_CLIENT_SECRET`
- `S3_ENDPOINT_URL`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_REGION_NAME`, `S3_BUCKET_NAME`

Опционально:

- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `PUBLIC_YANDEX_METRICA`

## Запуск

```bash
npm ci
cp .env.example .env
npm run dev
```

## Продакшн

```bash
npm run build
npm run start
```
