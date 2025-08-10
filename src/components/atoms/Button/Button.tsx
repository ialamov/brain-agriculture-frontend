import { type ButtonHTMLAttributes } from 'react';
import { BaseButton } from './Button.styles';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary'|'secondary'|'ghost'|'third';
  loading?: boolean;
};

export default function Button({children, loading, ...rest}: Props) {
  return (
    <BaseButton {...rest} aria-busy={loading}>
      {loading ? 'Entrando…' : children}
    </BaseButton>
  );
}