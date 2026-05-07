import { MatchListResponse } from "@/feature/match/types/response/MatchResponse";
import { MatchStatusLabel, statusStyle } from "@/shared/types/Enum";
import { useRouter } from "next/navigation";
import { formatMatchDate, formatMatchTime } from "@/shared/utils/formatMatch";
import { ProfileImage } from "@/components/ProfileImage";

interface MatchCardProps {
  match: MatchListResponse;
}

export function MatchCard({ match }: MatchCardProps) {
  const router = useRouter();
  return (
    <div
      className="relative bg-primary-subtle rounded-2xl active:scale-[0.98] transition-all duration-150 cursor-pointer"
      onClick={() => router.push(`/match/${match.id}`)}
    >
      <div
        className={`absolute top-0 left-0 px-3 py-1.5 rounded-tl-xl rounded-br-xl text-xs font-bold ${statusStyle[match.status]}`}
      >
        {MatchStatusLabel[match.status]}
      </div>

      <div className="flex items-center justify-between px-8 md:px-14 pt-8 md:pt-10 pb-5 md:pb-6">
        <div className="flex flex-col items-center gap-2 md:gap-3 w-14 md:w-16">
          <ProfileImage
            src={match.teamACaptain.profileImage}
            alt={match.teamACaptain.name}
            className="w-11 h-11 md:w-14 md:h-14 rounded-full"
          />
          <p className="text-[11px] md:text-xs font-semibold text-muted-foreground truncate w-full text-center">
            {match.teamACaptain.name}팀
          </p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-xl md:text-2xl font-black text-foreground tracking-tight">
            {formatMatchTime(match.matchTime)}
          </p>
          <p className="text-[11px] md:text-xs text-muted-foreground">
            {formatMatchDate(match.matchDate)}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 md:gap-3 w-14 md:w-16">
          <ProfileImage
            src={match.teamBCaptain.profileImage}
            alt={match.teamBCaptain.name}
            className="w-11 h-11 md:w-14 md:h-14 rounded-full"
          />
          <p className="text-[11px] md:text-xs font-semibold text-muted-foreground truncate w-full text-center">
            {match.teamBCaptain.name}팀
          </p>
        </div>
      </div>
    </div>
  );
}
