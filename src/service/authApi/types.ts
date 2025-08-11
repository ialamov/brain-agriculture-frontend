import type { User } from "../../store/types";

export interface LoginPayload { email: string; password: string; }
export interface LoginResponse { accessToken: string; user: User; }
export interface CreateProfilePayload { email: string; password: string; }
export interface CreateProfileResponse { message: string; }
