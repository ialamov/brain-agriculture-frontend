import { useState, useEffect, useMemo } from "react";
import { Panel, Head, Body, Grid, Field, Label, Input, Row2, Select, Actions, Btn, Error } from "./FarmerForm.styles";
import {type Props, type Draft, emptyDraft } from "./types";
import type { Farm, Farmer } from "../../../pages/FarmersPage/types";
import { isValidDoc, landOK } from "../../../utils/validators";

export default function FarmerForm({ editing, onSubmit, onClear }: Props) {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [errors, setErrors] = useState<Record<string,string>>({});

  useEffect(() => {
    if (editing) {
      const first = editing.farms[0] as Farm | undefined;
      setDraft({
        id: editing.id,
        doc: editing.doc,
        name: editing.name,
        city: first?.city || '',
        state: first?.state || 'SP',
        farmName: first?.name || '',
        harvest: first?.harvests[0]?.name || 'Safra 2025',
        total: String(first?.area.total ?? ''),
        cultivationArea: String(first?.area.cultivationArea ?? ''),
        vegetationArea: String(first?.area.vegetationArea ?? ''),
        crop: first?.harvests[0]?.crops[0]?.name || 'Soja',
      });
    } else {
      setDraft(emptyDraft);
    }
  }, [editing]);

  const area = useMemo(() => ({
    total: Number(draft.total || 0),
    cultivationArea: Number(draft.cultivationArea || 0),
    vegetationArea: Number(draft.vegetationArea || 0),
  }), [draft.total, draft.cultivationArea, draft.vegetationArea]);

  function validate(): boolean {
    const e: Record<string,string> = {};
    if (!isValidDoc(draft.doc)) e.doc = 'Documento inválido (CPF/CNPJ)';
    if (!draft.name.trim()) e.name = 'Informe o nome';
    if (!draft.city.trim()) e.city = 'Informe a cidade';
    if (!draft.farmName.trim()) e.farmName = 'Informe o nome da fazenda';
    if (!area.total) e.total = 'Informe a área total';
    if (!landOK({ total: area.total, arable: area.cultivationArea, vegetation: area.vegetationArea })) {
      e.cultivationArea = 'Área de cultivo + Área de vegetação não pode exceder a área total';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    const farm: Farm = {
      name: draft.farmName,
      city: draft.city,
      state: draft.state,
      area: { total: area.total, cultivationArea: area.cultivationArea, vegetationArea: area.vegetationArea },
      harvests: [{
				name: draft.harvest, 
				crops: [{ name: draft.crop }],
				id: "",
				year: ""
			}]
    };
    const producer: Farmer = {
      id: draft.id || crypto.randomUUID(),
      doc: draft.doc,
      name: draft.name,
      farms: [farm],
    };
    onSubmit(producer);
    setDraft(emptyDraft);
    setErrors({});
  }

  return (
    <Panel>
      <Head>
        <strong>{editing ? 'Editar Produtor' : 'Novo Produtor'}</strong>
        <span style={{fontSize:12, color:'#6B7280'}}>Cadastro rápido</span>
      </Head>

      <Body>
        <Grid>
          <Field>
            <Label>CPF ou CNPJ</Label>
            <Input value={draft.doc} onChange={e=>setDraft(d=>({...d, doc:e.target.value}))} placeholder="___.___.___-__ ou __.___.___/____-__"/>
            {errors.doc && <Error>{errors.doc}</Error>}
          </Field>

          <Field>
            <Label>Nome do produtor</Label>
            <Input value={draft.name} onChange={e=>setDraft(d=>({...d, name:e.target.value}))}/>
            {errors.name && <Error>{errors.name}</Error>}
          </Field>

          <Row2>
            <Field>
              <Label>Cidade</Label>
              <Input value={draft.city} onChange={e=>setDraft(d=>({...d, city:e.target.value}))}/>
              {errors.city && <Error>{errors.city}</Error>}
            </Field>
            <Field>
              <Label>Estado (UF)</Label>
              <Select value={draft.state} onChange={e=>setDraft(d=>({...d, state:e.target.value}))}>
                {['SP','PR','MT','RS','GO','MG','BA','MS','RO','SC'].map(uf=> <option key={uf} value={uf}>{uf}</option>)}
              </Select>
            </Field>
          </Row2>

          <Row2>
            <Field>
              <Label>Nome da fazenda</Label>
              <Input value={draft.farmName} onChange={e=>setDraft(d=>({...d, farmName:e.target.value}))}/>
              {errors.farmName && <Error>{errors.farmName}</Error>}
            </Field>
            <Field>
              <Label>Safra</Label>
              <Select value={draft.harvest} onChange={e=>setDraft(d=>({...d, harvest:e.target.value}))}>
                {['Safra 2023','Safra 2024','Safra 2025','Safra 2026'].map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
            </Field>
          </Row2>

          <Row2>
            <Field>
              <Label>Área total (ha)</Label>
              <Input type="number" value={draft.total} onChange={e=>setDraft(d=>({...d, total:e.target.value}))} placeholder="0,00"/>
              {errors.total && <Error>{errors.total}</Error>}
            </Field>
            <Field>
              <Label>Área agricultável (ha)</Label>
              <Input type="number" value={draft.cultivationArea} onChange={e=>setDraft(d=>({...d, cultivationArea:e.target.value}))} placeholder="0,00"/>
            </Field>
          </Row2>

          <Field>
            <Label>Área de vegetação (ha)</Label>
            <Input type="number" value={draft.vegetationArea} onChange={e=>setDraft(d=>({...d, vegetationArea:e.target.value}))} placeholder="0,00"/>
            {errors.vegetationArea && <Error>{errors.vegetationArea}</Error>}
          </Field>

          <Field>
            <Label>Culturas plantadas</Label>
            <Select value={draft.crop} onChange={e=>setDraft(d=>({...d, crop:e.target.value}))}>
              {['Soja','Milho','Café','Algodão','Trigo'].map(c => <option key={c} value={c}>{c}</option>)}
            </Select>
            <small style={{color:'#6B7280'}}>Você pode adicionar várias culturas por safra (extensível no domínio).</small>
          </Field>
        </Grid>
      </Body>

      <Actions>
        <Btn onClick={handleSubmit}>Salvar</Btn>
        <Btn variant="secondary" type="button" onClick={()=>{ setDraft(emptyDraft); setErrors({}); onClear(); }}>Limpar</Btn>
      </Actions>
    </Panel>
  );
}