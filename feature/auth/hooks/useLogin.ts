import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '@/feature/auth/api/authApi'

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/

export function useLogin() {
  const router = useRouter()
  const [values, setValues] = useState({ id: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (field: string, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }))
  }

  const isValid = values.id.length >= 7 && passwordRegex.test(values.password)

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      const res = await authApi.login({ username: values.id, password: values.password })
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      router.push('/')
    } catch (e: any) {
      alert(e.response?.data?.message ?? '로그인에 실패했어요')
    } finally {
      setIsLoading(false)
    }
  }

  return { values, handleChange, isValid, isLoading, handleLogin }
}