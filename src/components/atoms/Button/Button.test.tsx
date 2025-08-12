import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../test-utils';
import Button from './Button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    render(<Button>Custom Button Text</Button>);
    expect(screen.getByText('Custom Button Text')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    button.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('applies disabled state', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('applies different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    const primaryButton = screen.getByRole('button');
    expect(primaryButton).toBeInTheDocument();

    rerender(<Button variant="secondary">Secondary</Button>);
    const secondaryButton = screen.getByRole('button');
    expect(secondaryButton).toBeInTheDocument();
  });

  it('applies loading state', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Entrando…')).toBeInTheDocument();
  });
});
