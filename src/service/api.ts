import axios from 'axios';
import type { Store } from 'redux';
import { logout } from '../store/auth/actions';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  timeout: 15000,
});

export function attachInterceptors(store: Store) {
  api.interceptors.request.use((config) => {
    const state: any = store.getState();
    const token = state.auth?.accessToken;
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error?.response?.status === 401) {
        store.dispatch(logout('Unauthorized'));
      }
      return Promise.reject(error);
    }
  );
}