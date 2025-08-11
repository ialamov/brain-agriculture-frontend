import styled from "@emotion/styled";

const Grid = styled.section`
  display:grid;
  gap:24px;
  grid-template-columns: repeat(12, 1fr);
  @media (max-width:1199px){ 
    grid-template-columns: repeat(8,1fr); 
  }
  @media (max-width:899px){ 
    grid-template-columns: repeat(4,1fr); 
  }
  @media (max-width:599px){ 
    grid-template-columns: repeat(2,1fr); 
  }
`;

export default Grid;