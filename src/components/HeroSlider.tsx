"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "motion/react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    headline: "Upgrade Your Skills Today ",
    subheadline: "Learn from Industry Experts",
    description:
      "Access 500+ expert-led courses in development, design, marketing, and more. Start your learning journey today.",
    cta: "Explore Courses",
    ctaLink: "/courses",
    badge: " Join 50,000+ learners",
    gradient: "from-green-600/90 via-green-500/80 to-emerald-500/70",
    bgImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80",
  },
  {
    id: 2,
    headline: "Master In-Demand Tech Skills ",
    subheadline: "Web Dev · AI · Cloud · Design",
    description:
      "Future-proof your career with courses built by professionals from Google, Meta, and top startups.",
    cta: "Start Learning Free",
    ctaLink: "/register",
    badge: " New courses every week",
    gradient: "from-blue-700/90 via-indigo-600/80 to-purple-600/70",
    bgImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=80",
  },
  {
    id: 3,
    headline: "Build Real-World Projects ",
    subheadline: "Learn by Doing",
    description:
      "Every course comes with hands-on projects, certificates, and community support to accelerate your growth.",
    cta: "View Top Courses",
    ctaLink: "/courses",
    badge: " Earn certificates",
    gradient: "from-emerald-700/90 via-teal-600/80 to-cyan-600/70",
    bgImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=80",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="hero-swiper"
        style={{ height: "600px" } as React.CSSProperties}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background */}
              <img
                src={slide.bgImage}
                alt={slide.headline}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-4 border border-white/30">
                        {slide.badge}
                      </span>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3"
                    >
                      {slide.headline}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.35 }}
                      className="text-xl sm:text-2xl font-semibold text-white/80 mb-3"
                    >
                      {slide.subheadline}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.45 }}
                      className="text-white/70 text-base sm:text-lg mb-8 leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.55 }}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      <Link
                        href={slide.ctaLink}
                        className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-green-500 hover:bg-green-600 rounded-2xl shadow-lg hover:shadow-green-500/40 transition-all duration-200 hover:scale-105"
                      >
                        {slide.cta} →
                      </Link>
                      <Link
                        href="/register"
                        className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-2xl border border-white/30 transition-all duration-200"
                      >
                        Create Free Account
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Stats Bar */}
      <div className="bg-base-100 border-b border-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-base-200">
            {[
              { value: "500+", label: "Expert Courses" },
              { value: "50K+", label: "Active Learners" },
              { value: "120+", label: "Top Instructors" },
              { value: "95%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="px-6 py-5 text-center">
                <div className="text-2xl font-extrabold text-green-500">{stat.value}</div>
                <div className="text-xs text-base-content/50 mt-0.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
