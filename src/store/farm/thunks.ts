import type { ThunkAction } from 'redux-thunk';
import type { AnyAction } from 'redux';
import type { RootState } from '../store';
import * as A from './actions';
import * as api from '../../service/agriculture/agricultureApi';

type Thunk<R=any> = ThunkAction<Promise<R>|R, RootState, unknown, AnyAction>;

export const fetchFarms = (p: { search?:string; farmerId?:string; page?:number; pageSize?:number } = {}): Thunk => async (dispatch) => {
  const page = p.page ?? 1, pageSize = p.pageSize ?? 20;
  dispatch({ type:A.FARMS_LIST_REQ, payload:{ ...p, page, pageSize } });
  try{ 
    const farms = await api.listAllFarms({ page, pageSize }); 
    const res = { items: farms, total: farms.length, page, pageSize };
    dispatch({ type:A.FARMS_LIST_OK, payload: res });
    return res
  } catch(e:any){ 
    dispatch({ type:A.FARMS_LIST_ERR, payload:e?.message || 'Erro ao carregar farms' }); }
};

export const createFarmThunk = (payload: Parameters<typeof api.createFarm>[0]): Thunk => async (dispatch) => {
  dispatch({ type:A.FARMS_CREATE_REQ, payload });
  try{ const farm = await api.createFarm(payload); dispatch({ type:A.FARMS_CREATE_OK, payload:farm }); return farm; }
  catch(e:any){ dispatch({ type:A.FARMS_CREATE_ERR, payload:e?.message || 'Erro ao criar farm' }); throw e; }
};

export const updateFarmThunk = (id:string, patch: Parameters<typeof api.updateFarm>[1]): Thunk => async (dispatch) => {
  dispatch({ type:A.FARMS_UPDATE_REQ, payload:{ id, patch } });
  try{ const farm = await api.updateFarm(id, patch); dispatch({ type:A.FARMS_UPDATE_OK, payload:farm }); return farm; }
  catch(e:any){ dispatch({ type:A.FARMS_UPDATE_ERR, payload:e?.message || 'Erro ao atualizar farm' }); throw e; }
};

export const deleteFarmThunk = (id:string): Thunk => async (dispatch) => {
  dispatch({ type:A.FARMS_DELETE_REQ, payload:{ id } });
  try{ await api.deleteFarm(id); dispatch({ type:A.FARMS_DELETE_OK, payload:{ id } }); }
  catch(e:any){ dispatch({ type:A.FARMS_DELETE_ERR, payload:{ id, error:e?.message || 'Erro ao excluir farm' } }); }
};

export const fetchFarmsWithSearch = (p: { search?:string; page?:number; pageSize?:number } = {}): Thunk => async (dispatch) => {
  const page = p.page ?? 1, pageSize = p.pageSize ?? 100;
  dispatch({ type: A.FARMS_LIST_REQ, payload: { ...p, page, pageSize } });
  try {
    const res = await api.listFarmsWithSearch({ ...p, page, pageSize });
    dispatch({ type: A.FARMS_LIST_OK, payload: res });
  } catch (e:any) {
    dispatch({ type: A.FARMS_LIST_ERR, payload: e?.message || 'Erro ao carregar farms' });
  }
};