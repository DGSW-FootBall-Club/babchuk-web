import { MatchListResponse } from "@/feature/match/types/response/MatchResponse";
import { MatchStatus, MatchStatusLabel } from "@/shared/types/Enum";
import { useRouter } from "next/navigation";

interface MatchCardProps {
  match: MatchListResponse;
}

const statusStyle: Record<MatchStatus, string> = {
  OPEN: "bg-[#009655] text-white",
  CLOSED: "bg-orange-400 text-white",
  FINISHED: "bg-[#8B95A1] text-white",
};

function formatMatchTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const ampm = h < 12 ? "오전" : "오후";
  const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${ampm} ${hour}:${String(m).padStart(2, "0")}`;
}

function formatMatchDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
}

export function MatchCard({ match }: MatchCardProps) {
  const router = useRouter();
  return (
    <div
      className="relative bg-[#EEF2FF] rounded-2xl overflow-hidden active:scale-[0.98] transition-all duration-150 cursor-pointer"
      onClick={() => router.push(`/match/${match.id}`)}
    >
      <div
        className={`absolute top-0 left-0 px-3 py-1.5 rounded-tl-xl rounded-br-xl text-[11px] font-bold font-pretendard ${statusStyle[match.status]}`}
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
          <p className="text-[12px] font-pretendard font-semibold text-[#8B95A1]">
            A팀
          </p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-[24px] font-black font-pretendard text-[#191F28] tracking-tight">
            {formatMatchTime(match.matchTime)}
          </p>
          <p className="text-[12px] font-pretendard text-[#8B95A1]">
            {formatMatchDate(match.matchDate)}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 w-16">
          <img
            src={match.teamBCaptain.profileImage}
            alt={match.teamBCaptain.nickname}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-white"
          />
          <p className="text-[12px] font-pretendard font-semibold text-[#8B95A1]">
            B팀
          </p>
        </div>
      </div>
    </div>
  );
}
