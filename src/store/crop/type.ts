import type { Crop } from "../../service/agriculture/types";

export type CropsState = { 
  items:Crop[]; 
  total:number; 
  page:number; 
  pageSize:number; 
  loading:boolean; 
  error?:string 
};
