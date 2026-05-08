'use client'

import { useEffect } from 'react'
import { authApi } from '@/feature/auth/api/authApi'

function extractDAuthToken(): string | null {
  const search = window.location.search
  if (!search) return null
  const match = search.match(/[?&/]token=([^&]+)/)
  if (!match) return null
  try {
    return decodeURIComponent(match[1])
  } catch {
    return match[1]
  }
}

export function DAuthHandler() {
  useEffect(() => {
    const dauthToken = extractDAuthToken()
    if (!dauthToken) return

    window.history.replaceState(null, '', window.location.pathname)

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
