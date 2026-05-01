"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useTheme } from "@/components/Providers";
import { useState } from "react";
import {
  HiOutlineAcademicCap,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineChevronDown,
} from "react-icons/hi";
import toast from "react-hot-toast";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/my-profile", label: "My Profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
    router.push("/");
    setDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-base-100/90 backdrop-blur-md border-b border-base-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md group-hover:shadow-green-200 transition-shadow">
              <HiOutlineAcademicCap className="text-white text-xl" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-green-500">Skill</span>
              <span className="text-base-content">Sphere</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400"
                    : "text-base-content/70 hover:text-base-content hover:bg-base-200"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-base-200 transition-colors text-base-content/70 hover:text-base-content"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <HiOutlineMoon className="text-lg" />
              ) : (
                <HiOutlineSun className="text-lg" />
              )}
            </button>

            {/* Auth Area */}
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-base-200 animate-pulse" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-base-200 transition-colors"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-green-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-bold">
                      {session.user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-medium text-base-content max-w-[120px] truncate">
                    {session.user.name}
                  </span>
                  <HiOutlineChevronDown
                    className={`text-base-content/50 text-sm transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-base-200">
                      <p className="text-xs text-base-content/50">Signed in as</p>
                      <p className="text-sm font-semibold text-base-content truncate">
                        {session.user.email}
                      </p>
                    </div>
                    <Link
                      href="/my-profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-base-content hover:bg-base-200 transition-colors"
                    >
                      <HiOutlineUser className="text-base" />
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      <HiOutlineLogout className="text-base" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-base-content/70 hover:text-base-content transition-colors rounded-lg hover:bg-base-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-green-200 dark:hover:shadow-green-900"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-base-200 transition-colors"
            >
              {mobileOpen ? (
                <HiOutlineX className="text-xl" />
              ) : (
                <HiOutlineMenu className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-base-200 bg-base-100 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400"
                  : "text-base-content/70 hover:bg-base-200"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!session && (
            <div className="pt-2 flex flex-col gap-2 border-t border-base-200">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-4 py-2.5 text-sm font-medium border border-base-300 rounded-xl hover:bg-base-200 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-xl"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
