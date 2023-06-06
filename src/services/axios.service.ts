import { ENV_CONFIG } from '@/core/constants/app'
import { EStatusCode } from '@/core/constants/enum'
import axios, { type AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: ENV_CONFIG.API_URL,
  headers: {
    'content-type': 'application/json'
  }
})

instance.interceptors.request.use(
  async (config: any) => {
    const token = 'your token'
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    const statusCode = response?.data?.status_code

    switch (statusCode) {
      case EStatusCode.BAD_REQUEST:
        return
      case EStatusCode.NOT_FOUND:
        return

      case EStatusCode.INTERNAL_SERVER_ERROR:
        return

      default:
      // return
    }

    return response?.data
  },
  (error) => {
    return error
  }
)

const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => {
    return instance<T>(url, { method: 'get', url, ...config })
  },
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return instance<T>(url, { method: 'post', url, data, ...config })
  }
}

export default api
