import styled from "@emotion/styled";

const Panel = styled.aside`
  background:#fff; 
  border:1px solid #E5E7EB; 
  border-radius:14px; 
  box-shadow:0 2px 10px rgba(0,0,0,.08);
  position:sticky; 
  top:24px; height: calc(100vh - 96px);
  display:flex; 
  flex-direction:column;
  @media (max-width:1100px){ 
    position:static; 
    height:auto; 
  }
`;
const Head = styled.div`
  padding:16px; 
  border-bottom:1px solid #E5E7EB; 
  display:flex; 
  justify-content:space-between;
`;
const Body = styled.div`
  padding:16px; 
  display:grid; 
  gap:16px;
`;
const Grid = styled.div`
  display:grid; 
  gap:12px;
`;
const Row2 = styled.div`
  display:grid; 
  grid-template-columns:1fr 1fr; 
  gap:12px;
`;
const Field = styled.div`
  display:grid; 
  gap:8px;
`;
const Label = styled.label`
  font-size:14px; 
  color:#2f3a33;
`;
const Input = styled.input`
  height:44px; 
  padding:0 12px; 
  border:1px solid #E5E7EB; 
  border-radius:8px;
`;
const Select = styled.select`
  height:44px; 
  padding:0 12px; 
  border:1px solid #E5E7EB; 
  border-radius:8px;
`;
const Error = styled.small`
  color:#D9534F;
`;
const Actions = styled.div`
  margin-top:auto; 
  padding:16px;  
  display:grid; gap:12px; 
  grid-template-columns:1fr 1fr; 
  border-top:1px solid #E5E7EB;
`;
const Btn = styled.button<{variant?:'primary'|'secondary'}>`
  height:40px; 
  padding:0 14px; 
  border:none; 
  border-radius:10px; 
  cursor:pointer; 
  font-weight:600;
  background:${p=>p.variant==='secondary' ? '#E9ECEF' : '#2D6A4F'};
  color:${p=>p.variant==='secondary' ? '#243127' : '#fff'};
`;

export { Panel, Head, Body, Grid, Row2, Field, Label, Input, Select, Error, Actions, Btn };