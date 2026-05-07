import { GenderType, SkillType } from "@/shared/types/Enum";

export interface UpdateUserRequest {
  profileImage?: string;
  name?: string;
  skillType?: SkillType;
  gender?: GenderType;
}
