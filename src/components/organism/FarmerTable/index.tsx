import { Count, Btn, Panel, Head, Body, Table, Badge, Pag, Empty } from "./FarmerTable.styles";
import type { Props } from "./type";

export default function FarmersTable({
    rows, page, pageSize, total, loading, onEdit, onPageChange
  }: Props){
    const pages = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
    return (
      <Panel>
        <Head>
          <strong>Produtores</strong>
          <Count>{total} {total === 1 ? 'registro' : 'registros'}</Count>
        </Head>
  
        <Body>
          {loading ? (
            <Empty>Carregando…</Empty>
          ) : rows.length === 0 ? (
            <Empty>Nenhum farmer encontrado.</Empty>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Farmer</th>
                  <th>Documento</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id}>
                    <td>{r.name}</td>
                    <td>{r.doc || '—'}</td>
                    <td><a href="#" onClick={(e)=>{e.preventDefault(); onEdit?.(r.id);}}>Editar</a></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
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
