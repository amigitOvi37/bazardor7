# bazardor7

**bazardor7** is a web application that tracks and displays current market prices for essential commodities (grains, pulses, oils, vegetables, fish, eggs, and fruits). It provides price data including current rates, daily changes, and market-wise minimum/maximum prices across different divisions.

The application also includes full user authentication (sign in/up, OAuth, profile management) and is built with a modern full-stack architecture.

---

## Project Overview

bazardor7 helps users stay informed about the latest market prices for essential goods in Bangladesh. The application fetches real-time data from the Programming Hero API and presents it through an intuitive interface with filtering, sorting, and detailed product views.

Key capabilities:
- View current prices for agricultural commodities
- Filter by category with sorting options (price low-to-high, high-to-low)
- Browse product details with market-wise price breakdown
- User authentication with sign-in, sign-up, and OAuth (Google, GitHub)
- Profile management (name update, sign-out)
- Responsive design with Bengali language support

---

## Key Features

- **Product Listings**: Browse all available commodities with today's price, unit, and percentage change
- **Category Filtering**: Filter products by category (e.g., rice, lentils, vegetables)
- **Product Details**: View comprehensive price breakdown including min, max, and average prices per market
- **Category-specific Pages**: Dedicated pages for each product category with sorting options
- **User Authentication**: 
  - Email/password sign in and sign up
  - Google and GitHub OAuth login
  - Account linking between providers
- **Profile Management**: Update user name, sign out
- **Protected Routes**: Profile and details pages require authentication
- **Responsive UI**: Works on mobile and desktop with Bengali language interface

---

## Screenshots

![Homepage](./public/ss.png)

*Homepage with hero section and product grid*

> **Note**: Screenshot above shows the application homepage. Additional screenshots can be added as needed.

---

## Technology Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16.4.0 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Authentication** | better-auth (v1.7.7) with MongoDB adapter |
| **Database** | MongoDB |
| **OAuth Providers** | Google, GitHub |
| **HTTP Client** | native fetch API |
| **Icons** | lucide-react, react-icons |
| **Utilities** | react-hot-toast, react-fast-marquee, react-loading-indicators |

---

## Project Structure

```
bazardor7/
├── .next/           # Next.js build output
├── node_modules/    # Dependencies
├── src/
│   ├── app/         # Next.js app router pages and API routes
│   │   ├── api/auth/          # better-auth internal routes
│   │   ├── category/[name]/   # Category filter pages
│   │   ├── details/[id]/      # Product detail pages
│   │   ├── layout.tsx         # Root layout with Navbar, Footer, Context Provider
│   │   ├── loading.tsx        # Page loading skeleton
│   │   ├── profile/           # Protected profile page
│   │   ├── sign-in/           # Sign in page
│   │   ├── sign-up/           # Sign up page
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable React components (Hero, ItemCard, Navbar, etc.)
│   ├── context/               # React Category context (session management)
│   ├── lib/                   # Utilities (auth.ts, mongodb.ts, auth-client.ts)
│   └── proxy.ts               # Route protection middleware
├── .env                       # Environment variables (local dev only)
├── .env.local                 # Local env overrides (gitignored)
├── .gitignore
├── next.config.ts             # Next.js configuration
├── package.json
└── tailwind.config.css        # Tailwind CSS configuration (auto-generated)
```

---

## Getting Started

### Prerequisites

- Node.js (>= 18.x)
- MongoDB Atlas account or local MongoDB instance
- Google OAuth credentials (client ID and secret) for Google login
- GitHub OAuth credentials (client ID and secret) for GitHub login

### Installation & Running locally

```bash
# 1. Clone the repository
git clone <your-repository-url>
cd bazardor7

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Copy .env.example or create a .env file see below

# 4. Run the development server
npm run dev
# or with bun:
bun run dev

# 5. Open http://localhost:3000 in your browser
```

---

## Installation

```bash
# Install NPM dependencies
npm install

# Development server (with Turbopack & Tailwind CSS v4)
npm run dev

# Production build
npm run build

# Start production server
npm run start
```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables. The `.env.example` format is provided below — do not commit real credentials.

```env
# Better-auth configuration
BETTER_AUTH_SECRET=your-better-auth-secret-here
BETTER_AUTH_URL=http://localhost:3000

# MongoDB connection (Atlas or local)
MONGODB_URI=mongodb://username:password@host:27017/database-name

# OAuth Providers
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

**Important**: 
- `BETTER_AUTH_SECRET` — a random string used for session signing. Generate with `openssl rand -hex 32`.
- `BETTER_AUTH_URL` — the public URL where the app is running (e.g., `http://localhost:3000` or `https://your-app.vercel.app`).
- `MONGODB_URI` — full MongoDB connection string. For MongoDB Atlas, obtain from the connection dialog.
- OAuth client IDs and secrets must be registered with the respective providers (Google Cloud Console, GitHub Developer Settings).

---

## Database Setup

The application uses **MongoDB** as its database, connected via the `mongodb` Node.js driver and `better-auth/mongo-adapter`.

### Required setup:

