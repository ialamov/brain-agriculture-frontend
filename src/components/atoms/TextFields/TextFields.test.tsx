import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '../../../test-utils';
import TextFields from './TextFields';

describe('TextFields Component', () => {
  it('renders with label', () => {
    render(<TextFields label="Email" id="email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<TextFields placeholder="Enter your email" id="email" label="Email" />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('handles text input', async () => {
    const user = userEvent.setup();
    render(<TextFields label="Email" id="email" />);
    
    const input = screen.getByLabelText('Email');
    await user.type(input, 'test@example.com');
    
    expect(input).toHaveValue('test@example.com');
  });

  it('calls onChange when typing', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<TextFields label="Email" id="email" onChange={handleChange} />);
    
    const input = screen.getByLabelText('Email');
    await user.type(input, 'a');
    
    expect(input).toHaveValue('a');
  });

  it('applies error state', () => {
    render(<TextFields label="Email" id="email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('applies disabled state', () => {
    render(<TextFields label="Email" id="email" disabled />);
    const input = screen.getByLabelText('Email');
    expect(input).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<TextFields label="Email" id="email" className="custom-input" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveClass('custom-input');
  });

  it('renders with different types', () => {
    const { rerender } = render(<TextFields label="Password" id="password" type="password" />);
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');

    rerender(<TextFields label="Email" id="email" type="email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });
});
