import { axiosInstance } from "@/shared/lib/axios"
import { UserResponse } from "../types/response/UserResponse"
import { BaseResponse } from "@/shared/lib/BaseResponse"
import { UpdateUserRequest } from "../types/request/UpdateUserRequest"

export const userApi = {
  fetchMyInfo: async () => {
    const res = await axiosInstance.get<BaseResponse<UserResponse>>('/user/me')
    return res.data.data
  },

  fetchAllUsers: async () => {
    const res = await axiosInstance.get<BaseResponse<UserResponse[]>>('/user/all')
    return res.data.data
  },

  updateMyInfo: async (data: UpdateUserRequest) => {
    const res = await axiosInstance.patch<BaseResponse<UserResponse>>('/user/me', data)
    return res.data.data
  }
}