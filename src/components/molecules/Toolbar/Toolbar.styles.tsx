import styled from '@emotion/styled';

const Bar = styled.div`
  display:flex; 
  gap:12px; 
  flex-wrap:wrap;
`;
const Input = styled.input`
  height:40px; 
  padding:0 12px; 
  border:1px solid #E5E7EB; 
  border-radius:8px; 
  min-width:220px;
`;
const Select = styled.select`
  height:40px; 
  padding:0 12px; 
  border:1px solid #E5E7EB; 
  border-radius:8px;
`;

export { Bar, Input, Select };