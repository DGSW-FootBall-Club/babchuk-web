"use client";

import { use, useState, useEffect } from "react";
import { useMatch } from "@/feature/match/hooks/useMatch";
import { useIsJoined } from "@/feature/match/hooks/useIsJoined";
import { useMatchActions } from "@/feature/match/hooks/useMatchActions";
import { BackButton } from "@/components/BackButton";
import { MatchDetailSkeleton } from "@/components/match/MatchDetailSkeleton";
import { Section } from "@/components/match/Section";
import { PlayerAvatar } from "@/components/match/PlayerAvatar";
import {
  MatchStatusLabel,
  statusStyle,
} from "@/shared/types/Enum";
import { formatMatchDate, formatMatchTime } from "@/shared/utils/formatMatch";

export default function MatchDetailPage({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  const { matchId: id } = use(params);
  const matchId = Number(id);
  const { match, isLoading } = useMatch(matchId);
  const { isJoined } = useIsJoined(matchId);
  const {
    handleJoin,
    handleCancel,
    isLoading: actionLoading,
  } = useMatchActions(matchId);
  const [selectedTeam, setSelectedTeam] = useState<"A" | "B">("A");

  const teamSize = match ? match.teamSize / 2 - 1 : 0;
  const isTeamAFull = match ? match.teamA.members.length >= teamSize : false;
  const isTeamBFull = match ? match.teamB.members.length >= teamSize : false;

  useEffect(() => {
    if (isTeamAFull && !isTeamBFull) setSelectedTeam("B");
    if (isTeamBFull && !isTeamAFull) setSelectedTeam("A");
  }, [isTeamAFull, isTeamBFull]);

  if (isLoading || !match) {
    return <MatchDetailSkeleton />;
  }

  const isTeamSelectDisabled =
    isJoined || match.status === "CLOSED" || match.status === "FINISHED";

  const maxMembers = Math.max(
    match.teamA.members.length,
    match.teamB.members.length,
  );

  return (
    <div className="flex flex-col min-h-screen bg-white pb-10">
      <div className="gap-3 px-5">
        <BackButton />
        <img
          src="/icons/school.svg"
          alt="경기장"
          className="w-full aspect-video object-cover rounded-xl"
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
          <p className="text-base text-[#8B95A1]">{match.title}</p>
        </div>

        <Section title="매치 정보">
          <div className="grid grid-cols-2 gap-y-3">
            <div className="flex items-center gap-2">
              <img src="/icons/person.svg" alt="레벨" className="w-4 h-4" />
              <p className="text-base text-[#191F28]">모든 레벨</p>
            </div>
            <div className="flex items-center gap-2">
              <img src="/icons/gender.svg" alt="성별" className="w-4 h-4" />
              <p className="text-base text-[#191F28]">남녀 모두</p>
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
                {match.teamSize / 2}vs{match.teamSize / 2}
              </p>
            </div>
          </div>
        </Section>

        <Section title="팀 선택">
          <div
            className={`bg-[#009655] rounded-2xl px-8 py-6 relative overflow-hidden ${isTeamSelectDisabled ? "opacity-50" : ""}`}
          >
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/70" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-white/70 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 border-2 border-white/70 border-t-0 rounded-b-full pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-8 border-2 border-white/70 border-b-0 rounded-t-full pointer-events-none" />

            <div className="relative flex items-center justify-between py-5 px-[10%]">
              <button
                onClick={() => setSelectedTeam("A")}
                disabled={isTeamSelectDisabled || isTeamAFull}
                className="flex flex-col items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <img
                  src="/icons/red-uniform.svg"
                  alt="A팀"
                  className="w-14 h-14"
                />
                <p className="text-white font-bold text-base">
                  {match.teamA.captain.nickname} 팀
                </p>
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    selectedTeam === "A"
                      ? "border-white bg-white"
                      : "border-white/50 bg-transparent"
                  } flex items-center justify-center`}
                >
                  {selectedTeam === "A" && (
                    <div className="w-2 h-2 rounded-full bg-[#2E8B57]" />
                  )}
                </div>
                <p className="text-white/70 font-rocket text-xs">
                  {match.teamA.members.length}/{teamSize}
                </p>
              </button>

              <button
                onClick={() => setSelectedTeam("B")}
                disabled={isTeamSelectDisabled || isTeamBFull}
                className="flex flex-col items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <img
                  src="/icons/blue-uniform.svg"
                  alt="B팀"
                  className="w-14 h-14"
                />
                <p className="text-white font-bold text-base">
                  {match.teamB.captain.nickname} 팀
                </p>
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    selectedTeam === "B"
                      ? "border-white bg-white"
                      : "border-white/50 bg-transparent"
                  } flex items-center justify-center`}
                >
                  {selectedTeam === "B" && (
                    <div className="w-2 h-2 rounded-full bg-[#2E8B57]" />
                  )}
                </div>
                <p className="text-white/70 font-rocket text-xs">
                  {match.teamB.members.length}/{teamSize}
                </p>
              </button>
            </div>
          </div>
        </Section>

        <Section title="주장">
          <div className="grid grid-cols-2">
            <div className="flex justify-center items-center py-2 pr-4">
              <PlayerAvatar user={match.teamA.captain} />
            </div>
            <div className="flex justify-center items-center py-2 pl-4">
              <PlayerAvatar user={match.teamB.captain} />
            </div>
          </div>
        </Section>

        {(match.teamA.members.length > 0 || match.teamB.members.length > 0) && (
          <Section title="선발 명단">
            <div className="flex flex-col gap-3 mt-1">
              {Array.from({ length: maxMembers }).map((_, i) => (
                <div key={i} className="grid grid-cols-2">
                  <div className="flex justify-center items-center py-2 pr-4">
                    {match.teamA.members[i] ? (
                      <PlayerAvatar user={match.teamA.members[i]} />
                    ) : (
                      <div className="w-16 h-18.5" />
                    )}
                  </div>
                  <div className="flex justify-center items-center py-2 pl-4">
                    {match.teamB.members[i] ? (
                      <PlayerAvatar user={match.teamB.members[i]} />
                    ) : (
                      <div className="w-16 h-18.5" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {match.status === "FINISHED" ? (
          <button
            disabled
            className="w-full py-4 rounded-2xl bg-[#8B95A1] text-white font-bold text-base cursor-not-allowed"
          >
            경기 종료
          </button>
        ) : isJoined ? (
          <button
            onClick={handleCancel}
            disabled={actionLoading}
            className="w-full py-4 rounded-2xl bg-red-500 text-white font-bold text-base transition-all active:scale-95 disabled:opacity-50"
          >
            {actionLoading ? "처리 중..." : "신청 취소"}
          </button>
        ) : match.status === "CLOSED" ? (
          <button
            disabled
            className="w-full py-4 rounded-2xl bg-[#8B95A1] text-white font-bold text-base cursor-not-allowed"
          >
            마감됨
          </button>
        ) : (
          <button
            onClick={() =>
              handleJoin(selectedTeam === "A" ? "TEAM_A" : "TEAM_B")
            }
            disabled={actionLoading}
            className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-base transition-all active:scale-95 disabled:opacity-50"
          >
            {actionLoading
              ? "처리 중..."
              : `${selectedTeam === "A" ? match.teamA.captain.nickname : match.teamB.captain.nickname} 팀으로 신청하기`}
          </button>
        )}
      </div>
    </div>
  );
}
