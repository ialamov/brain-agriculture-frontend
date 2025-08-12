import { api } from '../api';
import type { Summary, Farmer, Farm, Harvest, Crop, ListResponse } from './types';

export async function getSummary(): Promise<Summary> {
  const { data } = await api.get('/metrics/summary');
  return data as Summary;
}

export async function listFarmers(params?: { page?: number; pageSize?: number }) {
  const { data } = await api.get(`/farmers?page=${params?.page}&pageSize=${params?.pageSize}`);
  return data as Farmer[];
}

export async function getFarmer(id: string) {
  const { data } = await api.get(`/farmers/${id}`);
  return data as Farmer;
}

export async function createFarmer(payload: { name: string; doc?: string }) {
  const { data } = await api.post('/farmers', payload);
  return data as Farmer;
}

export async function updateFarmer(id: string, payload: { name: string; cpf?: string; cnpj?: string }) {
  const { data } = await api.patch(`/farmers/${id}`, payload);
  return data as Farmer;
}

export async function deleteFarmer(id: string) {
  const { data } = await api.delete(`/farmers/${id}`);
  return data as Farmer;
}

export async function listFarmsByFarmer(farmerId: string) {
  const { data } = await api.get('/farms', { params: { farmerId }});
  return data as Farm[];
}

export async function createFarm(payload: Omit<Farm, 'id'>) {
  const { data } = await api.post('/farms', payload);
  return data as Farm;
}

export async function listAllFarms(params?: { page?: number; pageSize?: number }) {
  const { data } = await api.get(`/farms?page=${params?.page}&pageSize=${params?.pageSize}`);
  return data as Farm[];
}

export async function updateFarm(id: string, patch: Partial<Omit<Farm,'id'>>) {
  const { data } = await api.put<Farm>(`/farms/${id}`, patch);
  return data;
}

export async function deleteFarm(id: string) {
  await api.delete(`/farms/${id}`);
}

export async function listHarvests(params?: {
  search?: string;
  farmId?: string;
  season?: string;
  page?: number;
  pageSize?: number;
}) {
  const { data } = await api.get<ListResponse<Harvest>>('/harvests', { params });
  return data;
}

export async function getHarvest(id: string) {
  const { data } = await api.get<Harvest>(`/harvests/${id}`);
  return data;
}

export async function createHarvest(payload: {
  farmId: string;
  season: string;
  sowingDate?: string | null;
  harvestDate?: string | null;
  notes?: string;
}) {
  const { data } = await api.post<Harvest>('/harvests', payload);
  return data;
}

export async function updateHarvest(
  id: string,
  patch: Partial<Omit<Harvest, 'id'>>
) {
  const { data } = await api.put<Harvest>(`/harvests/${id}`, patch);
  return data;
}

export async function deleteHarvest(id: string) {
  await api.delete(`/harvests/${id}`);
}

export async function listCropsByHarvest(harvestId: string) {
  const { data } = await api.get('/crops', { params: { harvestId }});
  return data as Crop[];
}
export async function createCrop(payload: Omit<Crop, 'id'>) {
  const { data } = await api.post('/crops', payload);
  return data as Crop;
}

export async function allYearsAndCrops() {
  const { data } = await api.get('/metrics/all-years-and-crops');
  return data as { years: string[]; crops: Crop[] };
}