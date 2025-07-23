import storageService from '@/services/functions/storageService';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// const baseURL = 'https://ms.devsbp.vestech.vn'; // TODO: Thay đổi baseURL phù hợp
const baseURL = 'https://api.ecowastehunt.asia';
const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
});

// Hàm set token cho axios (gọi sau khi login thành công)
export function setAuthToken(token?: string) {
  if (token) {
    api.defaults.headers.common['access-token'] = token;
  } else {
    delete api.defaults.headers.common['access-token'];
  }
}

// Request interceptor (thêm token nếu có)
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Token đã được set qua setAuthToken
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Response interceptor (xử lý lỗi chung)
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // TODO: Xử lý lỗi chung (ví dụ: thông báo, logout nếu 401,...)
    return Promise.reject(error);
  },
);

// Hàm gọi API dùng chung
export const get = <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  api.get<T>(url, config);
export const post = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) => api.post<T>(url, data, config);
export const put = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) => api.put<T>(url, data, config);
export const del = <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  api.delete<T>(url, config);

export const initAuthFromStorage = () => {
  const authData = storageService.getItem('auth');
  if (
    authData &&
    typeof authData === 'object' &&
    'accessToken' in authData &&
    typeof authData.accessToken === 'string'
  ) {
    setAuthToken(authData.accessToken);
  }
};

export default api;
