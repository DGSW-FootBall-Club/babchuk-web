'use client'

import { useMyInfo } from '@/feature/user/hooks/useMyInfo'
import { SkillTypeLabel, GenderTypeLabel } from '@/shared/types/Enum'
import { Header } from '@/components/Header'
import { LoadingSkeleton } from '@/components/myinfo/LoadingSkeleton'

const menuItems = [
  { label: '이용약관', href: '#' },
  { label: '개인정보 처리방침', href: '#' },
  { label: '문의하기', href: '#' },
]

export default function MyInfoPage() {
  const { user, isLoading, handleLogout } = useMyInfo()

  if (isLoading) return <LoadingSkeleton />
  if (!user) return null

  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff]">
      <Header title="MY" />

      <div className="flex flex-col md:flex-row flex-1 p-4 gap-4">
        <div className="md:w-115 shrink-0 bg-white rounded-2xl p-6 flex flex-col gap-4">

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-13 h-13 rounded-full bg-[#E5E8EB] overflow-hidden flex items-center justify-center">
                {user.profileImage
                  ? <img src={user.profileImage} alt="profile" className="w-full h-full object-cover" />
                  : <svg width="28" height="28" viewBox="0 0 24 24" fill="#C4C9D1"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                }
              </div>
              <p className="text-[20px] font-bold font-pretendard text-[#191F28]">{user.nickname}</p>
            </div>
            <button className="text-[13px] font-medium font-pretendard text-[#4B5563] border border-[#E5E8EB] px-3 py-1.5 rounded-lg">
              프로필 수정
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F8F9FB] rounded-xl p-4">
              <p className="text-[12px] text-[#8B95A1] font-pretendard mb-1">성별</p>
              <p className="text-[16px] font-bold font-pretendard text-[#191F28]">
                {GenderTypeLabel[user.gender]}
              </p>
            </div>
            <div className="bg-[#F8F9FB] rounded-xl p-4">
              <p className="text-[12px] text-[#8B95A1] font-pretendard mb-1">축구 실력</p>
              <p className="text-[16px] font-bold font-pretendard text-[#191F28]">
                {SkillTypeLabel[user.skillType]}
              </p>
            </div>
          </div>

          <div className="bg-primary rounded-xl p-5">
            <p className="text-[12px] text-white/70 font-pretendard mb-1">학번</p>
            <p className="text-[22px] font-bold font-pretendard text-white">{user.grade}학번</p>
          </div>

        </div>

        <div className="flex-1 flex flex-col gap-3">

          <div className="bg-white rounded-2xl overflow-hidden">
            <p className="text-[12px] font-semibold text-[#8B95A1] font-pretendard px-5 pt-5 pb-2">고객센터</p>
            {menuItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between px-5 py-4 ${index !== menuItems.length - 1 ? 'border-b border-[#F2F4F6]' : ''}`}
              >
                <p className="text-[15px] font-pretendard text-[#191F28]">{item.label}</p>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#191F28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </a>
            ))}
          </div>

          <div className="bg-white rounded-2xl overflow-hidden">
            <button
              onClick={handleLogout}
              className="flex items-center justify-between px-5 py-4 w-full"
            >
              <p className="text-[15px] font-pretendard text-red-500">로그아웃</p>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}