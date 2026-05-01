"use client";

export default function CourseImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src = `https://placehold.co/800x400/16a34a/ffffff?text=${encodeURIComponent(alt)}`;
      }}
    />
  );
}

export function InstructorAvatar({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=16a34a&color=fff&size=64`;
      }}
    />
  );
}
