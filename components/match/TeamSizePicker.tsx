"use client";

interface TeamSizePickerProps {
  teamSize: number;
  durationMinutes: number;
  onTeamSizeChange: (v: number) => void;
  onDurationChange: (v: number) => void;
}

const teamSizes = [6, 8, 10, 12, 14, 16];
const durations = [20, 30, 40, 50, 60];

export function TeamSizePicker({
  teamSize,
  durationMinutes,
  onTeamSizeChange,
  onDurationChange,
}: TeamSizePickerProps) {
  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col gap-5">
      {/* 팀 인원 */}
      <div>
        <p className="text-[13px] font-semibold font-pretendard text-[#191F28] mb-3">
          팀 인원 수
        </p>
        <div className="grid grid-cols-6 gap-2">
          {teamSizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onTeamSizeChange(s)}
              className={`h-10 rounded-xl text-[13px] font-pretendard font-medium transition-all active:scale-95 ${
                teamSize === s
                  ? "bg-primary text-white"
                  : "bg-[#F2F4F6] text-[#191F28]"
              }`}
            >
              {s}명
            </button>
          ))}
        </div>
      </div>

      {/* 경기 시간 */}
      <div>
        <p className="text-[13px] font-semibold font-pretendard text-[#191F28] mb-3">
          경기 시간
        </p>
        <div className="grid grid-cols-5 gap-2">
          {durations.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onDurationChange(d)}
              className={`h-10 rounded-xl text-[13px] font-pretendard font-medium transition-all active:scale-95 ${
                durationMinutes === d
                  ? "bg-primary text-white"
                  : "bg-[#F2F4F6] text-[#191F28]"
              }`}
            >
              {d}분
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
