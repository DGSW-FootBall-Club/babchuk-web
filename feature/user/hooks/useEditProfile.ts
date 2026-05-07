import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { userApi } from '@/feature/user/api/userApi'
import { UserResponse } from '@/feature/user/types/response/UserResponse'
import { GenderType, SkillType } from '@/shared/types/Enum'

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
  const [name, setName] = useState(user.name)
  const [skill, setSkill] = useState<SkillType | null>(user.skillType)
  const [gender, setGender] = useState<GenderType | null>(user.gender)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState(user.profileImage || '')
  const [isLoading, setIsLoading] = useState(false)

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const isValid = name.length > 0 && skill !== null && gender !== null

  const handleSubmit = async () => {
    if (isLoading) return
    if (!skill || !gender) return
    try {
      setIsLoading(true)
      const profileImage = imageFile ? await toBase64(imageFile) : undefined
      await userApi.updateMyInfo({
        name,
        skillType: skill,
        gender,
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

  return { name, setName, skill, setSkill, gender, setGender, preview, handleImage, isValid, isLoading, handleSubmit }
}
