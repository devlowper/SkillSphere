import type { Metadata } from "next";
import HeroSlider from "@/components/HeroSlider";
import CourseCard from "@/components/CourseCard";
import { getPopularCourses, getTrendingCourses } from "@/lib/courses";
import Link from "next/link";
import {
  HiOutlineLightBulb,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiOutlineChartBar,
  HiOutlineStar,
  HiOutlineAcademicCap,
  HiOutlineArrowRight,
} from "react-icons/hi";
import { InstructorAvatar } from "@/components/CourseImage";

export const metadata: Metadata = {
  title: "SkillSphere – Online Learning Platform",
  description: "Upgrade your skills with 500+ expert-led courses in web development, design, marketing, and more.",
};

const instructors = [
  {
    name: "John Doe",
    specialty: "Full-Stack Development",
    courses: 12,
    students: 15200,
    rating: 4.9,
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=JohnDoe",
    badge: "Top Instructor",
  },
  {
    name: "Sarah Chen",
    specialty: "UI/UX Design",
    courses: 8,
    students: 9870,
    rating: 4.9,
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=SarahChen",
    badge: "Design Expert",
  },
  {
    name: "Emily Rodriguez",
    specialty: "Data Science & AI",
    courses: 10,
    students: 18300,
    rating: 4.8,
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=EmilyRodriguez",
    badge: "AI Specialist",
  },
  {
    name: "David Park",
    specialty: "Cloud & DevOps",
    courses: 6,
    students: 8120,
    rating: 4.8,
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=DavidPark",
    badge: "AWS Certified",
  },
];

const tips = [
  {
    icon: <HiOutlineLightBulb className="text-2xl text-green-500" />,
    title: "Active Recall",
    description: "Test yourself regularly instead of re-reading. Retrieval practice strengthens long-term memory significantly.",
  },
  {
    icon: <HiOutlineClock className="text-2xl text-green-500" />,
    title: "Pomodoro Technique",
    description: "Study in focused 25-minute blocks with 5-minute breaks. This maintains concentration and prevents burnout.",
  },
  {
    icon: <HiOutlineBookOpen className="text-2xl text-green-500" />,
    title: "Spaced Repetition",
    description: "Review material at increasing intervals. Space out your practice sessions for optimal long-term retention.",
  },
  {
    icon: <HiOutlineChartBar className="text-2xl text-green-500" />,
    title: "Track Your Progress",
    description: "Set weekly goals and monitor your learning streaks. Visibility into progress boosts motivation and accountability.",
  },
];

export default function HomePage() {
  const popularCourses = getPopularCourses(3);
  const trendingCourses = getTrendingCourses().slice(0, 4);

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Popular Courses */}
      <section className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm font-semibold text-green-500 uppercase tracking-widest">Top Rated</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content mt-1">
                 Popular Courses
              </h2>
              <p className="text-base-content/60 mt-2 max-w-xl">
                Handpicked by our team — the most loved and highest-rated courses on the platform.
              </p>
            </div>
            <Link
              href="/courses"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-green-500 hover:text-green-600 transition-colors"
            >
              View All <HiOutlineArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/courses" className="btn btn-outline btn-sm border-green-400 text-green-500 hover:bg-green-500 hover:border-green-500 rounded-xl">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Tips */}
      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-green-500 uppercase tracking-widest">Study Smarter</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content mt-1">
               Learning Tips & Techniques
            </h2>
            <p className="text-base-content/60 mt-2 max-w-xl mx-auto">
              Proven strategies from educational researchers to help you learn faster and retain more.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, i) => (
              <div
                key={i}
                className="bg-base-100 rounded-2xl p-6 border border-base-200 hover:shadow-lg hover:shadow-green-100/50 dark:hover:shadow-green-950/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center mb-4">
                  {tip.icon}
                </div>
                <h3 className="font-bold text-base-content text-base mb-2">{tip.title}</h3>
                <p className="text-sm text-base-content/60 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Instructors */}
      <section className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-green-500 uppercase tracking-widest">Our Experts</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content mt-1">
               Top Instructors
            </h2>
            <p className="text-base-content/60 mt-2 max-w-xl mx-auto">
              Learn from the best in the industry — experienced professionals who are passionate about teaching.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructors.map((inst, i) => (
              <div
                key={i}
                className="bg-base-100 rounded-2xl border border-base-200 p-6 text-center hover:shadow-xl hover:shadow-green-100/50 dark:hover:shadow-green-950/20 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex justify-center mb-4">
                  <div className="relative inline-block">
                    <InstructorAvatar
                      src={inst.avatar}
                      alt={inst.name}
                      className="w-20 h-20 rounded-full border-4 border-green-100 dark:border-green-900 group-hover:border-green-300 transition-colors object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-base-100" title="Online" />
                  </div>
                </div>
                <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400 mb-2 border border-green-100 dark:border-green-800">
                  {inst.badge}
                </span>
                <h3 className="font-bold text-base-content text-base">{inst.name}</h3>
                <p className="text-xs text-base-content/50 mt-0.5 mb-4">{inst.specialty}</p>
                <div className="flex items-center justify-center gap-4 text-xs text-base-content/60">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-base-content">{inst.courses}</span>
                    <span>Courses</span>
                  </div>
                  <div className="w-px h-8 bg-base-200" />
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-base-content">{(inst.students / 1000).toFixed(1)}K</span>
                    <span>Students</span>
                  </div>
                  <div className="w-px h-8 bg-base-200" />
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-emerald-500 flex items-center gap-0.5">
                      <HiOutlineStar className="text-emerald-400" />
                      {inst.rating}
                    </span>
                    <span>Rating</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Courses – Extra Section */}
      <section className="py-20 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm font-semibold text-green-100 uppercase tracking-widest">Hot Right Now</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                 Trending Courses
              </h2>
              <p className="text-green-100 mt-2 max-w-xl">
                The most popular courses students are enrolling in this month.
              </p>
            </div>
            <Link
              href="/courses"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors border border-white/30"
            >
              View All <HiOutlineArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trendingCourses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-200 hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2 py-0.5 bg-white/20 text-white rounded-full border border-white/30">
                    {course.category}
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm leading-snug mb-2 group-hover:underline line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-green-100 text-xs mb-3">{course.instructor}</p>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="flex items-center gap-1 text-xs text-green-100">
                    <HiOutlineStar className="text-emerald-300" />
                    <span className="font-semibold text-white">{course.rating}</span>
                  </span>
                  <span className="text-sm font-bold text-white bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/30 shadow-sm">
                    ${course.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-base-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-base-200 rounded-3xl p-10 sm:p-16 relative overflow-hidden border border-base-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
            <HiOutlineAcademicCap className="text-5xl text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-base-content/60 mb-8 max-w-xl mx-auto text-lg">
              Join over 50,000 learners already on SkillSphere. Create a free account and get instant access to hundreds of courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/register"
                className="px-8 py-3.5 text-base font-bold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-2xl shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900 transition-all duration-200"
              >
                Get Started for Free 
              </Link>
              <Link
                href="/courses"
                className="px-8 py-3.5 text-base font-semibold text-base-content bg-base-100 hover:bg-base-200 rounded-2xl border border-base-300 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
