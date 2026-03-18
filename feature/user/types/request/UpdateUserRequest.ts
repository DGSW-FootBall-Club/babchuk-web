import { SkillType } from "@/shared/types/Enum";

export interface UpdateUserRequest {
  profileImage?: string;
  nickname?: string;
  grade?: number;
  skillType?: SkillType;
}