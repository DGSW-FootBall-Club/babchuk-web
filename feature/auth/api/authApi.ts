import { axiosInstance } from "@/shared/lib/axios"
import { LoginRequest } from "../types/request/LoginRequest"
import { SignupRequest } from "../types/request/SignupRequest"
import { BaseResponse } from "@/shared/lib/BaseResponse"
import { LoginResponse } from "../types/response/LoginResponse"
import { ReissueResponse } from "../types/response/ReissueResponse"

export const authApi = {
  login: async (data: LoginRequest) => {
    const res = await axiosInstance.post<BaseResponse<LoginResponse>>('/auth/login', data)
    return res.data.data
  },

  signup: async (data: SignupRequest) => {
    const res = await axiosInstance.post<BaseResponse<String>>('/auth/signup', data)
    return res.data.data
  },

  reissue: async () => {
    const res = await axiosInstance.post<BaseResponse<ReissueResponse>>('/auth/reissue')
    return res.data.data
  },
}