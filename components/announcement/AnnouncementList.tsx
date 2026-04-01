"use client";

import { useRouter } from "next/navigation";
import { useAnnouncements } from "@/feature/announcement/hooks/useAnnouncements";
import { AnnouncementCard } from "./AnnouncementCard";

export function AnnouncementList() {
  const router = useRouter();
  const { announcements, isLoading } = useAnnouncements();

  if (isLoading) {
    return (
      <div className="px-4 md:px-5 flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#F8F9FB] rounded-2xl px-5 py-5 animate-pulse">
            <div className="h-5 w-2/3 bg-gray-200 rounded mb-3" />
            <div className="flex items-center justify-between mb-3">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="h-3.5 w-full bg-gray-200 rounded" />
              <div className="h-3.5 w-4/5 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-2">
        <p className="text-base font-semibold text-[#191F28]">공지사항이 없어요</p>
        <p className="text-sm text-[#8B95A1]">새로운 공지가 올라오면 알려드릴게요!</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-5 flex flex-col gap-3">
      {announcements.map((announcement) => (
        <AnnouncementCard
          key={announcement.id}
          announcement={announcement}
          onClick={() => router.push(`/announcement/${announcement.id}`)}
        />
      ))}
    </div>
  );
}
