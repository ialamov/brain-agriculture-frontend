import type { Farmer } from "../../../pages/FarmersPage/types";

type Draft = {
  id?: string;
  doc: string;
  name: string;
  city: string;
  state: string;
  farmName: string;
  harvest: string;
  total: string;
  cultivationArea: string;
  vegetationArea: string;
  crop: string;
};

const emptyDraft: Draft = {
  doc:'', name:'', city:'', state:'SP', farmName:'', harvest:'Safra 2025',
  total:'', cultivationArea:'', vegetationArea:'', crop:'Soja'
};

type Props = {
  editing?: Farmer | null;
  onSubmit: (farmer: Farmer) => void;
  onClear: () => void;
};

export { type Props, type Draft, emptyDraft };