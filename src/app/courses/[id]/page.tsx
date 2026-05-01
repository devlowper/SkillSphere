import { getCourseById, getAllCourses } from "@/lib/courses";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  HiOutlineStar,
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineAcademicCap,
  HiOutlineCheckCircle,
  HiOutlineArrowLeft,
  HiOutlineBookOpen,
  HiOutlineTag,
} from "react-icons/hi";

import CourseImage, { InstructorAvatar } from "@/components/CourseImage";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const courses = getAllCourses();
  return courses.map((c) => ({ id: String(c.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const course = getCourseById(Number(id));
  if (!course) return { title: "Course Not Found" };
  return {
    title: course.title,
    description: course.description,
  };
}

const levelColors: Record<string, string> = {
  Beginner: "badge-success",
  Intermediate: "badge-warning",
  Advanced: "badge-error",
};

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;
  const course = getCourseById(Number(id));
  if (!course) notFound();

  return (
    <div className="min-h-screen bg-base-100">
      {/* Breadcrumb */}
      <div className="bg-base-200 border-b border-base-300 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-base-content/50">
            <Link href="/" className="hover:text-green-500 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-green-500 transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-base-content font-medium truncate">{course.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-200 dark:bg-green-950/30 dark:border-green-800 dark:text-green-400">
                  {course.category}
                </span>
                <span className={`badge badge-sm ${levelColors[course.level]}`}>{course.level}</span>
                {course.isNew && <span className="badge badge-sm badge-primary">New</span>}
                {course.isTrending && <span className="badge badge-sm bg-green-500 text-white border-none"> Trending</span>}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-base-content leading-tight mb-4">
                {course.title}
              </h1>
              <p className="text-base-content/70 text-base sm:text-lg leading-relaxed mb-6">
                {course.description}
              </p>

              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/60">
                <div className="flex items-center gap-1.5">
                  <HiOutlineStar className="text-emerald-400 text-base" />
                  <span className="font-bold text-base-content">{course.rating}</span>
                  <span>rating</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HiOutlineUsers className="text-green-400 text-base" />
                  <span className="font-semibold text-base-content">{course.enrolled.toLocaleString()}</span>
                  <span>students</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HiOutlineClock className="text-green-400 text-base" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HiOutlineBookOpen className="text-green-400 text-base" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-base-200 rounded-2xl p-5 flex items-center gap-4 border border-base-300">
              <InstructorAvatar
                src={course.instructorAvatar}
                alt={course.instructor}
                className="w-16 h-16 rounded-full border-2 border-green-200 object-cover"
              />
              <div>
                <p className="text-xs text-base-content/50 mb-0.5">Your Instructor</p>
                <h3 className="font-bold text-base-content text-base">{course.instructor}</h3>
                <p className="text-sm text-base-content/60">{course.category} Expert</p>
              </div>
            </div>

            {/* Course Image */}
            <div className="rounded-2xl overflow-hidden border border-base-200">
              <CourseImage
                src={`/${course.title.replace(/\//g, "")}.jpg`}
                alt={course.title}
                className="w-full h-56 sm:h-72 object-cover"
              />
            </div>

            {/* Curriculum */}
            <div>
              <h2 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                <HiOutlineAcademicCap className="text-green-500" />
                Course Curriculum
              </h2>
              <div className="space-y-2">
                {course.curriculum.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3.5 bg-base-200 rounded-xl border border-base-300 hover:border-green-300 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-xs font-bold text-green-500 shrink-0 border border-green-200 dark:border-green-800 group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500 transition-all">
                      {i + 1}
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <HiOutlineCheckCircle className="text-green-500 shrink-0" />
                      <span className="text-sm text-base-content">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-semibold text-base-content/50 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <HiOutlineTag /> Topics Covered
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-base-200 text-base-content/60 border border-base-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-medium text-base-content/50 hover:text-green-500 transition-colors"
            >
              <HiOutlineArrowLeft /> Back to all courses
            </Link>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-base-100 rounded-3xl border border-base-200 shadow-xl p-6 space-y-5">
              <div className="text-center">
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                  ${course.price}
                </div>
                <div className="text-xs text-base-content/40 mt-1">One-time purchase · Lifetime access</div>
              </div>

              <button className="w-full py-3.5 text-base font-bold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-2xl shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900 transition-all duration-200">
                Enroll Now 
              </button>
              <button className="w-full py-3 text-sm font-semibold text-base-content bg-base-200 hover:bg-base-300 rounded-2xl transition-colors border border-base-300">
                Add to Wishlist 
              </button>

              <div className="pt-4 border-t border-base-200 space-y-3">
                <p className="text-sm font-semibold text-base-content mb-3">This course includes:</p>
                {[
                  { icon: <HiOutlineClock className="text-green-400" />, text: `${course.duration} on-demand video` },
                  { icon: <HiOutlineBookOpen className="text-green-400" />, text: `${course.lessons} lessons` },
                  { icon: <HiOutlineCheckCircle className="text-green-400" />, text: "Full lifetime access" },
                  { icon: <HiOutlineAcademicCap className="text-green-400" />, text: "Certificate of completion" },
                  { icon: <HiOutlineUsers className="text-green-400" />, text: "Community support" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-base-content/70">
                    {item.icon}
                    {item.text}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-base-200 text-center">
                <p className="text-xs text-base-content/40">
                  30-Day Money-Back Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
