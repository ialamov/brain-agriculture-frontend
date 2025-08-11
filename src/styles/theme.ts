import type { Theme } from '@emotion/react';

// Extend the default Theme interface to include custom properties
declare module '@emotion/react' {
  export interface Theme {
    colors: {
      brand: string;
      brandDark: string;
      bg: string;
      panel: string;
      border: string;
      ink: string;
      muted: string;
      danger: string;
    };
    radius: {
      sm: number;
      md: number;
      lg: number;
    };
    space: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    shadow: {
      sm: string;
      md: string;
    };
    font: {
      base: string;
    };
  }
}

export const theme: Theme = {
  colors: {
    brand: '#2D6A4F',
    brandDark: '#1B4332',
    bg: '#F3F5F4',
    panel: '#FFFFFF',
    border: '#E5E7EB',
    ink: '#111827',
    muted: '#6B7280',
    danger: '#D9534F',
  },
  radius: { sm: 8, md: 12, lg: 16 },
  space: { xs: 8, sm: 12, md: 16, lg: 24, xl: 32 },
  shadow: { sm: '0 2px 8px rgba(0,0,0,.08)', md: '0 4px 16px rgba(0,0,0,.12)' },
  font: { base: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' },
};