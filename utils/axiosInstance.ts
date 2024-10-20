import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
    AxiosHeaders,
  } from 'axios'
  import { getCookie, setCookie, deleteCookie } from 'cookies-next'
  import { GetServerSidePropsContext, NextPageContext } from 'next'
  
  interface TokenRefreshResponse {
    jwtToken: string
    refreshToken: string
  }
  
  interface FailedRequest {
    resolve: (token: string | null) => void
    reject: (error: any) => void
  }
  
  interface InternalAxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
    _retry?: boolean
  }
  
  let isRefreshing = false
  let failedQueue: FailedRequest[] = []
  
  const processQueue = (error: any, token: string | null = null): void => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error)
      } else {
        prom.resolve(token)
      }
    })
    failedQueue = []
  }
  
  export const createAxiosInstance = (
    ctx?: GetServerSidePropsContext | NextPageContext
  ): AxiosInstance => {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set your API base URL here
    })
  
    // Request interceptor to attach the JWT token to headers
    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = getCookie('jwtToken', { req: ctx?.req, res: ctx?.res }) as string | undefined
  
        if (token) {
          // Ensure headers are AxiosHeaders instance
          if (!config.headers) {
            config.headers = new AxiosHeaders()
          } else if (!(config.headers instanceof AxiosHeaders)) {
            config.headers = new AxiosHeaders(config.headers)
          }
  
          // Set the Authorization header
          config.headers.set('Authorization', `Bearer ${token}`)
        }
  
        return config
      },
      (error: any) => Promise.reject(error)
    )
  
    // Response interceptor to handle token refreshing
    instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfigWithRetry
  
        // Check if error is due to an expired token
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          if (isRefreshing) {
            return new Promise<string | null>((resolve, reject) => {
              failedQueue.push({ resolve, reject })
            })
              .then((token) => {
                if (originalRequest.headers && token) {
                  originalRequest.headers['Authorization'] = `Bearer ${token}`
                }
                return instance(originalRequest)
              })
              .catch((err) => Promise.reject(err))
          }
  
          originalRequest._retry = true
          isRefreshing = true
  
          const refreshToken = getCookie('refreshToken', { req: ctx?.req, res: ctx?.res }) as string | undefined
  
          if (!refreshToken) {
            // No refresh token log out user or handle accordingly
            deleteCookie('jwtToken', { req: ctx?.req, res: ctx?.res })
            deleteCookie('refreshToken', { req: ctx?.req, res: ctx?.res })
            isRefreshing = false
            return Promise.reject(error)
          }
  
          try {
            const { data } = await instance.post<TokenRefreshResponse>(
              '/auth/refresh-token',
              { refreshToken }
            ) // Adjust the endpoint as per your API
  
            setCookie('jwtToken', data.jwtToken, { req: ctx?.req, res: ctx?.res, path: '/' })
            setCookie('refreshToken', data.refreshToken, { req: ctx?.req, res: ctx?.res, path: '/' })
  
            // Retry the original request with the new token
            originalRequest.headers['Authorization'] = `Bearer ${data.jwtToken}`
  
            return instance(originalRequest)
          } catch (err) {
            processQueue(err, null)
            deleteCookie('jwtToken', { req: ctx?.req, res: ctx?.res })
            deleteCookie('refreshToken', { req: ctx?.req, res: ctx?.res })
            return Promise.reject(err)
          } finally {
            isRefreshing = false
          }
        }
  
        return Promise.reject(error)
      }
    )
  
    return instance
  }
  