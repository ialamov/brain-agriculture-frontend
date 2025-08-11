import type { Farmer } from '../../pages/FarmersPage/types';
import {
  PRODUCERS_SET, PRODUCERS_ADD, PRODUCERS_UPDATE, PRODUCERS_REMOVE, type ProducersActions
} from './actions';

export type ProducersState = { items: Farmer[] };
const initial: ProducersState = { items: [] };

export function farmersReducer(
  state: ProducersState = initial,
  action: ProducersActions
): ProducersState {
  switch (action.type) {
    case PRODUCERS_SET:
      return { ...state, items: action.payload };

    case PRODUCERS_ADD:
      return { ...state, items: [action.payload, ...state.items] };

    case PRODUCERS_UPDATE:
      return {
        ...state,
        items: state.items.map(i => i.id === action.payload.id ? action.payload : i)
      };

    case PRODUCERS_REMOVE:
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };

    default:
      return state;
  }
}