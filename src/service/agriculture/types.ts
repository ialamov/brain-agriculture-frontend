export type Farmer = { 
    id: string; 
    name: string; 
    cpf?: string; 
    cnpj?: string; 
};

export type Farm = {
  id: string;
  farmerId: string;
  name: string;
  city: string;
  state: string;
  totalArea: number;
  cultivationArea: number;
  vegetationArea: number;
  updatedAt?: string;
  farmerName?: string;
};

export type ListResponse<T> = {
    items: T[]; 
    total: number; 
    page: number; 
    pageSize: number 
};

export type Harvest = { 
    id: string; 
    farmId: string; 
    year: string; 
};
export type Crop = { 
    id: string; 
    harvestId: string; 
    name: string; 
};
export type Summary = { 
    farmers: number;
    farms: number;
    harvests: number;
    crops: number;
};