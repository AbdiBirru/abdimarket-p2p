# AbdiMarket-P2P

A peer-to-peer classifieds marketplace built for Ethiopia — buyers and sellers connect and transact directly. The platform is strictly a bridge: it never handles payments or deliveries.

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Neon Postgres (serverless)
- **ORM:** Prisma 7, with the Neon driver adapter
- **Auth:** Auth.js v5 (Credentials provider, JWT sessions)
- **File storage:** Vercel Blob (direct client-side uploads)
- **Hosting:** Vercel (auto-deploy from GitHub)

## Features

- Email/password accounts with hashed passwords
- Create, edit, mark-as-sold, and delete listings
- Multi-photo upload (up to 6 per listing)
- Free-text item details, category, price (or "Negotiable"), location, accepted payment methods, delivery availability, contact phone
- Keyword search, category and location filters, sort by newest/price, pagination
- Saved listings (wishlist)
- Seller ratings and reviews
- Report listings, with an admin moderation queue
- Role-protected admin panel: manage listings, users, and reports
- Light/dark mode
- SEO: per-listing Open Graph tags, sitemap, robots.txt

## Intentionally out of scope

- Payment processing of any kind
- Delivery tracking
- Shopping cart or order management

## Getting started

### Prerequisites

- Node.js 20.9+
- A free [Neon](https://neon.tech) Postgres database
- A free [Vercel](https://vercel.com) account with a Blob store

### Setup

\`\`\`bash
npm install
\`\`\`

Copy \`.env.example\` to \`.env\` and fill in real values.

\`\`\`bash
npx prisma migrate deploy
npx prisma generate
npm run dev
\`\`\`

### Environment variables

| Variable | Description |
| --- | --- |
| \`DATABASE_URL\` | Pooled Neon connection string — used by the running app |
| \`DATABASE_URL_UNPOOLED\` | Direct Neon connection string — used only by Prisma CLI for migrations |
| \`AUTH_SECRET\` | Signing secret for Auth.js sessions — generate with \`npx auth secret\` |
| \`BLOB_READ_WRITE_TOKEN\` | Vercel Blob store access token |
| \`SITE_URL\` | Production URL, used for metadata and the sitemap |

## Project structure

\`\`\`
src/
  app/            Routes (App Router)
  components/
    ui/           Shared primitives (Button, Input, Select, Card, ThemeToggle)
    layout/       Header, Footer, BottomNav
    listings/     Listing-specific components
    admin/        Admin panel components
  lib/
    actions/      Server Actions
    listings.ts   Listing queries
    admin.ts      Admin queries
    prisma.ts     Prisma Client singleton
    constants.ts  Shared category/payment/report option lists
  auth.ts         Auth.js configuration
  proxy.ts        Route protection for /admin (Next.js 16's middleware replacement)
\`\`\`

## Deployment

Connected to Vercel via GitHub — every push to \`main\` deploys automatically. Migrations run manually against the shared Neon database (\`npx prisma migrate deploy\`) rather than as part of the Vercel build, since local development and production use the same database.

## Admin access

There's no self-service way to become an admin, by design. Promote a user directly in the database (Prisma Studio, or a direct SQL update) by setting their \`role\` to \`ADMIN\`.
