import { axiosInstance } from "@/shared/lib/axios";
import { BaseResponse } from "@/shared/lib/BaseResponse";
import { DAuthRequest } from "../types/request/DAuthRequest";
import { DAuthResponse } from "../types/response/DAuthResponse";
import { LoginRequest } from "../types/request/LoginRequest";
import { LoginResponse } from "../types/response/LoginResponse";
import { SignupRequest } from "../types/request/SignupRequest";

export const authApi = {
  exchangeDAuthToken: async (accessToken: string) => {
    const res = await axiosInstance.post<BaseResponse<DAuthResponse>>(
      "/auth/dauth",
      { accessToken } satisfies DAuthRequest,
    );
    return res.data.data;
  },

  login: async (data: LoginRequest) => {
    const res = await axiosInstance.post<BaseResponse<LoginResponse>>(
      "/auth/login",
      data,
    );
    return res.data.data;
  },

  signup: async (data: SignupRequest) => {
    const res = await axiosInstance.post<BaseResponse<string>>(
      "/auth/signup",
      data,
    );
    return res.data.data;
  },
};
