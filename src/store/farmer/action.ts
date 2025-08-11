import type { Farmer } from '../../service/agriculture/types';

export const FARMERS_LIST_REQ   = 'farmers/LIST_REQ'   as const;
export const FARMERS_LIST_OK    = 'farmers/LIST_OK'    as const;
export const FARMERS_LIST_ERR   = 'farmers/LIST_ERR'   as const;

export const FARMERS_GET_REQ    = 'farmers/GET_REQ'    as const;
export const FARMERS_GET_OK     = 'farmers/GET_OK'     as const;
export const FARMERS_GET_ERR    = 'farmers/GET_ERR'    as const;

export const FARMERS_CREATE_REQ = 'farmers/CREATE_REQ' as const;
export const FARMERS_CREATE_OK  = 'farmers/CREATE_OK'  as const;
export const FARMERS_CREATE_ERR = 'farmers/CREATE_ERR' as const;

export const FARMERS_UPDATE_REQ = 'farmers/UPDATE_REQ' as const;
export const FARMERS_UPDATE_OK  = 'farmers/UPDATE_OK'  as const;
export const FARMERS_UPDATE_ERR = 'farmers/UPDATE_ERR' as const;

export const FARMERS_DELETE_REQ = 'farmers/DELETE_REQ' as const;
export const FARMERS_DELETE_OK  = 'farmers/DELETE_OK'  as const;
export const FARMERS_DELETE_ERR = 'farmers/DELETE_ERR' as const;

export type FarmersActions =
  | { type: typeof FARMERS_LIST_REQ;  payload: { search?: string; page: number; pageSize: number } }
  | { type: typeof FARMERS_LIST_OK;   payload: { items: Farmer[]; total: number; page: number; pageSize: number } }
  | { type: typeof FARMERS_LIST_ERR;  payload: string }

  | { type: typeof FARMERS_GET_REQ;   payload: { id: string } }
  | { type: typeof FARMERS_GET_OK;    payload: Farmer }
  | { type: typeof FARMERS_GET_ERR;   payload: string }

  | { type: typeof FARMERS_CREATE_REQ; payload: { name: string; doc?: string } }
  | { type: typeof FARMERS_CREATE_OK;  payload: Farmer }
  | { type: typeof FARMERS_CREATE_ERR; payload: string }

  | { type: typeof FARMERS_UPDATE_REQ; payload: { id: string; patch: { name?: string; cpf?: string; cnpj?: string } } }
  | { type: typeof FARMERS_UPDATE_OK;  payload: Farmer }
  | { type: typeof FARMERS_UPDATE_ERR; payload: string }

  | { type: typeof FARMERS_DELETE_REQ; payload: { id: string } }
  | { type: typeof FARMERS_DELETE_OK;  payload: { id: string } }
  | { type: typeof FARMERS_DELETE_ERR; payload: { id: string; error: string } };