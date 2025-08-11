import styled from "@emotion/styled";

const Input = styled.input`
  height: 48px; 
  padding: 0 12px; 
  border: 1px solid #E5E7EB; 
  border-radius: 10px; 
  font-size: 16px;
  &:focus { 
    outline: none; 
    border-color: #2D6A4F; 
    box-shadow: 0 0 0 3px rgba(45,106,79,0.16); 
  }
`;

export { Input };