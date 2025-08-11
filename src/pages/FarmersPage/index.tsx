import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Toolbar from "../../components/molecules/Toolbar";
import ProducersTable from "../../components/organism/FarmersTable";
import { Shell, ListPanel } from "./FarmersPage.styles";
import type { Farmer } from "./types";
import FarmerForm from "../../components/organism/FarmerForm";
import AppBar from "../../components/organism/AppBar";
import { selectFilteredFarmers } from "../../store/Farmer/selectFilterFarmers";
import { setFarmers, addFarmer, updateFarmer } from "../../store/Farmer/actions";

const seed: Farmer[] = [
  {
    id: '1',
    doc: '123.456.789-09',
    name: 'João da Silva',
    farms: [
      { id:'p1', name:'Fazenda A', city:'Ribeirão Preto', state:'SP',
        area:{ total:900, cultivationArea:650, vegetationArea:250 }, harvests:[{
          year: '2025', crops: [{ name: 'Soja' }],
          name: "Colheita 2025"
        }] }
    ]
  },
  {
    id: '2',
    doc: '12.345.678/0001-99',
    name: 'Maria Oliveira',
    farms: [
      { id:'p2', name:'Fazenda B', city:'Maringá', state:'PR',
        area:{ total:420, cultivationArea:340, vegetationArea:80 }, harvests:[{
          year: '2024', crops: [{ name: 'Milho' }],
          name: "Colheita 2024"
        }] }
    ]
  }
];



export default function ProducersPage() {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [uf, setUF] = useState('');
    const [editing, setEditing] = useState<Farmer | null>(null);
  
    useMemo(() => { dispatch(setFarmers(seed)); }, [dispatch]);
  
    const rows = useSelector(selectFilteredFarmers(query, uf));
  
    function handleSubmit(p: Farmer) {
      if (editing) dispatch(updateFarmer(p));
      else dispatch(addFarmer(p));
      setEditing(null);
    }
  
    return (
        <>
        <AppBar />
      <Shell>
        <ListPanel>
          <div style={{
            background:'#fff', border:'1px solid #E5E7EB', borderRadius:14, boxShadow:'0 2px 10px rgba(0,0,0,.08)',
            display:'flex', flexDirection:'column'
          }}>
            <div style={{padding:16, borderBottom:'1px solid #E5E7EB', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <Toolbar query={query} onQuery={setQuery} uf={uf} onUF={setUF} />
            </div>
            <div style={{padding:16}}>
              <ProducersTable rows={rows} onEdit={setEditing} />
            </div>
          </div>
        </ListPanel>
  
        <FarmerForm editing={editing} onSubmit={handleSubmit} onClear={()=>setEditing(null)} />
      </Shell>
      </>
    );
  }