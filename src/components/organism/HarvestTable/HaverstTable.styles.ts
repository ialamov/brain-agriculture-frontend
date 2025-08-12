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
  display:flex; 
  align-items:center; 
  justify-content:space-between;
  strong{
    margin:0;
    font-size:18px;
    color:#1B4332;
  }
`;

const Count = styled.span`
  color:#6B7280; 
  font-size:12px;
`;

const Body = styled.div`
  overflow:auto;
`;

const Table = styled.table`
  width:100%; 
  border-collapse:collapse;
  th, td { 
    padding:12px 16px; 
    border-top:1px solid #E5E7EB; 
    text-align:left; 
    white-space:nowrap;
  }
  th {
    font-weight:600; 
    color:#374151; 
    background:#FAFAFA;
  }
  tr:hover td {
    background:#FCFDFB; 
  }
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
  border:none; border-radius:8px; 
  font-weight:600; 
  cursor:pointer; 
  background:${p=>p.primary?'#2D6A4F':'transparent'}; 
  color:${p=>p.primary?'#fff':'#1F2937'}; 
  &:disabled{
    opacity:.6; 
    cursor:not-allowed;
  }
`;

const Empty = styled.div`
  padding:24px; 
  color:#6B7280; 
  text-align:center;
`;

export { Panel, Head, Count, Body, Table, Pag, Btn, Empty };