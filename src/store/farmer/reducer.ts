import type { Farmer } from '../../service/agriculture/types';
import * as A from './action';

export type FarmersState = {
  items: Farmer[];
  total: number;
  page: number;
  pageSize: number;

  loading: boolean;
  error?: string;

  current: Farmer | null;
  getting: boolean;

  creating: boolean;
  updating: boolean;
  deleting: Record<string, boolean>; // id => true enquanto deleta
};

const initial: FarmersState = {
  items: [],
  total: 0,
  page: 1,
  pageSize: 20,

  loading: false,
  error: undefined,

  current: null,
  getting: false,

  creating: false,
  updating: false,
  deleting: {},
};

export function farmersReducer(state: FarmersState = initial, action: A.FarmersActions): FarmersState {
  switch (action.type) {
    case A.FARMERS_LIST_REQ:
      return { ...state, loading: true, error: undefined, page: action.payload.page, pageSize: action.payload.pageSize };
    case A.FARMERS_LIST_OK:
      return { ...state, loading: false, items: action.payload.items, total: action.payload.total,
               page: action.payload.page, pageSize: action.payload.pageSize };
    case A.FARMERS_LIST_ERR:
      return { ...state, loading: false, error: action.payload };

    case A.FARMERS_GET_REQ:
      return { ...state, getting: true, error: undefined, current: null };
    case A.FARMERS_GET_OK:
      return { ...state, getting: false, current: action.payload };
    case A.FARMERS_GET_ERR:
      return { ...state, getting: false, error: action.payload };

    case A.FARMERS_CREATE_REQ:
      return { ...state, creating: true, error: undefined };
    case A.FARMERS_CREATE_OK: {
      const items = [action.payload, ...state.items];
      return { ...state, creating: false, items, total: state.total + 1 };
    }
    case A.FARMERS_CREATE_ERR:
      return { ...state, creating: false, error: action.payload };

    case A.FARMERS_UPDATE_REQ:
      return { ...state, updating: true, error: undefined };
    case A.FARMERS_UPDATE_OK: {
      const updated = action.payload;
      const items = state.items.map(i => i.id === updated.id ? updated : i);
      const current = state.current?.id === updated.id ? updated : state.current;
      return { ...state, updating: false, items, current };
    }
    case A.FARMERS_UPDATE_ERR:
      return { ...state, updating: false, error: action.payload };

    case A.FARMERS_DELETE_REQ:
      return { ...state, deleting: { ...state.deleting, [action.payload.id]: true } };
    case A.FARMERS_DELETE_OK: {
      const { [action.payload.id]: _, ...rest } = state.deleting;
      return {
        ...state,
        deleting: rest,
        items: state.items.filter(i => i.id !== action.payload.id),
        total: Math.max(0, state.total - 1),
        current: state.current?.id === action.payload.id ? null : state.current,
      };
    }
    case A.FARMERS_DELETE_ERR: {
      const { [action.payload.id]: _, ...rest } = state.deleting;
      return { ...state, deleting: rest, error: action.payload.error };
    }

    default:
      return state;
  }
}