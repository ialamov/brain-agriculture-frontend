import type { ThunkAction } from 'redux-thunk';
import type { AnyAction } from 'redux';
import { login } from '../../service/authApi';
import {
  signInRequest, signInSuccess, signInFailure,
  hydrateAction
} from './actions'; 
import rootReducer from '../root-reducer';   
import type { User } from '../types';

type RootState = ReturnType<typeof rootReducer>;

export const STORAGE_KEY = 'auth@simple';

function saveToStorage(partial: Partial<{ accessToken: string; user: User; status: string }>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(partial));
}
export function readFromStorage(): Partial<{ accessToken: string; user: User; status: string }> | undefined {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || undefined; }
  catch { return undefined; }
}

export const signIn = (email: string, password: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      dispatch(signInRequest());
      const { accessToken, user } = await login({ email, password });
      dispatch(signInSuccess(accessToken, user));
      saveToStorage({ accessToken, user, status: 'authenticated' });
    } catch (err: any) {
      dispatch(signInFailure(err?.response?.data?.message || err?.message));
    }
  };

export const hydrate = (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    const persisted = readFromStorage();
    if (persisted?.status === 'authenticated') {
      dispatch(hydrateAction({
        accessToken: persisted.accessToken,
        user: persisted.user,
        status: persisted.status
      }));
    }
  };