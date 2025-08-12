import type { Farm } from "../../../../service/agriculture/types";

type Props = {
  open: boolean;
  onClose: () => void;
  farm?: Farm | null; // se presente => editar
};

export type { Props };