import { Bar, Input, Select } from "./Toolbar.styles";
import type { Props } from "./types";

export default function Toolbar({ query, onQuery, uf, onUF, ufs = ['SP','PR','MT','RS','GO'] }: Props) {
    return (
      <Bar>
        <Input placeholder="Buscar por nome/CPF/CNPJ" value={query} onChange={e=>onQuery(e.target.value)} />
        <Select value={uf} onChange={e=>onUF(e.target.value)}>
          <option value="">Todos estados</option>
          {ufs.map(u => <option key={u} value={u}>{u}</option>)}
        </Select>
      </Bar>
    );
  }