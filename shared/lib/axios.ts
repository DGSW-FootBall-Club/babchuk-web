import axios, {
  AxiosError,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios'
import { BaseResponse } from '@/shared/lib/BaseResponse'
import { ReissueResponse } from '@/feature/auth/types/response/ReissueResponse'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
})

axiosInstance.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

function clearTokensAndRedirect() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  window.location.href = '/'
}

// 동시에 여러 요청이 401을 받아도 재발급은 한 번만 수행한다.
let reissuePromise: Promise<string> | null = null

async function reissueAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
  if (!refreshToken) throw new Error('refreshToken이 없습니다')

  // 인터셉터 재귀를 피하려고 기본 axios로 직접 호출한다(공개 엔드포인트).
  const res = await axios.post<BaseResponse<ReissueResponse>>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/reissue`,
    { refreshToken },
    { timeout: 10000 },
  )

  const { accessToken, refreshToken: nextRefreshToken } = res.data.data
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  if (nextRefreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, nextRefreshToken)
  }
  return accessToken
}

function getReissuePromise(): Promise<string> {
  if (!reissuePromise) {
    reissuePromise = reissueAccessToken().finally(() => {
      reissuePromise = null
    })
  }
  return reissuePromise
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined

    const is401 = error.response?.status === 401

    if (
      is401 &&
      typeof window !== 'undefined' &&
      original &&
      !original._retry &&
      !original.url?.includes('/auth/reissue')
    ) {
      original._retry = true
      try {
        const accessToken = await getReissuePromise()
        original.headers = (original.headers ?? {}) as AxiosRequestHeaders
        original.headers.Authorization = `Bearer ${accessToken}`
        // 새 accessToken으로 원래 요청 재시도
        return axiosInstance(original)
      } catch {
        // 재발급까지 실패 → refreshToken도 만료된 것이므로 로그인으로
        clearTokensAndRedirect()
        return Promise.reject(error)
      }
    }

    if (is401 && typeof window !== 'undefined') {
      clearTokensAndRedirect()
    }

    return Promise.reject(error)
  },
)
