import styled from '@emotion/styled';

export const Field = styled.div<{invalid?: boolean}>`
  display: grid;
  gap: 6px;

  label {
    font-size: 14px;
    color: #2f3a33;
  }

  input {
    height: 48px;
    padding: 0 12px;
    border: 1px solid ${({invalid}) => invalid ? '#D9534F' : '#CED4DA'};
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    background: #fff;
  }

  input:focus {
    border-color: #2D6A4F;
    box-shadow: 0 0 0 3px rgba(45,106,79,0.16);
  }

  small {
    color: #D9534F;
  }
`;