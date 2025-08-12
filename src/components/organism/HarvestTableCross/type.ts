import type { HarvestRow } from "../../../store/selectors/dashboards";

export type Props = {
  rows: HarvestRow[];
  page:number; pageSize:number; total:number; loading?:boolean;
  onEdit?: (harvestId: string) => void;
  onAddCrop?: (farmId: string, harvestId: string) => void;
  onPageChange?: (p:number)=>void;
};

