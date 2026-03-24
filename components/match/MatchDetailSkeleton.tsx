function SkeletonSection({
  titleWidth,
  children,
}: {
  titleWidth: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F8F9FB] rounded-2xl px-4 py-4">
      <div className={`h-4 ${titleWidth} bg-[#E8EAED] rounded mb-3`} />
      {children}
    </div>
  );
}

function SkeletonAvatar() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="w-16 h-16 bg-[#E8EAED] rounded-full" />
      <div className="h-3 w-10 bg-[#E8EAED] rounded" />
    </div>
  );
}

export function MatchDetailSkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-white pb-10 animate-pulse">
      <div className="flex flex-col gap-1.5 px-5">
        <div className="h-6 w-20 bg-[#F2F4F6] rounded mt-6 mb-4" />
        <div className="w-full aspect-video bg-[#F2F4F6] rounded-xl" />
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

        <SkeletonSection titleWidth="w-16">
          <div className="grid grid-cols-2 gap-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#E8EAED] rounded" />
                <div className="h-4 w-16 bg-[#E8EAED] rounded" />
              </div>
            ))}
          </div>
        </SkeletonSection>

        <SkeletonSection titleWidth="w-16">
          <div className="bg-[#E8EAED] rounded-2xl px-8 py-6">
            <div className="relative flex items-center justify-between py-5 px-[10%]">
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-[#D9DDE2] rounded-full" />
                <div className="h-4 w-12 bg-[#D9DDE2] rounded" />
                <div className="w-5 h-5 bg-[#D9DDE2] rounded-full" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-[#D9DDE2] rounded-full" />
                <div className="h-4 w-12 bg-[#D9DDE2] rounded" />
                <div className="w-5 h-5 bg-[#D9DDE2] rounded-full" />
              </div>
            </div>
          </div>
        </SkeletonSection>

        <SkeletonSection titleWidth="w-10">
          <div className="grid grid-cols-2">
            <div className="flex justify-center items-center py-2 pr-4">
              <SkeletonAvatar />
            </div>
            <div className="flex justify-center items-center py-2 pl-4">
              <SkeletonAvatar />
            </div>
          </div>
        </SkeletonSection>

        <SkeletonSection titleWidth="w-20">
          <div className="flex flex-col gap-3 mt-1">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="grid grid-cols-2">
                <div className="flex justify-center items-center py-2 pr-4">
                  <SkeletonAvatar />
                </div>
                <div className="flex justify-center items-center py-2 pl-4">
                  <SkeletonAvatar />
                </div>
              </div>
            ))}
          </div>
        </SkeletonSection>

        <div className="w-full h-14 bg-[#F2F4F6] rounded-2xl" />
      </div>
    </div>
  );
}
