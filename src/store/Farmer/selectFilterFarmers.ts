import type { RootState } from '../store';

export const selectFarmers = (s: RootState) => s.farmers.items;

export const selectFilteredFarmers = (query: string, uf?: string) => (s: RootState) => {
  const q = (query || '').toLowerCase();
  return s.farmers.items.filter(p => {
    const inUF = !uf || p.farms.some(prop => prop.state === uf);
    const text =
      p.name.toLowerCase().includes(q) ||
      p.doc.toLowerCase().includes(q);
    return inUF && (!q || text);
  });
};