"use client";

import { useState } from "react";

interface DateFilterProps {
  selectedDate: string;
  onSelect: (date: string) => void;
}

function getKSTToday() {
  const now = new Date()
  const kst = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))
  kst.setHours(0, 0, 0, 0)
  return kst
}

function getDates(count = 60) {
  const base = getKSTToday()
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(base)
    d.setDate(d.getDate() + i)
    return d
  })
}

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function toStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const PAGE_SIZE = 7;

export function DateFilter({ selectedDate, onSelect }: DateFilterProps) {
  const [page, setPage] = useState(0);
  const allDates = getDates(60);
  const totalPages = Math.ceil(allDates.length / PAGE_SIZE);
  const dates = allDates.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="flex items-center gap-1 px-3">
      <button
        type="button"
        onClick={() => setPage((p) => Math.max(0, p - 1))}
        disabled={page === 0}
        className="w-7 h-7 flex items-center justify-center rounded-full transition-all active:scale-90 disabled:opacity-20"
      >
        <svg
          width="14"
          height="14"
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

      <div className="flex flex-1 justify-between">
        {dates.map((d) => {
          const str = toStr(d);
          const active = selectedDate === str;
          const day = d.getDay();
          const isSun = day === 0;
          const isSat = day === 6;

          return (
            <button
              key={str}
              type="button"
              onClick={() => onSelect(str)}
              className={`flex flex-col items-center gap-1 px-10 py-2.5 rounded-full transition-all duration-150 active:scale-90 ${
                active ? "bg-primary" : ""
              }`}
            >
              <p
                className={`text-[17px] font-bold font-pretendard leading-none ${
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
              <p
                className={`text-[11px] font-semibold font-pretendard ${
                  active
                    ? "text-white/80"
                    : isSun
                      ? "text-red-400"
                      : isSat
                        ? "text-blue-500"
                        : "text-[#8B95A1]"
                }`}
              >
                {DAYS[day]}
              </p>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
        disabled={page >= totalPages - 1}
        className="w-7 h-7 flex items-center justify-center rounded-full transition-all active:scale-90 disabled:opacity-20"
      >
        <svg
          width="14"
          height="14"
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
  );
}
