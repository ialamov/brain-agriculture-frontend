import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createHarvestThunk, updateHarvestThunk } from "../../../../store/harvest/thunk";
import { listAllFarms } from "../../../../service/agriculture/agricultureApi";
import { Overlay, Dialog, Head, Body, Row2, Row3, Field, Label, Input, Select, Textarea, Error, Foot, Btn } from "./Harvest.styles";
import ReactDOM from "react-dom";
import type { Props } from "./type";

export default function HarvestModal({ open, onClose, harvest }: Props){
    const dispatch = useDispatch<any>();
    const firstRef = useRef<HTMLSelectElement>(null);
  
    const [farmId, setFarmId] = useState(harvest?.farmId || '');
    const [season, setSeason] = useState(harvest?.season || '');
    const [sowingDate, setSowing] = useState<string | ''>(harvest?.sowingDate ?? '');
    const [harvestDate, setHarvest] = useState<string | ''>(harvest?.harvestDate ?? '');
    const [notes, setNotes] = useState(harvest?.notes || '');
    const [farms, setFarms] = useState<{ id:string; name:string }[]>([]);
    const [submitting, setSubmitting] = useState(false);
  
    useEffect(()=>{ if(open){ setTimeout(()=>firstRef.current?.focus(), 50); loadFarms(); } }, [open]);
    useEffect(()=>{ if(!open){ reset(); } }, [open]);
  
    function reset(){
      setFarmId(harvest?.farmId || '');
      setSeason(harvest?.season || '');
      setSowing(harvest?.sowingDate ?? '');
      setHarvest(harvest?.harvestDate ?? '');
      setNotes(harvest?.notes || '');
    }
  
    async function loadFarms(){
      try{
        const res = await listAllFarms({ page:1, pageSize:50 });
        setFarms(res.items.map((f:any)=>({ id:f.id, name:f.name })));
      }catch(e){ console.error(e); }
    }
  
    const datesOK = useMemo(()=>{
      if (!sowingDate || !harvestDate) return true;
      return new Date(harvestDate) >= new Date(sowingDate);
    }, [sowingDate, harvestDate]);
  
    const errors: Record<string,string> = {};
    if (!farmId) errors.farmId = 'Selecione uma farm';
    if (!season.trim()) errors.season = 'Selecione a safra';
    if (!datesOK) errors.dates = 'Colheita não pode ser antes do plantio';
  
    async function onSubmit(e: React.FormEvent){
      e.preventDefault();
      if (Object.keys(errors).length) return;
      try{
        setSubmitting(true);
        const payload = {
          farmId,
          season: season.trim(),
          sowingDate: sowingDate || null,
          harvestDate: harvestDate || null,
          notes: notes.trim() || undefined,
        };
        if (harvest) await dispatch(updateHarvestThunk(harvest.id, payload));
        else await dispatch(createHarvestThunk(payload));
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
            <h2 id="dlg-title">{harvest ? 'Editar Harvest' : 'Nova Harvest'}</h2>
            <Btn variant="secondary" type="button" onClick={onClose}>Fechar</Btn>
          </Head>
          <Body>
            <Row2>
              <Field>
                <Label>Farm</Label>
                <Select ref={firstRef} value={farmId} onChange={e=>setFarmId(e.target.value)}>
                  <option value="">Selecione</option>
                  {farms.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </Select>
                {errors.farmId && <Error>{errors.farmId}</Error>}
              </Field>
              <Field>
                <Label>Safra</Label>
                <Select value={season} onChange={e=>setSeason(e.target.value)}>
                  <option value="">Selecione</option>
                  {['Safra 2023','Safra 2024','Safra 2025','Safra 2026'].map(s => <option key={s} value={s}>{s}</option>)}
                </Select>
                {errors.season && <Error>{errors.season}</Error>}
              </Field>
            </Row2>
  
            <Row3>
              <Field>
                <Label>Plantio (opcional)</Label>
                <Input type="date" value={sowingDate} onChange={e=>setSowing(e.target.value)} />
              </Field>
              <Field>
                <Label>Colheita (opcional)</Label>
                <Input type="date" value={harvestDate} onChange={e=>setHarvest(e.target.value)} />
                {errors.dates && <Error>{errors.dates}</Error>}
              </Field>
              <Field>
                <Label>Crops (informativo)</Label>
                <Input type="number" readOnly value={harvest?.cropsCount ?? 0} />
              </Field>
            </Row3>
  
            <Field>
              <Label>Observações (opcional)</Label>
              <Textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notas da safra..." />
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