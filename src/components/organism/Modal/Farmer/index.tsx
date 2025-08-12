import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { createFarmer, updateFarmer } from "../../../../service/agriculture/agricultureApi";
import { isValidDoc, removeDots } from "../../../../utils/validators";
import { Label } from "../../../atoms/Input/Label/Label.styles";
import { Field } from "../../../atoms/TextFields/TextFields.styles";
import { Input } from "../../../atoms/Input/Input/Input.styles"
import { Overlay, Dialog, Head, Error, Foot, Btn, Body } from "./Farmer.styles";
import type { PropsModal } from "./type";

export default function FarmerCreateModal({ open, onClose, onCreated, selectedFarmer, originBtn }: PropsModal) {
  const [name, setName] = useState('');
  const [doc, setDoc] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const firstRef = useRef<HTMLInputElement>(null);

  const errors: Record<string,string> = {};
  if (!name.trim()) errors.name = 'Informe o nome';
  if (!isValidDoc(doc)) errors.doc = 'Documento inválido';

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setName(''); setDoc('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (selectedFarmer) {
      const farmer = await updateFarmer(selectedFarmer.id, {
        name: name.trim(),
      });
      onCreated?.(farmer);
      onClose();
    }

    if (Object.keys(errors).length) return;
    try {
      setSubmitting(true);

      const farmer = await createFarmer({ 
        name: name.trim(), 
        cpf: removeDots(doc).length === 11 ? removeDots(doc) : null,
        cnpj: removeDots(doc).length === 14 ? removeDots(doc) : null,
      });
      onCreated?.(farmer);
      onClose();
    } catch (err: any) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return ReactDOM.createPortal(
    <Overlay role="dialog" aria-modal="true" aria-labelledby="dlg-title" onMouseDown={(e)=>{ if (e.target === e.currentTarget) onClose(); }}>
      <Dialog onSubmit={handleSubmit}>
        <Head>
          <h2 id="dlg-title">{originBtn === 'edit' ? 'Editar Produtor' : 'Novo Produtor'}</h2>
          <Btn type="button" variant="secondary" onClick={onClose}>Fechar</Btn>
        </Head>
        <Body>
          <Field>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" ref={firstRef} value={name} 
            onChange={e=>setName(e.target.value)} 
            placeholder="Ex.: João da Silva" 
            required 
            autoFocus 
            />
            {errors.name && <Error>{errors.name}</Error>}
          </Field>
          <Field>
            <Label htmlFor="doc">CPF ou CNPJ <span style={{color:'#6B7280'}}>(opcional)</span></Label>
            <Input id="doc" value={doc || selectedFarmer?.doc} 
              onChange={e=>setDoc(e.target.value)} 
              placeholder="___.___.___-__ ou __.___.___/____-__" 
              required 
              autoFocus 
              disabled={originBtn === 'edit'}
            />
              { (originBtn === 'edit' && <Error>Não é possível editar o documento</Error>)
              ||(errors.doc && <Error>{errors.doc}</Error>)}
          </Field>
        </Body>
        <Foot>
          <Btn type="button" variant="secondary" onClick={onClose}>Cancelar</Btn>
          <Btn type="submit" disabled={submitting || !!Object.keys(errors).length}>{submitting ? 'Salvando…' : 'Salvar'}</Btn>
        </Foot>
      </Dialog>
    </Overlay>,
    document.body
  );
}
