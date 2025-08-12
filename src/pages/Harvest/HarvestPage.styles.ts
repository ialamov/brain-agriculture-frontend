import styled from "@emotion/styled";

const Top = styled.div`
  display:flex; 
  align-items:center; 
  justify-content:space-between; 
  padding:16px 24px; gap:12px; 
  flex-wrap:wrap;
`;

const Btn = styled.button`
  height:40px; 
  padding:0 14px; 
  border:none; 
  border-radius:10px; 
  font-weight:600; 
  cursor:pointer; 
  background:#2D6A4F; 
  color:#fff;
`;

const Controls = styled.div`
  display:flex; 
  gap:12px; 
  flex-wrap:wrap; 
  padding:0 0 16px;
`;

const Input = styled.input`
  height:40px; 
  padding:0 12px; 
  border:1px solid #E5E7EB; border-radius:8px;`;

const Select = styled.select`
  height:40px; 
  padding:0 12px; 
  border:1px solid #E5E7EB; 
  border-radius:8px;`;

export { Top, Btn, Controls, Input, Select };