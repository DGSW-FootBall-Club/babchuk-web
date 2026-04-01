"use client";

import { useState } from "react";

interface ScheduleCalendarProps {
  selectedDate: string;
  onSelect: (date: string) => void;
}

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function toStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getKSTToday() {
  const now = new Date();
  const kst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  kst.setHours(0, 0, 0, 0);
  return kst;
}

function getCalendarDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startDay = first.getDay();

  const days: (Date | null)[] = [];

  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  for (let d = 1; d <= last.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  return days;
}

export function ScheduleCalendar({
  selectedDate,
  onSelect,
}: ScheduleCalendarProps) {
  const today = getKSTToday();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const days = getCalendarDays(viewYear, viewMonth);
  const todayStr = toStr(today);

  const handlePrev = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNext = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  return (
    <div className="px-4 md:px-5">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handlePrev}
          className="w-8 h-8 flex items-center justify-center rounded-full active:scale-90 transition-all"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8B95A1"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <p className="text-lg md:text-xl font-bold text-[#191F28]">
          {viewYear}년 {viewMonth + 1}월
        </p>

        <button
          type="button"
          onClick={handleNext}
          className="w-8 h-8 flex items-center justify-center rounded-full active:scale-90 transition-all"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8B95A1"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((day, i) => (
          <div key={day} className="flex items-center justify-center py-1.5">
            <p
              className={`text-xs md:text-sm font-semibold ${
                i === 0
                  ? "text-red-400"
                  : i === 6
                    ? "text-blue-500"
                    : "text-[#8B95A1]"
              }`}
            >
              {day}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((d, i) => {
          if (!d) {
            return <div key={`empty-${i}`} className="py-2" />;
          }

          const str = toStr(d);
          const active = selectedDate === str;
          const isToday = str === todayStr;
          const dayOfWeek = d.getDay();
          const isSun = dayOfWeek === 0;
          const isSat = dayOfWeek === 6;

          return (
            <button
              key={str}
              type="button"
              onClick={() => onSelect(str)}
              className="flex items-center justify-center py-2"
            >
              <div
                className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl transition-all duration-150 active:scale-90 ${
                  active ? "bg-primary" : isToday ? "ring-1.5 ring-primary" : ""
                }`}
              >
                <p
                  className={`text-sm md:text-base font-semibold ${
                    active
                      ? "text-white"
                      : isSun
                        ? "text-red-400"
                        : isSat
                          ? "text-blue-500"
                          : "text-[#191F28]"
                  }`}
                >
                  {d.getDate()}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
