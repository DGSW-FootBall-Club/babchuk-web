import { AnnounceResponse } from "@/feature/announcement/types/response/announceResponse";

interface AnnouncementCardProps {
  announcement: AnnounceResponse;
  onClick: () => void;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export function AnnouncementCard({ announcement, onClick }: AnnouncementCardProps) {
  return (
    <div
      className="bg-[#F8F9FB] rounded-2xl px-5 py-5 active:scale-[0.98] transition-all duration-150 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-base md:text-lg font-bold text-primary mb-2.5">
        {announcement.title}
      </h3>

      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-[#8B95A1]">
          {formatDate(announcement.createdAt)}
        </p>
        <p className="text-xs text-[#8B95A1]">
          {announcement.author}
        </p>
      </div>

      <p className="text-sm text-[#4E5968] leading-relaxed line-clamp-3">
        {announcement.content}
      </p>
    </div>
  );
}
