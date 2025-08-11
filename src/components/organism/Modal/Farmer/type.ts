import type { Farmer } from "../../../../service/agriculture/types";

type PropsModal = {
  open: boolean;
  onClose: () => void;
  onCreated?: (farmer: Farmer) => void; // ex.: recarregar lista
};

export type { PropsModal };