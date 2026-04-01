import { BackButton } from "../BackButton";
import { Header } from "../Header";
import { Shimmer } from "../Shimmer";

export function LoadingSkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff]">
      <div className="px-4 md:px-5">
        <BackButton />
      </div>
      <Header title="MY" />
      <div className="flex flex-col md:flex-row flex-1 p-4 gap-4">
        <div className="md:w-115 shrink-0 bg-white rounded-full p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shimmer className="w-12 h-12 rounded-full" />
              <Shimmer className="w-25 h-6" />
            </div>
            <Shimmer className="w-20 h-8" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Shimmer className="h-20" />
            <Shimmer className="h-20" />
          </div>
          <Shimmer className="h-25" />
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <Shimmer className="h-50 rounded-2xl" />
          <Shimmer className="h-15 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
