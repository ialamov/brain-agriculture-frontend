import { type ThunkAction } from 'redux-thunk';
import type { AnyAction } from 'redux';
import type { RootState } from '../store';
import * as A from './action';
import * as api from '../../service/agriculture/agricultureApi';

type Thunk<R = any> = ThunkAction<Promise<R> | R, RootState, unknown, AnyAction>;

export const fetchFarmers = (params: { page?: number; pageSize?: number } = {}): Thunk<{
  page: number; 
  pageSize: number 
}> => async (dispatch) => {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 20;
  dispatch({ type: A.FARMERS_LIST_REQ, payload: { ...params, page, pageSize } });
  try {
    const res = await api.listFarmers({ ...params, page, pageSize });
    dispatch({ type: A.FARMERS_LIST_OK, payload: res });
    return res;
  } catch (e: any) {
    dispatch({ type: A.FARMERS_LIST_ERR, payload: e?.message || 'Erro ao carregar farmers' });
    throw e;
  }
};

export const fetchFarmer = (id: string): Thunk<any> => async (dispatch) => {
  dispatch({ type: A.FARMERS_GET_REQ, payload: { id } });
  try {
    const farmer = await api.getFarmer(id);
    dispatch({ type: A.FARMERS_GET_OK, payload: farmer });
    return farmer;
  } catch (e: any) {
    dispatch({ type: A.FARMERS_GET_ERR, payload: e?.message || 'Erro ao carregar o farmer' });
    throw e;
  }
}

export const createFarmerThunk = (payload: { name: string; cpf?: string; cnpj?: string }): Thunk<any> => async (dispatch) => {
  dispatch({ type: A.FARMERS_CREATE_REQ, payload });
  try {
    const farmer = await api.createFarmer(payload);
    dispatch({ type: A.FARMERS_CREATE_OK, payload: farmer });
    return farmer;
  } catch (e: any) {
    dispatch({ type: A.FARMERS_CREATE_ERR, payload: e?.message || 'Erro ao criar farmer' });
    throw e;
  }
};

export const updateFarmerThunk = (id: string, patch: { name?: string; cpf?: string; cnpj?: string }): Thunk<any> => async (dispatch) => {
  dispatch({ type: A.FARMERS_UPDATE_REQ, payload: { id, patch } });
  try {
    // Note: updateFarmer API function doesn't exist yet
    // const farmer = await api.updateFarmer(id, patch);
    // dispatch({ type: A.FARMERS_UPDATE_OK, payload: farmer });
    // return farmer;
    throw new Error('updateFarmer API not implemented yet');
  } catch (e: any) {
    dispatch({ type: A.FARMERS_UPDATE_ERR, payload: e?.message || 'Erro ao atualizar farmer' });
    throw e;
  }
};

export const deleteFarmerThunk = (id: string): Thunk<void> => async (dispatch) => {
  dispatch({ type: A.FARMERS_DELETE_REQ, payload: { id } });
  try {
    // Note: deleteFarmer API function doesn't exist yet
    // await api.deleteFarmer(id);
    // dispatch({ type: A.FARMERS_DELETE_OK, payload: { id } });
    throw new Error('deleteFarmer API not implemented yet');
  } catch (e: any) {
    dispatch({ type: A.FARMERS_DELETE_ERR, payload: { id, error: e?.message || 'Erro ao excluir farmer' } });
    throw e;
  }
};