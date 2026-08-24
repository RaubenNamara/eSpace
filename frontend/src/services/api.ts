import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import type { ApiResponse } from '../types'

// import.meta.env.BASE_URL is '/eSpace/' in both dev (Vite's dev server proxies /eSpace/api
// itself, see vite.config.ts) and the production build (see vite.config.ts's `base`), so this
// resolves to '/eSpace/api' in both without a separate env var.
const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '') + '/api'

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  withCredentials: true, // Include cookies for session-based auth
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Add CSRF token if available
    const csrfToken = localStorage.getItem('csrf_token')
    if (csrfToken && config.headers) {
      config.headers['X-CSRF-Token'] = csrfToken
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status

      // Handle 401 Unauthorized
      if (status === 401) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('csrf_token')
        localStorage.removeItem('user')
        window.location.href = `${import.meta.env.BASE_URL}login`
      }

      // Handle 419 CSRF token mismatch
      if (status === 419) {
        // Refresh CSRF token
        return api.get('/auth/refresh').then((response) => {
          if (response.data.csrf_token) {
            localStorage.setItem('csrf_token', response.data.csrf_token)
            // Retry original request
            return api.request(error.config!)
          }
        })
      }

      // Handle 429 Rate limiting
      if (status === 429) {
        console.error('Rate limit exceeded')
      }
    }

    return Promise.reject(error)
  }
)

// API methods
export const apiService = {
  // Auth
  login: (identifier: string, password: string) =>
    api.post<ApiResponse>('/auth/login', { identifier, password }),
  
  register: (data: any) =>
    api.post<ApiResponse>('/auth/register', data),
  
  logout: () =>
    api.post<ApiResponse>('/auth/logout'),
  
  refresh: () =>
    api.post<ApiResponse>('/auth/refresh'),
  
  me: () =>
    api.get<ApiResponse>('/auth/me'),
  
  updateProfile: (data: any) =>
    api.put<ApiResponse>('/auth/profile', data),
  
  changePassword: (currentPassword: string, newPassword: string) =>
    api.put<ApiResponse>('/auth/password', { current_password: currentPassword, new_password: newPassword }),
  
  forgotPassword: (email: string) =>
    api.post<ApiResponse>('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, newPassword: string) =>
    api.post<ApiResponse>('/auth/reset-password', { token, password: newPassword, password_confirmation: newPassword }),

  // Generic CRUD
  get: <T = any>(url: string, params?: any, config?: AxiosRequestConfig) =>
    api.get<ApiResponse<T>>(url, { ...config, params }),

  post: <T = any>(url: string, data: any, config?: AxiosRequestConfig) =>
    api.post<ApiResponse<T>>(url, data, config),

  put: <T = any>(url: string, data: any, config?: AxiosRequestConfig) =>
    api.put<ApiResponse<T>>(url, data, config),

  patch: <T = any>(url: string, data: any, config?: AxiosRequestConfig) =>
    api.patch<ApiResponse<T>>(url, data, config),

  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    api.delete<ApiResponse<T>>(url, config),

  // File upload
  upload: <T = any>(url: string, file: File, onProgress?: (progress: number) => void) => {
    const formData = new FormData()
    formData.append('file', file)

    return api.post<ApiResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      }
    })
  }
}

export default api
