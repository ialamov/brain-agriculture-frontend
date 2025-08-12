import React from "react";
import { Panel, Head, Count, Body, Empty, Table, Pag, Btn } from "./FarmTable.styles";
import type { Props } from "./type";

export default function FarmsTable({ rows, page, pageSize, total, loading, onEdit, onPageChange, onDelete }: Props){
    const pages = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
    return (
      <Panel>
        <Head>
          <strong>Farms</strong>
          <Count>{total} {total===1?'registro':'registros'}</Count>
        </Head>
        <Body>
          {loading ? <Empty>Carregando…</Empty> : rows.length===0 ? <Empty>Nenhuma farm encontrada.</Empty> :
          <Table>
            <thead>
              <tr>
                <th>Farm</th><th>Farmer</th><th>Cidade/UF</th><th>Total (ha)</th><th>Cultivo (ha)</th><th>Vegetação (ha)</th><th>Atualizado</th><th></th>
              </tr>
            </thead>
            <tbody>
              {rows?.length > 0 && rows?.map(f=>(
                <tr key={f.id}>
                  <td>{f.name}</td>
                  <td>{f.farmerName || f.farmerId}</td>
                  <td>{f.city}/{f.state}</td>
                  <td>{f.totalArea}</td>
                  <td>{f.cultivationArea}</td>
                  <td>{f.vegetationArea}</td>
                  <td><a href="#" onClick={(e)=>{e.preventDefault(); onEdit?.(f);}}>Editar</a></td>
                  <td><a href="#" onClick={(e)=>{e.preventDefault(); onDelete?.(f);}}>Excluir</a></td>
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
