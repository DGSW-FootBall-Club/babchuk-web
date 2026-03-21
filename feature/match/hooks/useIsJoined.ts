import { useQuery } from '@tanstack/react-query'
import { matchApi } from '@/feature/match/api/matchApi'

export function useIsJoined(matchId: number) {
  const { data: isJoined, isLoading } = useQuery({
    queryKey: ['isJoined', matchId],
    queryFn: () => matchApi.fetchIsJoined(matchId),
  })

  return { isJoined, isLoading }
}