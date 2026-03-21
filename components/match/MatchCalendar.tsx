"use client";

import { useState } from "react";

interface MatchCalendarProps {
  value: string;
  onChange: (date: string) => void;
}

export function MatchCalendar({ value, onChange }: MatchCalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const selected = value ? new Date(value) : null;

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const handlePrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((v) => v - 1);
    } else setViewMonth((m) => m - 1);
  };

  const handleNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((v) => v + 1);
    } else setViewMonth((m) => m + 1);
  };

  const handleSelect = (day: number) => {
    const date = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onChange(date);
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    return (
      selected.getFullYear() === viewYear &&
      selected.getMonth() === viewMonth &&
      selected.getDate() === day
    );
  };

  const isToday = (day: number) => {
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    );
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  return (
    <div className="bg-white rounded-2xl p-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrev}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F2F4F6] active:brightness-90"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#191F28"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <p className="text-[15px] font-bold font-pretendard text-[#191F28]">
          {viewYear}년 {months[viewMonth]}
        </p>
        <button
          onClick={handleNext}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F2F4F6] active:brightness-90"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#191F28"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* 요일 */}
      <div className="grid grid-cols-7 mb-2">
        {days.map((d, i) => (
          <p
            key={d}
            className={`text-center text-[12px] font-medium font-pretendard py-1 ${i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-[#8B95A1]"}`}
          >
            {d}
          </p>
        ))}
      </div>

      {/* 날짜 */}
      <div className="grid grid-cols-7">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const past = isPast(day);
          const sel = isSelected(day);
          const tod = isToday(day);
          const isSun = (firstDay + i) % 7 === 0;
          const isSat = (firstDay + i) % 7 === 6;

          return (
            <button
              key={day}
              type="button"
              disabled={past}
              onClick={() => handleSelect(day)}
              className={`flex items-center justify-center h-9 w-full rounded-full text-[13px] font-pretendard transition-all
                ${sel ? "bg-primary text-white font-bold" : ""}
                ${!sel && tod ? "border border-primary text-primary font-bold" : ""}
                ${!sel && !tod && isSun ? "text-red-400" : ""}
                ${!sel && !tod && isSat ? "text-blue-400" : ""}
                ${!sel && !tod && !isSun && !isSat ? "text-[#191F28]" : ""}
                ${past ? "opacity-30 cursor-not-allowed" : "active:brightness-90"}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
