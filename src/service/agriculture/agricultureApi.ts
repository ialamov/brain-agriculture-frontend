import { api } from '../api';
import type { Summary, Farmer, Farm, Harvest, Crop } from './types';

export async function getSummary(): Promise<Summary> {
  const { data } = await api.get('/metrics/summary');
  return data as Summary;
}

export async function listFarmers(params?: { page?: number; pageSize?: number }) {
  const { data } = await api.get(`/farmers?page=${params?.page}&pageSize=${params?.pageSize}`);
  return data as { items: Farmer[]; total: number; page: number; pageSize: number };
}

export async function getFarmer(id: string) {
  const { data } = await api.get(`/farmers/${id}`);
  return data as Farmer;
}

export async function createFarmer(payload: { name: string; doc?: string }) {
  const { data } = await api.post('/farmers', payload);
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

export async function listHarvestsByFarm(farmId: string) {
  const { data } = await api.get('/harvests', { params: { farmId }});
  return data as Harvest[];
}
export async function createHarvest(payload: Omit<Harvest, 'id'>) {
  const { data } = await api.post('/harvests', payload);
  return data as Harvest;
}

export async function listCropsByHarvest(harvestId: string) {
  const { data } = await api.get('/crops', { params: { harvestId }});
  return data as Crop[];
}
export async function createCrop(payload: Omit<Crop, 'id'>) {
  const { data } = await api.post('/crops', payload);
  return data as Crop;
}