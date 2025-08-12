import styled from "@emotion/styled";

const Panel = styled.section`
  background:#fff; 
  border:1px solid #E5E7EB; 
  border-radius:14px; 
  box-shadow:0 2px 12px rgba(0,0,0,.08); 
  display:flex; 
  flex-direction:column;
`;

const Head = styled.div`
  padding:16px; 
  border-bottom:1px solid #E5E7EB; 
  display:flex; align-items:center; justify-content:space-between;`;

const Count = styled.span`
  color:#6B7280; 
  font-size:12px;
`;

const Body = styled.div`
  overflow:auto;
`;

const Table = styled.table`
  width:100%; border-collapse:collapse;
  th, td { padding:12px 16px; border-top:1px solid #E5E7EB; text-align:left; vertical-align:top; }
  th { font-weight:600; color:#374151; background:#FAFAFA; }
  tr:hover td { background:#FCFDFB; }
`;

const Pag = styled.div`
  padding:12px 16px; 
  display:flex; 
  align-items:center; 
  justify-content:space-between; 
  gap:12px;
`;

const Btn = styled.button<{
  primary?:boolean
}>`  
  height:36px; 
  padding:0 12px; 
  border:none; 
  border-radius:8px; 
  font-weight:600; 
  cursor:pointer; 
  background:${p=>p.primary?'#2D6A4F':'transparent'}; 
  color:${p=>p.primary?'#fff':'#1F2937'};
  &:disabled{
    opacity:.6; 
    cursor:not-allowed;
  }`;

const Chip = styled.span`  
  padding:4px 8px; 
  border-radius:999px; 
  background:#EDF6F0; 
  border:1px solid #D8EADF; 
  font-size:12px; 
  margin:2px; 
  display:inline-block
;`;

const Muted = styled.span`
  color:#6B7280; font-size:12px;
`;

const Code = styled.code`
  background:#F5F5F5; 
  border:1px solid #E5E7EB; 
  padding:2px 6px; 
  border-radius:6px;
`;    

export { Panel, Head, Count, Body, Table, Pag, Btn, Chip, Muted, Code };