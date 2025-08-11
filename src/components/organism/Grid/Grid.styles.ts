import styled from '@emotion/styled';

const Panel = styled.section`
  background:#fff; 
  border:1px solid #E5E7EB; 
  border-radius:14px; 
  box-shadow:0 2px 12px rgba(0,0,0,.08); 
  padding:16px; 
  display:flex; 
  flex-direction:column; 
  gap:12px;
`;

const GridStyles = styled.section`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(12, 1fr);
  @media (max-width:1199px){ grid-template-columns:repeat(8, 1fr); }
  @media (max-width:899px){ grid-template-columns:repeat(4, 1fr); }
`;

const KPI = styled(Panel)`
  display:flex; flex-direction:column; 
  gap:4px;
  background:#fff; 
  border-radius:14px;
  padding:16px; 
  border:1px solid #E5E7EB;
  box-shadow:0 2px 10px rgba(0,0,0,.08);
`;

const KLabel = styled.span`
  color:#6B7280; 
  font-size:14px;
`;

const KValue = styled.span`
  font-size:24px; 
  font-weight:700; 
  color:#1B4332;
`;

const Tile = styled(Panel)`
  min-height:160px; 
  grid-column:span 3; 
  position:relative;
`;

const Head = styled.div`
  display:flex; 
  gap:12px; 
  align-items:center;
`;
const Title = styled.div`
  font-weight:700; 
  color:#1B4332;
`;

const Sub = styled.div`
  color:#6B7280; 
  font-size:14px;
`;
const CTA = styled.button`
  position:absolute; 
  right:16px; 
  bottom:16px; 
  height:36px; 
  padding:0 14px; 
  border:none; 
  border-radius:8px; 
  background:#2D6A4F; 
  color:#fff; 
  cursor:pointer;
`;

const Icon = styled.div`
  width:44px; 
  height:44px; 
  border-radius:50%; 
  background:#2D6A4F; 
  color:#fff; 
  display:grid; 
  place-items:center; 
  font-weight:700;
  font-size:24px;
`;

export { GridStyles, KPI, KLabel, KValue, Tile, Head, Title, Sub, CTA, Icon };