export type Area = { 
  total: number; 
  cultivationArea: number; 
  vegetationArea: number; 
};
export type Crop = { 
  name?: string; 
};
export type Farm = {
  id?: string;
  name: string;
  city: string;
  state: string;
  area: Area;
  harvests: Harvest[];
};
export type Farmer = {
  id?: string;
  doc: string;
  name: string;
  farms: Farm[];
};
export type Harvest = {
  id?: string;
  crops: Crop[];
  name: string;
  year: string;
};