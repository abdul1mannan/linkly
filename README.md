# Linkly

Minimal URL shortener built with Next.js (App Router), Prisma, and PostgreSQL.

## Tech Stack

- Next.js 16, React 19, TypeScript 5
- Prisma 6 with PostgreSQL
- Tailwind CSS 4

## Setup

Prerequisites
- Node.js 18+
- PostgreSQL
- pnpm

Install
```bash
pnpm install
```

Environment
Create a `.env` in the project root:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/linkly"
# Optional when using pooled connections
DIRECT_URL="postgresql://user:password@localhost:5432/linkly"
```

Database
```bash
pnpm db:migrate
pnpm db:generate
```

Run
```bash
pnpm dev
```

## API

- POST `/api/links`
  - Body: `{ "longUrl": "https://example.com" }`
  - Returns: `{ code, shortUrl, longUrl, clicks }` (201)

- GET `/:code`
  - Redirects to original URL and increments click count

## Data Model

```prisma
model Link {
  id        Int      @id @default(autoincrement())
  code      String   @unique @db.VarChar(7)
  longUrl   String   @db.Text
  createdAt DateTime @default(now()) @db.Timestamptz(3)
  clicks    Int      @default(0)

  @@index([code])
  @@index([createdAt(sort: Desc)])
  @@map("links")
}
```

## Scripts

- `pnpm dev` — start dev server
- `pnpm build` — build
- `pnpm start` — start production
- `pnpm lint` — lint
- `pnpm db:migrate` — run migrations
- `pnpm db:generate` — generate Prisma client
- `pnpm db:push` — push schema
- `pnpm db:studio` — open Prisma Studio

