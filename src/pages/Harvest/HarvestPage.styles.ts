import styled from "@emotion/styled";

const Top = styled.div`
  display:flex; 
  align-items:center; 
  justify-content:space-between; 
  padding:16px 24px; 
  gap:12px; 
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
const Select = styled.select`
  height:40px; 
  padding:0 12px; 
  border:1px solid #E5E7EB; 
  border-radius:8px;
`;

const Input = styled.input`
  height:40px; 
  padding:0 12px; 
  border:1px solid #E5E7EB; 
  border-radius:8px;
  flex: 1;
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px 24px;
  background: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
`;

export { Top, Btn, Select, Input, Controls };