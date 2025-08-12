import type { Farm } from '../../service/agriculture/types';

export const FARMS_LIST_REQ='farms/LIST_REQ' as const;  export const FARMS_LIST_OK='farms/LIST_OK' as const;  export const FARMS_LIST_ERR='farms/LIST_ERR' as const;
export const FARMS_CREATE_REQ='farms/CREATE_REQ' as const; export const FARMS_CREATE_OK='farms/CREATE_OK' as const; export const FARMS_CREATE_ERR='farms/CREATE_ERR' as const;
export const FARMS_UPDATE_REQ='farms/UPDATE_REQ' as const; export const FARMS_UPDATE_OK='farms/UPDATE_OK' as const; export const FARMS_UPDATE_ERR='farms/UPDATE_ERR' as const;
export const FARMS_DELETE_REQ='farms/DELETE_REQ' as const; export const FARMS_DELETE_OK='farms/DELETE_OK' as const; export const FARMS_DELETE_ERR='farms/DELETE_ERR' as const;

export type FarmsActions =
  | { type: typeof FARMS_LIST_REQ; payload: { search?: string; farmerId?: string; page:number; pageSize:number } }
  | { type: typeof FARMS_LIST_OK;  payload: { items: Farm[]; total:number; page:number; pageSize:number } }
  | { type: typeof FARMS_LIST_ERR; payload: string }
  | { type: typeof FARMS_CREATE_REQ; payload: Omit<Farm,'id'|'updatedAt'|'farmerName'> }
  | { type: typeof FARMS_CREATE_OK;  payload: Farm }
  | { type: typeof FARMS_CREATE_ERR; payload: string }
  | { type: typeof FARMS_UPDATE_REQ; payload: { id:string; patch: Partial<Omit<Farm,'id'>> } }
  | { type: typeof FARMS_UPDATE_OK;  payload: Farm }
  | { type: typeof FARMS_UPDATE_ERR; payload: string }
  | { type: typeof FARMS_DELETE_REQ; payload: { id:string } }
  | { type: typeof FARMS_DELETE_OK;  payload: { id:string } }
  | { type: typeof FARMS_DELETE_ERR; payload: { id:string; error:string } };