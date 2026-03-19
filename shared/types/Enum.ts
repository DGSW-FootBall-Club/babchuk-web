export type SkillType = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'
export type GenderType = 'MALE' | 'FEMALE'

export const SkillTypeLabel = {
  BEGINNER: '초급',
  INTERMEDIATE: '중급',
  EXPERT: '고수',
} as const

export const GenderTypeLabel = {
  MALE: '남자',
  FEMALE: '여자',
} as const