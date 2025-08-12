import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../root-reducer';
import { fetchFarmers, fetchFarmer, createFarmerThunk } from './thunks';
import * as api from '../../service/agriculture/agricultureApi';

// Mock the agriculture API
vi.mock('../../service/agriculture/agricultureApi', () => ({
  listFarmers: vi.fn(),
  getFarmer: vi.fn(),
  createFarmer: vi.fn(),
}));

describe('Farmer Thunks', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        farmers: {
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
  });

  describe('fetchFarmers', () => {
    it('should dispatch FARMERS_LIST_REQ and FARMERS_LIST_OK on success', async () => {
      const mockFarmers = [
        { id: '1', name: 'John Doe', doc: '123456789' },
        { id: '2', name: 'Jane Smith', doc: '987654321' },
      ];

      const mockResponse = {
        items: mockFarmers,
        total: 2,
        page: 1,
        pageSize: 20,
      };

      (api.listFarmers as any).mockResolvedValue(mockResponse);

      const result = await store.dispatch(fetchFarmers({ page: 1, pageSize: 20 }));

      const state = store.getState();
      
      expect(state.farmers.loading).toBe(false);
      expect(state.farmers.items).toEqual(mockFarmers);
      expect(state.farmers.total).toBe(2);
      expect(result).toEqual(mockResponse);
    });

    it('should dispatch FARMERS_LIST_REQ and FARMERS_LIST_ERR on failure', async () => {
      const error = new Error('API Error');
      (api.listFarmers as any).mockRejectedValue(error);

      await expect(store.dispatch(fetchFarmers())).rejects.toThrow('API Error');

      const state = store.getState();
      expect(state.farmers.loading).toBe(false);
      expect(state.farmers.error).toBe('API Error');
    });

    it('should use default pagination when no params provided', async () => {
      const mockResponse = {
        items: [],
        total: 0,
        page: 1,
        pageSize: 20,
      };

      (api.listFarmers as any).mockResolvedValue(mockResponse);

      await store.dispatch(fetchFarmers());

      expect(api.listFarmers).toHaveBeenCalledWith({ page: 1, pageSize: 20 });
    });

    it('should use custom pagination when params provided', async () => {
      const mockResponse = {
        items: [],
        total: 0,
        page: 2,
        pageSize: 10,
      };

      (api.listFarmers as any).mockResolvedValue(mockResponse);

      await store.dispatch(fetchFarmers({ page: 2, pageSize: 10 }));

      expect(api.listFarmers).toHaveBeenCalledWith({ page: 2, pageSize: 10 });
    });
  });

  describe('fetchFarmer', () => {
    it('should dispatch FARMERS_GET_REQ and FARMERS_GET_OK on success', async () => {
      const mockFarmer = { id: '1', name: 'John Doe', doc: '123456789' };
      (api.getFarmer as any).mockResolvedValue(mockFarmer);

      const result = await store.dispatch(fetchFarmer('1'));

      const state = store.getState();
      expect(state.farmers.getting).toBe(false);
      expect(state.farmers.current).toEqual(mockFarmer);
      expect(result).toEqual(mockFarmer);
    });

    it('should dispatch FARMERS_GET_REQ and FARMERS_GET_ERR on failure', async () => {
      const error = new Error('Farmer not found');
      (api.getFarmer as any).mockRejectedValue(error);

      await expect(store.dispatch(fetchFarmer('999'))).rejects.toThrow('Farmer not found');

      const state = store.getState();
      expect(state.farmers.getting).toBe(false);
      expect(state.farmers.error).toBe('Farmer not found');
    });
  });

  describe('createFarmerThunk', () => {
    it('should dispatch FARMERS_CREATE_REQ and FARMERS_CREATE_OK on success', async () => {
      const farmerData = { name: 'New Farmer', doc: '123456789' };
      const createdFarmer = { id: '3', ...farmerData };
      
      (api.createFarmer as any).mockResolvedValue(createdFarmer);

      const result = await store.dispatch(createFarmerThunk(farmerData));

      const state = store.getState();
      expect(state.farmers.creating).toBe(false);
      expect(state.farmers.items).toContain(createdFarmer);
      expect(state.farmers.total).toBe(1);
      expect(result).toEqual(createdFarmer);
    });

    it('should dispatch FARMERS_CREATE_REQ and FARMERS_CREATE_ERR on failure', async () => {
      const error = new Error('Validation failed');
      (api.createFarmer as any).mockRejectedValue(error);

      await expect(store.dispatch(createFarmerThunk({ name: '' }))).rejects.toThrow('Validation failed');

      const state = store.getState();
      expect(state.farmers.creating).toBe(false);
      expect(state.farmers.error).toBe('Validation failed');
    });
  });
});
