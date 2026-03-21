import { useQuery } from '@tanstack/react-query'
import { matchApi } from '@/feature/match/api/matchApi'

export function useMatches() {
  const { data: matches, isLoading } = useQuery({
    queryKey: ['matches'],
    queryFn: matchApi.fetchMatches,
  })

  return { matches, isLoading }
}