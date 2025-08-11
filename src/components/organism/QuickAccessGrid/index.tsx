import NavTile from '../../molecules/NavTile';
import Grid from './Grid.styles';

export default function QuickAccessGrid(){
  return (
    <Grid aria-label="Acesso rápido">
      <NavTile title="Produtores"   subtitle="Gerenciar cadastro de produtores" to="/produtores" />
      <NavTile title="Propriedades" subtitle="Gerenciar fazendas"              to="/propriedades" />
      <NavTile title="Safras"       subtitle="Gerenciar ciclos de safra"       to="/safras" />
      <NavTile title="Culturas"     subtitle="Gerenciar culturas por safra"    to="/culturas" span={6} />
      <NavTile title="Dashboard"    subtitle="Ver indicadores e gráficos"      to="/dashboard" span={6} />
    </Grid>
  );
}