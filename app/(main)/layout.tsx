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

  if (!hasToken) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-background text-center">
        <p className="text-2xl md:text-3xl font-rocket mb-4">밥축</p>
        <p className="text-base text-muted-foreground">
          도담에서 다시 진입해주세요.
        </p>
      </div>
    )
  }

  if (user && (user.gender === null || user.skillType === null)) return null

  return <>{children}</>
}
