"use client";

import { useMatches } from "@/feature/match/hooks/useMatches";
import { MatchCard } from "@/components/match/MatchCard";

interface MatchListProps {
  selectedDate: string;
}

export function MatchList({ selectedDate }: MatchListProps) {
  const { matches, isLoading } = useMatches();

  const filtered = matches?.filter((m) => m.matchDate === selectedDate) ?? [];

  if (isLoading) {
    return (
      <div className="px-8 flex flex-col gap-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="relative bg-[#EEF2FF] rounded-2xl overflow-hidden animate-pulse"
          >
            <div className="absolute top-0 left-0 w-16 h-6.5 bg-gray-300 rounded-tl-xl rounded-br-xl" />
            <div className="flex items-center justify-between px-14 pt-10 pb-6">
              <div className="flex flex-col items-center gap-3 w-16">
                <div className="w-14 h-14 rounded-full bg-gray-300" />
                <div className="w-8 h-3 bg-gray-300 rounded" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-16 h-6 bg-gray-300 rounded" />
                <div className="w-20 h-3 bg-gray-300 rounded" />
              </div>
              <div className="flex flex-col items-center gap-3 w-16">
                <div className="w-14 h-14 rounded-full bg-gray-300" />
                <div className="w-8 h-3 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-2">
        <p className="text-base font-semibold text-[#191F28]">매치가 없어요</p>
        <p className="text-sm text-[#8B95A1]">다른 날짜를 선택해보세요!</p>
      </div>
    );
  }

  return (
    <div className="px-8 flex flex-col gap-3">
      {filtered.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}