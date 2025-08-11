import NavTile from '../../molecules/NavTile';
import Grid from './Grid.styles';

export default function QuickAccessGrid(){
  return (
    <Grid aria-label="Acesso rápido">
      <NavTile title="Produtores"   subtitle="Gerenciar cadastro de produtores" to="/farmers" />
      <NavTile title="Propriedades" subtitle="Gerenciar fazendas"              to="/farms" />
      <NavTile title="Safras"       subtitle="Gerenciar ciclos de safra"       to="/harvests" />
      <NavTile title="Culturas"     subtitle="Gerenciar culturas por safra"    to="/crops" span={6} />
      <NavTile title="Dashboard"    subtitle="Ver indicadores e gráficos"      to="/dashboard" span={6} />
    </Grid>
  );
}