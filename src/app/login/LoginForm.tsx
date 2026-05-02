"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiOutlineAcademicCap, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Invalid email or password");
    } else {
      toast.success("Welcome back! ");
      router.push(redirect);
      router.refresh();
    }
  };

  const googleEnabled = Boolean(process.env.NEXT_PUBLIC_GOOGLE_ENABLED);

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn.social({
      provider: "google",
      callbackURL: redirect,
    });
    setGoogleLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-base-100 rounded-3xl border border-base-200 shadow-2xl shadow-base-300/50 p-8 sm:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200 dark:shadow-green-900">
              <HiOutlineAcademicCap className="text-white text-3xl" />
            </div>
            <h1 className="text-2xl font-extrabold text-base-content">Welcome Back!</h1>
            <p className="text-sm text-base-content/50 mt-1">Sign in to continue learning</p>
          </div>

          {/* Google Login — only shown when real OAuth credentials are configured */}
          {googleEnabled && (
            <>
              <button
                onClick={handleGoogle}
                disabled={googleLoading}
                id="google-login-btn"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-base-300 bg-base-100 hover:bg-base-200 transition-colors text-sm font-semibold text-base-content mb-6 disabled:opacity-50"
              >
                {googleLoading ? (
                  <span className="loading loading-spinner loading-xs text-green-500" />
                ) : (
                  <FcGoogle className="text-xl" />
                )}
                Continue with Google
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-base-200" />
                <span className="text-xs text-base-content/40 font-medium">or continue with email</span>
                <div className="flex-1 h-px bg-base-200" />
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-base-content/60 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder-base-content/30 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-xs font-semibold text-base-content/60 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder-base-content/30 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="login-submit"
              disabled={loading}
              className="w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-2xl shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900 transition-all duration-200 disabled:opacity-70 mt-2 flex items-center justify-center gap-2"
            >
              {loading && <span className="loading loading-spinner loading-xs" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/50 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-green-500 font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
