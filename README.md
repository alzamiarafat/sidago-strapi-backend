# Sidago Strapi Backend

Standalone Strapi CMS for the Sidago Next.js frontend.

## Setup

1. Copy `.env.example` to `.env`.
2. Install dependencies:

```bash
npm install
```

3. Start Postgres (Docker):

```bash
docker compose up -d sidago-postgres
```

4. Start Strapi locally:

```bash
npm run develop
```

For local `npm run develop`, `.env` uses `DATABASE_HOST=localhost` and
`DATABASE_PORT=5343`. Docker Compose overrides these for the Strapi container.

Admin panel: `http://localhost:9012/admin`

## Docker

Build and run with a fixed image name and tag:

```bash
# default tag: 1  →  sidago-strapi-backend:1
npm run docker:up

# custom tag
IMAGE_TAG=2 docker compose up --build -d
```

Postgres only (local `npm run develop`):

```bash
docker compose up -d sidago-postgres
```

Published ports:

- Strapi: `http://localhost:9012`
- PostgreSQL: `localhost:5343`

## Seed CMS content

Generate seed JSON from bundled seed defaults:

```bash
npm run seed
```

Push seed data into Strapi:

```bash
npm run seed:push
```

Set `STRAPI_SEED_TOKEN` in `.env` for production pushes. Local pushes can use
the public `/api/seed` endpoint or direct DB upserts without a token.

Seed source files live in `seed/` inside this repo.

## Content types

Includes CMS page types plus **Newsletter Subscription** for website sign-ups
(`POST /api/newsletter-subscriptions/subscribe`).

## Frontend integration

Point the frontend `.env` to this Strapi instance:

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:9012
STRAPI_API_TOKEN=
```
