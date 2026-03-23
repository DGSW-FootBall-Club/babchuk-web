'use client'

import { useMatches } from '@/feature/match/hooks/useMatches'
import { MatchCard } from '@/components/match/MatchCard'

interface MatchListProps {
  selectedDate: string
}

export function MatchList({ selectedDate }: MatchListProps) {
  const { matches, isLoading } = useMatches()

  const filtered = matches?.filter(m => m.matchDate === selectedDate) ?? []

  if (isLoading) {
    return (
      <div className="px-8 flex flex-col gap-3">
        {[1, 2].map(i => (
          <div key={i} className="h-30 bg-[#F2F4F6] rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-2">
        <p className="text-base font-semibold text-[#191F28]">매치가 없어요</p>
        <p className="text-sm text-[#8B95A1]">다른 날짜를 선택해보세요!</p>
      </div>
    )
  }

  return (
    <div className="px-8 flex flex-col gap-3">
      {filtered.map(match => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  )
}