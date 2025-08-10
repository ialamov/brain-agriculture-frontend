import type { AuthState, User } from '../types';

export const AUTH_SIGNIN_REQUEST = 'auth/SIGNIN_REQUEST'
export const AUTH_CREATE_PROFILE_REQUEST = 'auth/CREATE_PROFILE_REQUEST'
export const AUTH_SIGNIN_SUCCESS = 'auth/SIGNIN_SUCCESS'
export const AUTH_SIGNIN_FAILURE = 'auth/SIGNIN_FAILURE'
export const AUTH_LOGOUT         = 'auth/LOGOUT'
export const AUTH_HYDRATE        = 'auth/HYDRATE'
export const AUTH_PROFILE_LOADED = 'auth/PROFILE_LOADED'

export type AuthActions =
  | { type: typeof AUTH_SIGNIN_REQUEST }
  | { type: typeof AUTH_CREATE_PROFILE_REQUEST }
  | { type: typeof AUTH_SIGNIN_SUCCESS; payload: { accessToken: string; user: User } }
  | { type: typeof AUTH_SIGNIN_FAILURE; payload?: string }
  | { type: typeof AUTH_LOGOUT; payload?: string }
  | { type: typeof AUTH_HYDRATE; payload: Partial<{ accessToken: string; user: User; status: AuthState['status'] }> }
  | { type: typeof AUTH_PROFILE_LOADED; payload: User };

export const signInRequest = (): AuthActions => ({ type: AUTH_SIGNIN_REQUEST });
export const signInSuccess = (accessToken: string, user: User): AuthActions =>
  ({ type: AUTH_SIGNIN_SUCCESS, payload: { accessToken, user } });
export const signInFailure = (message?: string): AuthActions =>
  ({ type: AUTH_SIGNIN_FAILURE, payload: message });
export const logout = (reason?: string): AuthActions => ({ type: AUTH_LOGOUT, payload: reason });
export const hydrateAction = (
  payload: Partial<{ accessToken: string; user: User; status: AuthState['status'] }>
): AuthActions => ({ type: AUTH_HYDRATE, payload });
export const profileLoaded = (user: User): AuthActions => ({ type: AUTH_PROFILE_LOADED, payload: user });