# VentureConnect

VentureConnect is a role-based startup collaboration platform built with Next.js. It connects founders who need teammates with collaborators who want to discover startup opportunities, apply to roles, and manage their profile.

The app includes public startup and opportunity browsing, Better Auth authentication, role-based dashboards, MongoDB-backed auth storage, Stripe subscription checkout, and a deployed external API for startup, opportunity, application, user, and transaction data.

## Features

- Public landing page with banner, testimonials, featured startups, benefits, and featured opportunities
- Email/password and Google authentication with Better Auth
- Role selection during registration for founders and collaborators
- Public startup listing and startup details pages
- Public opportunity listing and opportunity details pages
- Collaborator application flow for startup opportunities
- Protected dashboard area with role-specific navigation
- Founder dashboard for startup profile management, opportunity posting, opportunity editing/deleting, and application review
- Collaborator dashboard for browsing opportunities, tracking applications, and editing profile details
- Admin dashboard for platform overview, user management, startup moderation, and transaction review
- Stripe subscription checkout for founder premium upgrades
- Responsive UI using Tailwind CSS, DaisyUI, HeroUI, Lucide, Gravity UI icons, and Motion

## Tech Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- DaisyUI 5
- HeroUI 3
- Better Auth
- MongoDB
- TanStack React Query
- Axios
- Stripe
- React Hook Form
- React Hot Toast
- SweetAlert2

## Project Structure

```text
ventureconnect/
|-- public/
|   |-- banner.png
|   `-- icons8-crown-100.png
|-- src/
|   |-- app/
|   |   |-- api/
|   |   |   |-- auth/[...all]/route.js
|   |   |   `-- checkout_sessions/route.js
|   |   |-- dashboard/
|   |   |   |-- admin/
|   |   |   |-- collaborator/
|   |   |   |-- founder/
|   |   |   `-- layout.js
|   |   |-- login/page.jsx
|   |   |-- opportunities/
|   |   |-- profile/page.jsx
|   |   |-- register/[id]/page.jsx
|   |   |-- role/page.jsx
|   |   |-- startups/
|   |   |-- globals.css
|   |   |-- layout.js
|   |   `-- page.js
|   |-- components/
|   |   |-- dashboard/DashboardSidebar.jsx
|   |   |-- FeatureOpportunities.jsx
|   |   |-- FeatureStartups.jsx
|   |   |-- Footer.jsx
|   |   |-- Navbar.jsx
|   |   |-- Root.jsx
|   |   |-- Testimonial.jsx
|   |   `-- whyJoin.jsx
|   |-- hooks/
|   |   |-- useRole.jsx
|   |   `-- useUserEmail.jsx
|   `-- lib/
|       |-- auth.js
|       |-- auth-client.js
|       `-- stripe.js
|-- next.config.mjs
|-- proxy.js
|-- package.json
`-- README.md
```

## Main Routes

### Public Routes

- `/` - Home page
- `/login` - User login
- `/role` - Role selection before registration
- `/register/[id]` - Register as a selected role
- `/startups` - Browse accepted startups
- `/startups/[id]` - Startup details and related opportunities
- `/opportunities` - Browse startup opportunities
- `/opportunities/[id]` - Opportunity details and application form

### Dashboard Routes

- `/dashboard/admin/overview` - Admin overview
- `/dashboard/admin/manage-users` - Manage platform users
- `/dashboard/admin/manage-startup` - Accept or reject startup submissions
- `/dashboard/admin/view-transaction` - Review checkout transactions
- `/dashboard/founder/overview` - Founder overview
- `/dashboard/founder/my-startup` - Create, update, or delete founder startup profile
- `/dashboard/founder/add-opportunity` - Post startup opportunities
- `/dashboard/founder/add-opportunity/success` - Stripe checkout success page
- `/dashboard/founder/manage-opportunity` - Update or delete founder opportunities
- `/dashboard/founder/application` - Review collaborator applications
- `/dashboard/collaborator/overview` - Collaborator overview
- `/dashboard/collaborator/browse-opportunities` - Dashboard opportunity browser
- `/dashboard/collaborator/my-applications` - Track submitted applications
- `/dashboard/collaborator/profile` - Manage collaborator profile

## Environment Variables

Create a `.env` file in the project root and add the following values:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=
DB_NAME=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
VITE_IMAGE_BB_API_KEY=
```

Notes:

- `BETTER_AUTH_SECRET` is required by Better Auth.
- `BETTER_AUTH_URL` should match your local or deployed app URL.
- `MONGODB_URI` and `DB_NAME` are used by Better Auth through the MongoDB adapter.
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` enable Google login.
- `STRIPE_SECRET_KEY` is used by the local checkout API route.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is available for client-side Stripe usage.
- `VITE_IMAGE_BB_API_KEY` exists in the current environment config, but it is not referenced by the current frontend source.

## External API

Most startup, opportunity, application, user role, dashboard, and transaction data is loaded from:

```text
https://venture-connect-server-kappa.vercel.app
```

The local Next.js app provides:

- `GET/POST /api/auth/[...all]` through Better Auth
- `POST /api/checkout_sessions` for Stripe subscription checkout

## Installation

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app at:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Starts the Next.js development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after building.

```bash
npm run lint
```

Runs ESLint using the Next.js core web vitals config.

## Authentication and Roles

VentureConnect uses Better Auth with MongoDB storage. Users can register with email/password or Google OAuth. The app stores additional user fields for:

- `role`
- `isBlocked`
- `plan`

Supported dashboard roles are:

- `admin`
- `founder`
- `collaborator`

The dashboard sidebar changes automatically based on the authenticated user's role.

## Payments

Stripe is used for founder subscription checkout. The checkout route creates a subscription session and redirects users to Stripe. On success, users are returned to:

```text
/dashboard/founder/add-opportunity/success
```

## Styling

Global styles are defined in `src/app/globals.css`. The project uses:

- Tailwind CSS
- DaisyUI light theme
- HeroUI styles
- Custom dark theme helpers
- Brand colors based around cyan and orange accents

## Deployment

This project can be deployed to Vercel or any platform that supports Next.js. Before deployment, add the required environment variables to the hosting provider and update `BETTER_AUTH_URL` to the production domain.
