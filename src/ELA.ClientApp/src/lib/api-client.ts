import axios, { type InternalAxiosRequestConfig } from 'axios';

import { env } from '@/config/env';
import { useAuthStore } from '@/stores/auth-store';

export const apiClient = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(authRequestInterceptor);

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = useAuthStore.getState().accessToken;

  config.headers = config.headers ?? {};

  if (token && config.headers.Authorization == null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers.Accept = config.headers.Accept ?? 'application/json';

  return config;
}

// Auto-refresh token on 401
let refreshing = false;
let queue: ((token?: string) => void)[] = [];

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const message = error.response?.data?.message || error.message;
    console.log('[API CLIENT] log: ', message);

    // toast.error('Error', {
    //   description: message,
    //   duration: 5000,
    // });

    const original = error.config;

    // Prevent infinite loop
    if (original.url.includes('/auth/refresh')) {
      return Promise.reject(error);
    }

    // Auto-refresh token on 401
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (!refreshing) {
        refreshing = true;

        try {
          const { data } = await apiClient.post('/auth/refresh');
          useAuthStore.getState().setAccessToken(data.accessToken);

          queue.forEach((cb) => cb(data.accessToken));
          queue = [];

          original.headers.Authorization = `Bearer ${data.accessToken}`;

          return apiClient(original);
        } catch (e) {
          // notify queued requests refresh failed
          queue.forEach((cb) => cb());
          queue = [];

          useAuthStore.getState().clearAuth();
          return Promise.reject(error);
        } finally {
          refreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        queue.push((token) => {
          if (!token) return reject(error);
          original.headers.Authorization = `Bearer ${token}`;
          resolve(apiClient(original));
        });
      });
    }

    return Promise.reject(error);
  }
);
