import { MatchListResponse } from "@/feature/match/types/response/MatchResponse";
import { MatchStatusLabel, statusStyle } from "@/shared/types/Enum";
import { useRouter } from "next/navigation";
import { formatMatchDate, formatMatchTime } from "@/shared/utils/formatMatch";

interface MatchCardProps {
  match: MatchListResponse;
}

export function MatchCard({ match }: MatchCardProps) {
  const router = useRouter();
  return (
    <div
      className="relative bg-[#EEF2FF] rounded-2xl active:scale-[0.98] transition-all duration-150 cursor-pointer"
      onClick={() => router.push(`/match/${match.id}`)}
    >
      <div
        className={`absolute top-0 left-0 px-3 py-1.5 rounded-tl-xl rounded-br-xl text-xs font-bold ${statusStyle[match.status]}`}
      >
        {MatchStatusLabel[match.status]}
      </div>

      <div className="flex items-center justify-between px-14 pt-10 pb-6">
        <div className="flex flex-col items-center gap-3 w-16">
          <img
            src={match.teamACaptain.profileImage}
            alt={match.teamACaptain.nickname}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-white"
          />
          <p className="text-xs font-semibold text-[#8B95A1]">
            {match.teamACaptain.nickname}팀
          </p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-2xl font-black text-[#191F28] tracking-tight">
            {formatMatchTime(match.matchTime)}
          </p>
          <p className="text-xs text-[#8B95A1]">
            {formatMatchDate(match.matchDate)}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 w-16">
          <img
            src={match.teamBCaptain.profileImage}
            alt={match.teamBCaptain.nickname}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-white"
          />
          <p className="text-xs font-semibold text-[#8B95A1]">
            {match.teamBCaptain.nickname}팀
          </p>
        </div>
      </div>
    </div>
  );
}
