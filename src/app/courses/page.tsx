"use client";

import { useState, useMemo } from "react";
import CourseCard from "@/components/CourseCard";
import { getAllCourses, searchCourses, Course } from "@/lib/courses";
import { HiOutlineSearch, HiOutlineFilter, HiOutlineX, HiOutlineMenuAlt2 } from "react-icons/hi";

const categories = ["All", "Development", "Design", "Marketing", "Data Science", "Cloud", "Security"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const allCourses = getAllCourses();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let results: Course[] = query.trim() ? searchCourses(query) : allCourses;

    if (selectedCategory !== "All") {
      results = results.filter((c) => c.category === selectedCategory);
    }
    if (selectedLevel !== "All") {
      results = results.filter((c) => c.level === selectedLevel);
    }

    return [...results].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "enrolled") return b.enrolled - a.enrolled;
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });
  }, [query, selectedCategory, selectedLevel, sortBy, allCourses]);

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("All");
    setSelectedLevel("All");
    setSortBy("rating");
  };

  const hasFilters = query || selectedCategory !== "All" || selectedLevel !== "All" || sortBy !== "rating";

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <h3 className="text-sm font-bold text-base-content uppercase tracking-wider mb-3">Search</h3>
        <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
          <input
            type="text"
            placeholder="Search courses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder-base-content/40 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
            >
              <HiOutlineX />
            </button>
          )}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-sm font-bold text-base-content uppercase tracking-wider mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full py-2.5 px-3 rounded-xl border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-green-500 text-sm appearance-none"
        >
          <option value="rating">Top Rated</option>
          <option value="enrolled">Most Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <h3 className="text-sm font-bold text-base-content uppercase tracking-wider mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(cat)}
                className="w-4 h-4 text-green-600 bg-base-100 border-base-300 focus:ring-green-500 focus:ring-2 cursor-pointer accent-green-600"
              />
              <span className={`text-sm transition-colors ${selectedCategory === cat ? 'font-semibold text-base-content' : 'text-base-content/70 group-hover:text-base-content'}`}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Level */}
      <div>
        <h3 className="text-sm font-bold text-base-content uppercase tracking-wider mb-3">Level</h3>
        <div className="space-y-2">
          {levels.map((l) => (
            <label key={l} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="level"
                value={l}
                checked={selectedLevel === l}
                onChange={() => setSelectedLevel(l)}
                className="w-4 h-4 text-green-600 bg-base-100 border-base-300 focus:ring-green-500 focus:ring-2 cursor-pointer accent-green-600"
              />
              <span className={`text-sm transition-colors ${selectedLevel === l ? 'font-semibold text-base-content' : 'text-base-content/70 group-hover:text-base-content'}`}>
                {l === "All" ? "All Levels" : l}
              </span>
            </label>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2.5 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/50 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <HiOutlineX /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200/50">
      {/* Page Header */}
      <div className="bg-base-100 border-b border-base-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-base-content mb-2">
            Explore Courses
          </h1>
          <p className="text-base-content/60 text-sm">
            Learn from industry experts and master new skills.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-base-content/70">
              Showing {filtered.length} courses
            </span>
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-base-100 border border-base-300 rounded-xl text-sm font-semibold hover:bg-base-200 transition-colors"
            >
              <HiOutlineFilter /> Filters
            </button>
          </div>

          {/* Desktop Sidebar Filter */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-base-100 rounded-2xl border border-base-200 p-6 shadow-sm">
              <FilterSidebar />
            </div>
          </div>

          {/* Course Grid Area */}
          <div className="flex-1">
            <div className="hidden lg:flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-base-content">
                {filtered.length} course{filtered.length !== 1 ? "s" : ""} available
              </h2>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-base-100 rounded-3xl border border-base-200">
                <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mx-auto mb-4">
                  <HiOutlineSearch className="text-2xl text-base-content/40" />
                </div>
                <h3 className="text-lg font-bold text-base-content mb-2">No courses found</h3>
                <p className="text-base-content/50 mb-6 text-sm">Try adjusting your search or filters to find what you're looking for.</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors shadow-md"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-80 bg-base-100 p-6 overflow-y-auto border-l border-base-200 shadow-2xl flex flex-col transform transition-transform">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-base-content flex items-center gap-2">
                <HiOutlineMenuAlt2 /> Filters
              </h2>
              <button onClick={() => setMobileFilterOpen(false)} className="p-2 hover:bg-base-200 rounded-lg transition-colors">
                <HiOutlineX className="text-lg" />
              </button>
            </div>
            <div className="flex-1">
              <FilterSidebar />
            </div>
            <div className="pt-6 mt-6 border-t border-base-200">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors shadow-md"
              >
                Show {filtered.length} Courses
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
