"use client";

import { useRouter } from "next/navigation";
import { useMyInfo } from "@/feature/user/hooks/useMyInfo";
import { SkillTypeLabel, GenderTypeLabel } from "@/shared/types/Enum";
import { Header } from "@/components/Header";
import { BackButton } from "@/components/BackButton";
import { LoadingSkeleton } from "@/components/myinfo/LoadingSkeleton";
import ThemeSwitch from "@/components/ThemeSwitch";

const menuItems = [
  { label: "이용약관", href: "#" },
  { label: "개인정보 처리방침", href: "#" },
  { label: "문의하기", href: "#" },
];

export default function MyInfoPage() {
  const router = useRouter();
  const { user, isLoading, handleLogout } = useMyInfo();

  if (isLoading) return <LoadingSkeleton />;
  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="px-4 md:px-5">
        <BackButton />
      </div>
      <Header title="MY" />

      <div className="flex flex-col md:flex-row flex-1 px-4 md:px-5 pb-4 gap-4">
        <div className="md:w-115 shrink-0 bg-background rounded-full p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-13 h-13 rounded-full bg-line overflow-hidden flex items-center justify-center">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="var(--color-placeholder)"
                  >
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                )}
              </div>
              <p className="text-xl font-bold text-foreground">
                {user.nickname}
              </p>
            </div>
            <button
              onClick={() => router.push("/myinfo/edit")}
              className="text-sm font-medium text-body border border-line px-3 py-1.5 rounded-lg active:scale-95 transition-all"
            >
              프로필 수정
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-subtle rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1.5">성별</p>
              <div className="flex items-center gap-2">
                <img
                  src={
                    user.gender === "MALE"
                      ? "/icons/male.svg"
                      : "/icons/female.svg"
                  }
                  alt={user.gender === "MALE" ? "male" : "female"}
                  width={16}
                  height={16}
                  className="mb-0.5"
                />
                <p className="text-base font-bold text-foreground">
                  {GenderTypeLabel[user.gender]}
                </p>
              </div>
            </div>
            <div className="bg-subtle rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1.5">축구 실력</p>
              <div className="flex items-center gap-2">
                <img
                  src={
                    user.skillType === "BEGINNER"
                      ? "/icons/beginner.svg"
                      : user.skillType === "INTERMEDIATE"
                        ? "/icons/intermediate.svg"
                        : "/icons/expert.svg"
                  }
                  alt={user.skillType}
                  width={30}
                  height={30}
                />
                <p className="text-base font-bold text-foreground">
                  {SkillTypeLabel[user.skillType]}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary rounded-xl p-5">
            <p className="text-xs text-white/70 mb-1">학번</p>
            <p className="text-2xl font-bold text-white">
              {String(user.grade).charAt(0)}학년 {String(user.grade).charAt(1)}
              반 {Number(String(user.grade).slice(2))}번
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <div className="bg-background rounded-2xl overflow-hidden">
            <p className="text-xs font-semibold text-muted-foreground px-5 pt-5 pb-2">
              환경설정
            </p>
            <div className="flex items-center justify-between px-5 py-4">
              <p className="text-base text-foreground">다크 모드</p>
              <ThemeSwitch />
            </div>
          </div>

          <div className="bg-background rounded-2xl overflow-hidden">
            <p className="text-xs font-semibold text-muted-foreground px-5 pt-5 pb-2">
              고객센터
            </p>
            {menuItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between px-5 py-4 ${index !== menuItems.length - 1 ? "border-b border-muted" : ""}`}
              >
                <p className="text-base text-foreground">{item.label}</p>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-foreground)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>
            ))}
          </div>

          <div className="bg-background rounded-2xl overflow-hidden">
            <button
              onClick={handleLogout}
              className="flex items-center justify-between px-5 py-4 w-full cursor-pointer"
            >
              <p className="text-base text-red-500">로그아웃</p>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-danger)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
