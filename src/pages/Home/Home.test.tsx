import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../test-utils';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from '../../store/root-reducer';
import Home from './Home';

vi.mock('../../components/organism/Grid', () => ({
  Grid: ({ summary, status }: any) => (
    <div data-testid="grid">
      <div>Farmers: {summary?.farmers ?? (status === 'loading' ? '…' : '—')}</div>
      <div>Farms: {summary?.farms ?? (status === 'loading' ? '…' : '—')}</div>
      <div>Harvests: {summary?.harvests ?? (status === 'loading' ? '…' : '—')}</div>
      <div>Crops: {summary?.crops ?? (status === 'loading' ? '…' : '—')}</div>
    </div>
  ),
}));

vi.mock('../../service/metrics/metricsApi', () => ({
  getSummary: vi.fn(),
}));

describe('Home Component', () => {
  const createMockStore = (initialState = {}) => {
    return configureStore({
      reducer: rootReducer,
      preloadedState: {
        home: {
          summary: null,
          loading: false,
          error: undefined,
          ...initialState.home,
        },
        auth: {
          user: null,
          token: null,
          loading: false,
          error: undefined,
        },
        farmers: {
          items: [],
          total: 0,
          page: 1,
          pageSize: 20,
          loading: false,
          error: undefined,
          current: null,
          getting: false,
          creating: false,
          updating: false,
          deleting: {},
        },
      },
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the home page title', () => {
    const store = createMockStore();
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Dashboard • Hub')).toBeInTheDocument();
  });

  it('renders the grid component', () => {
    const store = createMockStore();
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('grid')).toBeInTheDocument();
  });

  it('shows loading state when fetching summary', () => {
    const store = createMockStore({
      home: { loading: true, summary: null, error: undefined, status: 'loading' }
    });
    
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/…/)).toBeInTheDocument();
  });

  it('shows error state when summary fetch fails', () => {
    const store = createMockStore({
      home: { error: 'Failed to load summary', summary: null, loading: false, status: 'error' }
    });
    
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/—/)).toBeInTheDocument();
  });

  it('displays summary data when available', () => {
    const mockSummary = {
      farmers: 10,
      farms: 25,
      harvests: 50,
      crops: 100,
    };
    
    const store = createMockStore({
      home: { summary: mockSummary, loading: false, error: undefined, status: 'success' }
    });
    
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Farmers: 10/)).toBeInTheDocument(); // farmers
    expect(screen.getByText(/Farms: 25/)).toBeInTheDocument(); // farms
    expect(screen.getByText(/Harvests: 50/)).toBeInTheDocument(); // harvests
    expect(screen.getByText(/Crops: 100/)).toBeInTheDocument(); // crops
  });

  it('handles grid tile clicks', async () => {
    const store = createMockStore();
    
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Produtor')).toBeInTheDocument();
    expect(screen.getByText('Fazenda')).toBeInTheDocument();
    expect(screen.getByText('Safra')).toBeInTheDocument();
    expect(screen.getByText('Cultura')).toBeInTheDocument();
  });
});
