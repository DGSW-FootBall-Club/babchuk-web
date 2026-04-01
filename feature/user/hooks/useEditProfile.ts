import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { userApi } from '@/feature/user/api/userApi'
import { UserResponse } from '@/feature/user/types/response/UserResponse'
import { SkillType } from '@/shared/types/Enum'

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

export function useEditProfile(user: UserResponse) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [nickname, setNickname] = useState(user.nickname)
  const [grade, setGrade] = useState(String(user.grade))
  const [skill, setSkill] = useState<SkillType>(user.skillType)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState(user.profileImage || '')
  const [isLoading, setIsLoading] = useState(false)

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const isValid = nickname.length > 0 && grade.length === 4

  const handleSubmit = async () => {
    if (isLoading) return
    try {
      setIsLoading(true)
      const profileImage = imageFile ? await toBase64(imageFile) : undefined
      await userApi.updateMyInfo({
        nickname,
        grade: Number(grade),
        skillType: skill,
        profileImage,
      })
      await queryClient.invalidateQueries({ queryKey: ['myInfo'] })
      await queryClient.invalidateQueries({ queryKey: ['allUsers'] })
      router.back()
    } catch (e: any) {
      alert(e.response?.data?.message ?? '프로필 수정에 실패했어요')
    } finally {
      setIsLoading(false)
    }
  }

  return { nickname, setNickname, grade, setGrade, skill, setSkill, preview, handleImage, isValid, isLoading, handleSubmit }
}
