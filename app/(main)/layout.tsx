'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { userApi } from '@/feature/user/api/userApi'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [hasToken, setHasToken] = useState<boolean | null>(null)

  useEffect(() => {
    const check = () => setHasToken(!!localStorage.getItem('accessToken'))
    check()

    const params = new URLSearchParams(window.location.search)
    if (params.get('token')) {
      const interval = setInterval(check, 200)
      return () => clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (hasToken !== false) return
    const params = new URLSearchParams(window.location.search)
    if (params.get('token')) return
    router.replace('/login')
  }, [hasToken, router])

  const { data: user } = useQuery({
    queryKey: ['myInfo'],
    queryFn: userApi.fetchMyInfo,
    enabled: hasToken === true,
  })

  useEffect(() => {
    if (user && (user.gender === null || user.skillType === null)) {
      router.replace('/onboarding')
    }
  }, [user, router])

  if (hasToken === null) return null

  if (!hasToken) return null

  if (user && (user.gender === null || user.skillType === null)) return null

  return <>{children}</>
}
