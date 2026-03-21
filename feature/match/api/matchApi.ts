import { axiosInstance } from '@/shared/lib/axios'
import { BaseResponse } from '@/shared/lib/BaseResponse'
import { CreateMatchRequest } from '../types/request/CreateMatchRequest'
import { MatchListResponse, MatchDetailResponse } from '../types/response/MatchResponse'
import { JoinMatchRequest } from '../types/request/JoinMatchRequest'

export const matchApi = {
  createMatch: async (data: CreateMatchRequest) => { // 매치생성
    const res = await axiosInstance.post<BaseResponse<String>>('/match', data)
    return res.data.data
  },

  fetchMatches: async () => { // 매치리스트조회
    const res = await axiosInstance.get<BaseResponse<MatchListResponse[]>>('/match')
    return res.data.data
  },

  fetchMatch: async (matchId: number) => { // 매치상세조회
    const res = await axiosInstance.get<BaseResponse<MatchDetailResponse>>(`/match/${matchId}`)
    return res.data.data
  },

  patchMatch: async (matchId: number, data: CreateMatchRequest) => { // 매치수정
    const res = await axiosInstance.patch<BaseResponse<String>>(`/match/${matchId}`, data)
    return res.data.data
  },

  joinMatch: async (matchId: number, data: JoinMatchRequest) => { // 매치참가
    const res = await axiosInstance.post<BaseResponse<String>>(`/match/${matchId}/join`, data)
    return res.data.data
  },

  cancelMatch: async (matchId: number) => { // 매치참가취소
    const res = await axiosInstance.delete<BaseResponse<String>>(`/match/${matchId}/cancel`)
    return res.data.data
  },

  deleteMatch: async (matchId: number) => { // 매치삭제
    const res = await axiosInstance.delete<BaseResponse<String>>(`/match/${matchId}`)
    return res.data.data
  },

  fetchIsJoined: async (matchId: number) => { // 매치참가여부조회
    const res = await axiosInstance.get<BaseResponse<boolean>>(`/match/${matchId}/joined`)
    return res.data.data
  },
}