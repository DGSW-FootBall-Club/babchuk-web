"use client";

import { use, useState } from "react";
import { BackButton } from "@/components/BackButton";
import { AnnouncementDetail } from "@/components/announcement/AnnouncementDetail";
import { useAnnouncement } from "@/feature/announcement/hooks/useAnnouncement";

export default function AnnouncementDetailPage({
  params,
}: {
  params: Promise<{ announcementId: string }>;
}) {
  const { announcementId } = use(params);
  const { announcement, isLoading } = useAnnouncement(Number(announcementId));
  const [editing, setEditing] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <div className="px-4 md:px-5">
          <BackButton />
        </div>
        <div className="px-4 md:px-5 flex flex-col animate-pulse">
          <div className="w-full aspect-video bg-muted rounded-xl mb-6" />
          <div className="h-6 w-2/3 bg-muted rounded mb-3" />
          <div className="flex items-center gap-2 mb-6">
            <div className="h-3 w-20 bg-muted rounded" />
            <div className="h-3 w-16 bg-muted rounded" />
          </div>
          <div className="w-full h-px bg-muted mb-6" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-4/5 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!announcement) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {!editing && (
        <div className="px-4 md:px-5">
          <BackButton />
        </div>
      )}
      <div className="pb-12">
        <AnnouncementDetail announcement={announcement} onEditingChange={setEditing} />
      </div>
    </div>
  );
}
