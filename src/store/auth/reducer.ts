import type { AuthState } from "../types";
import { type AuthActions, AUTH_SIGNIN_REQUEST, AUTH_SIGNIN_SUCCESS, AUTH_SIGNIN_FAILURE, AUTH_LOGOUT, AUTH_HYDRATE, AUTH_PROFILE_LOADED } from "./actions";

const initialState: AuthState = { 
  status: 'idle',
  accessToken: undefined,
  user: {
    id: '',
    email: '',
  },
  error: undefined,
 };

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AUTH_SIGNIN_REQUEST:
      return { ...state, status: 'loading', error: undefined };

    case AUTH_SIGNIN_SUCCESS:
      return {
        ...state,
        status: 'authenticated',
        accessToken: action.payload.accessToken,
        user: action.payload.user,
        error: undefined
      };

    case AUTH_SIGNIN_FAILURE:
      return { ...state, status: 'error', error: action.payload || 'Sign-in failed' };

    case AUTH_LOGOUT:
      return { status: 'idle', error: action.payload };

    case AUTH_HYDRATE:
      return {
        ...state,
        status: action.payload?.status ?? state.status,
        accessToken: action.payload?.accessToken ?? state.accessToken,
        user: action.payload?.user ?? state.user
      };

    case AUTH_PROFILE_LOADED:
      return { ...state, user: action.payload };

    default:
      return state;
  }
}