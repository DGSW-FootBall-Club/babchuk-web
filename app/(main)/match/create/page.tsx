'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'
import { BackButton } from '@/components/BackButton'
import { Input } from '@/components/Input'
import { UserSelectModal } from '@/components/match/UserSelectModal'
import { DatePickerModal } from '@/components/match/DatePickerModal'
import { TimePickerModal, formatTime } from '@/components/match/TimePickerModal'
import { TeamSizePicker } from '@/components/match/TeamSizePicker'
import { useCreateMatch } from '@/feature/match/hooks/useCreateMatch'
import { UserResponse } from '@/feature/user/types/response/UserResponse'

type ModalType = 'date' | 'time' | 'captainA' | 'captainB' | null

export default function CreateMatchPage() {
  const { values, handleChange, isValid, isLoading, handleSubmit } = useCreateMatch()
  const [modal, setModal] = useState<ModalType>(null)
  const [captainA, setCaptainA] = useState<UserResponse | null>(null)
  const [captainB, setCaptainB] = useState<UserResponse | null>(null)
  const [endTime, setEndTime] = useState('')

  const handleSelectA = (user: UserResponse) => {
    setCaptainA(user)
    handleChange('teamACaptainId', user.id)
  }

  const handleSelectB = (user: UserResponse) => {
    setCaptainB(user)
    handleChange('teamBCaptainId', user.id)
  }

  const handleTimeConfirm = (start: string, end: string, duration: number) => {
    handleChange('matchTime', start)
    handleChange('durationMinutes', duration)
    setEndTime(end)
  }

  const formatDate = (date: string) => {
    if (!date) return ''
    const d = new Date(date)
    const days = ['일', '월', '화', '수', '목', '금', '토']
    return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()} (${days[d.getDay()]})`
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB]">
      <div className="px-5 bg-white">
        <BackButton />
      </div>

      <div className="px-6 py-4 bg-white mb-3">
        <p className="text-[28px] font-rocket">매치 생성</p>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); if (isValid) handleSubmit() }}
        className="flex flex-col gap-3 px-4 pb-12"
      >
        {/* 제목 */}
        <div className="bg-white rounded-2xl px-5 py-4">
          <p className="text-[13px] font-semibold font-pretendard text-[#8B95A1] mb-3">매치 제목</p>
          <Input label="예: 3월 21일 저녁 매치" type="text" value={values.title} onChange={v => handleChange('title', v)} />
        </div>

        {/* 날짜 / 시간 */}
        <div className="bg-white rounded-2xl px-5 py-4">
          <p className="text-[13px] font-semibold font-pretendard text-[#8B95A1] mb-3">
            날짜 · 시간 <span className="text-red-500">*</span>
          </p>
          <div className="flex items-center gap-2">
            {/* 날짜 버튼 */}
            <button
              type="button"
              onClick={() => setModal('date')}
              className="flex items-center justify-between bg-[#F8F9FB] rounded-xl px-4 py-3 active:brightness-90 transition-all"
              style={{ flex: '1.2' }}
            >
              <p className={`text-[13px] font-pretendard ${values.matchDate ? 'text-[#191F28] font-medium' : 'text-[#C4C9D1]'}`}>
                {values.matchDate ? formatDate(values.matchDate) : '날짜 선택'}
              </p>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4C9D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>

            {/* 시간 버튼 */}
            <button
              type="button"
              onClick={() => setModal('time')}
              className="flex items-center justify-between bg-[#F8F9FB] rounded-xl px-4 py-3 active:brightness-90 transition-all"
              style={{ flex: '1' }}
            >
              <p className={`text-[13px] font-pretendard ${values.matchTime ? 'text-[#191F28] font-medium' : 'text-[#C4C9D1]'}`}>
                {values.matchTime && endTime
                  ? `${formatTime(values.matchTime)} ~ ${formatTime(endTime)}`
                  : '시간 선택'
                }
              </p>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4C9D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          </div>
        </div>

        팀 인원
        <TeamSizePicker
          teamSize={values.teamSize}
          durationMinutes={values.durationMinutes}
          onTeamSizeChange={v => handleChange('teamSize', v)}
          onDurationChange={v => handleChange('durationMinutes', v)}
        />

        {/* 캡틴 */}
        <div className="bg-white rounded-2xl px-5 py-4">
          <p className="text-[13px] font-semibold font-pretendard text-[#8B95A1] mb-4">
            캡틴 선택 <span className="text-red-500">*</span>
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setModal('captainA')}
              className="flex flex-col items-center gap-2 bg-[#FFF0F0] rounded-2xl p-4 active:brightness-90 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 overflow-hidden flex items-center justify-center">
                {captainA
                  ? <img src={captainA.profileImage} alt={captainA.nickname} className="w-full h-full object-cover" />
                  : <p className="text-red-300 text-[22px]">?</p>
                }
              </div>
              <p className="text-[11px] text-red-400 font-pretendard font-semibold">A팀 캡틴</p>
              <p className="text-[13px] font-medium font-pretendard text-[#191F28]">
                {captainA ? captainA.nickname : '선택하기'}
              </p>
            </button>

            <button
              type="button"
              onClick={() => setModal('captainB')}
              className="flex flex-col items-center gap-2 bg-[#F0F4FF] rounded-2xl p-4 active:brightness-90 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 overflow-hidden flex items-center justify-center">
                {captainB
                  ? <img src={captainB.profileImage} alt={captainB.nickname} className="w-full h-full object-cover" />
                  : <p className="text-blue-300 text-[22px]">?</p>
                }
              </div>
              <p className="text-[11px] text-blue-400 font-pretendard font-semibold">B팀 캡틴</p>
              <p className="text-[13px] font-medium font-pretendard text-[#191F28]">
                {captainB ? captainB.nickname : '선택하기'}
              </p>
            </button>
          </div>
        </div>

        <Button type="submit" disabled={!isValid || isLoading}>
          {isLoading ? '생성 중...' : '매치 생성'}
        </Button>
      </form>

      {modal === 'date' && (
        <DatePickerModal
          value={values.matchDate}
          onChange={v => handleChange('matchDate', v)}
          onClose={() => setModal(null)}
        />
      )}
      {modal === 'time' && (
        <TimePickerModal
          startTime={values.matchTime}
          endTime={endTime}
          onConfirm={handleTimeConfirm}
          onClose={() => setModal(null)}
        />
      )}
      {modal === 'captainA' && (
        <UserSelectModal
          title="A팀 캡틴 선택"
          selectedId={captainA?.id ?? 0}
          excludeId={captainB?.id}
          onSelect={handleSelectA}
          onClose={() => setModal(null)}
        />
      )}
      {modal === 'captainB' && (
        <UserSelectModal
          title="B팀 캡틴 선택"
          selectedId={captainB?.id ?? 0}
          excludeId={captainA?.id}
          onSelect={handleSelectB}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}