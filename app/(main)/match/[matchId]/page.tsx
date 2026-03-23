"use client";

import { use } from "react";
import { useMatch } from "@/feature/match/hooks/useMatch";
import { BackButton } from "@/components/BackButton";
import { MatchDetailSkeleton } from "@/components/match/MatchDetailSkeleton";
import { MatchStatus, MatchStatusLabel } from "@/shared/types/Enum";
import { UserResponse } from "@/feature/user/types/response/UserResponse";

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
  return `${d.getMonth() + 1}월 ${d.getDate()}일 ${days[d.getDay()]}요일`;
}

function PlayerAvatar({ user }: { user: UserResponse }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <img
        src={user.profileImage}
        alt={user.nickname}
        className="w-14 h-14 rounded-full object-cover"
      />
      <p className="text-sm text-[#8B95A1] text-center">
        {user.nickname}
      </p>
    </div>
  );
}

export default function MatchDetailPage({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  const { matchId: id } = use(params);
  const matchId = Number(id);
  const { match, isLoading } = useMatch(matchId);

  if (isLoading || !match) {
    return <MatchDetailSkeleton />;
  }

  const allMembers = [...match.teamA.members, ...match.teamB.members];

  return (
    <div className="flex flex-col min-h-screen bg-white pb-10">
      <div className="flex flex-col gap-1.5 px-5 relative">
        <BackButton />
        <img
          src="/icons/school.svg"
          alt="경기장"
          className="w-full h-124 object-cover rounded-xl"
        />
      </div>

      <div className="px-5 py-5 flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-base text-[#8B95A1]">
              {formatMatchDate(match.matchDate)}{" "}
              {formatMatchTime(match.matchTime)}
            </p>
            <span
              className={`px-2 py-0.5 rounded-md text-sm font-bold ${statusStyle[match.status]}`}
            >
              {MatchStatusLabel[match.status]}
            </span>
          </div>
          <p className="text-2xl font-black text-[#191F28] mb-1">
            대소고 FC 스타디움
          </p>
          <p className="text-base text-[#8B95A1]">
            {match.title}
          </p>
        </div>

        {/* 매치 정보 */}
        <div className="bg-[#F8F9FB] rounded-2xl px-4 py-4">
          <p className="text-base font-bold text-[#191F28] mb-3">
            매치 정보
          </p>
          <div className="grid grid-cols-2 gap-y-3">
            <div className="flex items-center gap-2">
              <img src="/icons/person.svg" alt="레벨" className="w-4 h-4" />
              <p className="text-base text-[#191F28]">
                모든 레벨
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img src="/icons/gender.svg" alt="성별" className="w-4 h-4" />
              <p className="text-base text-[#191F28]">
                남녀 모두
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img src="/icons/clock.svg" alt="시간" className="w-4 h-4" />
              <p className="text-base text-[#191F28]">
                {match.durationMinutes}분
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img src="/icons/stadium.svg" alt="경기" className="w-4 h-4" />
              <p className="text-base text-[#191F28]">
                {match.teamSize}vs{match.teamSize}
              </p>
            </div>
          </div>
        </div>

        {/* 팀 설정 */}
        <div>
          <p className="text-base font-bold text-[#191F28] mb-3">
            팀 설정
          </p>
          <div className="bg-[#1a7a3a] rounded-2xl px-6 py-5 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 rounded-full border-2 border-white/20" />
            </div>
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20" />
            <div className="relative flex items-center justify-between">
              <div className="flex flex-col items-center gap-2">
                <img
                  src={match.teamA.captain.profileImage}
                  alt={match.teamA.captain.nickname}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-white/50"
                />
                <p className="text-white font-semibold text-base">
                  A팀
                </p>
                <div className="flex gap-1 flex-wrap max-w-20 justify-center">
                  {Array.from({ length: match.teamSize }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i < match.teamA.currentSize ? "bg-primary" : "bg-white/30"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img
                  src={match.teamB.captain.profileImage}
                  alt={match.teamB.captain.nickname}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-white/50"
                />
                <p className="text-white font-semibold text-base">
                  B팀
                </p>
                <div className="flex gap-1 flex-wrap max-w-[80px] justify-center">
                  {Array.from({ length: match.teamSize }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i < match.teamB.currentSize ? "bg-blue-400" : "bg-white/30"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 선발 명단 */}
        {allMembers.length > 0 && (
          <div>
            <p className="text-base font-bold text-[#191F28] mb-4">
              선발 명단
            </p>
            <div className="grid grid-cols-2 gap-4">
              {allMembers.map((member) => (
                <PlayerAvatar key={member.id} user={member} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
