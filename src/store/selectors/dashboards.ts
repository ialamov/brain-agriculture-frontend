import type { RootState } from "../store";

export function selectTotals(s: RootState){
  const farms = s.farms.items;
  const harvests = s.harvests.items;
  const crops = s.crops.items;

  const totalFarms = farms.length;
  const totalHa = farms.reduce((acc,f)=> acc + (Number(f.totalArea)||0), 0);
  const distinctCrops = new Set(crops.map(c=>c.name)).size;
  const totalHarvests = harvests.length;

  return { totalFarms, totalHa, distinctCrops, totalHarvests };
}

export function selectFarmsByStateData(s: RootState){
  const by: Record<string, number> = {};
  s.farms.items.forEach(f => { by[f.state] = (by[f.state]||0) + 1; });
  return { labels: Object.keys(by), values: Object.values(by) };
}

export function selectCropsByNameData(s: RootState){
  const by: Record<string, number> = {};
  s.crops.items.forEach(c => { by[c.name] = (by[c.name]||0) + 1; });
  return { labels: Object.keys(by), values: Object.values(by) };
}

export function selectLandUseData(s: RootState){
  const ag = s.farms.items.reduce((acc,f)=> acc + (Number(f.cultivationArea)||0), 0);
  const veg = s.farms.items.reduce((acc,f)=> acc + (Number(f.vegetationArea)||0), 0);
  return { labels: ['Agricultável (ha)', 'Vegetação (ha)'], values: [ag, veg] };
}

export type HarvestRow = {
  id: string;
  year: string;
  farmId: string;
  farmName: string;
  crops: { id:string; name:string }[];
};

export function selectHarvestRows(s: RootState): HarvestRow[] {
  const farmById = new Map(s.farms.items.map(f => [f.id, f]));
  const cropsByHarvest = new Map<string, { id:string; name:string }[]>();
  s.crops.items.forEach(c => {
    const arr = cropsByHarvest.get(c.harvestId) || [];
    arr.push({ id: c.id, name: c.name });
    cropsByHarvest.set(c.harvestId, arr);
  });

  return s.harvests.items.map(h => ({
    id: h.id,
    year: h.year,
    farmId: h.farmId,
    farmName: farmById.get(h.farmId)?.name || h.farmId,
    crops: cropsByHarvest.get(h.id) || [],
  }));
}