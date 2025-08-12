import type { RootState } from '../store';
import type { ThunkAction } from 'redux-thunk';
import type { AnyAction } from 'redux';
import * as A from './actions';
import * as api from '../../service/agriculture/agricultureApi';

type Thunk<R = any> = ThunkAction<Promise<R> | R, RootState, unknown, AnyAction>;

export const fetchHarvests = (p: { search?:string; farmId?:string; season?:string; page?:number; pageSize?:number } = {}): Thunk => async (dispatch) => {
  const page = p.page ?? 1, pageSize = p.pageSize ?? 20;
  dispatch({ type: A.HARV_LIST_REQ, payload: { ...p, page, pageSize } });
  try {
    const res = await api.listHarvests({ ...p, page, pageSize });
    const transformedRes = { 
      items: res || [], 
      total: res.total || 0, 
      page, 
      pageSize 
    };
    dispatch({ type: A.HARV_LIST_OK, payload: transformedRes });
    return transformedRes;
  } catch (e: any) {
    dispatch({ type: A.HARV_LIST_ERR, payload: e?.message || 'Erro ao carregar harvests' });
    throw e;
  }
};

export const createHarvestThunk = (payload: Parameters<typeof api.createHarvest>[0]): Thunk => async (dispatch) => {
  dispatch({ type: A.HARV_CREATE_REQ, payload });
  try {
    const h = await api.createHarvest(payload);
    dispatch({ type: A.HARV_CREATE_OK, payload: h });
    return h;
  } catch (e: any) {
    dispatch({ type: A.HARV_CREATE_ERR, payload: e?.message || 'Erro ao criar harvest' });
    throw e;
  }
};

export const updateHarvestThunk = (id: string, patch: Parameters<typeof api.updateHarvest>[1]): Thunk => async (dispatch) => {
  dispatch({ type: A.HARV_UPDATE_REQ, payload: { id, patch } });
  try {
    const h = await api.updateHarvest(id, patch);
    dispatch({ type: A.HARV_UPDATE_OK, payload: h });
    return h;
  } catch (e: any) {
    dispatch({ type: A.HARV_UPDATE_ERR, payload: e?.message || 'Erro ao atualizar harvest' });
    throw e;
  }
};

export const deleteHarvestThunk = (id: string): Thunk => async (dispatch) => {
  dispatch({ type: A.HARV_DELETE_REQ, payload: { id } });
  try {
    await api.deleteHarvest(id);
    dispatch({ type: A.HARV_DELETE_OK, payload: { id } });
  } catch (e: any) {
    dispatch({ type: A.HARV_DELETE_ERR, payload: { id, error: e?.message || 'Erro ao excluir harvest' } });
  }
};

export const allYearsAndCrops = (): Thunk => async (dispatch) => {
  dispatch({ type: A.HARV_ALL_YEARS_AND_CROPS_REQ });
  try {
    const res = await api.allYearsAndCrops();
    dispatch({ type: A.HARV_ALL_YEARS_AND_CROPS_OK, payload: res });
    return res;
  } catch (e: any) {
    dispatch({ type: A.HARV_ALL_YEARS_AND_CROPS_ERR, payload: e?.message || 'Erro ao carregar anos e culturas' });
  }
};