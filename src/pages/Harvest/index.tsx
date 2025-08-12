import { useDispatch, useSelector } from "react-redux";
import { fetchHarvests } from "../../store/harvest/thunk";
import type { RootState } from "../../store/store";
import { useState, useEffect, useMemo, useLayoutEffect } from "react";
import type { Harvest } from "../../service/agriculture/types";
import { Top, Btn, Select, Input, Controls } from "./HarvestPage.styles";   
import HarvestsTable from "../../components/organism/HarvestTable";
import HarvestModal from "../../components/organism/Modal/Harverst";
import { allYearsAndCrops, listAllFarms } from "../../service/agriculture/agricultureApi";
import type { Farm, Crop } from "../../service/agriculture/types";

export default function HarvestsListPage(){
    const dispatch = useDispatch<any>();
    const { total, page, pageSize, loading } = useSelector((s:RootState)=> s.harvests);
    const [items, setItems] = useState<Harvest[]>([]);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Harvest | null>(null);
    const [yearsAndCrops, setYearsAndCrops] = useState<{years: string[]; crops: Crop[]} | null>(null);
    const [q, setQ] = useState('');
    const [farmId, setFarmId] = useState('');
    const [season, setSeason] = useState('');
    const [farms, setFarms] = useState<{id:string; name:string}[]>([]);
    const [openCrop, setOpenCrop] = useState(false);

    const params = useMemo(()=>({ 
      search: q || undefined, 
      farmId: farmId || undefined, 
      season: season || undefined, 
      page, 
      pageSize 
    }), [q, farmId, season, page, pageSize]);

    useEffect(()=>{ 
      (async()=>{ 
        try {
          const res = await listAllFarms({ page:1, pageSize:100 });
          setFarms(res.map((f: Farm) => ({id: f.id, name: f.name})));

          const yearsAndCrops = await dispatch(allYearsAndCrops());
          setYearsAndCrops(yearsAndCrops);
        } catch (error) {
          setFarms([]);
          setYearsAndCrops(null);
        }
      })(); 
    }, []);
  
    useLayoutEffect(()=>{
      (async()=>{
        const res = await dispatch(fetchHarvests(params));
        setItems(res.items);
      })(); 
    }, [dispatch, params.page, params.pageSize, params.search, params.farmId, params.season]);
  
    return (
      <div style={{padding:24}}>
        <Top>
          <h1 style={{margin:0}}>Safras</h1>
          <Btn onClick={
            ()=>{ 
              setEditing(null); 
              setOpen(true); 
            }}>Nova safra
          </Btn>
          <Btn 
            onClick={
              ()=>{ 
                setEditing(null); 
                setOpenCrop(true); 
              }}>Nova cultura
            </Btn>
        </Top>
  
        <Controls>
          <Input placeholder="Buscar por fazenda/safra" value={q} onChange={e=>setQ(e.target.value)} />
          <Select value={farmId} onChange={e=>setFarmId(e.target.value)}>
            <option value="">Todas farms</option>
            {farms.map(f=> <option key={f.id} value={f.id}>{f.name}</option>)}
          </Select>
          <Select value={season} onChange={e => setSeason(e.target.value)}>
            <option value="">Todas safras</option>
            {Array.isArray(yearsAndCrops?.years) && yearsAndCrops.years.map((s: any) => (
              <option key={s.id} value={s.year}>{s.year}</option>
            ))}
          </Select>
        </Controls>
  
        <HarvestsTable
          rows={items}
          page={page}
          pageSize={pageSize}
          total={total}
          loading={loading}
          onEdit={(h)=>{ setEditing(h); setOpen(true); }}
          onPageChange={(p)=> dispatch(fetchHarvests({ ...params, page:p }))}
        />
  
        <HarvestModal
          open={open}
          harvest={editing}
          onClose={()=>{ setOpen(false); dispatch(fetchHarvests(params)); }}
        />
      </div>
    );
  }
  