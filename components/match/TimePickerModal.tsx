'use client'

import { useState } from 'react'
import { CenterModal } from '@/components/CenterModal'

interface TimePickerModalProps {
  startTime: string
  endTime: string
  onConfirm: (start: string, end: string, duration: number) => void
  onClose: () => void
}

const timeToMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export const formatTime = (time: string) => {
  const [h, m] = time.split(':').map(Number)
  const ampm = h < 12 ? '오전' : '오후'
  const hour = h === 0 ? 12 : h > 12 ? h - 12 : h
  return `${ampm} ${hour}:${String(m).padStart(2, '0')}`
}

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
const minutes = ['00', '10', '20', '30', '40', '50']

export function TimePickerModal({ startTime, endTime, onConfirm, onClose }: TimePickerModalProps) {
  const [tab, setTab] = useState<'start' | 'end'>('start')
  const [start, setStart] = useState(startTime || '15:00')
  const [end, setEnd] = useState(endTime || '16:00')

  const currentHour = tab === 'start' ? start.split(':')[0] : end.split(':')[0]
  const currentMinute = tab === 'start' ? start.split(':')[1] : end.split(':')[1]

  const setHour = (h: string) => {
    if (tab === 'start') setStart(`${h}:${start.split(':')[1]}`)
    else setEnd(`${h}:${end.split(':')[1]}`)
  }

  const setMinute = (m: string) => {
    if (tab === 'start') setStart(`${start.split(':')[0]}:${m}`)
    else setEnd(`${end.split(':')[0]}:${m}`)
  }

  const handleConfirm = () => {
    const duration = timeToMinutes(end) - timeToMinutes(start)
    if (duration <= 0) {
      alert('종료 시간이 시작 시간보다 늦어야 해요')
      return
    }
    onConfirm(start, end, duration)
    onClose()
  }

  return (
    <CenterModal onClose={onClose}>
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between py-4">
          <p className="text-[17px] font-bold font-pretendard text-[#191F28]">시간 선택</p>
          <button onClick={handleConfirm} className="text-[15px] font-semibold font-pretendard text-primary active:opacity-60">확인</button>
        </div>

        {/* 탭 */}
        <div className="grid grid-cols-2 bg-[#F2F4F6] rounded-2xl p-1 mb-5">
          {(['start', 'end'] as const).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`py-2.5 rounded-xl text-[13px] font-semibold font-pretendard transition-all ${
                tab === t ? 'bg-white text-[#191F28] shadow-sm' : 'text-[#8B95A1]'
              }`}
            >
              {t === 'start' ? `시작 ${formatTime(start)}` : `종료 ${formatTime(end)}`}
            </button>
          ))}
        </div>

        {/* 시간 그리드 */}
        <div className="flex gap-3">
          {/* 시 */}
          <div className="flex-1">
            <p className="text-[11px] text-[#8B95A1] font-pretendard text-center mb-2">시</p>
            <div className="grid grid-cols-4 gap-1.5">
              {hours.map(h => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHour(h)}
                  className={`h-9 rounded-xl text-[13px] font-pretendard font-medium transition-all active:scale-95 ${
                    currentHour === h ? 'bg-primary text-white' : 'bg-[#F2F4F6] text-[#191F28]'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* 분 */}
          <div className="w-[80px]">
            <p className="text-[11px] text-[#8B95A1] font-pretendard text-center mb-2">분</p>
            <div className="flex flex-col gap-1.5">
              {minutes.map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMinute(m)}
                  className={`h-9 rounded-xl text-[13px] font-pretendard font-medium transition-all active:scale-95 ${
                    currentMinute === m ? 'bg-primary text-white' : 'bg-[#F2F4F6] text-[#191F28]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CenterModal>
  )
}