import { api } from '../api';
import type { LoginPayload, LoginResponse, CreateProfilePayload, CreateProfileResponse } from './types';

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('/auth/login', payload);
    return { user: response.data.user, accessToken: response.data.accessToken };
  } catch (error) {
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