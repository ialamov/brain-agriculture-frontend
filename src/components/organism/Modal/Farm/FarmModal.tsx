import { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { createFarmThunk, updateFarmThunk } from '../../../../store/farm/thunks';
import { useDispatch } from 'react-redux';
import { listFarmers } from '../../../../service/agriculture/agricultureApi';
import type { Props } from './type';
import { Overlay, Dialog, Head, Body, Row2, Field, Label, Input, Select, Error, Foot, Btn } from './FarmModal.styles';
import type { Farmer } from '../../../../service/agriculture/types';

export default function FarmModal({ open, onClose, farm }: Props){
  const dispatch = useDispatch<any>();
  const firstRef = useRef<HTMLInputElement>(null);

  const [farmerId, setFarmerId] = useState(farm?.farmerId || '');
  const [name, setName] = useState(farm?.name || '');
  const [city, setCity] = useState(farm?.city || '');
  const [state, setState] = useState(farm?.state || 'SP');
  const [totalArea, setTotal] = useState<number | ''>(farm?.totalArea ?? '');
  const [cultivationArea, setCult] = useState<number | ''>(farm?.cultivationArea ?? '');
  const [vegetationArea, setVeg] = useState<number | ''>(farm?.vegetationArea ?? '');
  const [farmers, setFarmers] = useState<{ id:string; name:string }[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(()=>{ 
    if (open) { 
    const farmers = loadFarmers();
  }}, [open]);

  useEffect(()=>{ if(!open){ reset(); } }, [open]);

  function reset(){
    setFarmerId(farm?.farmerId || '');
    setName(farm?.name || '');
    setCity(farm?.city || '');
    setState(farm?.state || 'SP');
    setTotal(farm?.totalArea ?? '');
    setCult(farm?.cultivationArea ?? '');
    setVeg(farm?.vegetationArea ?? '');
  }

  async function loadFarmers(){
    try{
      const res = await listFarmers({ page:1, pageSize:50 });
      setFarmers(res.map((f: { id: string; name: string }) => ({ id: f.id, name: f.name })));
    }catch(e){ console.error(e); }
  }

  const landOK = useMemo(()=>{
    const t = Number(totalArea||0), c = Number(cultivationArea||0), v = Number(vegetationArea||0);
    return (c + v) <= t;
  }, [totalArea, cultivationArea, vegetationArea]);

  const errors: Record<string,string> = {};
  if (!farmerId) errors.farmerId = 'Selecione um farmer';
  if (!name.trim()) errors.name = 'Informe o nome';
  if (!city.trim()) errors.city = 'Informe a cidade';
  if (!(Number(totalArea) > 0)) errors.totalArea = 'Informe a área total';
  if (!landOK) errors.land = 'Cultivo + Vegetação não pode exceder o Total';

  async function onSubmit(e: React.FormEvent){
    e.preventDefault();
    if (Object.keys(errors).length) return;
    try{
      setSubmitting(true);
      if (farm) {
        await dispatch(updateFarmThunk(farm.id, {
          farmerId, name: name.trim(), city: city.trim(), state,
          totalArea: Number(totalArea), cultivationArea: Number(cultivationArea||0), vegetationArea: Number(vegetationArea||0)
        }));
      } else {
        await dispatch(createFarmThunk({
          farmerId, name: name.trim(), city: city.trim(), state,
          totalArea: Number(totalArea), cultivationArea: Number(cultivationArea||0), vegetationArea: Number(vegetationArea||0)
        }));
      }
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;
  return ReactDOM.createPortal(
    <Overlay role="dialog" aria-modal="true" aria-labelledby="dlg-title" onMouseDown={(e)=>{ if (e.target === e.currentTarget) onClose(); }}>
      <Dialog onSubmit={onSubmit}>
        <Head>
          <h2 id="dlg-title">{farm ? 'Editar Farm' : 'Nova Farm'}</h2>
          <Btn variant="secondary" type="button" onClick={onClose}>Fechar</Btn>
        </Head>
        <Body>
          <Field>
            <Label>Produtor</Label>
            <Select value={farmerId} onChange={e=>setFarmerId(e.target.value)}>
              <option value="">Busque um produtor</option>
              {farmers.map(f => {
                return <option key={f.id} value={f.id}>{f.name}</option>
              })}
            </Select>
            {errors.farmerId && <Error>{errors.farmerId}</Error>}
          </Field>

          <Field>
            <Label>Nome da farm</Label>
            <Input ref={firstRef} value={name} onChange={e=>setName(e.target.value)} placeholder="Ex.: Fazenda São João" />
            {errors.name && <Error>{errors.name}</Error>}
          </Field>

          <Row2>
            <Field>
              <Label>Cidade</Label>
              <Input value={city} onChange={e=>setCity(e.target.value)} />
              {errors.city && <Error>{errors.city}</Error>}
            </Field>
            <Field>
              <Label>UF</Label>
              <Select value={state} onChange={e=>setState(e.target.value)}>
                {['SP','PR','MT','RS','GO','MG','BA','MS','RO','SC'].map(u=> <option key={u} value={u}>{u}</option>)}
              </Select>
            </Field>
          </Row2>

          <Row2>
            <Field>
              <Label>Área total (ha)</Label>
              <Input type="number" value={totalArea} onChange={e=>setTotal(e.target.value === '' ? '' : Number(e.target.value))} placeholder="0,00"/>
              {errors.totalArea && <Error>{errors.totalArea}</Error>}
            </Field>
            <Field>
              <Label>Área cultivo (ha)</Label>
              <Input type="number" value={cultivationArea} onChange={e=>setCult(e.target.value === '' ? '' : Number(e.target.value))} placeholder="0,00"/>
            </Field>
          </Row2>

          <Field>
            <Label>Área vegetação (ha)</Label>
            <Input type="number" value={vegetationArea} onChange={e=>setVeg(e.target.value === '' ? '' : Number(e.target.value))} placeholder="0,00"/>
            {errors.land && <Error>{errors.land}</Error>}
          </Field>
        </Body>
        <Foot>
          <Btn variant="secondary" type="button" onClick={onClose}>Cancelar</Btn>
          <Btn type="submit" disabled={submitting || !!Object.keys(errors).length}>{submitting ? 'Salvando…' : 'Salvar'}</Btn>
        </Foot>
      </Dialog>
    </Overlay>,
    document.body
  );
}