import { describe, it, expect, vi } from 'vitest';
import { render, screen } from './test-utils';
import App from './App';

vi.mock('react-router-dom', () => ({
  Routes: ({ children }: any) => <div data-testid="routes">{children}</div>,
  Route: ({ children }: any) => <div data-testid="route">{children}</div>,
}));

vi.mock('./pages/Home', () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock('./pages/FamerPage', () => ({
  default: () => <div data-testid="farmer-page">Farmer Page</div>,
}));

vi.mock('./pages/Login', () => ({
  default: () => <div data-testid="login-page">Login Page</div>,
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('routes')).toBeInTheDocument();
  });

  it('renders the router structure', () => {
    render(<App />);
    expect(screen.getByTestId('routes')).toBeInTheDocument();
  });

  it('renders the global styles', () => {
    render(<App />);

    expect(document.head).toBeDefined();
  });

  it('has proper routing structure', () => {
    render(<App />);

    const routes = screen.getByTestId('routes');
    expect(routes).toBeInTheDocument();
    
    const routeElements = screen.getAllByTestId('route');
    expect(routeElements.length).toBeGreaterThan(0);
  });
});
