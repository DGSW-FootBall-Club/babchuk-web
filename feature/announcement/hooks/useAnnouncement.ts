import { useQueryClient } from '@tanstack/react-query'
import { AnnounceResponse } from '@/feature/announcement/types/response/announceResponse'
import { useAnnouncements } from './useAnnouncements'

export function useAnnouncement(id: number) {
  const queryClient = useQueryClient()
  const { announcements, isLoading } = useAnnouncements()

  const cached = queryClient.getQueryData<AnnounceResponse[]>(['announcements'])
  const announcement = cached?.find((a) => a.id === id) ?? announcements?.find((a) => a.id === id)

  return { announcement, isLoading }
}
