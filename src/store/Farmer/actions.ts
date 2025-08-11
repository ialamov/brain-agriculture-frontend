import type { Farmer } from '../../pages/FarmersPage/types';

export const FARMERS_SET = 'farmers/SET' as const;
export const FARMERS_ADD = 'farmers/ADD' as const;
export const FARMERS_UPDATE = 'farmers/UPDATE' as const;
export const FARMERS_REMOVE = 'farmers/REMOVE' as const;

export type FarmersActions =
  | { type: typeof FARMERS_SET; payload: Farmer[] }
  | { type: typeof FARMERS_ADD; payload: Farmer }
  | { type: typeof FARMERS_UPDATE; payload: Farmer }
  | { type: typeof FARMERS_REMOVE; payload: string }; // id

export const setFarmers = (items: Farmer[]): FarmersActions => ({ type: FARMERS_SET, payload: items });
export const addFarmer = (p: Farmer): FarmersActions => ({ type: FARMERS_ADD, payload: p });
export const updateFarmer = (p: Farmer): FarmersActions => ({ type: FARMERS_UPDATE, payload: p });
export const removeFarmer = (id: string): FarmersActions => ({ type: FARMERS_REMOVE, payload: id });