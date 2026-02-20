# Theater ARTGaley

Next.js 16 + React 19 project for theater events, tickets and admin management.

## Local run

```bash
npm ci
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## SEO / GEO / AI readiness

Implemented:
- global metadata with canonical + OpenGraph + Twitter cards
- `robots.txt` and `sitemap.xml` generation via App Router metadata routes
- `manifest.webmanifest`
- JSON-LD (`TheaterGroup`, `WebSite`, `Event`) on the home page
- `llms.txt` route at `/llms.txt` for AI crawlers
- noindex for private/admin auth routes

## Deploy to Coolify

Project is ready for Dockerfile deploy mode.

1. Create new Coolify service from this repository.
2. Build pack: `Dockerfile`.
3. Port: `3000`.
4. Add environment variables from `.env.example`.
5. Set domain and enable HTTPS.

Notes:
- Image includes healthcheck on `http://127.0.0.1:3000`.
- Uses Next.js standalone output for smaller runtime image.

## Required environment variables

Use `.env.example` as source of truth.

Critical:
- `POSTGRESQL_HOST`, `POSTGRESQL_PORT`, `POSTGRESQL_USER`, `POSTGRESQL_PASSWORD`, `POSTGRESQL_DBNAME`
- `BETTER_AUTH_SECRET`, `BASE_URL`, `BETTER_AUTH_TRUSTED_ORIGINS`
- `YANDEX_CLIENT_ID`, `YANDEX_CLIENT_SECRET`
- `S3_ENDPOINT_URL`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_REGION_NAME`, `S3_BUCKET_NAME`

Optional:
- `PUBLIC_YANDEX_METRICA`
- `NEXT_PUBLIC_SITE_URL`
