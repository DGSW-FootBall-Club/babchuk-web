import { GenderType, SkillType } from "@/shared/types/Enum"

export interface SignupRequest {
  profileImage?: string
  username: string
  password: string
  nickname: string
  grade: number
  skillType: SkillType
  gender: GenderType
}