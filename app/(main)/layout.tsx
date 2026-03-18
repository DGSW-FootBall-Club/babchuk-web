'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) router.replace('/login')
  }, [])

  return <>{children}</>
}