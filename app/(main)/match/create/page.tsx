"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { BackButton } from "@/components/BackButton";
import { Input } from "@/components/Input";
import { UserSelectModal } from "@/components/match/UserSelectModal";
import { DatePickerModal } from "@/components/match/DatePickerModal";
import {
  TimePickerModal,
  formatTime,
} from "@/components/match/TimePickerModal";
import { useCreateMatch } from "@/feature/match/hooks/useCreateMatch";
import { UserResponse } from "@/feature/user/types/response/UserResponse";

type ModalType = "date" | "time" | "captainA" | "captainB" | null;
type MatchTimeType = "lunch" | "dinner" | "custom" | null;

const LUNCH_TIME = "13:10";
const DINNER_TIME = "18:45";

const durationPresets = [
  { label: "30분", value: 30 },
  { label: "1시간", value: 60 },
  { label: "1시간 30분", value: 90 },
  { label: "2시간", value: 120 },
];

function Required() {
  return <span className="text-red-500 ml-0.5">*</span>;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold text-[#8B95A1] mb-3">{children}</p>
  );
}

export default function CreateMatchPage() {
  const { values, handleChange, isValid, isLoading, handleSubmit } =
    useCreateMatch();
  const [modal, setModal] = useState<ModalType>(null);
  const [captainA, setCaptainA] = useState<UserResponse | null>(null);
  const [captainB, setCaptainB] = useState<UserResponse | null>(null);
  const [matchTimeType, setMatchTimeType] = useState<MatchTimeType>(null);

  const handleSelectA = (user: UserResponse) => {
    setCaptainA(user);
    handleChange("teamACaptainId", user.id);
  };

  const handleSelectB = (user: UserResponse) => {
    setCaptainB(user);
    handleChange("teamBCaptainId", user.id);
  };

  const handleMatchTimeType = (type: MatchTimeType) => {
    setMatchTimeType(type);
    if (type === "lunch") handleChange("matchTime", LUNCH_TIME);
    else if (type === "dinner") handleChange("matchTime", DINNER_TIME);
    else if (type === "custom") setModal("time");
  };

  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()} (${days[d.getDay()]})`;
  };

  const timeTypeButtons: { label: string; sub: string; type: MatchTimeType }[] =
    [
      { label: "점심", sub: "오후 1:10", type: "lunch" },
      { label: "저녁", sub: "오후 6:45", type: "dinner" },
      {
        label: "직접 설정",
        sub:
          values.matchTime && matchTimeType === "custom"
            ? formatTime(values.matchTime)
            : "미정",
        type: "custom",
      },
    ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="px-5">
        <BackButton />
      </div>

      <div className="px-4 md:px-6 pt-2 pb-6 md:pb-8">
        <p className="text-2xl md:text-3xl font-rocket">매치 생성</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isValid) handleSubmit();
        }}
        className="flex flex-col px-4 md:px-6 pb-16 gap-6 md:gap-8"
      >
        <Input
          label={
            <>
              매치 제목 <Required />
            </>
          }
          type="text"
          value={values.title}
          onChange={(v) => handleChange("title", v)}
        />

        <div>
          <Label>
            날짜 <Required />
          </Label>
          <button
            type="button"
            onClick={() => setModal("date")}
            className="w-full flex items-center justify-between bg-[#F8F9FB] rounded-2xl px-4 py-4 transition-all duration-150 active:scale-[0.98] active:brightness-95"
          >
            <p
              className={`text-sm ${values.matchDate ? "text-[#191F28] font-semibold" : "text-[#C4C9D1]"}`}
            >
              {values.matchDate
                ? formatDate(values.matchDate)
                : "날짜를 선택하세요"}
            </p>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C4C9D1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>

        <div>
          <Label>
            경기 시작 시간 <Required />
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {timeTypeButtons.map(({ label, sub, type }) => {
              const active = matchTimeType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleMatchTimeType(type)}
                  className={`flex flex-col items-center gap-1 py-4 rounded-2xl transition-all duration-150 active:scale-95 ${
                    active ? "bg-primary" : "bg-[#F8F9FB]"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold ${active ? "text-white" : "text-[#191F28]"}`}
                  >
                    {label}
                  </p>
                  <p
                    className={`text-xs ${active ? "text-white/70" : "text-[#8B95A1]"}`}
                  >
                    {sub}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Label>
            경기 시간 <Required />
          </Label>
          <div className="grid grid-cols-4 gap-2">
            {durationPresets.map(({ label, value }) => {
              const active = values.durationMinutes === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleChange("durationMinutes", value)}
                  className={`py-3.5 rounded-2xl text-xs font-semibold transition-all duration-150 active:scale-95 ${
                    active
                      ? "bg-primary text-white"
                      : "bg-[#F8F9FB] text-[#191F28]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Input
            label={
              <>
                필요한 인원 수 (주장 포함) <Required />
              </>
            }
            type="number"
            value={values.teamSize === 0 ? "" : String(values.teamSize)}
            onChange={(v) => {
              if (v === "") {
                handleChange("teamSize", 0);
                return;
              }
              const num = Number(v);
              if (num <= 20) handleChange("teamSize", num);
            }}
          />
          {values.teamSize >= 4 && values.teamSize % 2 === 0 && (
            <p className="text-xs text-[#8B95A1] mt-1">
              팀당 {values.teamSize / 2 - 1}명 모집 (주장 제외)
            </p>
          )}
        </div>

        <div>
          <Label>
            캡틴 선택 <Required />
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setModal("captainA")}
              className="flex flex-col items-center gap-3 bg-[#FFF5F5] rounded-2xl py-5 transition-all duration-150 active:scale-95"
            >
              <div className="w-14 h-14 rounded-full bg-red-100 overflow-hidden flex items-center justify-center">
                {captainA ? (
                  <img
                    src={captainA.profileImage}
                    alt={captainA.nickname}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-red-300 text-2xl">?</p>
                )}
              </div>
              <div className="text-center">
                <p className="text-xs text-red-400 font-semibold mb-0.5">
                  A팀 캡틴
                </p>
                <p className="text-sm font-semibold text-[#191F28]">
                  {captainA ? captainA.nickname : "선택하기"}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setModal("captainB")}
              className="flex flex-col items-center gap-3 bg-[#F0F4FF] rounded-2xl py-5 transition-all duration-150 active:scale-95"
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 overflow-hidden flex items-center justify-center">
                {captainB ? (
                  <img
                    src={captainB.profileImage}
                    alt={captainB.nickname}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-blue-300 text-2xl">?</p>
                )}
              </div>
              <div className="text-center">
                <p className="text-xs text-blue-400 font-semibold mb-0.5">
                  B팀 캡틴
                </p>
                <p className="text-sm font-semibold text-[#191F28]">
                  {captainB ? captainB.nickname : "선택하기"}
                </p>
              </div>
            </button>
          </div>
        </div>

        <Button type="submit" disabled={!isValid || isLoading}>
          {isLoading ? "생성 중..." : "매치 생성"}
        </Button>
      </form>

      {modal === "date" && (
        <DatePickerModal
          value={values.matchDate}
          onChange={(v) => handleChange("matchDate", v)}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "time" && (
        <TimePickerModal
          startTime={values.matchTime}
          onConfirm={(v) => {
            handleChange("matchTime", v);
            setMatchTimeType("custom");
          }}
          onClose={() => {
            setModal(null);
            if (matchTimeType === "custom" && !values.matchTime)
              setMatchTimeType(null);
          }}
        />
      )}
      {modal === "captainA" && (
        <UserSelectModal
          title="A팀 캡틴 선택"
          selectedId={captainA?.id ?? 0}
          excludeId={captainB?.id}
          onSelect={handleSelectA}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "captainB" && (
        <UserSelectModal
          title="B팀 캡틴 선택"
          selectedId={captainB?.id ?? 0}
          excludeId={captainA?.id}
          onSelect={handleSelectB}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
