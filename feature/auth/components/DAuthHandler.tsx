'use client'

import { useEffect } from 'react'
import { authApi } from '@/feature/auth/api/authApi'

export function DAuthHandler() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const dauthToken = params.get('token')
    if (!dauthToken) return

    params.delete('token')
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params}`
      : window.location.pathname
    window.history.replaceState(null, '', newUrl)

    authApi
      .exchangeDAuthToken(dauthToken)
      .then(({ accessToken }) => {
        localStorage.setItem('accessToken', accessToken)
        window.location.reload()
      })
      .catch(() => {
        alert('인증에 실패했어요. 도담에서 다시 진입해주세요.')
      })
  }, [])

  return null
}
