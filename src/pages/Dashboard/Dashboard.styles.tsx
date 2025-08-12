import styled from "@emotion/styled";

const Wrap = styled.div`
  display:grid; 
  gap:16px;
`;

const Cards = styled.div`
  display:grid; 
  grid-template-columns: repeat(4, minmax(0,1fr)); 
  gap:12px; 
  @media(max-width:1100px){ grid-template-columns: repeat(2, minmax(0,1fr)); }
`;

const Card = styled.div`
  background:#fff; 
  border:1px solid #E5E7EB; 
  border-radius:14px; 
  padding:14px; 
  box-shadow:0 2px 12px rgba(0,0,0,.08);
`;

const Label = styled.div`
  color:#6B7280; 
  font-size:12px;
`;

const Value = styled.div`
  font-size:24px; 
  font-weight:700;
`;

const Grid = styled.div`
  display:grid; 
  grid-template-columns: repeat(3, minmax(0,1fr)); 
  gap:16px; 
  @media(max-width:1100px){ grid-template-columns: 1fr; }
`;

const COLORS = ['#2D6A4F','#40916C','#74C69D','#95D5B2','#B7E4C7','#D8F3DC'];

const Panel = styled.div`
  background:#fff; 
  border:1px solid #E5E7EB; 
  border-radius:14px; 
  padding:12px; 
  box-shadow:0 2px 12px rgba(0,0,0,.08);
`;

export { Wrap, Cards, Card, Label, Value, Grid, COLORS, Panel };