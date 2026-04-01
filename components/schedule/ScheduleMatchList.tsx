"use client";

import { useMatches } from "@/feature/match/hooks/useMatches";
import { MatchCard } from "@/components/match/MatchCard";

interface ScheduleMatchListProps {
  selectedDate: string;
}

export function ScheduleMatchList({ selectedDate }: ScheduleMatchListProps) {
  const { matches, isLoading } = useMatches();

  const filtered = matches?.filter((m) => m.matchDate === selectedDate) ?? [];

  const dateLabel = (() => {
    const [year, month, day] = selectedDate.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return `${month}월 ${day}일 ${days[d.getDay()]}요일`;
  })();

  if (isLoading) {
    return (
      <div className="px-4 md:px-5 mt-5">
        <div className="h-5 w-28 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="flex flex-col gap-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 bg-[#F9FAFB] rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-5 mt-5">
      <p className="text-sm md:text-base font-bold text-[#191F28] mb-3">
        {dateLabel}
      </p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-1.5">
          <p className="text-sm font-semibold text-[#191F28]">매치가 없어요</p>
          <p className="text-xs text-[#8B95A1]">다른 날짜를 선택해보세요!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
