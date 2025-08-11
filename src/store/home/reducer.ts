import type { Summary, KV, LandUse } from '../../service/metrics/types';
import * as A from './actions';

export type HomeState = {
  summary?: Summary;
  byState: Record<'farmers'|'farms'|'harvests'|'crops', KV[]>;
  byCrop?: { season?: string; data: KV[] };
  landUse?: LandUse;
  status: 'idle'|'loading'|'ready'|'error';
  error?: string;
};
const initial: HomeState = {
  byState: { farmers:[], farms:[], harvests:[], crops:[] },
  status: 'idle',
};

export function homeReducer(state: HomeState = initial, action: A.HomeActions): HomeState {
  switch (action.type) {
    case A.HOME_SUMMARY_REQ:  
      return { 
          ...state, 
          status:'loading', 
          error: undefined 
      };
    case A.HOME_SUMMARY_OK:   
      return { 
          ...state, 
          summary: action.payload, 
          status:'ready' 
      };
    case A.HOME_SUMMARY_ERR:  
        return { 
          ...state, 
          status:'error', 
          error: action.payload 
        };

    case A.HOME_STATE_REQ:    
      return {
        ...state,
        status: 'loading',
        error: undefined
      };
    case A.HOME_STATE_OK:     
      return {
        ...state,
        byState: { 
          ...state.byState, 
          [action.payload.entity as keyof HomeState['byState']]: action.payload.data 
        },
        status: 'ready'
      };
    case A.HOME_STATE_ERR:   
      return { 
        ...state, 
        status:'error', 
        error: action.payload.error 
      };

    case A.HOME_CROP_REQ:    
      return {
        ...state,
        status: 'loading',
        error: undefined
      };
    case A.HOME_CROP_OK:     
      return { 
        ...state, 
        byCrop: { 
          season: action.payload.season, 
          data: action.payload.data 
        }, 
        status: 'ready' 
      };
    case A.HOME_CROP_ERR:     
      return { 
        ...state, 
        status: 'error', 
        error: action.payload.error 
      };

    case A.HOME_LAND_REQ:    
      return {
        ...state,
        status: 'loading',
        error: undefined
      };
    case A.HOME_LAND_OK:     
      return { 
        ...state, 
        landUse: action.payload, 
        status: 'ready' 
      };
    case A.HOME_LAND_ERR:    
      return { 
        ...state, 
        status: 'error', 
        error: action.payload 
      };

    default: return state;
  }
}