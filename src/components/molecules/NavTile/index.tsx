
import { useNavigate } from 'react-router-dom';
import type { NavTileProps } from './types';
import { Tile, Head, IconCircle, Title, Subtitle, CTA } from './Tile.styles';

export default function NavTile({
  title, subtitle, to, color = '#2D6A4F', span = 4, onClick
}: NavTileProps) {
  const navigate = useNavigate();
  const open = onClick ?? (() => navigate(to));
  return (
    <Tile span={span} role="region" aria-label={title}>
      <Head>
        <IconCircle 
          color={color} 
          aria-hidden
        />
        <div>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </div>
      </Head>
      <CTA onClick={open} aria-label={`Abrir ${title}`}>Abrir</CTA>
    </Tile>
  );
}