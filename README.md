# INQUIS

**Interactive Inquiry System for Early Scientific Thinking**  
LIDM 2026 — Division IPDP

Platform pembelajaran inkuiri berbasis sains untuk anak usia 5–7 tahun. Mengembangkan kemampuan berpikir ilmiah melalui eksplorasi matematika interaktif.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL via Supabase (Prisma ORM)
- **Auth:** Supabase Auth
- **Animation:** Framer Motion
- **Testing:** Vitest + React Testing Library + Playwright

---

## Local Setup

### 1. Clone and install

```bash
git clone <repo-url>
cd inquis
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in the values from your Supabase project:

| Variable | Where to find it |
|---|---|
| `DATABASE_URL` | Supabase → Settings → Database → Connection string (Transaction) |
| `DIRECT_URL` | Supabase → Settings → Database → Connection string (Session) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role key |

### 3. Initialize database

```bash
# Push schema to Supabase
npm run db:push

# Seed development data
npm run db:seed
```

### 4. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Demo Accounts

After seeding, use these accounts:

| Role | Email | Password |
|---|---|---|
| Teacher | `demo.teacher@inquis.app` | Set in Supabase Auth dashboard |
| Parent | `demo.parent@inquis.app` | Set in Supabase Auth dashboard |

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run type-check` | TypeScript validation |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:e2e` | Run E2E tests (Playwright) |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed development data |
| `npm run db:studio` | Open Prisma Studio |

---

## Project Structure

```
app/                    # Next.js App Router pages + layouts
  (child)/              # /play route group — CHILD role
  (teacher)/            # /teacher route group — TEACHER role
  (parent)/             # /parent route group — PARENT role
  login/                # Shared login page
components/
  auth/                 # AuthGuard, RoleGuard, LoginForm
  providers/            # AudioProvider
  shared/               # ErrorBoundary, LoadingScreen, PageHeader
  ui/                   # Base UI components (Button, Card, etc.)
lib/
  services/             # AuthService, ProgressService, StorageService
  supabase/             # Browser/server/middleware Supabase clients
  env.ts                # Environment variable validation
  prisma.ts             # Prisma singleton
  utils.ts              # Shared utilities
prisma/
  schema.prisma         # Database schema
  seed.ts               # Development seed data
tests/
  unit/                 # Vitest unit tests
  e2e/                  # Playwright E2E tests
  setup.ts              # Vitest global setup
types/
  index.ts              # Shared TypeScript types
```

---

## Specification Documents

Implementation specs live in `.kiro/specs/`:

- `foundation/` — App architecture, auth, routing, database
- `dashboard/` — Child world map and progress display
- `teacher-panel/` — Classroom management and analytics
- `world-1-pattern-explorer/` through `world-4-little-scientist/` — Learning worlds

Steering documents (non-negotiable constraints) live in `.kiro/steering/`.

---

## Architecture Reference

See `.kiro/specs/foundation/architecture.md` for the full architectural blueprint.

Key principles: server-first, separation of concerns, type safety, feature-oriented organization.
