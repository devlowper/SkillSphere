# SkillSphere – Online Learning Platform

A modern full-stack online learning platform built with **Next.js App Router**, **Tailwind CSS + DaisyUI**, **BetterAuth** (Google OAuth + Email/Password), and **Motion** (animations). The design mirrors the minimal, modern aesthetic of adobe.com with a focus on light mode + dark mode toggle.

---

## User Review Required

> [!IMPORTANT]
> **BetterAuth requires a database adapter**. The simplest setup for this assignment is **SQLite** (via `better-sqlite3`) since no external DB is needed. This keeps everything local and avoids environment variable complexity. If you prefer **PostgreSQL/MySQL**, let me know and I'll adjust.

> [!IMPORTANT]
> **Environment Variables Needed** (`.env.local`):
> - `BETTER_AUTH_SECRET` – random secret key
> - `GOOGLE_CLIENT_ID` – from Google Cloud Console
> - `GOOGLE_CLIENT_SECRET` – from Google Cloud Console
> - `BETTER_AUTH_URL` – e.g. `http://localhost:3000`
> 
> You'll need to create a Google OAuth app at [console.cloud.google.com](https://console.cloud.google.com) for Google login to work. I'll include a `.env.example` file with placeholder values.

> [!WARNING]
> The assignment says **"use adobe.com theme"** (minimal, modern). I'll implement a clean white/dark palette with orange accent colors (`#FF6B35` tones) matching a premium SaaS look — not a clone of adobe.com.

---

## Open Questions

> [!IMPORTANT]
> 1. **Database**: Use **SQLite** (zero-config, local file) or a hosted DB like Neon/Supabase (PostgreSQL)?
> 2. **Hosting**: Vercel (recommended for Next.js) — should I include deployment config?
> 3. **Course Images**: Should I generate AI images for each course, or use placeholder URLs?

I'll proceed with **SQLite + Vercel config + AI-generated course images** as sensible defaults.

---

## Proposed Changes

### 1. Project Initialization

#### [NEW] Next.js App with Tailwind + DaisyUI
```
npx create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npm install daisyui better-auth better-sqlite3 @types/better-sqlite3
npm install motion react-hot-toast react-icons swiper
npm install @better-auth/cli
```

---

### 2. Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Navbar + Footer + Providers)
│   ├── page.tsx                # Home page
│   ├── courses/
│   │   └── page.tsx            # All Courses page (search)
│   ├── courses/[id]/
│   │   └── page.tsx            # Course Details (protected)
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── register/
│   │   └── page.tsx            # Register page
│   ├── my-profile/
│   │   └── page.tsx            # Profile page (protected)
│   ├── my-profile/update/
│   │   └── page.tsx            # Update profile form
│   ├── not-found.tsx           # 404 page
│   └── api/
│       └── auth/
│           └── [...all]/
│               └── route.ts    # BetterAuth API handler
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── CourseCard.tsx
│   ├── HeroSlider.tsx
│   ├── ThemeToggle.tsx
│   ├── LoadingSpinner.tsx
│   └── InstructorCard.tsx
├── lib/
│   ├── auth.ts                 # BetterAuth server config
│   ├── auth-client.ts          # BetterAuth client config
│   └── courses.ts              # Course data / helpers
├── data/
│   └── courses.json            # 6+ courses JSON
└── middleware.ts               # Route protection
```

---

### 3. Core Components

#### [NEW] `src/data/courses.json`
- 6+ courses with id, title, instructor, duration, rating, level, description, image, category

#### [NEW] `src/lib/auth.ts`
- BetterAuth server config with SQLite adapter
- Email/password + Google OAuth providers

#### [NEW] `src/lib/auth-client.ts`
- BetterAuth client (React hooks for session)

#### [NEW] `src/middleware.ts`
- Protect `/courses/[id]` and `/my-profile` routes
- Redirect to `/login?redirect=<path>` if unauthenticated

---

### 4. Pages

| Page | Route | Auth Required |
|------|-------|--------------|
| Home | `/` | ❌ |
| All Courses | `/courses` | ❌ |
| Course Details | `/courses/[id]` | ✅ |
| Login | `/login` | ❌ |
| Register | `/register` | ❌ |
| My Profile | `/my-profile` | ✅ |
| Update Profile | `/my-profile/update` | ✅ |
| 404 | `*` | ❌ |

---

### 5. Home Page Sections

1. **Hero Slider** – Swiper.js carousel with 3 slides, animated headlines using Motion
2. **Popular Courses** – Top 3 by rating, CourseCard components
3. **Learning Tips** – Study techniques & time management cards
4. **Top Instructors** – 3–4 instructor cards with avatar, name, specialty
5. **Trending Courses** *(extra section)* – Highlighted "new release" courses

---

### 6. Auth Flow

- **Register** → success → redirect to `/login`
- **Login (email)** → success → redirect to `/`
- **Login (Google)** → success → redirect to `/`
- **Protected route visit** → redirect to `/login?redirect=/courses/[id]`
- **After login** → redirect back to original URL

---

### 7. Design System

- **Font**: Inter (Google Fonts)
- **Primary color**: Orange (`#FF6B35` / `orange-500`)
- **Light mode**: White background, slate text
- **Dark mode**: `#0f172a` background, slate-200 text
- **Theme toggle**: DaisyUI `data-theme` attribute
- **Animations**: Motion (fade-in on scroll, hero text)
- **Toast**: react-hot-toast for all auth feedback

---

## Verification Plan

### Automated Tests
- `npm run build` – ensure no TypeScript/build errors
- Test all routes in browser (dev server)

### Manual Verification
- [ ] Home page renders hero slider + all sections
- [ ] Course cards navigate to details
- [ ] Unauthenticated detail access → redirect to login
- [ ] Login with email/password works
- [ ] Google OAuth login works (requires valid credentials)
- [ ] Register creates new user
- [ ] My Profile shows user data
- [ ] Update profile form updates name/avatar
- [ ] Search on /courses filters by title
- [ ] Dark/light mode toggle persists
- [ ] 404 page shows for invalid routes
- [ ] Mobile/tablet responsive (all pages)
- [ ] No crash on page reload (any route)
