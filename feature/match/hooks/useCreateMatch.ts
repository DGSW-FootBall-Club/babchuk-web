import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { matchApi } from '@/feature/match/api/matchApi'

export function useCreateMatch() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [values, setValues] = useState({
    title: '',
    matchDate: '',
    matchTime: '',
    teamSize: 14,
    durationMinutes: 0,
    teamACaptainId: 0,
    teamBCaptainId: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (field: string, value: string | number) => {
    setValues(prev => ({ ...prev, [field]: value }))
  }

  const isValid =
    values.title.length > 0 &&
    values.matchDate.length > 0 &&
    values.matchTime.length > 0 &&
    values.durationMinutes > 0 &&
    values.teamSize > 0 &&
    values.teamACaptainId > 0 &&
    values.teamBCaptainId > 0

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await matchApi.createMatch(values)
      queryClient.invalidateQueries({ queryKey: ['matches'] })
      router.push('/schedule')
    } catch (e: any) {
      alert(e.response?.data?.message ?? '매치 생성에 실패했어요')
    } finally {
      setIsLoading(false)
    }
  }

  return { values, handleChange, isValid, isLoading, handleSubmit }
}