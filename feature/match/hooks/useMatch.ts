import { useQuery } from '@tanstack/react-query'
import { matchApi } from '@/feature/match/api/matchApi'

export function useMatch(matchId: number) {
  const { data: match, isLoading } = useQuery({
    queryKey: ['match', matchId],
    queryFn: () => matchApi.fetchMatch(matchId),
  })

  return { match, isLoading }
}