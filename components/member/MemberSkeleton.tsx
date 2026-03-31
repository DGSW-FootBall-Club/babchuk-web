import { Shimmer } from '@/components/Shimmer'

export function MemberSkeleton() {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[1fr_60px_44px_44px] md:grid-cols-[1fr_80px_60px_60px] px-4 py-3 border-b border-[#F2F4F6] items-center"
        >
          <div className="flex items-center gap-3">
            <Shimmer className="w-10 h-10 rounded-full shrink-0" />
            <Shimmer className="w-20 h-3.5" />
          </div>
          <Shimmer className="w-10 h-3.5 mx-auto" />
          <Shimmer className="w-7 h-3.5 mx-auto" />
          <Shimmer className="w-7 h-3.5 mx-auto" />
        </div>
      ))}
    </div>
  )
}