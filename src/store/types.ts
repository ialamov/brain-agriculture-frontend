export interface User {
    id: string;
    email: string;
  }

export interface AuthState {
    status: 'idle' | 'loading' | 'authenticated' | 'error';
    accessToken?: string;
    user?: User;
    error?: string;
  }