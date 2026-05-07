import { GenderType, SkillType } from "@/shared/types/Enum";

export const GENDER_OPTIONS: { label: string; value: GenderType; icon: string }[] = [
  { label: "남자", value: "MALE", icon: "/icons/male.svg" },
  { label: "여자", value: "FEMALE", icon: "/icons/female.svg" },
];

export const SKILL_OPTIONS: { label: string; value: SkillType; icon: string }[] = [
  { label: "초급", value: "BEGINNER", icon: "/icons/beginner.svg" },
  { label: "중급", value: "INTERMEDIATE", icon: "/icons/intermediate.svg" },
  { label: "고수", value: "EXPERT", icon: "/icons/expert.svg" },
];
