"use client";

import { useState, useEffect } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiOutlineArrowLeft, HiOutlinePhotograph, HiOutlineUser, HiOutlineSave } from "react-icons/hi";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?redirect=/my-profile/update");
    }
    if (session) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
      setPreview(session.user.image || null);
    }
  }, [session, isPending, router]);

  const handleImageChange = (url: string) => {
    setImage(url);
    setPreview(url || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setLoading(true);
    const { error } = await updateUser({ name: name.trim(), image: image || undefined });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Failed to update profile");
    } else {
      toast.success("Profile updated successfully! ");
      router.push("/my-profile");
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-green-500" />
      </div>
    );
  }

  if (!session) return null;

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg">
        {/* Back */}
        <Link
          href="/my-profile"
          className="inline-flex items-center gap-1.5 text-sm text-base-content/50 hover:text-green-500 transition-colors mb-6"
        >
          <HiOutlineArrowLeft />
          Back to Profile
        </Link>

        <div className="bg-base-100 rounded-3xl border border-base-200 shadow-2xl shadow-base-300/50 p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-base-content">Update Profile</h1>
            <p className="text-sm text-base-content/50 mt-1">Change your name and profile picture</p>
          </div>

          {/* Avatar Preview */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {preview ? (
                <img
                  src={preview}
                  alt="Avatar preview"
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-green-100 shadow-lg"
                  onError={() => setPreview(null)}
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg">
                  {initials}
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-green-500 flex items-center justify-center shadow-md">
                <HiOutlinePhotograph className="text-white text-sm" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="update-name" className="block text-xs font-semibold text-base-content/60 mb-1.5 uppercase tracking-wide">
                <span className="flex items-center gap-1.5">
                  <HiOutlineUser />
                  Full Name <span className="text-red-400">*</span>
                </span>
              </label>
              <input
                id="update-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder-base-content/30 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="update-image" className="block text-xs font-semibold text-base-content/60 mb-1.5 uppercase tracking-wide">
                <span className="flex items-center gap-1.5">
                  <HiOutlinePhotograph />
                  Profile Image URL <span className="text-base-content/30">(optional)</span>
                </span>
              </label>
              <input
                id="update-image"
                type="url"
                value={image}
                onChange={(e) => handleImageChange(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder-base-content/30 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm transition-all"
              />
              {image && (
                <p className="text-xs text-base-content/40 mt-1">Preview updates automatically above</p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                href="/my-profile"
                className="flex-1 py-3 text-sm font-semibold text-center rounded-2xl bg-base-200 hover:bg-base-300 text-base-content transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                id="update-submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-2xl shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900 transition-all duration-200 disabled:opacity-70"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <HiOutlineSave />
                )}
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
