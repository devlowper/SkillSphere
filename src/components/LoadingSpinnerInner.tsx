export default function LoadingSpinnerInner({ size = "md", text = "Loading..." }: { size?: "sm" | "md" | "lg"; text?: string }) {
  const sizeMap = { sm: "loading-sm", md: "loading-md", lg: "loading-lg" };
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <span className={`loading loading-spinner text-green-500 ${sizeMap[size]}`} />
      <span className="text-sm text-base-content/50">{text}</span>
    </div>
  );
}
