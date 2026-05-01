import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "SkillSphere – Online Learning Platform",
    template: "%s | SkillSphere",
  },
  description:
    "Learn in-demand skills from industry experts. Explore 500+ courses in web development, design, marketing, AI, and more on SkillSphere.",
  keywords: ["online learning", "courses", "web development", "design", "AI", "SkillSphere"],
  openGraph: {
    title: "SkillSphere – Online Learning Platform",
    description: "Upgrade your skills with expert-led courses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-base-100 text-base-content min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "var(--b1)",
                color: "var(--bc)",
                border: "1px solid var(--b3)",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 500,
              },
              success: {
                iconTheme: { primary: "#16a34a", secondary: "#fff" },
              },
              error: {
                iconTheme: { primary: "#ef4444", secondary: "#fff" },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
