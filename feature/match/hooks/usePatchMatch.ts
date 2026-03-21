import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { matchApi } from '@/feature/match/api/matchApi'
import { CreateMatchRequest } from '../types/request/CreateMatchRequest'

export function usePatchMatch(matchId: number) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const handlePatch = async (data: CreateMatchRequest) => {
    try {
      setIsLoading(true)
      await matchApi.patchMatch(matchId, data)
      queryClient.invalidateQueries({ queryKey: ['match', matchId] })
      queryClient.invalidateQueries({ queryKey: ['matches'] })
      router.back()
    } catch (e: any) {
      alert(e.response?.data?.message ?? '매치 수정에 실패했어요')
    } finally {
      setIsLoading(false)
    }
  }

  return { handlePatch, isLoading }
}