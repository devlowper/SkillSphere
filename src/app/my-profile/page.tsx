"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhotograph,
  HiOutlinePencil,
  HiOutlineLogout,
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineClock,
} from "react-icons/hi";
import { getAllCourses } from "@/lib/courses";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const allCourses = getAllCourses();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?redirect=/my-profile");
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-green-500" />
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;
  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header Banner */}
      <div className="h-40 bg-gradient-to-r from-green-500 via-green-600 to-emerald-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-10 w-32 h-32 rounded-full bg-white blur-2xl" />
          <div className="absolute bottom-4 right-20 w-48 h-48 rounded-full bg-white blur-3xl" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Profile Card */}
        <div className="relative -mt-16 mb-8">
          <div className="bg-base-100 rounded-3xl border border-base-200 shadow-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
              {/* Avatar */}
              <div className="relative shrink-0">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-base-100 shadow-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg">
                    {initials}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-base-100" />
              </div>

              {/* Name & Email */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-extrabold text-base-content">{user.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <HiOutlineMail className="text-green-400 text-sm shrink-0" />
                  <span className="text-sm text-base-content/60 truncate">{user.email}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-200 dark:bg-green-950/30 dark:border-green-800 dark:text-green-400">
                    <HiOutlineAcademicCap />
                    SkillSphere Learner
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                <Link
                  href="/my-profile/update"
                  id="update-profile-btn"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors shadow-md"
                >
                  <HiOutlinePencil />
                  Update Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl text-red-500 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 border border-red-200 dark:border-red-900 transition-colors"
                >
                  <HiOutlineLogout />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-base-100 rounded-2xl border border-base-200 p-6">
              <h2 className="font-bold text-base-content mb-4 flex items-center gap-2">
                <HiOutlineUser className="text-green-500" />
                Account Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-base-content/40 uppercase tracking-wide">Full Name</label>
                  <p className="text-sm text-base-content mt-0.5 font-medium">{user.name || "—"}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-base-content/40 uppercase tracking-wide">Email</label>
                  <p className="text-sm text-base-content mt-0.5 font-medium break-all">{user.email}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-base-content/40 uppercase tracking-wide">Photo URL</label>
                  <p className="text-sm text-base-content/60 mt-0.5 break-all">
                    {user.image ? (
                      <a href={user.image} target="_blank" rel="noreferrer" className="text-green-500 hover:underline truncate block">
                        {user.image.length > 40 ? user.image.slice(0, 40) + "..." : user.image}
                      </a>
                    ) : (
                      <span className="text-base-content/30 italic">No photo set</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-base-100 rounded-2xl border border-base-200 p-6">
              <h2 className="font-bold text-base-content mb-4">Learning Stats</h2>
              <div className="space-y-3">
                {[
                  { icon: <HiOutlineBookOpen className="text-green-400" />, label: "Courses Available", value: allCourses.length },
                  { icon: <HiOutlineClock className="text-green-400" />, label: "Total Hours", value: "100+" },
                  { icon: <HiOutlineAcademicCap className="text-green-400" />, label: "Certificates", value: 0 },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-base-200 last:border-0">
                    <div className="flex items-center gap-2 text-sm text-base-content/60">
                      {stat.icon}
                      {stat.label}
                    </div>
                    <span className="font-bold text-base-content">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Courses */}
          <div className="lg:col-span-2">
            <div className="bg-base-100 rounded-2xl border border-base-200 p-6">
              <h2 className="font-bold text-base-content mb-4 flex items-center gap-2">
                <HiOutlineAcademicCap className="text-green-500" />
                Recommended For You
              </h2>
              <div className="space-y-3">
                {allCourses.slice(0, 5).map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-base-200 transition-colors group"
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-14 h-14 rounded-xl object-cover border border-base-200 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/56x56/16a34a/ffffff?text=${course.category[0]}`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-base-content group-hover:text-green-500 transition-colors truncate">
                        {course.title}
                      </p>
                      <p className="text-xs text-base-content/50">{course.instructor} · {course.duration}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-green-500">${course.price}</span>
                      <p className="text-xs text-emerald-500">★ {course.rating}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/courses"
                className="mt-4 block text-center text-sm font-semibold text-green-500 hover:text-green-600 transition-colors"
              >
                Browse all courses →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
