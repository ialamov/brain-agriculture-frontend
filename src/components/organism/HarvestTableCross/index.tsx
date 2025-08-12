import { Panel, Head, Count, Body, Table, Pag, Btn, Chip, Muted, Code } from './HarvestTableCross';
import type { Props } from './type';

const fmtDate = (iso?:string|null) => iso ? new Date(iso).toLocaleDateString('pt-BR') : '—';

export default function HarvestsTableCross({ rows, page, pageSize, total, loading, onEdit, onAddCrop, onPageChange }: Props){
  const pages = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
  return (
    <Panel>
      <Head>
        <strong>Harvests</strong>
        <Count>{total} {total===1?'registro':'registros'}</Count>
      </Head>
      <Body>
        {loading ? <Muted>Carregando…</Muted> : rows.length===0 ? <Muted>Nenhuma safra encontrada.</Muted> :
        <Table>
          <thead>
            <tr>
              <th>Safra</th>
              <th>Farm</th>
              <th>Keys</th>
              <th>Culturas</th>
              <th>Plantio</th>
              <th>Colheita</th>
              <th>Atualizado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id}>
                <td>
                  <div>{r.season}</div>
                  <Muted>harvestId: <Code>{r.id}</Code></Muted>
                </td>
                <td>
                  <div>{r.farmName}</div>
                  <Muted>farmId: <Code>{r.farmId}</Code></Muted>
                </td>
                <td>
                  <Muted>farmId <Code>{r.farmId}</Code> · harvestId <Code>{r.id}</Code></Muted>
                </td>
                <td>
                  {r.crops.length ? r.crops.map(c => <Chip key={c.id} title={`cropId: ${c.id}`}>{c.name}</Chip>) : <Muted>—</Muted>}
                </td>
                <td>{fmtDate(r.sowingDate)}</td>
                <td>{fmtDate(r.harvestDate)}</td>
                <td>{fmtDate(r.updatedAt)}</td>
                <td>
                  <a href="#" onClick={(e)=>{e.preventDefault(); onEdit?.(r.id);}}>Editar</a>
                  {' · '}
                  <a href="#" onClick={(e)=>{e.preventDefault(); onAddCrop?.(r.farmId, r.id);}}>+ Cultura</a>
                </td>
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