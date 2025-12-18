# MarkoubJobs

A job board platform I built for the Markoub Senior Full-stack Assignment. It's a complete hiring solution with a public job board and an admin panel for managing postings and applications.

## What's Inside

**For job seekers:**
- Browse and search job listings
- Filter by department and job type
- Apply with resume upload (PDF)
- Submit spontaneous applications

**For admins:**
- Dashboard with stats overview
- Create/edit/close job postings
- Review applications and update status
- Download resumes

## Tech Choices

I went with this stack because it's modern, type-safe, and gets the job done:

| Layer | Tech | Why |
|-------|------|-----|
| Frontend | React 19 + TanStack Start | File-based routing, SSR support, great DX |
| Styling | TailwindCSS 4 | Fast to build, consistent design |
| Backend | Express 5 + TypeScript | Simple, reliable, type-safe |
| Database | PostgreSQL + DrizzleORM | Solid ORM with great TypeScript integration |
| DevOps | Docker Compose | One command to run everything |

## Getting Started

### Docker (Recommended)

```bash
# Start everything
docker-compose up --build

# First time? Run migrations and seed data
docker exec job_platform_backend npm run db:push
docker exec job_platform_backend npm run db:seed
```

That's it. Open http://localhost:3000

### Manual Setup

Need Node 20+ and PostgreSQL 16+

**1. Database**
```sql
CREATE DATABASE job_platform;
```

**2. Backend**
```bash
cd backend
cp .env.example .env  # edit DATABASE_URL if needed
npm install
npm run db:push
npm run db:seed
npm run dev
```

**3. Frontend**
```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
├── frontend/
│   └── src/
│       ├── components/     # Header, shared stuff
│       ├── lib/api.ts      # API client + types
│       └── routes/         # Pages (file-based routing)
│           ├── index.tsx           # Job listings
│           ├── jobs.$jobId.tsx     # Job details
│           ├── apply.$jobId.tsx    # Application form
│           └── admin/              # Admin panel
│
├── backend/
│   └── src/
│       ├── db/             # Schema + connection
│       ├── routes/         # API endpoints
│       ├── index.ts        # Express setup
│       └── seed.ts         # Sample data
│
└── docker-compose.yml
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | List open jobs |
| GET | `/api/jobs/:id` | Get job details |
| POST | `/api/applications` | Submit application |
| GET | `/api/admin/jobs` | All jobs (admin) |
| POST | `/api/admin/jobs` | Create job |
| PUT | `/api/admin/jobs/:id` | Update job |
| DELETE | `/api/admin/jobs/:id` | Delete job |
| GET | `/api/admin/applications` | List applications |
| PATCH | `/api/admin/applications/:id` | Update status |
| GET | `/api/admin/stats` | Dashboard stats |

Admin routes need `Authorization: Bearer admin-secret-token` header.

## Key Decisions

**Why TanStack Start?** - Wanted to try something newer than Next.js. The file-based routing is clean and it plays nicely with React 19.

**Why DrizzleORM?** - TypeScript-first, no code generation needed, and the query builder feels natural. Migrations are straightforward too.

**Mock data fallback** - The frontend has built-in mock jobs so the UI works even if the backend is down. Good for demos and development.

**Simple auth** - Used a static token for admin routes. In production you'd swap this for proper JWT/session auth, but it keeps things simple for the assignment.

## Moroccan Localization

The platform is set up for Morocco:
- Phone format: +212 6 XX XX XX XX
- Currency: MAD (Moroccan Dirham)
- Cities: Casablanca, Rabat, Marrakech, Tangier, Fes, Agadir, Oujda

---

Built for the Markoub technical assignment.
