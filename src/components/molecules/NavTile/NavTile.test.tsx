import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../test-utils';
import { BrowserRouter } from 'react-router-dom';
import NavTile from './index';

describe('NavTile Component', () => {
  const mockProps = {
    title: 'Dashboard',
    subtitle: 'Overview',
    to: '/dashboard',
    onClick: vi.fn(),
  };

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    );
  };

  it('renders with title and subtitle', () => {
    renderWithRouter(<NavTile {...mockProps} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('handles click events', () => {
    renderWithRouter(<NavTile {...mockProps} />);
    const tile = screen.getByRole('button');
    tile.click();
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('renders with different titles', () => {
    renderWithRouter(<NavTile {...mockProps} title="Farmers" />);
    expect(screen.getByText('Farmers')).toBeInTheDocument();
  });

  it('renders with different subtitles', () => {
    renderWithRouter(<NavTile {...mockProps} subtitle="Farm Management" />);
    expect(screen.getByText('Farm Management')).toBeInTheDocument();
  });

  it('renders with different destinations', () => {
    renderWithRouter(<NavTile {...mockProps} to="/farmers" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
