import styled from '@emotion/styled';

export const BaseButton = styled.button<{variant?: 'primary'|'secondary'|'ghost'|'third'}>`
  height: 48px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  width: 100%;

  background: ${({variant}) =>
    variant === 'secondary' ? '#E9ECEF' :
    variant === 'third' ? '#2D6A4F' :  
    variant === 'ghost' ? 'transparent' : '#2D6A4F'};
  color: ${({variant}) => variant === 'secondary' ? '#243127' : '#fff'};
  outline-offset: 2px;

  &:focus-visible { outline: 3px solid rgba(45,106,79,0.45); }
  &:disabled { opacity: .55; cursor: not-allowed; }
`;