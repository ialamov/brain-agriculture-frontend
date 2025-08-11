import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import type { NavTileProps } from './types';

const Tile = styled.article<{ span: 4|6 }>`
  grid-column: span ${({span}) => span};
  background:#fff; border:1px solid #E5E7EB; border-radius:14px;
  box-shadow:0 2px 10px rgba(0,0,0,.08);
  padding:16px; min-height:160px; display:flex; flex-direction:column; gap:12px; position:relative;

  @media (max-width:1199px){ grid-column: span 4; }
  @media (max-width:899px){ grid-column: span 4; }
`;

const Head = styled.div`display:flex; gap:12px; align-items:center;`;
const IconCircle = styled.div<{ color: string }>`
  width:44px; height:44px; border-radius:50%; background:${p=>p.color};
`;
const Title = styled.div`font-weight:700; color:#1B4332;`;
const Subtitle = styled.div`color:#6B7280; font-size:14px;`;
const CTA = styled.button`
  position:absolute; right:16px; bottom:16px;
  height:36px; padding:0 14px; border:none; border-radius:8px;
  background:#2D6A4F; color:#fff; cursor:pointer;
`;

export default function NavTile({
  title, subtitle, to, color = '#2D6A4F', span = 4, onClick
}: NavTileProps) {
  const navigate = useNavigate();
  const open = onClick ?? (() => navigate(to));
  return (
    <Tile span={span} role="region" aria-label={title}>
      <Head>
        <IconCircle color={color} aria-hidden />
        <div>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </div>
      </Head>
      <CTA onClick={open} aria-label={`Abrir ${title}`}>Abrir</CTA>
    </Tile>
  );
}