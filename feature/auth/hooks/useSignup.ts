import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '@/feature/auth/api/authApi'

type SkillType = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'
type GenderType = 'MALE' | 'FEMALE'

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

export function useSignup() {
  const router = useRouter()
  const [values, setValues] = useState({
    username: '',
    password: '',
    nickname: '',
    grade: '',
  })
  const [skill, setSkill] = useState<SkillType>('BEGINNER')
  const [gender, setGender] = useState<GenderType>('MALE')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (field: string, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }))
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const isValid =
    values.username.length >= 7 &&
    passwordRegex.test(values.password) &&
    values.nickname.length > 0 &&
    values.grade.length === 4

  const handleSignup = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const profileImage = imageFile ? await toBase64(imageFile) : undefined

      await authApi.signup({
        username: values.username,
        password: values.password,
        nickname: values.nickname,
        grade: Number(values.grade),
        skillType: skill,
        gender,
        profileImage,
      })
      router.push('/login')
    } catch (e: any) {
      setError(e.response?.data?.message ?? '회원가입에 실패했어요')
    } finally {
      setIsLoading(false)
    }
  }

  return { values, skill, setSkill, gender, setGender, preview, handleChange, handleImage, isValid, isLoading, error, handleSignup }
}