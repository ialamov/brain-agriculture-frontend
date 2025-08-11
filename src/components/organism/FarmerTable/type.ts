type FarmerRow = {
  id: string;
  name: string;
  doc?: string;
};

type Props = {
  rows: FarmerRow[];
  page: number;
  pageSize: number;
  total: number;
  loading?: boolean;
  onEdit?: (id: string) => void;
  onPageChange?: (page: number) => void;
};

export type { FarmerRow, Props };