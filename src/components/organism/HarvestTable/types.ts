import type { Harvest } from "../../../service/agriculture/types";

type Props = {
  rows: (Harvest & { farmName?: string })[];
  page:number; pageSize:number; total:number; loading?:boolean;
  onEdit?: (h: Harvest) => void;
  onPageChange?: (p:number)=>void;
};        

export type { Props };