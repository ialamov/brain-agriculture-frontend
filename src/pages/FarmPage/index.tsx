import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FarmsTable from '../../components/organism/FarmTable/FarmTable';
import FarmModal from '../../components/organism/Modal/Farm/FarmModal';
import { deleteFarmThunk, fetchFarms } from '../../store/farm/thunks';
import type { RootState } from '../../store/store';
import type { Farm } from '../../service/agriculture/types';
import { Top, Btn } from './FarmPage.styles';

export default function FarmsListPage(){
  const dispatch = useDispatch<any>();
  const { total, page, pageSize, loading } = useSelector((s: RootState) => s.farms);
  const [items, setItems] = useState<Farm[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Farm | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await dispatch(fetchFarms({ page, pageSize }));
        if (res && res.items) {
          setItems(res.items.farms);
        } else {
          setItems([]);
        }
      } catch (error) {
        setItems([]);
      }
    })();
  }, []); 
  return (
    <div style={{padding:24}}>
      <Top>
        <h1>Fazendas</h1>
        <Btn onClick={()=>{ setEditing(null); setOpen(true); }}>Nova Farm</Btn>
      </Top>

      {items && items.length > 0 ? (
        <FarmsTable
          rows={items}
          page={page}
          pageSize={pageSize}
          total={total}
          loading={loading}
          onEdit={(f)=>{ setEditing(f); setOpen(true); }}
          onPageChange={(p)=> dispatch(fetchFarms({ page:p, pageSize }))}
          onDelete={(f)=>{ 
            dispatch(deleteFarmThunk(f.id)); 
            setItems(items.filter(i=>i.id !== f.id));
          }}
        />
      ) : (
        <div style={{ padding: '24px', textAlign: 'center', color: '#6B7280' }}>
          <p>Nenhuma fazenda encontrada.</p>
        </div>
      )}

      <FarmModal
        open={open}
        farm={editing}
        onClose={()=>{ setOpen(false); dispatch(fetchFarms({ page, pageSize })); }}
      />
    </div>
  );
}