"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiOutlineAcademicCap, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const defaultAvatars = [
    "https://api.dicebear.com/9.x/notionists/svg?seed=Felix",
    "https://api.dicebear.com/9.x/notionists/svg?seed=Aneka",
    "https://api.dicebear.com/9.x/notionists/svg?seed=Oliver",
    "https://api.dicebear.com/9.x/notionists/svg?seed=Jack",
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const { error } = await signUp.email({
      name,
      email,
      password,
      image: photoURL || undefined,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    } else {
      toast.success("Account created! Please sign in ");
      router.push("/login");
    }
  };

  const googleEnabled = Boolean(process.env.NEXT_PUBLIC_GOOGLE_ENABLED);

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn.social({ provider: "google", callbackURL: "/" });
    setGoogleLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-base-100 rounded-3xl border border-base-200 shadow-2xl shadow-base-300/50 p-8 sm:p-10 mt-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200 dark:shadow-green-900">
              <HiOutlineAcademicCap className="text-white text-3xl" />
            </div>
            <h1 className="text-2xl font-extrabold text-base-content">Create Your Account</h1>
            <p className="text-sm text-base-content/50 mt-1">Join 50,000+ learners on SkillSphere</p>
          </div>

          {/* Google — only shown when real OAuth credentials are configured */}
          {googleEnabled && (
            <>
              <button
                onClick={handleGoogle}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-base-300 bg-base-100 hover:bg-base-200 transition-colors text-sm font-semibold text-base-content mb-6 disabled:opacity-50"
              >
                {googleLoading ? (
                  <span className="loading loading-spinner loading-xs text-green-500" />
                ) : (
                  <FcGoogle className="text-xl" />
                )}
                Sign up with Google
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-base-200" />
                <span className="text-xs text-base-content/40 font-medium">or create with email</span>
                <div className="flex-1 h-px bg-base-200" />
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="reg-name" className="block text-xs font-semibold text-base-content/60 mb-1.5 uppercase tracking-wide">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                id="reg-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder-base-content/30 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-xs font-semibold text-base-content/60 mb-1.5 uppercase tracking-wide">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder-base-content/30 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-base-content/60 mb-1.5 uppercase tracking-wide">
                Profile Photo <span className="text-base-content/30">(optional)</span>
              </label>
              
              <div className="flex flex-col items-center gap-4 p-5 border border-base-300 rounded-xl bg-base-100/50">
                {/* Preview */}
                <div className="relative group w-20 h-20">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-green-500 bg-base-200 shadow-inner">
                    {photoURL ? (
                      <img src={photoURL} alt="Profile preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-base-content/20 text-3xl">
                        <HiOutlineAcademicCap />
                      </div>
                    )}
                  </div>
                  {photoURL && (
                    <button
                      type="button"
                      onClick={() => setPhotoURL("")}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="w-full space-y-4">
                  {/* Default Avatars */}
                  <div>
                    <p className="text-xs text-center text-base-content/50 mb-3">Choose an avatar</p>
                    <div className="flex justify-center gap-3">
                      {defaultAvatars.map((avatar, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setPhotoURL(avatar)}
                          className={`w-12 h-12 rounded-full border-2 transition-all ${
                            photoURL === avatar ? "border-green-500 scale-110 shadow-lg shadow-green-500/30" : "border-transparent hover:border-green-300 bg-base-200"
                          }`}
                        >
                          <img src={avatar} alt={`Avatar ${i+1}`} className="w-full h-full rounded-full" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-base-300"></div>
                    <span className="flex-shrink-0 mx-4 text-xs text-base-content/40 uppercase tracking-widest">or</span>
                    <div className="flex-grow border-t border-base-300"></div>
                  </div>

                  {/* Upload Custom */}
                  <div className="flex justify-center">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-base-100 hover:bg-base-200 text-base-content rounded-xl text-sm font-medium transition-all border border-base-300 hover:border-green-400 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Upload Photo
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="reg-password" className="block text-xs font-semibold text-base-content/60 mb-1.5 uppercase tracking-wide">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
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
              {password && password.length < 6 && (
                <p className="text-xs text-red-400 mt-1">Password must be at least 6 characters</p>
              )}
            </div>

            <button
              type="submit"
              id="register-submit"
              disabled={loading}
              className="w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-2xl shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900 transition-all duration-200 disabled:opacity-70 mt-2 flex items-center justify-center gap-2"
            >
              {loading && <span className="loading loading-spinner loading-xs" />}
              {loading ? "Creating account..." : "Create Account "}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/50 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-green-500 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
