import type { ThunkAction } from 'redux-thunk';
import type { AnyAction } from 'redux';
import type { RootState } from '../../store/store';
import * as A from './actions';
import * as api from '../../service/agriculture/agricultureApi';

type Thunk<R=void> = ThunkAction<Promise<R>|R, RootState, unknown, AnyAction>;

export const fetchCrops = (p: { farmId?:string; harvestId?:string; name?:string; page?:number; pageSize?:number } = {}): Thunk => async (dispatch) => {
  const page = p.page ?? 1, pageSize = p.pageSize ?? 200;
  dispatch({ type: A.CROP_LIST_REQ, payload: { ...p, page, pageSize } });
  try {
    const res = await api.listCropsWithSearch({ ...p, page, pageSize });
    dispatch({ type: A.CROP_LIST_OK, payload: res });
  } catch (e:any) {
    dispatch({ type: A.CROP_LIST_ERR, payload: e?.message || 'Erro ao carregar culturas' });
  }
};