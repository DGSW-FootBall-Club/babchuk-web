import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { matchApi } from '@/feature/match/api/matchApi'

export function useMatchActions(matchId: number) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['match', matchId] })
    queryClient.invalidateQueries({ queryKey: ['matches'] })
    queryClient.invalidateQueries({ queryKey: ['isJoined', matchId] })
  }

  const handleJoin = async (teamType: 'TEAM_A' | 'TEAM_B') => {
    try {
      setIsLoading(true)
      await matchApi.joinMatch(matchId, { teamType })
      invalidate()
    } catch (e: any) {
      alert(e.response?.data?.message ?? '매치 신청에 실패했어요')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = async () => {
    try {
      setIsLoading(true)
      await matchApi.cancelMatch(matchId)
      invalidate()
    } catch (e: any) {
      alert(e.response?.data?.message ?? '매치 취소에 실패했어요')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await matchApi.deleteMatch(matchId)
      invalidate()
      router.push('/schedule')
    } catch (e: any) {
      alert(e.response?.data?.message ?? '매치 삭제에 실패했어요')
    } finally {
      setIsLoading(false)
    }
  }

  return { handleJoin, handleCancel, handleDelete, isLoading }
}