import { AnnounceRequest } from "../types/request/announcementRequest";
import { axiosInstance } from "@/shared/lib/axios";
import { BaseResponse } from "@/shared/lib/BaseResponse";
import { AnnounceResponse } from "../types/response/announceResponse";

export const announcementApi = {
  createAnnouncement: async (data: AnnounceRequest) => {
    const res = await axiosInstance.post<BaseResponse<String>>('/announcement', data)
    return res.data.data
  },

  fetchAnnouncements: async () => {
    const res = await axiosInstance.get<BaseResponse<AnnounceResponse[]>>('/announcement')
    return res.data.data
  },

  patchAnnouncement: async (id: number, data: AnnounceRequest) => {
    const res = await axiosInstance.patch<BaseResponse<String>>(`/announcement/${id}`, data)
    return res.data.data
  },

  deleteAnnouncement: async (id: number) => {
    const res = await axiosInstance.delete<BaseResponse<String>>(`/announcement/${id}`)
    return res.data.data
  },
}