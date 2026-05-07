"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/feature/user/api/userApi";
import { Button } from "@/components/Button";
import { ChoiceCard } from "@/components/ChoiceCard";
import { GENDER_OPTIONS, SKILL_OPTIONS } from "@/shared/constants/profileOptions";
import { GenderType, SkillType } from "@/shared/types/Enum";

export default function OnboardingPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [gender, setGender] = useState<GenderType | null>(null);
  const [skill, setSkill] = useState<SkillType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!gender || !skill || isLoading) return;
    try {
      setIsLoading(true);
      await userApi.updateMyInfo({ gender, skillType: skill });
      await queryClient.invalidateQueries({ queryKey: ["myInfo"] });
      router.replace("/");
    } catch (e: any) {
      alert(e.response?.data?.message ?? "저장에 실패했어요");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-8 md:px-10 pt-12 pb-8 bg-background">
      <div className="mb-10">
        <p className="text-2xl md:text-3xl font-rocket text-foreground">
          환영해요!
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          시작 전에 두 가지만 알려주세요
        </p>
      </div>

      <div className="mb-8">
        <p className="text-base font-semibold text-foreground mb-4">성별</p>
        <div className="grid grid-cols-2 gap-3 p-2">
          {GENDER_OPTIONS.map((opt) => (
            <ChoiceCard
              key={opt.value}
              label={opt.label}
              icon={opt.icon}
              selected={gender === opt.value}
              onClick={() => setGender(opt.value)}
            />
          ))}
        </div>
      </div>

      <div
        className="transition-all duration-500 ease-out overflow-hidden"
        style={{
          transform: gender ? "translateY(0)" : "translateY(40px)",
          opacity: gender ? 1 : 0,
          maxHeight: gender ? "420px" : "0px",
        }}
      >
        <div className="mb-12">
          <p className="text-base font-semibold text-foreground mb-4">
            축구 실력
          </p>
          <div className="grid grid-cols-3 gap-3 p-2">
            {SKILL_OPTIONS.map((opt) => (
              <ChoiceCard
                key={opt.value}
                label={opt.label}
                icon={opt.icon}
                selected={skill === opt.value}
                onClick={() => setSkill(opt.value)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Button
          onClick={handleSubmit}
          disabled={!gender || !skill || isLoading}
        >
          {isLoading ? "저장 중..." : "완료"}
        </Button>
      </div>
    </div>
  );
}
