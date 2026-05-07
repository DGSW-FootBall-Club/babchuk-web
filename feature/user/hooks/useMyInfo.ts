import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { userApi } from '@/feature/user/api/userApi'

export function useMyInfo() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['myInfo'],
    queryFn: userApi.fetchMyInfo,
    retry: false,
  })

  useEffect(() => {
    if (error) {
      localStorage.removeItem('accessToken')
      window.location.href = '/'
    }
  }, [error])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    window.location.href = '/'
  }

  return { user, isLoading, handleLogout }
}
