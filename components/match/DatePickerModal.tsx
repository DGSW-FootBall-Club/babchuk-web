'use client'

import { useState } from 'react'
import { CenterModal } from '@/components/CenterModal'

interface DatePickerModalProps {
  value: string
  onChange: (date: string) => void
  onClose: () => void
}

export function DatePickerModal({ value, onChange, onClose }: DatePickerModalProps) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const selected = value ? new Date(value) : null

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const days = ['일', '월', '화', '수', '목', '금', '토']

  const handlePrev = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(v => v - 1) }
    else setViewMonth(m => m - 1)
  }

  const handleNext = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(v => v + 1) }
    else setViewMonth(m => m + 1)
  }

  const handleSelect = (day: number) => {
    const date = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    onChange(date)
    onClose()
  }

  const isSelected = (day: number) =>
    selected?.getFullYear() === viewYear &&
    selected?.getMonth() === viewMonth &&
    selected?.getDate() === day

  const isToday = (day: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === day

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day)
    d.setHours(0, 0, 0, 0)
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return d < t
  }

  return (
    <CenterModal onClose={onClose}>
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between py-4">
          <button onClick={handlePrev} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F2F4F6] active:brightness-90">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#191F28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <p className="text-[16px] font-bold font-pretendard text-[#191F28]">{viewYear}년 {viewMonth + 1}월</p>
          <button onClick={handleNext} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F2F4F6] active:brightness-90">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#191F28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        <div className="grid grid-cols-7 mb-2">
          {days.map((d, i) => (
            <p key={d} className={`text-center text-[12px] font-medium font-pretendard py-1 ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-[#8B95A1]'}`}>{d}</p>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const past = isPast(day)
            const sel = isSelected(day)
            const tod = isToday(day)
            const isSun = (firstDay + i) % 7 === 0
            const isSat = (firstDay + i) % 7 === 6

            return (
              <button
                key={day}
                type="button"
                disabled={past}
                onClick={() => handleSelect(day)}
                className={`flex items-center justify-center h-9 rounded-full text-[13px] font-pretendard transition-all
                  ${sel ? 'bg-primary text-white font-bold' : ''}
                  ${!sel && tod ? 'border-2 border-primary text-primary font-bold' : ''}
                  ${!sel && !tod && isSun ? 'text-red-400' : ''}
                  ${!sel && !tod && isSat ? 'text-blue-400' : ''}
                  ${!sel && !tod && !isSun && !isSat ? 'text-[#191F28]' : ''}
                  ${past ? 'opacity-30 cursor-not-allowed' : 'active:brightness-90'}
                `}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    </CenterModal>
  )
}