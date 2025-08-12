import { api } from "../api";
import type { Summary, KV, LandUse } from "./types";

export async function getSummary() {
  const { data } = await api.get<{key:string, value:number}[]>('/metrics/summary');
  return data;
}
export async function getTotalAreaRegistered() {
  const { data } = await api.get<number>('/metrics/total-area-registered');
  return data;
}
export async function getByState(entity: 'farmers'|'farms'|'harvests'|'crops') {
  const { data } = await api.get<KV[]>('/metrics/by-state', { params:{ entity } });
  return data;
}
export async function getByCrop(season?: string) {
  const { data } = await api.get<KV[]>('/metrics/by-crop', { params:{ season } });
  return data;
}