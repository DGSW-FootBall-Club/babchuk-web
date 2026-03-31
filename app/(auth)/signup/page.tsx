"use client";

import { Input } from "@/components/Input";
import { OptionSelector } from "@/components/OptionSelector";
import { Button } from "@/components/Button";
import { BackButton } from "@/components/BackButton";
import { useSignup } from "@/feature/auth/hooks/useSignup";

const skillOptions = [
  { label: "초급", value: "BEGINNER" as const },
  { label: "중급", value: "INTERMEDIATE" as const },
  { label: "고수", value: "EXPERT" as const },
];

const genderOptions = [
  { label: "남자", value: "MALE" as const },
  { label: "여자", value: "FEMALE" as const },
];

function Required() {
  return <span className="text-red-500 ml-0.5">*</span>;
}

export default function SignupPage() {
  const {
    values,
    skill,
    setSkill,
    gender,
    setGender,
    preview,
    handleChange,
    handleImage,
    isValid,
    isLoading,
    handleSignup,
  } = useSignup();

  return (
    <div className="flex flex-col min-h-screen px-6 bg-white">
      <BackButton />

      <div className="mb-6 md:mb-8">
        <p className="text-2xl md:text-3xl font-rocket">회원가입</p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <label className="cursor-pointer">
          <div className="w-18 h-18 rounded-full bg-[#F2F4F6] flex items-center justify-center overflow-hidden border border-[#E5E8EB]">
            {preview ? (
              <img
                src={preview}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl text-[#8B95A1]">+</span>
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
            프로필 이미지 선택
            <span className="text-xs text-[#8B95A1] ml-1">(선택사항)</span>
          </p>
          <p className="text-xs text-[#8B95A1]">
            갤러리에서 사진을 선택하거나
            <br />
            카메라로 촬영하세요
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isValid) handleSignup();
        }}
      >
        <div className="flex flex-col gap-8 mb-8">
          <Input
            label={
              <>
                아이디 (7자 이상)
                <Required />
              </>
            }
            type="text"
            value={values.username}
            onChange={(v) => handleChange("username", v)}
          />
          <Input
            label={
              <>
                비밀번호 (영문+숫자 8자 이상)
                <Required />
              </>
            }
            type="password"
            value={values.password}
            onChange={(v) => handleChange("password", v)}
          />
          <Input
            label={
              <>
                이름
                <Required />
              </>
            }
            type="text"
            value={values.nickname}
            onChange={(v) => handleChange("nickname", v)}
          />
          <Input
            label={
              <>
                학번 (예: 3307)
                <Required />
              </>
            }
            type="number"
            value={values.grade}
            onChange={(v) => handleChange("grade", v)}
            maxLength={4}
          />
        </div>

        <div className="flex flex-col gap-6 mb-12">
          <div>
            <p className="text-sm font-semibold text-[#191F28] mb-3">
              축구 실력
              <Required />
            </p>
            <OptionSelector
              title=""
              options={skillOptions}
              selected={skill}
              onChange={setSkill}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#191F28] mb-3">
              성별
              <Required />
            </p>
            <OptionSelector
              title=""
              options={genderOptions}
              selected={gender}
              onChange={setGender}
            />
          </div>
        </div>

        <div className="mb-12">
          <Button type="submit" disabled={!isValid || isLoading}>
            {isLoading ? "처리 중..." : "회원가입"}
          </Button>
        </div>
      </form>
    </div>
  );
}
