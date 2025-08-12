import type { Harvest } from '../../service/agriculture/types';
import * as A from './actions';

export type HarvestsState = {
  items: Harvest[];
  total: number;
  page: number;
  pageSize: number;

  loading: boolean;
  creating: boolean;
  updating: boolean;
  deleting: Record<string, boolean>;
  error?: string;
};

const initial: HarvestsState = {
  items: [],
  total: 0,
  page: 1,
  pageSize: 20,

  loading: false,
  creating: false,
  updating: false,
  deleting: {},
};

export function harvestsReducer(state: HarvestsState = initial, action: A.HarvestsActions): HarvestsState {
  switch (action.type) {
    case A.HARV_LIST_REQ:
      return { ...state, loading: true, error: undefined, page: action.payload.page, pageSize: action.payload.pageSize };
    case A.HARV_LIST_OK:
      return { ...state, loading: false, items: action.payload.items, total: action.payload.total,
               page: action.payload.page, pageSize: action.payload.pageSize };
    case A.HARV_LIST_ERR:
      return { ...state, loading: false, error: action.payload };

    case A.HARV_CREATE_REQ:
      return { ...state, creating: true, error: undefined };
    case A.HARV_CREATE_OK:
      return { ...state, creating: false, items: [action.payload, ...state.items], total: state.total + 1 };
    case A.HARV_CREATE_ERR:
      return { ...state, creating: false, error: action.payload };

    case A.HARV_UPDATE_REQ:
      return { ...state, updating: true, error: undefined };
    case A.HARV_UPDATE_OK:
      return { ...state, updating: false, items: state.items.map(h => h.id === action.payload.id ? action.payload : h) };
    case A.HARV_UPDATE_ERR:
      return { ...state, updating: false, error: action.payload };

    case A.HARV_DELETE_REQ:
      return { ...state, deleting: { ...state.deleting, [action.payload.id]: true } };
    case A.HARV_DELETE_OK: {
      const { [action.payload.id]: _, ...rest } = state.deleting;
      return { ...state, deleting: rest, items: state.items.filter(h => h.id !== action.payload.id), total: Math.max(0, state.total - 1) };
    }
    case A.HARV_DELETE_ERR: {
      const { [action.payload.id]: _, ...rest } = state.deleting;
      return { ...state, deleting: rest, error: action.payload.error };
    }

    default:
      return state;
  }
}