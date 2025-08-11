export type NavTileProps = {
    title: string;
    subtitle: string;
    to: string;           // rota destino
    color?: string;       // cor do ícone (default: brand)
    span?: 4 | 6;         // grid span
    onClick?: () => void; // override opcional
  };