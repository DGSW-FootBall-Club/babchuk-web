import { useQuery } from '@tanstack/react-query'
import { userApi } from '@/feature/user/api/userApi'

export function useMyInfo() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['myInfo'],
    queryFn: userApi.fetchMyInfo,
  })

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    window.location.href = '/login'
  }

  return { user, isLoading, handleLogout }
}