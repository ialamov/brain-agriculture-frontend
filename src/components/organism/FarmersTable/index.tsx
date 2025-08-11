import { Panel, Head, Count, Wrap, Table, Badge } from "./FarmerTable.styles";
import type { Props } from "./types";

export default function ProducersTable({ rows, onEdit }: Props) {
  return (
    <Panel>
      <Head>
        <strong>Lista</strong>
        <Count>{rows.length} produtores</Count>
      </Head>
      <Wrap>
        <Table>
          <thead>
            <tr>
              <th>Produtor</th><th>Documento</th><th>Cidade/UF</th><th>Fazendas</th><th>Hectares</th><th>Última edição</th><th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(p => {
              const farms = p.farms.length;
              const city = p.farms[0]?.city ?? '-';
              const uf = p.farms[0]?.state ?? '-';
              const ha = p.farms.reduce((acc, prop) => acc + prop.area.total, 0);
              return (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.doc}</td>
                  <td>{city}/{uf}</td>
                  <td><Badge>{farms}</Badge></td>
                  <td>{ha.toLocaleString('pt-BR')}</td>
                  <td><a href="#" onClick={(e)=>{e.preventDefault(); onEdit(p);}}>Editar</a></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Wrap>
    </Panel>
  );
}