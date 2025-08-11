import styled from '@emotion/styled';

const Page = styled.main`
  padding: 24px;
  display: grid;
  gap: 24px;
  background: #F3F5F4;
`;

const AppBar = styled.header`
  background: linear-gradient(0deg, rgba(27,67,50,.98), rgba(27,67,50,.98)), #1B4332;
  color: #fff;
  padding: 16px 24px;
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  h1 { margin: 0; font-size: 18px; letter-spacing: .3px; }
`;

const Actions = styled.div` display: flex; gap: 12px; flex-wrap: wrap; `;
const Btn = styled.button<{variant?: 'primary'|'secondary'}>`
  height: 40px; padding: 0 14px; border: none; border-radius: 10px; cursor: pointer; font-weight: 600;
  background: ${({variant}) => variant==='secondary' ? '#E9ECEF' : '#2D6A4F'};
  color: ${({variant}) => variant==='secondary' ? '#243127' : '#fff'};
`;

const Grid = styled.section`
  display: grid; gap: 24px; grid-template-columns: repeat(12, 1fr);
  @media (max-width:1199px){ grid-template-columns: repeat(8,1fr); }
  @media (max-width:899px){ grid-template-columns: repeat(4,1fr); }
`;

const Tile = styled.article`
  grid-column: span 4;
  background:#fff; border:1px solid #E5E7EB; border-radius:14px;
  box-shadow:0 2px 10px rgba(0,0,0,.08);
  padding:16px; min-height:160px; display:flex; flex-direction:column; gap:12px; position:relative;
  .head{ display:flex; gap:12px; align-items:center; }
  .icon{ width:44px; height:44px; border-radius:50%; background:#2D6A4F; }
  .title{ font-weight:700; color:#1B4332; }
  .subtitle{ color:#6B7280; font-size:14px; }
  .cta{ position:absolute; right:16px; bottom:16px; height:36px; padding:0 14px; border:none; border-radius:8px; background:#2D6A4F; color:#fff; cursor:pointer; }
`;

const TileSpan6 = styled(Tile)` grid-column: span 6; `;

export { Page, AppBar, Actions, Btn, Grid, Tile, TileSpan6 };