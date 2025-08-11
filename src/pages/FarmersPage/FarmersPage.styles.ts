import styled from '@emotion/styled';

const Shell = styled.section`
  display:grid; grid-template-columns: 1fr 420px; gap:24px; padding:24px;
  @media (max-width:1100px){ grid-template-columns: 1fr; }
`;

const ListPanel = styled.section``;

export { Shell, ListPanel };