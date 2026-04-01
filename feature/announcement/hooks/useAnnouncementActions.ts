import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { announcementApi } from '@/feature/announcement/api/announcementApi'
import { AnnounceRequest } from '@/feature/announcement/types/request/announcementRequest'

export function useAnnouncementActions(id: number) {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await announcementApi.deleteAnnouncement(id)
      await queryClient.invalidateQueries({ queryKey: ['announcements'] })
    } catch (e: any) {
      alert(e.response?.data?.message ?? '삭제에 실패했어요')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePatch = async (data: AnnounceRequest) => {
    try {
      setIsLoading(true)
      await announcementApi.patchAnnouncement(id, data)
      queryClient.invalidateQueries({ queryKey: ['announcements'] })
      queryClient.invalidateQueries({ queryKey: ['announcement', id] })
    } catch (e: any) {
      alert(e.response?.data?.message ?? '수정에 실패했어요')
    } finally {
      setIsLoading(false)
    }
  }

  return { handleDelete, handlePatch, isLoading }
}
