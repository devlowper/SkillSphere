import courses from "@/data/courses.json";

export type Course = {
  id: number;
  title: string;
  instructor: string;
  instructorAvatar: string;
  duration: string;
  rating: number;
  level: string;
  description: string;
  image: string;
  category: string;
  enrolled: number;
  price: number;
  lessons: number;
  curriculum: string[];
  tags: string[];
  isNew: boolean;
  isTrending: boolean;
};

export function getAllCourses(): Course[] {
  return courses as Course[];
}

export function getCourseById(id: number): Course | undefined {
  return (courses as Course[]).find((c) => c.id === id);
}

export function getPopularCourses(limit = 3): Course[] {
  return [...(courses as Course[])]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getTrendingCourses(): Course[] {
  return (courses as Course[]).filter((c) => c.isTrending);
}

export function getNewCourses(): Course[] {
  return (courses as Course[]).filter((c) => c.isNew);
}

export function searchCourses(query: string): Course[] {
  const q = query.toLowerCase();
  return (courses as Course[]).filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q)
  );
}
