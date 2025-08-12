import type { Farm } from '../../service/agriculture/types';
import * as A from './actions';

export type FarmsState = {
  items: Farm[]; total:number; page:number; pageSize:number;
  loading:boolean; creating:boolean; updating:boolean; deleting:Record<string,boolean>;
  error?:string;
};
const initial: FarmsState = { 
  items: [], 
  total: 0, 
  page: 1, 
  pageSize: 20, 
  loading: false, 
  creating: false, 
  updating: false, 
  deleting: {} 
};

export function farmsReducer(state: FarmsState = initial, action: A.FarmsActions): FarmsState {
  // Safety check: ensure state.items is always an array
  const safeState = {
    ...state,
    items: Array.isArray(state.items) ? state.items : []
  };
  
  switch(action.type){
    case A.FARMS_LIST_REQ: return { ...safeState, loading:true, error:undefined, page:action.payload.page, pageSize:action.payload.pageSize };
    case A.FARMS_LIST_OK:  
      return { ...safeState, loading:false, items:action.payload.items, total:action.payload.total, page:action.payload.page, pageSize:action.payload.pageSize };
    case A.FARMS_LIST_ERR: return { ...safeState, loading:false, error:action.payload };

    case A.FARMS_CREATE_REQ: return { ...safeState, creating:true, error:undefined };
    case A.FARMS_CREATE_OK:  return { ...safeState, creating:false, items:[action.payload, ...safeState.items], total:safeState.total+1 };
    case A.FARMS_CREATE_ERR: return { ...safeState, creating:false, error:action.payload };

    case A.FARMS_UPDATE_REQ: return { ...safeState, updating:true, error:undefined };
    case A.FARMS_UPDATE_OK:  return { ...safeState, updating:false, items: safeState.items.map(f => f.id===action.payload.id? action.payload : f) };
    case A.FARMS_UPDATE_ERR: return { ...safeState, updating:false, error:action.payload };

    case A.FARMS_DELETE_REQ: return { ...safeState, deleting:{...safeState.deleting, [action.payload.id]:true} };
    case A.FARMS_DELETE_OK:  { const { [action.payload.id]:_, ...rest } = safeState.deleting; return { ...safeState, deleting:rest, items: safeState.items.filter(f=>f.id!==action.payload.id), total: Math.max(0, safeState.total-1) }; }
    case A.FARMS_DELETE_ERR: { const { [action.payload.id]:_, ...rest } = safeState.deleting; return { ...safeState, deleting:rest, error:action.payload.error }; }

    default: return state;
  }
}