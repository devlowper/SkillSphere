<div align="center">

<img src="https://skillsphere-pi.vercel.app/favicon.ico" width="60" alt="SkillSphere Logo" />

# SkillSphere

### Online Skill-Based Learning Platform

A modern, full-stack e-learning platform where learners can explore, enroll in, and master skill-based courses — from Web Development to AI, Design, Marketing, and beyond.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-skillsphere--pi.vercel.app-2563EB?style=for-the-badge&logo=vercel&logoColor=white)](https://skill-sphere-ktqm.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-devlowper%2FSkillSphere-181717?style=for-the-badge&logo=github)](https://github.com/devlowper/SkillSphere)
[![TypeScript](https://img.shields.io/badge/TypeScript-99%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)

</div>

---

## 📖 About

**SkillSphere** is a fully responsive, production-ready online learning platform built with Next.js 15 App Router and TypeScript. Users can browse an extensive catalog of expert-led courses, filter by category or level, and enroll after authentication. The platform supports both email/password and Google OAuth login, persistent dark/light mode, and smooth page animations.

---

## ✨ Features

### 🎓 Learning Experience
- **8+ Expert Courses** across Web Development, UI/UX Design, Digital Marketing, AI & Machine Learning, Cloud Computing, Cybersecurity, and more
- **Smart Filtering** — search by title, filter by category and level, sort by rating or price
- **Course Detail Pages** — full course overview, curriculum, instructor info, and enrollment
- **Trending Courses Section** — dynamically highlighted popular courses
- **Top Instructors Showcase** — browse courses by featured instructors

### 🔐 Authentication
- Email & password registration and login via **BetterAuth**
- **Google OAuth** sign-in with one click
- Protected routes — course details and profile require authentication
- Session persistence across page reloads

### 🎨 UI / UX
- **Dark / Light Mode** — persistent theme toggle stored in preferences
- **Hero Carousel** — animated Swiper.js slider with Motion transitions
- **Fully Responsive** — optimised layouts for mobile, tablet, and desktop
- **Toast Notifications** — real-time feedback on all user actions
- **Custom 404 Page** — branded not-found experience

### 👤 User Profile
- View and update display name and avatar
- Access enrolled course history
- Manage account settings

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | ^15.3.1 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 |
| UI Components | DaisyUI | ^5.0.35 |
| Authentication | BetterAuth | ^1.2.7 |
| Database | MongoDB | ^6.21.0 |
| Animations | Motion | ^12.7.4 |
| Carousel | Swiper.js | ^12.1.4 |
| Notifications | React Hot Toast | ^2.5.2 |
| Icons | React Icons | ^5.5.0 |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)
- A [Google Cloud Console](https://console.cloud.google.com) project with OAuth 2.0 credentials

### 1. Clone the repository

```bash
git clone https://github.com/devlowper/SkillSphere.git
cd SkillSphere
```

### 2. Install dependencies

```bash
npm install
```

> If you encounter peer dependency conflicts, use `npm install --legacy-peer-deps`

### 3. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

```env
# BetterAuth
BETTER_AUTH_SECRET=your_random_secret_string
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# MongoDB
MONGODB_URI=your_mongodb_connection_string
```

> **Google OAuth setup:** In Google Cloud Console, add `http://localhost:3000` to authorized origins and `http://localhost:3000/api/auth/callback/google` to redirect URIs.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
SkillSphere/
├── public/                     # Static assets (images, icons)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout — Navbar + Footer
│   │   ├── page.tsx            # Home page
│   │   ├── courses/            # Course listing & detail pages
│   │   │   └── [id]/           # Dynamic course detail route
│   │   ├── login/              # Login page
│   │   ├── register/           # Registration page
│   │   ├── my-profile/         # User profile & settings
│   │   ├── not-found.tsx       # Custom 404 page
│   │   └── api/
│   │       └── auth/           # BetterAuth API handler
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── CourseCard.tsx
│   │   ├── HeroSlider.tsx
│   │   └── ...
│   ├── lib/                    # Auth config, DB connection, utilities
│   └── data/
│       └── courses.json        # Static course data
├── .env.example                # Environment variable template
├── next.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🔒 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `BETTER_AUTH_SECRET` | ✅ | Random secret for session signing (min. 32 chars) |
| `BETTER_AUTH_URL` | ✅ | Server-side base URL of your app |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | ✅ | Client-side base URL of your app |
| `GOOGLE_CLIENT_ID` | ✅ | Google OAuth 2.0 Client ID |
| `GOOGLE_CLIENT_SECRET` | ✅ | Google OAuth 2.0 Client Secret |
| `MONGODB_URI` | ✅ | MongoDB Atlas connection string |

---

## 🌐 Deployment on Vercel

1. Push your repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables in the Vercel dashboard
4. Deploy — Vercel auto-detects Next.js and configures the build

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m 'Add: your feature description'`
4. Push to the branch — `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Md. Rakib Hossen**

- GitHub: [@devlowper](https://github.com/devlowper)
- LinkedIn:https://www.linkedin.com/in/vectorpointgrafix/
- Email: vectorpointit@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/devlowper">Md. Rakib Hossen</a>
</div>
