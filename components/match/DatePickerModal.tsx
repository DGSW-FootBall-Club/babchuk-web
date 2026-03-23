'use client'

import { useState } from 'react'
import { CenterModal } from '@/components/CenterModal'

interface DatePickerModalProps {
  value: string
  onChange: (date: string) => void
  onClose: () => void
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토']

export function DatePickerModal({ value, onChange, onClose }: DatePickerModalProps) {
  const today = new Date()
  const init = value ? new Date(value) : today
  const [viewYear, setViewYear] = useState(init.getFullYear())
  const [viewMonth, setViewMonth] = useState(init.getMonth())
  const [selected, setSelected] = useState(value)

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const toStr = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

  const isToday = (d: number) =>
    d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()

  const isSelected = (d: number) => selected === toStr(viewYear, viewMonth, d)

  const isPast = (d: number) => {
    const date = new Date(viewYear, viewMonth, d)
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return date < todayStart
  }

  const handleSelect = (d: number) => {
    if (isPast(d)) return
    setSelected(toStr(viewYear, viewMonth, d))
  }

  const handleConfirm = () => {
    if (selected) { onChange(selected); onClose() }
  }

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let i = 1; i <= daysInMonth; i++) cells.push(i)

  return (
    <CenterModal onClose={onClose}>
      <div className="px-5 pt-6 pb-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-lg font-bold text-[#191F28]">
            {viewYear}년 {viewMonth + 1}월
          </p>
          <div className="flex gap-1.5">
            <button
              onClick={prevMonth}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150 active:scale-90 active:bg-[#F2F4F6]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B95A1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={nextMonth}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150 active:scale-90 active:bg-[#F2F4F6]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B95A1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 mb-2">
          {DAYS.map((d, i) => (
            <div key={d} className="flex items-center justify-center h-8">
              <p className={`text-xs font-semibold ${
                i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-[#C4C9D1]'
              }`}>{d}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1 mb-5">
          {cells.map((d, idx) => {
            if (!d) return <div key={`empty-${idx}`} />
            const past = isPast(d)
            const sel = isSelected(d)
            const tod = isToday(d)
            const col = idx % 7

            return (
              <button
                key={d}
                type="button"
                onClick={() => handleSelect(d)}
                disabled={past}
                className="flex items-center justify-center transition-all duration-150 active:scale-75"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200"
                  style={{ backgroundColor: sel ? 'var(--color-primary)' : 'transparent' }}
                >
                  <p className={`text-sm font-medium ${
                    past ? 'text-[#E5E8EB]' :
                    sel ? 'text-white font-bold' :
                    tod ? 'text-primary font-bold' :
                    col === 0 ? 'text-red-400' :
                    col === 6 ? 'text-blue-400' :
                    'text-[#191F28]'
                  }`}>
                    {d}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        <button
          onClick={handleConfirm}
          disabled={!selected}
          className="w-full py-4 rounded-2xl text-white font-semibold text-base transition-all duration-150 active:scale-95 active:brightness-90 disabled:opacity-40"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          선택
        </button>
      </div>
    </CenterModal>
  )
}