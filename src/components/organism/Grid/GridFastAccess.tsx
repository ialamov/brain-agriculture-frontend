import { GridStyles, Tile, Head, Title, Sub, CTA, Icon } from "./Grid.styles";
import { useNavigate } from "react-router-dom";

const GridFastAccess = () => {
  const navigate = useNavigate();

  return (
    <GridStyles aria-label="Acesso rápido">
      <Tile>
        <Head><Icon>F</Icon><div><Title>Produtor</Title><Sub>1º Cadastre o produtor</Sub></div></Head>
        <CTA onClick={()=>navigate('/farmers')}>Abrir</CTA>
      </Tile>
      <Tile>
        <Head><Icon>Fa</Icon><div><Title>Fazenda</Title><Sub>2º Vincule fazendas ao produtor</Sub></div></Head>
        <CTA onClick={()=>navigate('/farms')}>Abrir</CTA>
      </Tile>
      <Tile>
        <Head><Icon>H</Icon><div><Title>Safra</Title><Sub>3º Adicione safras por fazenda e cultura por safra</Sub></div></Head>
        <CTA onClick={()=>navigate('/harvests')}>Abrir</CTA>
      </Tile>
    </GridStyles>
  );
};

export { GridFastAccess };