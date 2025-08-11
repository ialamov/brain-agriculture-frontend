import styled from '@emotion/styled';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
};

const BaseButton = styled.button<Props>(({ theme, variant = 'primary', fullWidth }) => ({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 48,
  padding: '0 16px',
  borderRadius: theme.radius.md,
  border: 'none',
  fontWeight: 600,
  cursor: 'pointer',
  width: fullWidth ? '100%' : undefined,
  transition: 'background 0.2s ease',
  ...(variant === 'primary' && {
    background: theme.colors.brand,
    color: '#fff',
    ':hover': { background: theme.colors.brandDark },
  }),
  ...(variant === 'secondary' && {
    background: '#E9ECEF',
    color: theme.colors.brandDark,
    ':hover': { background: '#DDE2E6' },
  }),
  ...(variant === 'ghost' && {
    background: 'transparent',
    color: theme.colors.brand,
    ':hover': { background: 'rgba(45,106,79,0.08)' },
  }),
  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
}));

export { BaseButton };