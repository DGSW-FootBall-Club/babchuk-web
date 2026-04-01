import { useQuery } from '@tanstack/react-query'
import { announcementApi } from '@/feature/announcement/api/announcementApi'

export function useAnnouncements() {
  const { data: announcements, isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: announcementApi.fetchAnnouncements,
  })

  return { announcements, isLoading }
}
