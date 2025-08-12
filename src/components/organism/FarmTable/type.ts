import type { Farm } from "../../../service/agriculture/types";

type Props = {
  rows: (Farm & { farmerName?: string })[];
  page:number; pageSize:number; total:number; loading?:boolean;
  onEdit?: (farm: Farm) => void;
  onPageChange?: (p:number)=>void;
  onDelete?: (farm: Farm) => void;
};

export type { Props };