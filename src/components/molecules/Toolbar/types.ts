export type Props = {
    query: string; onQuery: (v: string) => void;
    uf: string; onUF: (v: string) => void;
    ufs?: string[];
  };