import type { Summary } from "../../../service/metrics/types";
import { GridStyles, KPI, KLabel, KValue } from "./Grid.styles";

const Grid = ({summary, status}: {summary: Summary, status: string}) => {
 
  return (
    <GridStyles aria-label="Indicadores" style={{alignItems:'stretch'}}>
      <KPI>
        <KLabel>Produtores</KLabel>
        <KValue>
          {summary?.farmers ?? (status === 'loading' ? '…' : '—')}
        </KValue>
      </KPI>
      <KPI>
        <KLabel>Fazendas</KLabel>
        <KValue>
          {summary?.farms ?? (status === 'loading' ? '…' : '—')}
        </KValue>
      </KPI>
      <KPI>
        <KLabel>Safras</KLabel>
        <KValue>
          {summary?.harvests ?? (status === 'loading' ? '…' : '—')}
        </KValue>
      </KPI>
      <KPI>
        <KLabel>Culturas</KLabel>
        <KValue>
          {summary?.crops ?? (status==='loading'?'…':'—')}
        </KValue>
      </KPI>
    </GridStyles>
  );
};

export { Grid };