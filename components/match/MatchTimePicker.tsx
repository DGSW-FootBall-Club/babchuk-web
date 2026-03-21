"use client";

import { useState } from "react";

interface MatchTimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

export function MatchTimePicker({ value, onChange }: MatchTimePickerProps) {
  const [hour, setHour] = useState(value ? parseInt(value.split(":")[0]) : 18);
  const [minute, setMinute] = useState(
    value ? parseInt(value.split(":")[1]) : 0,
  );

  const update = (h: number, m: number) => {
    const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    onChange(time);
  };

  const handleHour = (v: number) => {
    const h = Math.max(0, Math.min(23, v));
    setHour(h);
    update(h, minute);
  };

  const handleMinute = (v: number) => {
    const m = Math.max(0, Math.min(59, v));
    setMinute(m);
    update(hour, m);
  };

  const minutes = [0, 10, 20, 30, 40, 50];

  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="flex items-center gap-4">
        {/* 시간 */}
        <div className="flex-1">
          <p className="text-[11px] text-[#8B95A1] font-pretendard mb-2 text-center">
            시간
          </p>
          <div className="flex items-center gap-2 justify-center">
            <button
              type="button"
              onClick={() => handleHour(hour - 1)}
              className="w-8 h-8 rounded-full bg-[#F2F4F6] flex items-center justify-center active:brightness-90"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#191F28"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <p className="text-[24px] font-bold font-pretendard text-[#191F28] w-10 text-center">
              {String(hour).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={() => handleHour(hour + 1)}
              className="w-8 h-8 rounded-full bg-[#F2F4F6] flex items-center justify-center active:brightness-90"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#191F28"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <p className="text-[24px] font-bold text-[#191F28] mb-1">:</p>

        {/* 분 */}
        <div className="flex-1">
          <p className="text-[11px] text-[#8B95A1] font-pretendard mb-2 text-center">
            분
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {minutes.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => handleMinute(m)}
                className={`h-8 rounded-xl text-[13px] font-pretendard font-medium transition-all active:brightness-90 ${
                  minute === m
                    ? "bg-primary text-white"
                    : "bg-[#F2F4F6] text-[#191F28]"
                }`}
              >
                {String(m).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
