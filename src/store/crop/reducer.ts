import type { CropsState } from "./type";
import * as A from './actions';

const initial:CropsState = { items:[], total:0, page:1, pageSize:10, loading:false };

export function cropsReducer(state: CropsState = initial, action: A.CropsActions): CropsState {
    switch (action.type) {
      case A.CROP_LIST_REQ: return { ...state, loading:true, error: undefined, page:action.payload.page, pageSize:action.payload.pageSize };
      case A.CROP_LIST_OK:  return { ...state, loading:false, items:action.payload.items, total:action.payload.total, page:action.payload.page, pageSize:action.payload.pageSize };
      case A.CROP_LIST_ERR: return { ...state, loading:false, error: action.payload };
      default: return state;
    }
  }