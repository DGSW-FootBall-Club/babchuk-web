export function MatchDetailSkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-white pb-10 animate-pulse">
      <div className="flex flex-col gap-1.5 px-5">
        <div className="h-6 w-20 bg-[#F2F4F6] rounded mt-6 mb-4" />
        <div className="w-full h-124 bg-[#F2F4F6] rounded-xl" />
      </div>

      <div className="px-5 py-5 flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-4 w-40 bg-[#F2F4F6] rounded" />
            <div className="h-5 w-14 bg-[#F2F4F6] rounded-md" />
          </div>
          <div className="h-7 w-48 bg-[#F2F4F6] rounded mb-1" />
          <div className="h-4 w-32 bg-[#F2F4F6] rounded" />
        </div>

        <div className="bg-[#F8F9FB] rounded-2xl px-4 py-4">
          <div className="h-4 w-16 bg-[#E8EAED] rounded mb-3" />
          <div className="grid grid-cols-2 gap-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#E8EAED] rounded" />
                <div className="h-4 w-16 bg-[#E8EAED] rounded" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="h-4 w-16 bg-[#F2F4F6] rounded mb-3" />
          <div className="bg-[#F2F4F6] rounded-2xl px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-[#E8EAED] rounded-full" />
                <div className="h-4 w-8 bg-[#E8EAED] rounded" />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-[#E8EAED] rounded-full" />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-[#E8EAED] rounded-full" />
                <div className="h-4 w-8 bg-[#E8EAED] rounded" />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-[#E8EAED] rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="h-4 w-20 bg-[#F2F4F6] rounded mb-4" />
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="w-14 h-14 bg-[#F2F4F6] rounded-full" />
                <div className="h-3 w-10 bg-[#F2F4F6] rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