1. **MongoDB Atlas** (recommended for production) or a local MongoDB instance
2. Create a database named `bazardor7` (or any name you prefer)
3. Obtain the connection string from MongoDB Atlas: `mongodb://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority`
4. Set the `MONGODB_URI` environment variable with the connection string

The database schema is managed internally by `better-auth` for user accounts, sessions, and authentication data. No manual schema creation is required.

---

## Authentication

bazardor7 implements **full-featured authentication** using `better-auth`:

### Sign-in / Sign-up
- Email and password authentication
- Google OAuth login
- GitHub OAuth login

### Session Management
- Sessions are stored in MongoDB via the `mongodbAdapter`
- `BETTER_AUTH_SECRET` signs session cookies
- Session renewal on page focus, tab switch, and after auth actions

### Protected Routes
- **`/Profile`** — User profile page (requires authentication)
- **`/details/[id]`** — Product detail pages (protected via `src/proxy.ts`)
- **`/category/[name]`** — Category pages (public access)

### Authentication Flow
1. User navigates to `/sign-in` or `/sign-up`
2. Form submission uses `authClient.signIn.email`, `authClient.signUp.email`, or `authClient.signIn.social` (Google/GitHub)
3. On success, user is redirected to `/` or `/Profile`
4. Profile and details routes check for an active session via the `auth` utility
5. Unauthenticated users are redirected to `/sign-in` with a `callbackURL` parameter

### Sign-out
- `authClient.signOut()` clears the session and redirects to `/`

---

## Application Routes

| Route | Description | Access |
|---|---|---|
| `/` | Homepage with hero section and product grid | Public |
| `/sign-in` | Email/OAuth sign in page | Public |
| `/sign-up` | Email/name sign up page | Public |
| `/Profile` | User profile (name, sign out) | Protected |
| `/category/[name]` | Products filtered by category | Public |
| `/details/[id]` | Product detail page with market prices | Protected (via proxy) |
| `/api/auth/[...all]` | better-auth internal routes | Internal |

### API Routes (better-auth)
- `/api/auth/sign-in` — Email/sign in
- `/api/auth/sign-up` — Email sign up
- `/api/auth/sign-out` — Sign out
- `/api/auth/auth-client` — OAuth redirects
- `/api/auth/session` — Session retrieval

---

## Available Scripts

These scripts are defined in `package.json`:

| Script | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Deployment

This project is configured for easy deployment on **Vercel**:

```bash
# Deploy via Vercel CLI
vercel

# Or connect the repository to Vercel for automatic deployments on push.
```

The `next.config.ts` includes:
- Image optimization with allowed remote patterns (Google avatars, GitHub avatars)
- React Compiler enabled (`reactCompiler: true`)
- Tailwind CSS 4 turbopack integration
- Experimental features: agent feedback, component caching, partial prefetching

For other platforms, ensure the environment variables above are set and the build output is preserved.

---

## Error Handling and Security Notes

- **Session protection**: All protected routes (`/Profile`, `/details/[id]`) go through `src/proxy.ts` which validates the session on each request. Unauthenticated requests are redirected to `/sign-in`.
- **OAuth credentials**: Keep `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` secret. Do not expose them in client-side code — they are only used server-side via `better-auth`.
- **MongoDB connection**: The `MONGODB_URI` must not be committed. It is gitignored via `.env*`.
- **better-auth secret**: `BETTER_AUTH_SECRET` should be a strong random value. Regenerate if compromised.
- **Form validation**: Client-side validation is implemented in sign-in and sign-up forms, but server-side validation should also be considered for production.

---

## Contributing

Contributions are welcome! Please feel free to:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/foo`)
3. Make your changes
4. Commit (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/foo`)
6. Open a Pull Request

### Guidelines
- Follow the existing code style (Tailwind CSS classes, TypeScript types)
- Add appropriate TypeScript types for new components/hooks
- Do not commit `.env` or any secret values
- Run `npm run lint` before committing to catch lint errors

---

## License

This project is **unlicensed**. No license file has been specified. If you wish to add a license, create a `LICENSE` file in the root directory.

---

## Author and Links

- **Repository**: [https://github.com/your-org/bazardor7](https://github.com/your-org/bazardor7) *(replace with actual repo URL)*
- **Live Demo**: [https://bazardor7.vercel.app](https://bazardor7.vercel.app) *(replace with actual live demo URL)*

---

### Table of Contents

1. [Project Title](#bazardor7)
2. [Project Overview](#project-overview)
3. [Key Features](#key-features)
4. [Screenshots](#screenshots)
5. [Technology Stack](#technology-stack)
6. [Project Structure](#project-structure)
7. [Getting Started](#getting-started)
8. [Installation](#installation)
9. [Environment Variables](#environment-variables)
10. [Database Setup](#database-setup)
11. [Authentication](#authentication)
12. [Application Routes](#application-routes)
13. [Available Scripts](#available-scripts)
14. [Deployment](#deployment)
15. [Error Handling and Security Notes](#error-handling-and-security-notes)
16. [Contributing](#contributing)
17. [License](#license)
18. [Author and Links](#author-and-links)