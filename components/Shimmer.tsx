export function Shimmer({ className }: { className: string }) {
  return (
    <div className={`rounded-xl bg-[#E5E8EB] animate-pulse ${className}`} />
  )
}