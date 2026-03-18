import { GenderType, SkillType } from "@/shared/types/Enum"

export interface UserResponse {
  id: number
  profileImage: string
  nickname: string
  grade: number
  skillType: SkillType
  gender: GenderType
}