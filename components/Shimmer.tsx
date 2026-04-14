export function Shimmer({ className }: { className: string }) {
  return <div className={`rounded-xl bg-line animate-pulse ${className}`} />;
}
