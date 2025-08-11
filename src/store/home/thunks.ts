import type { ThunkAction } from 'redux-thunk';
import type { AnyAction } from 'redux';
import type { RootState } from '../store';
import * as A from './actions';
import { getSummary, getByState, getByCrop, getLandUse } from '../../service/metrics/metricsApi';

type Thunk<R = void> = ThunkAction<Promise<R> | R, RootState, unknown, AnyAction>;

export const loadSummary = (): Thunk => async (dispatch) => {
  try {
    dispatch({ type: A.HOME_SUMMARY_REQ });
    const data = await getSummary()
    dispatch({ type: A.HOME_SUMMARY_OK, payload: data });
  } catch (e: any) {
    dispatch({ type: A.HOME_SUMMARY_ERR, payload: e?.message || 'Erro ao carregar KPIs' });
  }
};

export const loadByState = (entity: 'farmers'|'farms'|'harvests'|'crops'): Thunk => async (dispatch) => {
  try {
    dispatch({ type: A.HOME_STATE_REQ, payload: { entity } });
    const data = await getByState(entity);
    dispatch({ type: A.HOME_STATE_OK, payload: { entity, data } });
  } catch (e: any) {
    dispatch({ type: A.HOME_STATE_ERR, payload: { entity, error: e?.message || 'Erro por estado' } });
  }
};

export const loadByCrop = (season?: string): Thunk => async (dispatch) => {
  try {
    dispatch({ type: A.HOME_CROP_REQ, payload: { season } });
    const data = await getByCrop(season);
    dispatch({ type: A.HOME_CROP_OK, payload: { season, data } });
  } catch (e: any) {
    dispatch({ type: A.HOME_CROP_ERR, payload: { season, error: e?.message || 'Erro por cultura' } });
  }
};

export const loadLandUse = (): Thunk => async (dispatch) => {
  try {
    dispatch({ type: A.HOME_LAND_REQ });
    const data = await getLandUse();
    dispatch({ type: A.HOME_LAND_OK, payload: data });
  } catch (e: any) {
    dispatch({ type: A.HOME_LAND_ERR, payload: e?.message || 'Erro uso do solo' });
  }
};