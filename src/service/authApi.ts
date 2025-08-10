import { api } from './api';
import type { User } from '../store/types';

export interface LoginPayload { email: string; password: string; }
export interface LoginResponse { accessToken: string; user: User; }
export interface CreateProfilePayload { email: string; password: string; }
export interface CreateProfileResponse { message: string; }


export async function login(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('/auth/login', payload);
    return { user: response.data.user, accessToken: response.headers['access-token'] };
  } catch (error) {
    console.log('error', error);
    window.alert('Erro ao fazer login');
    throw new Error('Login failed');
  }
}

export async function register(payload: CreateProfilePayload): Promise<CreateProfileResponse> {
  const response = await api.post<CreateProfileResponse>('/auth/register', payload);
  if (response.status === 201) {
    return { message: 'User created' };
  }

  throw new Error('Registration failed');
}