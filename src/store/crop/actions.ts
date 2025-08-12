import type { Crop } from '../../service/agriculture/types';

export const CROP_LIST_REQ='crops/LIST_REQ' as const;
export const CROP_LIST_OK ='crops/LIST_OK'  as const;
export const CROP_LIST_ERR='crops/LIST_ERR' as const;

export type CropsActions =
  | { type: typeof CROP_LIST_REQ; payload: { farmId?:string; harvestId?:string; name?:string; page:number; pageSize:number } }
  | { type: typeof CROP_LIST_OK;  payload: { items: Crop[]; total:number; page:number; pageSize:number } }
  | { type: typeof CROP_LIST_ERR; payload: string };    