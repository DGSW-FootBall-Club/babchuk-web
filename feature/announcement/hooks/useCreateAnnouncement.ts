import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { announcementApi } from '@/feature/announcement/api/announcementApi'

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

export function useCreateAnnouncement() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [values, setValues] = useState({
    title: '',
    content: '',
    image: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (field: string, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }))
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const isValid = values.title.length > 0 && values.content.length > 0

  const handleSubmit = async () => {
    if (isLoading) return
    try {
      setIsLoading(true)
      const image = imageFile ? await toBase64(imageFile) : ''
      await announcementApi.createAnnouncement({ ...values, image })
      queryClient.invalidateQueries({ queryKey: ['announcements'] })
      router.back()
    } catch (e: any) {
      alert(e.response?.data?.message ?? '공지사항 작성에 실패했어요')
    } finally {
      setIsLoading(false)
    }
  }

  return { values, handleChange, handleImage, preview, isValid, isLoading, handleSubmit }
}
