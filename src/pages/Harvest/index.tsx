import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { fetchFarms } from "../../store/farm/thunks";
import { fetchHarvests } from "../../store/harvest/thunk";
import { fetchCrops } from "../../store/crop/thunk";  
import { selectHarvestRows } from "../../store/selectors/dashboards";   
import { Top, Btn, Controls, Input, Select } from "./HarvestPage.styles";
import HarvestsTableCross from "../../components/organism/HarvestTableCross";

export default function HarvestsListPage(){
  const dispatch = useDispatch<any>();
  const farms = useSelector((s:RootState)=> s.farms.items);
  const tableRows = useSelector(selectHarvestRows);
  const { page, pageSize, loading, total } = useSelector((s:RootState)=> s.harvests);
  console.log(farms, tableRows, page, pageSize, loading, total);
  const [q, setQ] = useState('');
  const [farmId, setFarmId] = useState('');
  const [season, setSeason] = useState('');
  const [cropName, setCropName] = useState('');

  // carregar dados base
  useEffect(()=>{ dispatch(fetchFarms({ page:1, pageSize:100 })); }, [dispatch]);
  useEffect(()=>{ dispatch(fetchHarvests({ page:1, pageSize:20 })); }, [dispatch]);
  useEffect(()=>{ dispatch(fetchCrops({ page:1, pageSize:500 })); }, [dispatch]);

  // filtros locais (aplicados sobre as linhas selecionadas)
  const filteredRows = useMemo(()=>{
    const ql = q.toLowerCase().trim();
    return tableRows.filter(r=>{
      const okFarm = !farmId || r.farmId === farmId;
      const okSeason = !season || r.season === season;
      const okCrop = !cropName || r.crops.some(c => c.name.toLowerCase() === cropName.toLowerCase());
      const okSearch = !ql || [r.season, r.farmName, ...r.crops.map(c=>c.name)].some(v => v.toLowerCase().includes(ql));
      return okFarm && okSeason && okCrop && okSearch;
    });
  }, [tableRows, q, farmId, season, cropName]);

  // paginação simples em memória (se a API não pagina/filtra do lado servidor)
  const start = (page-1) * pageSize;
  const pageRows = filteredRows.slice(start, start + pageSize);

  const cropOptions = Array.from(new Set(tableRows.flatMap(r => r.crops.map(c=>c.name))));

  return (
    <div>
      <Top>
        <h1 style={{margin:0}}>Safras</h1>
        <div style={{display:'flex', gap:8}}>
          <Btn onClick={()=>{/* open harvest modal */}}>Nova safra</Btn>
          <Btn onClick={()=>{/* open crop modal */}}>Nova cultura</Btn>
        </div>
      </Top>

      <Controls>
        <Input placeholder="Buscar por fazenda/safra/cultura" value={q} onChange={e=>setQ(e.target.value)} />
        <Select value={farmId} onChange={e=>setFarmId(e.target.value)}>
          <option value="">Todas farms</option>
          {farms.map(f=> <option key={f.id} value={f.id}>{f.name}</option>)}
        </Select>
        <Select value={season} onChange={e=>setSeason(e.target.value)}>
          <option value="">Todas safras</option>
          {Array.from(new Set(tableRows.map(r=>r.season))).map(s => <option key={s} value={s}>{s}</option>)}
        </Select>
        <Select value={cropName} onChange={e=>setCropName(e.target.value)}>
          <option value="">Todas culturas</option>
          {cropOptions.map(n => <option key={n} value={n}>{n}</option>)}
        </Select>
      </Controls>

      <HarvestsTableCross
        rows={pageRows}
        page={page}
        pageSize={pageSize}
        total={filteredRows.length}
        loading={loading}
        onEdit={(id)=>{/* open edit harvest modal with id */}}
        onAddCrop={(fid, hid)=>{/* open crop modal with farmId=fid & harvestId=hid */}}
        onPageChange={(p)=>{/* se paginação no servidor: dispatch(fetchHarvests({ page:p })) */}}
      />
    </div>
  );
}