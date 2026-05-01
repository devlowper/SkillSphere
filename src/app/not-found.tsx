import Link from "next/link";
import type { Metadata } from "next";
import { HiOutlineAcademicCap, HiOutlineArrowLeft } from "react-icons/hi";

export const metadata: Metadata = {
  title: "404 – Page Not Found | SkillSphere",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-200 dark:shadow-green-900">
        <HiOutlineAcademicCap className="text-white text-4xl" />
      </div>
      <div className="text-8xl font-black text-green-500 mb-2">404</div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content mb-3">
        Oops! Page Not Found
      </h1>
      <p className="text-base-content/60 max-w-md mb-8 text-sm sm:text-base">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Don&apos;t worry — there&apos;s plenty more to learn on SkillSphere.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-2xl shadow-lg transition-all"
        >
          <HiOutlineArrowLeft />
          Go to Home
        </Link>
        <Link
          href="/courses"
          className="px-6 py-3 text-sm font-semibold text-base-content bg-base-200 hover:bg-base-300 rounded-2xl border border-base-300 transition-colors"
        >
          Browse Courses
        </Link>
      </div>
    </div>
  );
}
