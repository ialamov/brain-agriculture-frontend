import styled from "@emotion/styled";

const Panel = styled.section`
  background:#fff; 
  border:1px solid #E5E7EB; 
  border-radius:14px; 
  box-shadow:0 2px 10px rgba(0,0,0,.08);
  display:flex; 
  flex-direction:column;
`;
const Head = styled.div`
  padding:16px; 
  border-bottom:1px solid #E5E7EB; 
  display:flex; 
  align-items:center; 
  justify-content:space-between;
`;
const Count = styled.span`
  font-size:12px; 
  color:#6B7280;
`;
const Wrap = styled.div`
  padding:16px; 
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
const Badge = styled.span`
  font-size:12px; 
  color:#fff; 
  background:#2D6A4F; 
  padding:2px 8px; 
  border-radius:999px;
`;

export { Panel, Head, Count, Wrap, Table, Badge };