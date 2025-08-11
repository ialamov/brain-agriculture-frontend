import type { Farmer } from "../../../pages/FarmersPage/types";

type Props = {
  rows: Farmer[];
  onEdit: (p: Farmer) => void;
};

export type { Props };