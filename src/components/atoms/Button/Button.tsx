import { type ButtonHTMLAttributes } from 'react';
import { BaseButton } from './Button.styles';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary'|'secondary'|'ghost'|'third';
  loading?: boolean;
};

export default function Button({ children, loading, variant, ...rest }: Props) {
  const allowedVariants = ['primary', 'secondary', 'ghost', 'third'] as const;
  const safeVariant = allowedVariants.includes(variant as any) ? variant : undefined;

  return (
    <BaseButton
      {...rest}
      variant={safeVariant as 'primary' | 'secondary' | 'ghost' | undefined}
      aria-busy={loading}
    >
      {loading ? 'Entrando…' : children}
    </BaseButton>
  );
}