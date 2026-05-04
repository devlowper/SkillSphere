#  SkillSphere – Online Learning Platform

A modern, full-stack online learning platform where users can explore courses, watch lessons, and enroll in skill-based programs like Web Development, Design, Marketing, Data Science, and more.

🌐 **Live URL**: [https://skillsphere-pi.vercel.app](https://skillsphere-pi.vercel.app) *(update after deployment)*

---

## ✨ Key Features

- 🔐 **Authentication** – Email/password & Google OAuth via BetterAuth
-  **8+ Expert Courses** – Web Dev, UI/UX, Marketing, AI, Cloud, Security, and more
-  **Smart Search** – Filter courses by title, category, level, and sort by rating/price
- 🌙 **Dark / Light Mode** – Persistent theme toggle
- 📱 **Fully Responsive** – Mobile, tablet, and desktop layouts
- 🎠 **Hero Slider** – Swiper.js carousel with Motion animations
- 🔒 **Protected Routes** – Course details & profile require authentication
- 👤 **My Profile** – View and update name & avatar
-  **Top Instructors** – Instructor showcase section
-  **Trending Courses** – Dynamic trending section with green gradient design
- 🔔 **Toast Notifications** – Real-time feedback on all actions
- 🚫 **404 Page** – Custom not-found page

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** (App Router) | Framework |
| **TypeScript** | Type Safety |
| **Tailwind CSS v4** | Styling |
| **DaisyUI v5** | UI Components |
| **BetterAuth** | Authentication |
| **better-sqlite3** | Database (SQLite) |
| **Swiper.js** | Hero carousel |
| **Motion** | Animations |
| **react-hot-toast** | Notifications |
| **react-icons** | Icon library |

---

## 📦 npm Packages Used

```json
{
  "better-auth": "^1.2.7",
  "better-sqlite3": "^12.0.0",
  "motion": "^12.7.4",
  "swiper": "^11.2.6",
  "react-hot-toast": "^2.5.2",
  "react-icons": "^5.5.0",
  "daisyui": "^5.0.35"
}
```

---

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/skillsphere.git
cd skillsphere
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```



> **Google OAuth Setup**: Go to [Google Cloud Console](https://console.cloud.google.com), create OAuth 2.0 credentials, and add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── page.tsx            # Home page
│   ├── courses/            # All Courses + Course Details
│   ├── login/              # Login page
│   ├── register/           # Register page
│   ├── my-profile/         # Profile + Update
│   ├── not-found.tsx       # 404 page
│   └── api/auth/           # BetterAuth API handler
├── components/             # Navbar, Footer, CourseCard, HeroSlider, etc.
├── lib/                    # Auth config, course utilities
└── data/                   # courses.json
```

---

## 🔒 Environment Variables

| Variable | Description |
|---|---|
| `BETTER_AUTH_SECRET` | Random secret for session signing |
| `BETTER_AUTH_URL` | Base URL of  (server-side) |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Base URL of (client-side) |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |

---

## 🚢 Deployment (Vercel)

1. Push your code to GitHub
2. Import the repo into [Vercel](https://vercel.com)
3. Add all environment variables in the Vercel dashboard
4. Deploy!

> **Note**: Add your production URL to Google Cloud Console's authorized origins and redirect URIs.

---

## 📝 License

MIT © 2025 SkillSphere
