import type { Harvest } from "../../../../service/agriculture/types";

type Props = {
  open: boolean;
  onClose: () => void;
  harvest?: Harvest | null;
};

export type { Props };