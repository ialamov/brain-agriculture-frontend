import { useEffect, useState } from 'react';
import FarmerCreateModal from '../../components/organism/Modal/Farmer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFarmers } from '../../store/farmer/thunks';
import AppBar from '../../components/organism/AppBar';
import FarmersTable from '../../components/organism/FarmerTable';
import type { RootState } from '../../store/store';
import type { FarmerRow } from '../../components/organism/FarmerTable/type';
import { deleteFarmer } from '../../service/agriculture/agricultureApi';

export default function FarmersListPage(){
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [rows, setRows] = useState<FarmerRow[]>([]);
  const { items: error, loading } = useSelector((state: RootState) => state.farmers);
  const [selectedFarmer, setSelectedFarmer] = useState<{id: string, doc: string} | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [originBtn, setOriginBtn] = useState<'edit' | 'create' | null>(null);
  
  async function refresh() {
    try {
      // @ts-ignore - Redux thunk dispatch typing issue
      const res = await dispatch(fetchFarmers({ page: 1, pageSize: 20 }));
      setRows(res as unknown as FarmerRow[]);
      return res;
    } catch (err: any) {
      console.error('Error fetching farmers:', err);
    }
  }

  useEffect(() => {
    refresh();
  }, [open]);

  return (
    <>
      <AppBar />
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 24px'}}>
        <h1>Lista de Produtores</h1>
        <button 
          onClick={()=>{
            setOpen(true)
            setOriginBtn('create')
          }} 
          style={{
            height:40,
            padding:'0 14px',
            borderRadius:10,
            border:'none',
            background:'#2D6A4F',
            color:'#fff',
            fontWeight:600
          }}>
            Novo Produtor
          </button>
      </div>

      {loading && <div>Loading farmers...</div>}
      {error && <div style={{color: 'red', padding: '16px 24px'}}>Error: {error}</div>}
      {!loading && !error && (!rows || rows.length === 0) && <div style={{padding: '16px 24px'}}>No farmers found</div>}
      {!loading && !error && rows && rows.length > 0 && (
        <div style={{padding: '16px 24px'}}>
          <FarmersTable
            rows={rows}
            page={typeof page === 'number' ? page : 1}
            pageSize={typeof pageSize === 'number' ? pageSize : 20}
            total={typeof total === 'number' ? total : 0}
            loading={typeof loading === 'boolean' ? loading : false}
            onPageChange={(p: number) => {
              // @ts-ignore - Redux thunk dispatch typing issue
              dispatch(fetchFarmers({ page: p, pageSize: typeof pageSize === 'number' ? pageSize : 20 }));
            }}
            onEdit={(id: string) => {
              setOpen(true);
              setOriginBtn('edit');
              setSelectedFarmer({id, doc: rows.find(r => r.id === id)?.doc || ''});
            }}
            onDelete={(id: string) => {
              deleteFarmer(id);
              refresh();
            }}
          />
        </div>
      )}

      <FarmerCreateModal
        open={open}
        onClose={()=>setOpen(false)}
        onCreated={()=>refresh()}
        selectedFarmer={selectedFarmer}
        originBtn={originBtn}
      />
    </>
  );
}