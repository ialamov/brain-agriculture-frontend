import type { Harvest } from '../../service/agriculture/types';

export const HARV_LIST_REQ='harvests/LIST_REQ' as const;
export const HARV_LIST_OK ='harvests/LIST_OK'  as const;
export const HARV_LIST_ERR='harvests/LIST_ERR' as const;

export const HARV_CREATE_REQ='harvests/CREATE_REQ' as const;
export const HARV_CREATE_OK ='harvests/CREATE_OK'  as const;
export const HARV_CREATE_ERR='harvests/CREATE_ERR' as const;

export const HARV_UPDATE_REQ='harvests/UPDATE_REQ' as const;
export const HARV_UPDATE_OK ='harvests/UPDATE_OK'  as const;
export const HARV_UPDATE_ERR='harvests/UPDATE_ERR' as const;

export const HARV_DELETE_REQ='harvests/DELETE_REQ' as const;
export const HARV_DELETE_OK ='harvests/DELETE_OK'  as const;
export const HARV_DELETE_ERR='harvests/DELETE_ERR' as const;

export type HarvestsActions =
  | { type: typeof HARV_LIST_REQ; payload: { search?:string; farmId?:string; season?:string; page:number; pageSize:number } }
  | { type: typeof HARV_LIST_OK;  payload: { items: Harvest[]; total:number; page:number; pageSize:number } }
  | { type: typeof HARV_LIST_ERR; payload: string }

  | { type: typeof HARV_CREATE_REQ; payload: { farmId:string; season:string; sowingDate?:string|null; harvestDate?:string|null; notes?:string } }
  | { type: typeof HARV_CREATE_OK;  payload: Harvest }
  | { type: typeof HARV_CREATE_ERR; payload: string }

  | { type: typeof HARV_UPDATE_REQ; payload: { id:string; patch: Partial<Omit<Harvest,'id'>> } }
  | { type: typeof HARV_UPDATE_OK;  payload: Harvest }
  | { type: typeof HARV_UPDATE_ERR; payload: string }

  | { type: typeof HARV_DELETE_REQ; payload: { id:string } }
  | { type: typeof HARV_DELETE_OK;  payload: { id:string } }
  | { type: typeof HARV_DELETE_ERR; payload: { id:string; error:string } };