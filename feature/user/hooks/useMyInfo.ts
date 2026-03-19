import { useEffect, useState } from 'react'
import { userApi } from '@/feature/user/api/userApi'
import { UserResponse } from '@/feature/user/types/response/UserResponse'

export function useMyInfo() {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true)
        const data = await userApi.fetchMyInfo()
        setUser(data)
      } catch (e: any) {
        setError(e.response?.data?.message ?? '정보를 불러오지 못했어요')
      } finally {
        setIsLoading(false)
      }
    }
    fetch()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    window.location.href = '/login'
  }

  return { user, isLoading, error, handleLogout }
}