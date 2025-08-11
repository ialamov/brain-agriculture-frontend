import type { Summary, KV, LandUse } from '../../service/metrics/types';

export const HOME_SUMMARY_REQ = 'home/SUMMARY_REQ' as const;
export const HOME_SUMMARY_OK  = 'home/SUMMARY_OK'  as const;
export const HOME_SUMMARY_ERR = 'home/SUMMARY_ERR' as const;

export const HOME_STATE_REQ = 'home/STATE_REQ' as const;
export const HOME_STATE_OK  = 'home/STATE_OK'  as const;
export const HOME_STATE_ERR = 'home/STATE_ERR' as const;

export const HOME_CROP_REQ = 'home/CROP_REQ' as const;
export const HOME_CROP_OK  = 'home/CROP_OK'  as const;
export const HOME_CROP_ERR = 'home/CROP_ERR' as const;

export const HOME_LAND_REQ = 'home/LAND_REQ' as const;
export const HOME_LAND_OK  = 'home/LAND_OK'  as const;
export const HOME_LAND_ERR = 'home/LAND_ERR' as const;

export type HomeActions =
  | { type: typeof HOME_SUMMARY_REQ }
  | { type: typeof HOME_SUMMARY_OK; payload: Summary }
  | { type: typeof HOME_SUMMARY_ERR; payload: string }
  | { type: typeof HOME_STATE_REQ; payload: { entity: string } }
  | { type: typeof HOME_STATE_OK;  payload: { entity: string; data: KV[] } }
  | { type: typeof HOME_STATE_ERR; payload: { entity: string; error: string } }
  | { type: typeof HOME_CROP_REQ;  payload: { season?: string } }
  | { type: typeof HOME_CROP_OK;   payload: { season?: string; data: KV[] } }
  | { type: typeof HOME_CROP_ERR;  payload: { season?: string; error: string } }
  | { type: typeof HOME_LAND_REQ }
  | { type: typeof HOME_LAND_OK;   payload: LandUse }
  | { type: typeof HOME_LAND_ERR;  payload: string };