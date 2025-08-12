import { Panel, Head, Count, Body, Empty, Table, Pag, Btn } from "./HaverstTable.styles";
import type { Props } from "./types";

const fmtDate = (iso?:string|null) => iso ? new Date(iso).toLocaleDateString('pt-BR') : '—';

export default function HarvestsTable({ rows, page, pageSize, total, loading, onEdit, onPageChange }: Props){
  const pages = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
  return (
    <Panel>
      <Head>
        <strong>Harvests</strong>
        <Count>{total} {total===1?'registro':'registros'}</Count>
      </Head>
      <Body>
        {loading ? 
          <Empty>Carregando…</Empty> : 
          (rows === undefined || rows.length===0) ? 
          <Empty>Nenhuma colheita encontrada.</Empty> :
        <Table>
          <thead>
            <tr>
              <th>Safra</th>
              <th>Farm</th>
              <th>Plantio</th>
              <th>Colheita</th>
              <th>Crops</th>
              <th>Atualizado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(h=>(
              <tr key={h.id}>
                <td>{h.season}</td>
                <td>{h.farmName || h.farmId}</td>
                <td>{fmtDate(h.sowingDate)}</td>
                <td>{fmtDate(h.harvestDate)}</td>
                <td>{h.cropsCount ?? 0}</td>
                <td>{fmtDate(h.updatedAt)}</td>
                <td><a href="#" onClick={(e)=>{e.preventDefault(); onEdit?.(h);}}>Editar</a></td>
              </tr>
            ))}
          </tbody>
        </Table>}
      </Body>
      <Pag>
        <span style={{color:'#6B7280', fontSize:12}}>Página {page} de {pages}</span>
        <div style={{display:'flex', gap:8}}>
          <Btn onClick={()=>onPageChange?.(Math.max(1, page-1))} disabled={page<=1}>Anterior</Btn>
          <Btn primary onClick={()=>onPageChange?.(Math.min(pages, page+1))} disabled={page>=pages}>Próxima</Btn>
        </div>
      </Pag>
    </Panel>
  );
}