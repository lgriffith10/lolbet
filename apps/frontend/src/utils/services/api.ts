import axios, { type AxiosResponse } from 'axios'

// TODO: add baseURL as base env var
export const api = axios.create({
  baseURL: 'http://localhost:3333/api',
})

export interface ApiResponse<T = unknown> {
  data: T | null
  status: number
  message?: string
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosResponse) => {
    switch (error.status) {
      case 401:
        localStorage.removeItem('token')
        window.location.pathname = '/login'
        break
      // TODO: Add forbidden status page
      case 403:
      default:
        break
    }

    return Promise.reject(error)
  },
)

export async function unwrap<T>(
  promise: Promise<AxiosResponse<ApiResponse<T>>>,
): Promise<T | null> {
  const response = await promise
  const { data, status, message } = response.data

  if (status >= 400) {
    throw new Error(message ?? `HTTP ${status}`)
  }

  return data
}
