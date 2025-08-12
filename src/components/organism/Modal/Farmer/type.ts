import type { Farmer } from "../../../../service/agriculture/types";

type PropsModal = {
  open: boolean;
  onClose: () => void;
  onCreated?: (farmer: Farmer) => void;
  selectedFarmer?: {
    id: string;
    doc: string;
  };
  onDeleted?: (id: string) => void;
  originBtn?: 'edit' | 'create' | null;
};

export type { PropsModal };