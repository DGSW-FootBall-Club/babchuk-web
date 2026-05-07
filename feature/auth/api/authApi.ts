import { axiosInstance } from "@/shared/lib/axios"
import { BaseResponse } from "@/shared/lib/BaseResponse"
import { DAuthRequest } from "../types/request/DAuthRequest"
import { DAuthResponse } from "../types/response/DAuthResponse"

export const authApi = {
  exchangeDAuthToken: async (accessToken: string) => {
    const res = await axiosInstance.post<BaseResponse<DAuthResponse>>(
      '/auth/dauth',
      { accessToken } satisfies DAuthRequest
    )
    return res.data.data
  },
}
