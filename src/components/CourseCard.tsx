import Link from "next/link";
import { Course } from "@/lib/courses";
import { HiOutlineStar, HiOutlineClock, HiOutlineUsers } from "react-icons/hi";
import { HiOutlineAcademicCap } from "react-icons/hi";
import CourseImage, { InstructorAvatar } from "@/components/CourseImage";

type CourseCardProps = {
  course: Course;
  showViewDetails?: boolean;
};

const levelColors: Record<string, string> = {
  Beginner: "badge-success",
  Intermediate: "badge-warning",
  Advanced: "badge-error",
};

export default function CourseCard({ course, showViewDetails = true }: CourseCardProps) {
  return (
    <div className="group bg-base-100 rounded-2xl border border-base-200 overflow-hidden hover:shadow-xl hover:shadow-green-100 dark:hover:shadow-green-950/20 transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <CourseImage
          src={`/${course.title.replace(/\//g, "")}.jpg`}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`badge badge-sm font-semibold ${levelColors[course.level] || "badge-ghost"}`}>
            {course.level}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/30 rounded-full px-3 py-1 backdrop-blur-md border border-white/20">
          <span className="text-sm font-extrabold text-white tracking-wide drop-shadow-sm">
            ${course.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 mt-2">
        <h3 className="font-bold text-base-content text-base leading-snug mb-2 line-clamp-2 group-hover:text-green-500 transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-base-content/60 line-clamp-2 mb-4 flex-1">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-4">
          <InstructorAvatar
            src={course.instructorAvatar}
            alt={course.instructor}
            className="w-6 h-6 rounded-full border border-base-200"
          />
          <span className="text-xs text-base-content/60">{course.instructor}</span>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-base-content/50 mb-4">
          <div className="flex items-center gap-1">
            <HiOutlineStar className="text-emerald-400" />
            <span className="font-semibold text-base-content">{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <HiOutlineClock className="text-green-400" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <HiOutlineUsers className="text-green-400" />
            <span>{course.enrolled.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <HiOutlineAcademicCap className="text-green-400" />
            <span>{course.lessons} lessons</span>
          </div>
        </div>

        {showViewDetails && (
          <Link
            href={`/courses/${course.id}`}
            className="w-full py-2.5 text-sm font-semibold text-center rounded-xl bg-green-50 text-green-600 border border-green-200 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-200 dark:bg-green-950/30 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-500 dark:hover:text-white"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}
