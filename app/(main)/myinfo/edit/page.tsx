"use client";

import { BackButton } from "@/components/BackButton";
import { Input } from "@/components/Input";
import { OptionSelector } from "@/components/OptionSelector";
import { Button } from "@/components/Button";
import { useMyInfo } from "@/feature/user/hooks/useMyInfo";
import { useEditProfile } from "@/feature/user/hooks/useEditProfile";

const skillOptions = [
  { label: "초급", value: "BEGINNER" as const },
  { label: "중급", value: "INTERMEDIATE" as const },
  { label: "고수", value: "EXPERT" as const },
];

function Required() {
  return <span className="text-red-500 ml-0.5">*</span>;
}

function EditForm({
  user,
}: {
  user: NonNullable<ReturnType<typeof useMyInfo>["user"]>;
}) {
  const {
    nickname,
    setNickname,
    grade,
    setGrade,
    skill,
    setSkill,
    preview,
    handleImage,
    isValid,
    isLoading,
    handleSubmit,
  } = useEditProfile(user);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="px-5">
        <BackButton />
      </div>

      <div className="px-4 md:px-6 pt-2 pb-6 md:pb-8">
        <p className="text-2xl md:text-3xl font-rocket">프로필 수정</p>
      </div>

      <div className="flex items-center gap-4 px-4 md:px-6 mb-8">
        <label className="cursor-pointer">
          <div className="w-18 h-18 rounded-full bg-[#F2F4F6] flex items-center justify-center overflow-hidden border border-[#E5E8EB]">
            {preview ? (
              <img
                src={preview}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#C4C9D1">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />
        </label>
        <div>
          <p className="text-sm font-medium text-[#191F28]">
            프로필 이미지 변경
            <span className="text-xs text-[#8B95A1] ml-1">(선택사항)</span>
          </p>
          <p className="text-xs text-[#8B95A1]">탭하여 새 사진을 선택하세요</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isValid) handleSubmit();
        }}
        className="flex flex-col px-4 md:px-6 pb-16"
      >
        <div className="flex flex-col gap-8 mb-8">
          <Input
            label={
              <>
                이름 <Required />
              </>
            }
            type="text"
            value={nickname}
            onChange={setNickname}
          />
          <Input
            label={
              <>
                학번 (예: 3307) <Required />
              </>
            }
            type="number"
            value={grade}
            onChange={setGrade}
            maxLength={4}
          />
        </div>

        <div className="mb-12">
          <p className="text-sm font-semibold text-[#191F28] mb-3">
            축구 실력 <Required />
          </p>
          <OptionSelector
            title=""
            options={skillOptions}
            selected={skill}
            onChange={setSkill}
          />
        </div>

        <Button type="submit" disabled={!isValid || isLoading}>
          {isLoading ? "수정 중..." : "수정 완료"}
        </Button>
      </form>
    </div>
  );
}

export default function EditProfilePage() {
  const { user, isLoading } = useMyInfo();

  if (isLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <div className="px-5">
          <BackButton />
        </div>
        <div className="px-4 md:px-6 pt-2 pb-6">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return <EditForm user={user} />;
}
